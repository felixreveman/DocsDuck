# Customer article format

Use the repository's established schema when one exists. Otherwise use this
format.

```md
---
docsduck_id: external-area-task
title: Complete a customer task
description: Learn how to complete the task and confirm the expected result.
category: Product area
audience:
  - customer
status: draft
verification_status: verified
sources:
  - path/to/relevant-page
  - path/to/relevant-test
---

# Complete a customer task

One or two sentences explaining when and why to use this workflow.

## Before you begin

- State required access, role, plan, setup, or information.

## Complete the task

1. Open **Exact product label**.
2. Select **Exact action label**.
3. Enter the required information.
4. Select **Save**.

State the verified result.

## Troubleshooting

### Visible problem or error

Explain the verified cause and recovery action.
```

## Metadata rules

- Make `docsduck_id` stable, lowercase, and independent of the file location.
- Do not change an existing `docsduck_id`.
- Use a specific title that starts with the customer goal.
- Keep the description distinct from the title.
- Set `status: draft` unless an actual review process provides another state.
- Use `verification_status: unable_to_verify` when material behavior remains
  unsupported.
- Use repository-relative source paths.
- Keep source paths in metadata or maintainer comments, not customer prose.
- Preserve additional frontmatter required by the project's publishing system.

## Writing rules

- Address the reader as “you” when useful.
- Use direct verbs such as **Open**, **Select**, **Enter**, and **Choose**.
- Preserve exact interface labels and bold them.
- Do not expose route paths unless customers see or need them.
- Avoid “simply,” “obviously,” “just,” and unsupported promises.
- Do not document every implementation branch; document the task.
- Prefer one goal per article.
- Explain variants only when their conditions are verified.

## Update rules

When updating:

- retain the stable ID and working links;
- preserve accurate editorial introductions and examples;
- modify only claims affected by evidence;
- remove a step only after confirming the workflow no longer requires it;
- set `verification_status` honestly when only part of the article was checked;
- avoid changing titles or slugs without a clear user or product reason.
