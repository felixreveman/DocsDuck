# External documentation verification

Use this reference to decide whether customer-facing claims are safe to write.

## Evidence strength

### Strong

- Current automated tests exercise the visible workflow.
- Current route, UI, validation, and permission code agree.
- A connected product surface or authoritative current specification confirms
  behavior not represented in code.

### Supporting

- Existing documentation agrees with current implementation.
- Types, schemas, analytics events, translations, or API contracts support part
  of the workflow.
- Recent version history explains why the current behavior changed.

### Weak

- Comments, names, mockups, roadmap text, stale screenshots, or dead code.
- A route or component exists but no evidence shows that a customer can reach
  or use it.
- A likely outcome is inferred from a function name without following the
  executed path.

Weak evidence may guide investigation. It must not become a customer
instruction by itself.

## Claim states

- `verified`: current evidence directly supports the claim.
- `inferred`: evidence suggests the claim, but a material step or condition is
  missing.
- `conflicting`: current sources disagree.
- `unverified`: no adequate evidence was found.

Only verified claims belong in numbered customer instructions. Put unresolved
facts in the maintainer notes or completion report.

## Required checks by claim type

| Claim | Minimum evidence |
|---|---|
| Navigation path | Reachable route plus current navigation or entry control |
| Visible label | Current rendered copy, translation key/value, or UI test |
| Required field | Validation or schema behavior, not visual appearance alone |
| Permission | Authorization/role check on the executed path |
| Plan availability | Entitlement or feature-flag logic and relevant config |
| Success outcome | Mutation/handler result plus visible success behavior |
| Error recovery | Reachable error branch and customer-visible response |
| Timing | Explicit implementation, contract, or authoritative operational fact |

## Conflict handling

When sources disagree:

1. Identify version, environment, role, plan, and feature-flag differences.
2. Prefer current executable paths and tests over descriptive text.
3. Avoid merging mutually exclusive behaviors into one instruction.
4. Document variants only when their conditions are verified.
5. Request human confirmation when the difference changes customer action.

## Sensitive information

Never expose secrets, private endpoints, internal hostnames, customer data,
security bypasses, unpublished features, or exploit-enabling implementation
details. A source reference may be useful to maintainers without belonging in
the customer-visible article.
