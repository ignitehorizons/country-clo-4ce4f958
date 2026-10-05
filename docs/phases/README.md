# Phase prompts

One file per phase of the CAM Violations build (`cam-violations-spec.md` §9), run in order. To run one, tell the builder:

> Run `docs/phases/phase-NN-name.md`. Follow `docs/architecture.md`. Stop and report if anything conflicts.

## File names

`phase-00-recon.md`, `phase-01-schema-rls.md`, `phase-02-rules-library.md`, … `phase-10-hardening.md`

## Template

```markdown
# Phase NN — Name

## Goal
One or two sentences.

## Read first
- docs/architecture.md
- docs/cam-violations-spec.md §…

## Do
1. …
2. …

## Do not
- Touch files outside the list below.
- Put keys in code (use Secrets + a server function).

## Files to create or change
- …

## Self-verification (paste the real output)
- Typecheck + build result
- SQL / JSON responses showing the change works
- Screenshot of the changed screen at phone and desktop width

## Done when
- …
```

After a phase is done, record its result and any decisions in `docs/decisions.md`.
