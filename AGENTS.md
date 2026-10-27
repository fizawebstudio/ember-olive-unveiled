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
- Form submissions go through the `submitForm` server function (src/lib/forms.functions.ts), which saves via the admin client and emails the owner via the Resend connector — keeps keys server-side and tables closed to the public.
- Owner notification address lives in the `site_settings` row editable at /admin; first signed-up account becomes admin via trigger — lets the owner change it without code.
- Inner-page header photography is selected centrally by PageHero's page identity, with a shared semantic overlay token — keeps each page distinct and consistently readable.
- The story rhythm carousel uses a dedicated component with pointer dragging, touch scrolling, and accessible navigation — isolates carousel interaction from page content.
