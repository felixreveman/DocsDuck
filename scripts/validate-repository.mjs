import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function relativePath(path) {
  return relative(repositoryRoot, path);
}

function parseFrontmatter(path) {
  const content = read(path);
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    fail(`${relativePath(path)} must start with YAML frontmatter`);
    return { metadata: {}, body: content };
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      fail(`${relativePath(path)} has invalid frontmatter line: ${line}`);
      continue;
    }
    metadata[line.slice(0, separator).trim()] = line
      .slice(separator + 1)
      .trim();
  }

  return { metadata, body: match[2] };
}

function validateSkill(skillDirectory) {
  const skillName = basename(skillDirectory);
  const skillFile = join(skillDirectory, "SKILL.md");
  const agentFile = join(skillDirectory, "agents", "openai.yaml");

  if (!existsSync(skillFile)) {
    fail(`${relativePath(skillDirectory)} is missing SKILL.md`);
    return;
  }

  const { metadata, body } = parseFrontmatter(skillFile);
  const metadataKeys = Object.keys(metadata).sort();
  if (metadataKeys.join(",") !== "description,name") {
    fail(`${relativePath(skillFile)} frontmatter must contain only name and description`);
  }
  if (metadata.name !== skillName) {
    fail(`${relativePath(skillFile)} name must match its directory`);
  }
  if (!/^[a-z0-9-]{1,63}$/.test(metadata.name ?? "")) {
    fail(`${relativePath(skillFile)} has an invalid skill name`);
  }
  if ((metadata.description ?? "").length < 80) {
    fail(`${relativePath(skillFile)} needs a descriptive trigger`);
  }
  if (body.trim().length < 500) {
    fail(`${relativePath(skillFile)} does not contain a substantive workflow`);
  }
  if (/\bTODO\b|\[TODO/.test(read(skillFile))) {
    fail(`${relativePath(skillFile)} contains a TODO placeholder`);
  }

  for (const match of body.matchAll(/\]\((references\/[^)]+)\)/g)) {
    const reference = join(skillDirectory, match[1]);
    if (!existsSync(reference)) {
      fail(`${relativePath(skillFile)} links to missing ${match[1]}`);
    }
  }

  if (!existsSync(agentFile)) {
    fail(`${relativePath(skillDirectory)} is missing agents/openai.yaml`);
  } else {
    const agentMetadata = read(agentFile);
    const promptMatch = agentMetadata.match(/default_prompt:\s*"([^"]+)"/);
    const descriptionMatch = agentMetadata.match(/short_description:\s*"([^"]+)"/);

    if (!promptMatch?.[1].includes(`$${skillName}`)) {
      fail(`${relativePath(agentFile)} default_prompt must mention $${skillName}`);
    }
    const shortDescriptionLength = descriptionMatch?.[1].length ?? 0;
    if (shortDescriptionLength < 25 || shortDescriptionLength > 64) {
      fail(`${relativePath(agentFile)} short_description must be 25-64 characters`);
    }
  }
}

function walkMarkdown(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) files.push(...walkMarkdown(path));
    else if (path.endsWith(".md")) files.push(path);
  }
  return files;
}

const skillsDirectory = join(repositoryRoot, "skills");
for (const entry of readdirSync(skillsDirectory)) {
  const skillDirectory = join(skillsDirectory, entry);
  if (statSync(skillDirectory).isDirectory()) validateSkill(skillDirectory);
}

for (const example of walkMarkdown(join(repositoryRoot, "examples"))) {
  if (basename(example) === "README.md") continue;
  const content = read(example);
  for (const field of [
    "docsduck_id:",
    "title:",
    "description:",
    "status:",
    "verification_status:",
    "sources:",
  ]) {
    if (!content.includes(field)) {
      fail(`${relativePath(example)} is missing ${field}`);
    }
  }
  if (!content.includes("verification_status: example")) {
    fail(`${relativePath(example)} must identify itself as an example`);
  }
}

for (const markdownFile of walkMarkdown(repositoryRoot)) {
  const content = read(markdownFile);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim();
    if (
      rawTarget.startsWith("#") ||
      rawTarget.startsWith("http://") ||
      rawTarget.startsWith("https://") ||
      rawTarget.startsWith("mailto:")
    ) {
      continue;
    }

    const targetWithoutAnchor = rawTarget.split("#", 1)[0];
    if (!targetWithoutAnchor) continue;
    const resolvedTarget = resolve(dirname(markdownFile), targetWithoutAnchor);
    if (!existsSync(resolvedTarget)) {
      fail(
        `${relativePath(markdownFile)} links to missing ${targetWithoutAnchor}`,
      );
    }
  }
}

const readme = read(join(repositoryRoot, "README.md"));
if (!readme.includes("https://github.com/DocsDuck/DocsDuck.git")) {
  fail("README.md must use the canonical clone URL");
}
if (readme.includes("https://github.com/felixreveman/DocsDuck.git")) {
  fail("README.md contains the obsolete clone URL");
}
for (const skillName of ["docsduck-external", "docsduck-internal"]) {
  if (!readme.includes(`skills/${skillName}`)) {
    fail(`README.md must link to skills/${skillName}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exit(1);
}

console.log("DocsDuck repository validation passed.");
