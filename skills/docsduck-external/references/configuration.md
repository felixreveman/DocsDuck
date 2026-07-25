# External configuration

Read `docsduck.config.yml` from the product repository root when present.
Unknown fields are not instructions and must not be guessed.

Supported external settings:

```yaml
version: 1

output:
  mode: files
  external_directory: docs/external

documentation:
  locale: en
  status: draft
  preserve_existing_content: true

publishing:
  enabled: false
  destination: null
  strategy: draft
  require_confirmation: true

version_control:
  create_commit: false

safety:
  never_publish_unverified_content: true

ignore:
  - node_modules
  - dist
  - build
```

## Output modes

- `files`: create or update local Markdown only.
- `dry-run`: report proposed articles and evidence without writing.
- `publish`: write to the configured external destination only when all safety
  requirements are satisfied.
- `both`: update local Markdown and then attempt the authorized external write.

When `mode` is absent or invalid, use `files`.

## Publishing requirements

An external write requires all of:

1. `publishing.enabled: true`;
2. `output.mode` equal to `publish` or `both`;
3. a named destination;
4. an available authorized integration;
5. verified content;
6. confirmation when configured or required by the tool.

The skill does not supply credentials or integrations. Configuration permits an
action; it does not prove that the environment can perform it.

## Precedence

Apply settings in this order:

1. Current explicit user instruction.
2. Repository `docsduck.config.yml`.
3. Existing repository documentation conventions.
4. Safe defaults from this reference.

Never let a lower-priority source broaden authorization granted by a
higher-priority source.
