# Documentation gate

Pass this gate before staging a commit.

## 1. Evidence

Confirm that the final implementation supports each new or changed
documentation claim. Use current code paths, tests, contracts, configuration,
and authoritative operational sources. Label or report inference and missing
environment knowledge.

## 2. Existing coverage

Search by:

- stable `docsduck_id`;
- source metadata;
- product labels and configuration keys;
- routes, events, APIs, components, and workflow names;
- related navigation/index pages.

Prefer focused updates to existing documents.

## 3. External quality

For customer-facing content, confirm:

- one coherent customer goal;
- exact visible labels;
- verified prerequisites and permissions;
- ordered steps backed by evidence;
- expected outcome;
- supported troubleshooting;
- no unnecessary implementation details.

## 4. Internal quality

For internal content, confirm:

- purpose, audience, and boundaries;
- components and state/data transitions;
- authentication and authorization behavior;
- dependencies and environment variants;
- handled and unhandled failure modes;
- observability and safe recovery when verified;
- known human-process or ownership gaps;
- no secrets or customer data.

## 5. Maintenance integrity

Confirm:

- stable IDs remain stable;
- source references resolve;
- renamed or removed concepts are not still documented as current;
- accurate human rationale and warnings are preserved;
- related indexes/navigation are updated when required;
- no duplicate `v2`, `new`, or `final` files were created.

## 6. Gate result

Return one:

- `pass_updated`: affected documentation is synchronized.
- `pass_no_change`: review proved existing documentation remains accurate.
- `blocked_evidence`: material behavior cannot be verified.
- `blocked_validation`: required repository validation failed.
- `blocked_scope`: unrelated or ambiguous changes prevent a safe commit.

Do not stage or commit while the result is blocked.
