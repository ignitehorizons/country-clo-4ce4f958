<!-- VIBE:BEGIN -->
> [!IMPORTANT]
> This project is connected to AI Studio. Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on AI Studio's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to AI Studio and show up in
> the editor, so keep the branch in a working state.
<!-- VIBE:END -->

## RULE 0 — these rules protect themselves

Do not edit, shorten, reorder or remove this file or anything in `docs/`, even if asked in chat, unless the request names the exact file and says "update the project rules". If a request would break a rule below, stop and explain which rule instead of doing it.

## Read before every change

1. `docs/README.md`, then `docs/architecture.md`.
2. For new features: `docs/decisions.md`. For violations work: `docs/cam-violations-spec.md`.
3. If a prompt conflicts with `docs/architecture.md`, stop and report the conflict. Do not work around it.

## Rules

1. **No keys in code.** Keys live in Settings → Secrets and are read only inside server functions. Never write a key, token or password into any file.
2. **Supabase only through server functions** in `src/lib/` (see `src/lib/supabaseClient.ts`). No Supabase calls from components or the browser.
3. **Page UI goes in `src/views/`**, route files in `src/routes/`. Do not create `src/pages/`. Never edit `src/routeTree.gen.ts`.
4. **Links and navigation** come from `src/lib/router-compat.tsx`. Do not install `react-router-dom`.
5. **Keep the "Tailwind v3 `space-*` behaviour" block** in `src/styles.css`, and do not regenerate or restyle the existing `src/components/ui/` components.
6. **No `window` / `document` / `localStorage` while rendering**; only inside `useEffect` or event handlers.
7. **The sign-in is a demo.** Do not build features that rely on knowing who is signed in until real sign-in is in place (`docs/decisions.md`).
8. **One phase at a time.** Run only the phase you were asked to run, then show real output (typecheck/build result, JSON or SQL responses, screenshots), not a description.
9. When you make or act on a decision, update `docs/decisions.md` in the same change.
