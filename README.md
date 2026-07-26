<p align="center">
  <img
    src="./docsduckbanner.png"
    alt="DocsDuck — Keep internal and customer-facing documentation in sync with your product"
    width="100%"
  />
</p>

<h1 align="center">DocsDuck</h1>

<p align="center">
  <strong>Open-source Agent Skills for evidence-grounded product documentation.</strong>
</p>

<p align="center">
  DocsDuck helps coding agents turn verified product behavior into customer
  help and internal documentation, then make focused updates when the product
  changes.
</p>

<p align="center">
  <a href="#what-ships-today">What ships</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#configuration">Configuration</a> ·
  <a href="#current-status">Status</a>
</p>

---

## What ships today

DocsDuck currently contains two installable Agent Skills:

- [DocsDuck External](./skills/docsduck-external) creates and maintains
  customer-facing help articles, onboarding guides, account and security
  guides, integration instructions, and customer troubleshooting content.
- [DocsDuck Internal](./skills/docsduck-internal) creates and maintains
  architecture guides, system flows, support playbooks, operational runbooks,
  integration documentation, and engineering onboarding content.

Both skills:

- inspect repository evidence before writing;
- distinguish verified facts from inferences and missing information;
- verify routes, interface labels, validation, permissions, flags, tests, data
  flows, and failure behavior when relevant;
- create structured Markdown with stable `docsduck_id` values and source
  references;
- update affected claims instead of unnecessarily rewriting whole documents;
- preserve existing editorial context when updating;
- default to local draft files;
- require configuration, an available authorized integration, and any required
  confirmation before external publishing;
- report what they could not verify.

DocsDuck is instruction-based software. The skill directs the coding agent
running it; it does not bundle an LLM, repository indexer, hosted service,
credentials, or documentation-platform integration.

## Why DocsDuck

Documentation commonly drifts because product changes and documentation changes
happen in separate workflows.

DocsDuck moves documentation work closer to the implementation:

```text
Product repository
       ↓
Routes, interface copy, permissions, tests, data flows, and changes
       ↓
DocsDuck skill running in a compatible coding agent
       ↓
Reviewable customer or internal Markdown
       ↓
Optional authorized publishing workflow
```

The repository is an important source of truth, but not always the complete
truth. Runtime configuration, infrastructure, external providers, feature
flags, and human processes may affect behavior. DocsDuck records those limits
instead of inventing missing facts.

## Two documentation layers

<p align="center">
  <img
    src="./docsduckinternal-external.png"
    alt="DocsDuck External for customers and DocsDuck Internal for product teams"
    width="661"
  />
</p>

### DocsDuck External

External documentation is written for the person using the product. It uses
verified visible terminology, explains prerequisites, provides task-focused
steps, and states the expected result.

Useful requests include:

```text
Use DocsDuck External to document how workspace administrators invite a
team member.
```

```text
Use DocsDuck External to compare the account help articles with the latest
code changes and update only affected instructions.
```

External source:
[skills/docsduck-external](./skills/docsduck-external)

### DocsDuck Internal

Internal documentation is written for engineering, support, product, and
operations teams. It can explain implementation boundaries, data and state
transitions, dependencies, permissions, failure modes, observability, and
known operational gaps.

Useful requests include:

```text
Use DocsDuck Internal to document the authentication and session lifecycle,
including revocation and environment-specific behavior.
```

```text
Use DocsDuck Internal to create a support investigation playbook for failed
team invitations. Do not invent production remediation steps.
```

Internal source:
[skills/docsduck-internal](./skills/docsduck-internal)

## How it works

Each skill follows the same evidence-first lifecycle.

### 1. Resolve the documentation question

The agent identifies the audience, product area, output type, existing
documentation, and whether the task is creation, update, audit, or dry run.

### 2. Inspect current evidence

Depending on the task, the agent may inspect:

- routes and navigation;
- interface labels and translations;
- forms and validation;
- authentication, roles, permissions, entitlements, and feature flags;
- handlers, services, jobs, schemas, migrations, and integration clients;
- tests covering success and failure behavior;
- existing documentation;
- relevant version-control changes.

### 3. Classify confidence

Customer instructions require directly supported product behavior. Internal
documents label material facts as verified, inferred, environment-specific,
conflicting, or unknown.

### 4. Create or update structured Markdown

New documents receive a stable ID, draft status, verification state, and source
map. Existing documents are matched by stable ID when possible and receive
focused updates.

### 5. Validate and report

The agent checks terminology, evidence, permissions, outcomes, failure modes,
sensitive information, source references, and preservation of unaffected
content. The completion report lists changed files and unresolved gaps.

## Installation

Clone the canonical repository:

```bash
git clone https://github.com/DocsDuck/DocsDuck.git
cd DocsDuck
```

### Install both skills for compatible agents

Many Agent Skills-compatible tools discover personal skills under
`~/.agents/skills`:

