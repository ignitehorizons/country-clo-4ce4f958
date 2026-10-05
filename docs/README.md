# CountryClose — build docs

Read these before changing anything in this project. They describe how the code is built today and what is being built next.

| File | What it is | When to read it |
|---|---|---|
| `architecture.md` | How this codebase works: routes, pages, data access, secrets, styling rules | Before **every** change |
| `decisions.md` | Decisions that are locked, and decisions still open | Before starting any new feature |
| `project-record.md` | Product overview, backend, security decisions, design system, risks | When planning a feature |
| `cam-violations-spec.md` | CAM Violations module spec v1 (approved Oct 3, 2026) | Before any violations-module work |
| `phases/` | One file per build-phase prompt, run in order | When running a phase |

## How to work in this project

- One phase at a time. Run a prompt from `phases/`, then check its self-verification output before moving on.
- If a prompt conflicts with `architecture.md`, `architecture.md` wins. Stop and ask instead of working around it.
- Keep these docs current: when a decision is made, update `decisions.md` in the same change.
- Never put keys, tokens, or passwords in any file. They live in Settings → Secrets.
