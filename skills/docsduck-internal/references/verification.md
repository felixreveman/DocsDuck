# Internal documentation verification

Use this reference to classify technical and operational claims.

## Claim states

- `verified`: current executable evidence or an authoritative current
  operational source directly supports the claim.
- `inferred`: multiple facts support the explanation, but a boundary or runtime
  condition is not observable.
- `environment_specific`: behavior depends on deployment configuration,
  infrastructure, provider settings, or feature flags.
- `conflicting`: current sources disagree.
- `unknown`: the repository and available systems do not establish the fact.

Label material non-verified claims in the document. Do not hide them in source
comments.

## Evidence hierarchy

Prefer a combination of:

1. current executed code paths;
2. tests for success, failure, permission, and retry behavior;
3. schemas, contracts, and infrastructure definitions;
4. current observable configuration without secret values;
5. authoritative operational systems or maintained runbooks;
6. existing prose, comments, diagrams, names, and history.

Items near the bottom are useful context but may be stale. A test can also be
stale or incomplete; compare it with implementation.

## Minimum checks

| Claim | Required investigation |
|---|---|
| Authentication | Credential/session creation, validation, expiry, and revocation paths |
| Authorization | Executed policy or role checks at the protected boundary |
| Tenant isolation | Query scoping, ownership validation, and privileged bypasses |
| Data write | Validation, transaction/state mutation, side effects, and failure behavior |
| Async processing | Enqueue, consumer, retry, idempotency, dead-letter/final failure |
| Integration | Request contract, auth mechanism without secret values, response/error handling |
| Cache | Key, scope, invalidation, fallback, and consistency implications |
| Deletion | Soft/hard delete behavior, cascades, retention, external cleanup |
| Runbook action | Preconditions, command/tool availability, expected result, rollback/escalation |
| Ownership/SLA | Current authoritative organizational source or explicit human confirmation |

## High-risk rules

For security, billing, deletion, compliance, and production recovery:

- cite the strongest available evidence;
- state coverage gaps near the relevant instruction;
- do not recommend executing a destructive recovery action without verified
  target resolution and authorization;
- never infer compliance status or contractual guarantees from code;
- never expose secret values, private customer data, or bypass procedures.

## Conflicts and missing information

When implementation and documentation disagree, describe both and identify the
current executed path. When behavior depends on inaccessible infrastructure or
human process, state exactly what must be confirmed and by which role if that
role is known.
