# Internal document formats

Use the repository's established format when one exists. Otherwise start with
this frontmatter:

```yaml
---
docsduck_id: internal-area-topic
title: System or workflow title
description: What this document explains and who should use it.
audience:
  - engineering
  - support
status: draft
verification_status: verified
sources:
  - path/to/entry-point
  - path/to/relevant-test
---
```

Make `docsduck_id` stable and lowercase. Do not change an existing ID when a
title or file location changes.

## System or architecture document

```md
# System title

## Purpose and scope
## System boundaries
## Components and responsibilities
## Request or event flow
## Data model and state transitions
## Authentication and authorization
## Failure modes and recovery
## Observability
## Environment-specific behavior
## Known gaps
## Source map
```

## Support investigation playbook

```md
# Investigate a customer-visible problem

## Symptoms
## Before you begin
## Decision tree
## Investigation steps
## Common causes
## Safe remediation
## Escalation criteria
## Evidence to collect
## Known gaps
## Source map
```

Do not include a remediation step unless its prerequisites, target, expected
result, and material risk can be established.

## Operational runbook

```md
# Perform an operational task

## Purpose
## Preconditions and authorization
## Impact and risk
## Procedure
## Verification
## Rollback or recovery
## Escalation
## Observability
## Environment variants
## Source map
```

Draft rather than complete the runbook when production-only knowledge is
missing.

## Writing and update rules

- Define uncommon system terms on first use.
- Name components by their current repository or platform identity.
- Keep facts, inferences, and recommendations distinguishable.
- Explain why a boundary or failure mode matters.
- Use diagrams only when they improve understanding.
- Retain human rationale that source code cannot reconstruct.
- Update affected sections instead of regenerating unrelated content.
- Avoid brittle line references when a file, symbol, test, or contract is
  sufficiently precise.
- Keep approvals and authorship factual.
