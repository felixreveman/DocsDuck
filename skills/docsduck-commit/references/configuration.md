# DocsDuck Commit configuration

Read `docsduck.config.yml` from the repository root when present. Unknown fields
do not grant permission and must not be guessed.

Supported DocsDuck Commit settings:

```yaml
version_control:
  create_commit: false
  documentation_gate: required
  stage_documentation_with_code: true
  push: false
  allow_default_branch_push: false
  commit_message_style: repository
```

## Behavior

- `create_commit`: permits a local commit only when the user also explicitly
  requests a commit. Configuration alone is not authorization.
- `documentation_gate`: `required` blocks commits on an unresolved gate;
  `report` allows DocsDuck Commit to report impact without preparing a commit.
- `stage_documentation_with_code`: include required documentation in the same
  commit as its implementation.
- `push`: permits a push only when the user explicitly requests it.
- `allow_default_branch_push`: still requires an explicit request naming the
  default branch.
- `commit_message_style`: use `repository` for detected conventions or a
  project-defined style such as `conventional`.

## Precedence

Apply:

1. Current explicit user instruction.
2. Repository instructions and safety requirements.
3. `docsduck.config.yml`.
4. Safe defaults in this reference.

No configuration value can authorize a remote write, force-push, merge, release,
or destructive history change without a current explicit user request.
