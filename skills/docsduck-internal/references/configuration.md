# Internal configuration

Read `docsduck.config.yml` from the product repository root when present.
Ignore unknown fields rather than inventing their meaning.

Supported internal settings:

```yaml
version: 1

output:
  mode: files
  internal_directory: docs/internal

documentation:
  status: draft
  preserve_existing_content: true
  source_references: true

publishing:
  enabled: false
  destination: null
  strategy: draft
  require_confirmation: true

version_control:
  create_commit: false

safety:
  redact_sensitive_values: true
  require_review_for_runbooks: true

ignore:
  - node_modules
  - dist
  - build
```

## Output modes

- `files`: create or update local Markdown only.
- `dry-run`: return an inventory, proposed document changes, and evidence gaps.
- `publish`: write to the configured internal destination only when authorized.
- `both`: update local Markdown and then attempt authorized synchronization.

When the mode is missing or invalid, use `files`.

## External destination requirements

Publishing requires:

1. `publishing.enabled: true`;
2. `output.mode` equal to `publish` or `both`;
3. a configured destination;
4. an available authorized integration;
5. content suitable for that destination;
6. required confirmation.

Configuration never supplies credentials and never proves authorization.

## Precedence

Apply:

1. Current explicit user instruction.
2. Repository configuration.
3. Existing internal documentation conventions.
4. Safe defaults in this reference.

Lower-priority settings cannot authorize a broader action than the user
requested or the environment permits.
