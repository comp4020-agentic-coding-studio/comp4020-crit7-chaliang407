# Working rules for this repo

This is the Crit 7 assignment repo (`comp4020-crit7-chaliang407`): the ANU
Room Booking demo described in `README.md`. These are the rules I actually
held the agent to while migrating and building it, not aspirational ones.

## Scope and process

- Small, explicitly-scoped commits over one big one. Each commit should be a
  complete, independently-checkable step (schema, then API, then UI, then
  cleanup, then docs) — not a snapshot of wherever work happened to stop.
- Run `pnpm check` (typecheck + build + full spec) before every commit.
  Never commit on red.
- Never commit, push, deploy, or change repository visibility without being
  explicitly told to for that specific action. An earlier approval doesn't
  carry forward to a new one.
- If a change would require weakening a permanent course invariant (the
  accessibility floor, README rendering, HTTPS/CSRF checks) to pass, stop and
  say so instead of working around it.

## This repo's own conventions

- Database schema lives in `src/lib/schema.ts`; changing it means editing
  that file, running `pnpm db:generate`, and committing the migration it
  writes under `drizzle/` alongside the schema change — never editing a
  migration file by hand, and never copying one from elsewhere.
- `DATABASE_PATH` (not `DB_PATH`) is this repo's env convention, matching
  `fly.toml`; keep API and page code consistent with it.
- `spec/*.test.ts` drives the *running, built* app over HTTP
  (`spec/global-setup.ts` boots `dist/server/entry.mjs`) — a spec change
  needs a rebuild to take effect, which `pnpm test` does automatically.
- `reflections/crit-7.md` is this crit's reflection; don't create
  `crit-8.md`/`crit-9.md`/`crit-10.md` — those belong to the final-project
  repo, not this one.
