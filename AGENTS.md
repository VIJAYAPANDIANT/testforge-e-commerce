<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Store is frontend-only: catalog in `src/data`, pure logic in `src/utils`, shared state in `src/context` (auth and cart kept separate) — keeps behavior deterministic for automated tests.
- Every interactive/assertable element keeps a stable `data-testid`; never rename existing ones — external TestForge suites depend on them.
