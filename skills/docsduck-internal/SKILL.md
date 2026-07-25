---
name: docsduck-internal
description: Create and maintain evidence-grounded internal product documentation from a software repository. Use when an agent must document architecture, data flows, authentication, authorization, integrations, operational workflows, support playbooks, failure modes, incident procedures, engineering onboarding, or implementation changes for engineering, support, product, or operations teams.
---

# DocsDuck Internal

Create internal documentation that helps teams build, support, operate, and
change a product. Connect important claims to current source evidence and make
uncertainty visible.

## Operating rules

1. Inspect the executed system path before explaining it.
2. Separate verified behavior, inference, environment-specific behavior, and
   missing organizational knowledge.
3. Trace across boundaries when the question requires it: client, API, worker,
   database, queue, provider, infrastructure, and human process.
4. Never expose secrets or copy sensitive customer data into documentation.
5. Do not present source code as the complete truth when runtime configuration,
   infrastructure, external services, or business processes affect behavior.
6. Prefer focused updates to affected sections.
7. Default to local draft files. Do not publish, commit, push, or modify an
   external system unless requested and authorized.
8. Never invent ownership, approval, deployment status, incident history, or
   operational guarantees.

## Load references

- Read [references/verification.md](references/verification.md) before
  classifying a technical or operational claim as verified.
- Read [references/document-format.md](references/document-format.md) before
  creating a new internal document or normalizing an existing DocsDuck
  document.
- Read [references/configuration.md](references/configuration.md) when
  `docsduck.config.yml` exists, the output location is unclear, or external
  publishing is in scope.

## Workflow

### 1. Resolve the internal question

Identify:

- the intended readers and decisions the document must support;
- the system, workflow, incident class, or product area in scope;
- whether the task is discovery, creation, update, audit, or dry run;
- required technical depth;
- existing internal documents that must be preserved;
- excluded sensitive areas;
- whether external publishing was requested.

Choose a useful document type:

- system overview;
- architecture or data flow;
- authentication or authorization flow;
- integration behavior;
- support investigation playbook;
- operational runbook;
- deployment or environment guide;
- failure-mode and recovery guide;
- engineering onboarding guide;
- change-impact update.

Do not turn a broad repository inventory into a single unstructured document.

### 2. Read project configuration

Look for `docsduck.config.yml` at the repository root. Apply recognized internal
settings from [references/configuration.md](references/configuration.md).

Without configuration:

- preserve established repository documentation conventions;
- otherwise write under `docs/internal/`;
- mark new documents as draft;
- do not publish externally;
- do not create Git commits;
- redact or omit sensitive values.

### 3. Map system evidence

Start with the smallest relevant entry point, then follow the executed path.
Useful evidence includes:

- routes, controllers, handlers, services, jobs, and event consumers;
- domain models, schemas, migrations, queries, and transactions;
- authentication, authorization, tenancy, and entitlement checks;
- queues, retries, timeouts, idempotency, caching, and scheduling;
- integration clients, webhooks, contracts, and error mapping;
- configuration definitions and feature flags;
- deployment manifests and infrastructure definitions;
- tests that demonstrate behavior and failure cases;
- logs, metrics, alerts, dashboards, and runbooks when available;
- existing internal docs, decision records, and recent diffs.

Ignore generated output, vendored dependencies, caches, secret values, and
unrelated implementation.

### 4. Trace boundaries and states

For each flow, identify:

```text
Trigger or entry point:
Actors and permissions:
Main components:
Data read and written:
External dependencies:
State transitions:
Success path:
Failure paths:
Retries and recovery:
Observability:
Security boundaries:
Environment-specific behavior:
Unknown human processes:
Sources:
Confidence:
```

Use a diagram only when it materially clarifies three or more components or
state transitions. Keep the text authoritative; diagrams must not add
unsupported relationships.

### 5. Verify claims

Apply [references/verification.md](references/verification.md).

For high-risk areas—authentication, authorization, tenant isolation, billing,
data deletion, secrets, production recovery, compliance, and incident
response—require stronger evidence and state unresolved gaps prominently.

When sources conflict:

1. Follow current executable paths.
2. Check environment and feature-flag variants.
3. Compare current tests and contracts.
4. Record the conflict.
5. Ask for human confirmation if runtime or organizational behavior cannot be
   discovered safely.

Never turn a likely operational practice into an asserted runbook step.

### 6. Create or update documentation

Use [references/document-format.md](references/document-format.md).

For updates:

1. Match by `docsduck_id` when present.
2. Read the complete existing document.
3. Map changed source evidence to affected claims and sections.
4. Preserve accurate rationale, warnings, diagrams, and human context.
5. Update only affected content.
6. Retain the stable ID and valid links.
7. Add current source references.
8. Avoid duplicate version-suffixed documents.

Use repository-relative source links with symbols or line numbers only when
they are likely to remain useful. Prefer stable file and component references
over brittle references to every line.

### 7. Validate the document

Check:

- scope and audience are explicit;
- components and boundaries exist;
- state transitions and data mutations are supported;
- permission and security claims follow executed checks;
- failure modes distinguish handled, retried, surfaced, and unknown behavior;
- environment-specific facts are labeled;
- operational actions have verified prerequisites and rollback or escalation
  guidance where evidence exists;
- unknown ownership or human process is not invented;
- sensitive data is absent;
- diagrams agree with the prose;
- source references resolve locally;
- updates preserve unaffected human context.

Classify the document as:

- `current`;
- `possibly_outdated`;
- `outdated`;
- `unable_to_verify`.

Approval remains separate from generation. Do not mark a document approved
without an actual human or verified review-system action.

### 8. Write or publish safely

For local output, summarize files changed, evidence used, and unresolved gaps.

For external publishing:

1. Confirm configuration and current user instruction permit the destination.
2. Confirm an authorized compatible tool is available.
3. Resolve existing content using a stored external ID when possible.
4. Prefer draft or review state.
5. Obtain any required confirmation.
6. Verify the returned result before recording status, revision, or identity.
7. Preserve a permitted local draft if synchronization fails.

If the repository cannot verify a production procedure, provide an
investigation note or draft requiring operator review—not a confident runbook.

## Completion report

Report:

- documents created, updated, unchanged, or needing review;
- systems and evidence inspected;
- material inferences, conflicts, and missing operational knowledge;
- security-sensitive details intentionally omitted;
- files or external records actually changed;
- validation performed;
- actions intentionally not taken.
