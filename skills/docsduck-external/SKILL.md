---
name: docsduck-external
description: Create and maintain evidence-grounded customer-facing product documentation from a software repository. Use when an agent must inspect routes, interface copy, permissions, validation, tests, existing docs, or code changes to write or update help-center articles, onboarding guides, account and security guides, integration setup instructions, or customer troubleshooting content.
---

# DocsDuck External

Create customer documentation from verified product evidence. Write for the
person using the product, not the person who implemented it.

## Operating rules

1. Inspect before writing.
2. Treat the repository as an important source of truth, not the only source.
3. Do not invent pages, controls, labels, permissions, plans, behavior, or
   outcomes.
4. Distinguish verified facts, reasonable inferences, and missing information.
5. Prefer focused updates to affected claims over full rewrites.
6. Keep customer content free of unnecessary implementation detail.
7. Default to local draft files. Do not publish, commit, push, or modify an
   external system unless the user requested it and the environment authorizes
   it.
8. Never report an external write, approval, or publication as successful
   unless the corresponding action completed successfully.

## Load references

- Read [references/verification.md](references/verification.md) before deciding
  that a workflow is documented well enough to publish.
- Read [references/article-format.md](references/article-format.md) before
  creating a new article or normalizing an existing DocsDuck article.
- Read [references/configuration.md](references/configuration.md) when
  `docsduck.config.yml` exists, the user asks where to write, or any publishing
  destination is in scope.

## Workflow

### 1. Resolve scope

Determine:

- the customer goal or product area;
- whether the task is discovery, creation, update, audit, or dry run;
- the intended audience, locale, and output location;
- whether existing customer documentation must be preserved;
- whether the request includes external publishing.

If scope is broad, inventory product areas before drafting articles. Do not
create one article for every route or component. Group evidence around useful
customer tasks.

### 2. Read project configuration

Look for `docsduck.config.yml` at the repository root. Apply recognized
external-documentation settings from
[references/configuration.md](references/configuration.md).

When the file is missing or incomplete:

- use local Markdown files;
- preserve the repository's established documentation layout when one exists;
- otherwise write under `docs/external/`;
- mark new content as draft;
- do not publish externally;
- do not create Git commits.

User instructions override configuration for the current task unless they
would require an unavailable or unauthorized action.

### 3. Map product evidence

Search the smallest relevant area first. Useful evidence includes:

- route and navigation definitions;
- page headings, dialogs, buttons, menu items, and field labels;
- validation rules and customer-visible errors;
- authentication, authorization, role, plan, and feature-flag checks;
- success, empty, loading, and failure states;
- tests that exercise customer workflows;
- analytics events when they clarify user-visible steps;
- existing help content and product terminology;
- recent diffs when updating documentation after a change.

Ignore generated output, vendored dependencies, build artifacts, caches,
snapshots without behavioral value, and secrets.

Record the evidence needed to support:

- where the user starts;
- prerequisites and required permissions;
- the exact visible steps;
- the expected result;
- common recoverable failures;
- limitations or environment-specific behavior.

### 4. Build a workflow inventory

For each candidate article, capture:

```text
Customer goal:
Starting point:
Audience or role:
Verified visible labels:
Prerequisites:
Success state:
Relevant failure states:
Existing article:
Sources:
Confidence:
```

Create an article only when it helps a customer complete or recover a
meaningful task. Combine trivial adjacent actions. Split workflows when they
have different audiences, prerequisites, or outcomes.

### 5. Verify each claim

Apply the evidence rules in
[references/verification.md](references/verification.md).

When evidence conflicts:

1. Prefer executable behavior and current tests over comments.
2. Check feature flags, configuration, and permission branches.
3. Report the conflict instead of silently choosing a convenient answer.
4. Ask for human confirmation when the unresolved fact changes customer
   instructions materially.

Do not turn an inference into a numbered instruction.

### 6. Create or update documentation

For new articles, use
[references/article-format.md](references/article-format.md).

For existing articles:

1. Match by `docsduck_id` when present.
2. Otherwise use file path, title, sources, and topic together.
3. Read the whole article before editing.
4. Identify claims affected by current evidence or the requested change.
5. Preserve accurate editorial content and stable identifiers.
6. Update only affected sections.
7. Add or refresh source metadata without exposing source paths in
   customer-visible prose.
8. Do not create `-v2`, `-new`, or `-final` duplicates.

Use exact interface labels in bold. Use direct, active instructions. Explain
prerequisites before steps and the expected result after steps. Include
troubleshooting only for failures supported by evidence.

### 7. Validate the draft

Before finishing, check:

- every numbered step has supporting evidence;
- labels match the product exactly;
- prerequisites and permissions are explicit;
- the article addresses one coherent customer goal;
- the expected outcome is stated;
- implementation details are absent from customer-facing prose;
- uncertainty is recorded for maintainers;
- source references exist and do not contain secrets;
- links and related-article references resolve when they can be checked
  locally;
- updates preserve unaffected content and stable IDs.

Classify each reviewed article as:

- `current`;
- `possibly_outdated`;
- `outdated`;
- `unable_to_verify`.

Do not mark `verified` or `approved` without sufficient evidence or an actual
approval.

### 8. Write or publish safely

For local output, show the files created or changed and summarize verification
gaps.

For an external destination:

1. Confirm configuration enables the destination and output mode.
2. Confirm an authorized compatible tool is available.
3. Resolve an existing external article by stored ID when updating.
4. Use draft or review state by default.
5. Obtain confirmation when required by configuration, the tool, or the user.
6. Verify the tool result before recording IDs, revisions, or publishing
   status.
7. Preserve a local draft when configured and publishing fails.

If a required integration is unavailable, stop the external write, keep any
permitted local work, and state the missing capability precisely.

## Completion report

Report:

- articles created, updated, unchanged, or needing review;
- primary product evidence used;
- important uncertainties or conflicts;
- files or external records actually changed;
- validation performed;
- actions intentionally not taken, such as publishing or committing.
