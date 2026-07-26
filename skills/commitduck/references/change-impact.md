# Change-impact classification

Classify behavioral impact before editing documentation.

## Decision matrix

| Change | External docs | Internal docs |
|---|---|---|
| Customer-visible route, page, label, field, or workflow | Required | Review when architecture/support behavior changes |
| Permission, entitlement, plan, or feature flag | Required when customer access changes | Required |
| Validation, customer error, success state, or recovery step | Required | Required when support or failure handling changes |
| Authentication or account security | Required for changed customer action | Required |
| API, event, schema, migration, or state transition | Review if customer behavior changes | Required |
| Integration setup or configuration | Required for customer-managed setup | Required |
| Retry, timeout, queue, cache, webhook, or scheduled behavior | Review if customer expectations change | Required |
| Deployment, environment, monitoring, incident, or operator procedure | Usually not applicable | Required |
| Bug fix restoring already-documented behavior | Review and correct stale claims | Review root cause/failure guidance |
| Behavior-preserving refactor | Usually none | Usually none; verify architecture names/boundaries |
| Test-only coverage change | None unless it reveals stale docs | None unless it documents new behavior |
| Dependency or lockfile-only update | Usually none | Review only for runtime, security, or operational impact |
| Formatting, comments, or developer tooling | None | None unless workflow requirements change |

## Classification rules

Use:

- `external_required` when a customer task, prerequisite, visible term, result,
  limitation, or recovery path changed.
- `internal_required` when implementation boundaries, data, security,
  operations, support investigation, failure modes, or environment behavior
  changed.
- `both_required` when the same change affects product use and internal
  behavior.
- `no_documentation_change` only after verifying that documented behavior,
  terminology, and operations remain accurate.
- `unable_to_verify` when missing context, hidden runtime configuration, or an
  ambiguous diff prevents a defensible decision.

## Common mistakes

- Treating a small diff as a small behavioral change.
- Updating only a changelog when a task guide is now wrong.
- Creating a new article because an existing one was not searched by source or
  terminology.
- Documenting implementation detail in a customer article.
- Declaring “no docs needed” from filenames alone.
- Creating docs for an unreleased or unreachable feature without recording its
  availability condition.