```bash
mkdir -p ~/.agents/skills
cp -R skills/docsduck-external ~/.agents/skills/docsduck-external
cp -R skills/docsduck-internal ~/.agents/skills/docsduck-internal
```

### Install for one project

Copy the skills into the target repository:

```bash
mkdir -p /path/to/product/.agents/skills
cp -R skills/docsduck-external /path/to/product/.agents/skills/
cp -R skills/docsduck-internal /path/to/product/.agents/skills/
```

Some coding agents use a product-specific skills directory, such as
`~/.claude/skills` or `.github/skills`. Consult that agent's current
documentation and copy the complete skill folder, including `references/` and
`agents/`.

Installation makes the instructions available to the agent. It does not grant
repository or external-service permissions.

## Configuration

Configuration is optional. Copy the example into a product repository:

```bash
cp docsduck.config.example.yml /path/to/product/docsduck.config.yml
```

Safe defaults apply when no configuration exists:

- local Markdown output;
- `docs/external/` and `docs/internal/` as fallback directories;
- draft status;
- no external publishing;
- no Git commit;
- unverified behavior reported rather than invented.

Supported output modes are:

- `files`: update local Markdown;
- `dry-run`: report proposed documentation without writing;
- `publish`: use a configured authorized destination;
- `both`: update local Markdown and attempt authorized synchronization.

External publishing requires all of the following:

1. publishing enabled in `docsduck.config.yml`;
2. a publish-capable output mode;
3. a configured destination;
4. a compatible tool available in the current agent environment;
5. valid authorization;
6. verified content;
7. confirmation when configured or required.

DocsDuck does not supply integrations or credentials. It must not claim that an
article was created, synchronized, approved, or published unless the external
operation actually succeeded.

See [docsduck.config.example.yml](./docsduck.config.example.yml) and each
skill's configuration reference for supported fields.

## Default output

When the target repository has no established documentation layout, DocsDuck
uses:

```text
docs/
├── external/
└── internal/
```

Default documents include:

- a stable `docsduck_id`;
- title, description, audience, and draft status;
- a verification state;
- repository-relative source references;
- a structure appropriate to a customer task, system explanation, playbook, or
  runbook.

See [the output fixtures](./examples) for the default format. The fixtures are
illustrative and do not claim to describe a real product.

## Safety model

DocsDuck intentionally does not:

- invent customer-visible controls or workflow steps;
- treat a component's existence as proof that a user can reach it;
- infer permissions from UI visibility alone;
- present likely production procedures as verified runbooks;
- expose secrets, customer data, or security bypasses;
- infer ownership, approval, service levels, or compliance status;
- publish or commit by default;
- report an action as successful without a successful tool result.

Human review remains important for editorial quality, product intent, security,
compliance, localization, and behavior outside the available evidence.

## Current status

DocsDuck is **early alpha**.

The External and Internal skill workflows, references, configuration example,
output fixtures, and repository validation are implemented. Interfaces and
output conventions may change before the first stable release.

Not currently included:

- a hosted DocsDuck service;
- automatic execution on every pull request;
- bundled Intercom, Zendesk, GitBook, Notion, or Help Scout integrations;
- framework-specific analyzers;
- a guarantee that every product behavior can be inferred from source code;
- production certification for security-sensitive runbooks.

Test DocsDuck on a branch or small product area first and review generated
content before publishing.

## Repository structure

```text
DocsDuck/
├── README.md
├── LICENSE
├── docsduck.config.example.yml
├── examples/
│   ├── external/
│   └── internal/
├── scripts/
│   └── validate-repository.mjs
└── skills/
    ├── docsduck-external/
    │   ├── SKILL.md
    │   ├── agents/
    │   └── references/
    └── docsduck-internal/
        ├── SKILL.md
        ├── agents/
        └── references/
```

## Validation

The repository includes a dependency-free structural validator:

```bash
npm run validate
```

It checks skill frontmatter, metadata, referenced files, unresolved template
placeholders, output fixtures, and canonical README links.

## Roadmap

Potential future work includes:

- forward-testing against representative open-source products;
- framework-specific evidence guides;
- documentation-impact reports for pull requests;
- terminology and removed-route checks;
- output-schema validation;
- approved publishing integrations;
- localization guidance;
- performance guidance for large repositories.

Roadmap items are not current capabilities until they are implemented and
released.

## Contributing

Useful contributions include:

- testing either skill against a real repository;
- reporting unsupported or hallucinated behavior;
- improving evidence and verification rules;
- adding carefully scoped framework references;
- contributing non-sensitive before-and-after documentation examples;
- improving output validation.

Open an issue before a large behavioral change so the intended evidence and
safety model can be discussed.

## License

DocsDuck is licensed under the
[Apache License 2.0](./LICENSE).

```text
Copyright 2026 Felix Reveman
```
