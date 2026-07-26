---
name: docsduck-commit
description: Review working-tree changes, update or create affected customer and internal documentation, validate the combined change, and create a safe Git commit. Use before committing completed feature work, fixes, refactors, configuration changes, migrations, integrations, or other repository updates when documentation impact must be checked rather than assumed.
---

# DocsDuck Commit

Place a documentation gate in front of Git commits. Inspect the complete
intended change, synchronize affected documentation, validate code and docs
together, and commit only the confirmed scope.

## Operating rules

1. Treat documentation impact as a required decision, not a required file
   change. Some commits legitimately need no documentation update.
2. Inspect staged, unstaged, renamed, deleted, and relevant untracked files.
3. Do not stage, discard, rewrite, or commit unrelated user changes.
4. Preserve existing staging intent unless the user authorizes a different
   commit scope.
5. Update existing documentation before creating a duplicate.
6. Ground customer and internal documentation in current product evidence.
7. Run relevant non-interactive repository validation before committing.
8. Create a local commit only when the user explicitly requested a commit and
   the exact scope is clear.
9. Treat push, pull request, merge, amend, rebase, tagging, and release creation
   as separate actions requiring explicit authorization.
10. Never force-push, bypass hooks, or report a commit or remote action as
    successful unless it completed successfully.

## Load references

- Read [references/change-impact.md](references/change-impact.md) before
  deciding which documentation layers are affected.
- Read [references/documentation-gate.md](references/documentation-gate.md)
  before editing docs or concluding that no documentation change is required.
- Read [references/git-safety.md](references/git-safety.md) before staging,
  committing, or performing an authorized remote action.
- Read [references/configuration.md](references/configuration.md) when
  `docsduck.config.yml` exists or commit behavior is unclear.

When installed beside DocsDuck External or DocsDuck Internal, read the relevant
sibling `SKILL.md` and its directly required references before making that
documentation layer:

```text
../docsduck-external/SKILL.md
../docsduck-internal/SKILL.md
```

If a sibling skill is unavailable, follow the target repository's established
documentation conventions plus this skill's documentation gate. Report that the
specialized DocsDuck workflow was unavailable.

## Workflow

### 1. Resolve authorization and scope

Determine whether the user requested:

- documentation-impact review only;
- documentation updates without a commit;
- a local commit;
- a local commit and push;
- a pull request or another hosting-provider action.

An explicit request such as “commit these changes” authorizes one local commit
for the confirmed change scope. It does not authorize a push.

Identify:

- repository root and current branch;
- staged, unstaged, deleted, renamed, and untracked files;
- merge/rebase conflicts or an in-progress Git operation;
- the user-visible or internal purpose of the change;
- files that belong together in the intended commit;
- unrelated changes that must remain untouched;
- repository instructions and validation commands.

Stop before mutation when the repository is conflicted, the intended scope is
materially ambiguous, or a commit would mix unrelated work.

### 2. Build the change inventory

Inspect:

```bash
git status --short
git diff
git diff --cached
```

Also inspect relevant untracked files directly because they are absent from
normal diffs. Use history or comparison against the merge base when the user
asks to prepare an existing branch or pull request rather than only the current
working tree.

Summarize the intended change in behavioral terms:

```text
Change goal:
Customer-visible behavior:
Internal system behavior:
Configuration or migration impact:
Permissions or security impact:
Operational impact:
Existing documentation:
Candidate commit scope:
Excluded unrelated files:
```

Do not rely only on filenames or commit messages.

### 3. Classify documentation impact

Apply [references/change-impact.md](references/change-impact.md). Classify the
commit as one or more of:

- `external_required`;
- `internal_required`;
- `both_required`;
- `no_documentation_change`;
- `unable_to_verify`.

A new route, label, permission, workflow, data state, integration behavior,
failure mode, configuration requirement, or operational procedure normally
requires review of related documentation.

A formatting-only change, test-only coverage change, dependency lock update, or
behavior-preserving refactor may require no documentation update. Verify that
the behavior is actually unchanged.

### 4. Find affected documentation

Search in this order:

1. `docsduck_id` and source metadata that reference changed files or systems;
2. exact product labels, routes, configuration keys, API names, events, and
   workflow terms from the diff;
3. existing documentation directories and navigation indexes;
4. version history when a rename or moved component obscures the relationship.

Create a new document only when the change introduces a meaningful customer
task or internal concept not covered by an existing document.

### 5. Pass the documentation gate

Follow [references/documentation-gate.md](references/documentation-gate.md).

For External impact:

- verify visible labels, steps, prerequisites, permissions, results, and
  recoverable failures;
- keep implementation details out of customer-facing prose;
- prefer focused updates.

For Internal impact:

- trace boundaries, state changes, data, permissions, failure behavior,
  observability, and environment-specific gaps;
- retain human rationale and warnings that source code cannot reconstruct.

For both layers, preserve stable IDs and accurate editorial content. Never
create `-v2`, `-new`, or `-final` duplicates.

If documentation cannot be verified, do not hide the gap to make the commit
appear complete. Report what evidence or human decision is missing.

### 6. Review the combined diff

Re-read:

```bash
git status --short
git diff
git diff --cached
```

Confirm:

- documentation matches the final code, not an earlier intermediate state;
- source references and local links resolve;
- no secret, private customer data, or internal-only detail leaked into
  external docs;
- unrelated files remain excluded;
- generated files are included only when repository policy requires them;
- deleted or renamed behavior is not still documented as current;
- the change inventory and documentation-impact classification remain accurate.

### 7. Validate

Run the smallest relevant code-level checks defined by repository instructions,
such as formatting, lint, typecheck, unit tests, schema validation, migrations,
documentation validation, and link checks.

Do not start a development server, open a browser, visit URLs, take screenshots,
or run visual/manual checks unless the user explicitly requested them.

If a required check fails:

1. determine whether the intended change caused it;
2. fix in-scope failures when authorized;
3. rerun the relevant check;
4. do not commit a known failing state unless the user explicitly accepts the
   failure and the repository policy permits it.

### 8. Stage the confirmed scope

Follow [references/git-safety.md](references/git-safety.md).

Prefer explicit file paths. Preserve unrelated staged work. Use `git add -A`
only when the entire working tree is confirmed as one change.

After staging, inspect `git diff --cached --stat` and `git diff --cached`.
Ensure both implementation and required documentation are present.

### 9. Commit

If the user authorized a local commit:

1. derive a concise message from the full staged behavior;
2. follow repository commit conventions;
3. create one commit without bypassing hooks;
4. verify the resulting commit and working-tree state.

Do not amend an existing commit unless explicitly requested.

If the user requested review or preparation but not a commit, stop after
presenting the documentation impact, validation, and proposed commit scope.

### 10. Perform separately authorized remote actions

Only after a successful local commit:

- push the current branch when explicitly requested;
- avoid direct pushes to a default or protected branch unless explicitly
  requested and permitted;
- create a pull request only when requested;
- use an available authenticated provider tool for GitHub, GitLab, or another
  host;
- verify remote results before reporting success.

Never infer authorization to merge or release from authorization to push.

## Completion report

Report:

- documentation-impact classification and rationale;
- customer and internal documents created, updated, unchanged, or blocked;
- code and documentation validation performed;
- exact files committed;
- commit SHA and message when a commit succeeded;
- remote branch, pull request, or provider result only when actually completed;
- unrelated changes left untouched;
- unresolved evidence or validation gaps.
