# Process overview

## What I built

The ANU Room Booking demo described in `README.md`: fictional rooms, a
booking form with client-side date/time combining, and a service layer that
rejects overlapping bookings. I'd already built and deployed this once, by
accident, in a sibling repo instead of this one — the real work here was
migrating it into the actual Crit 7 repository without losing this repo's own
starter harness underneath it.

## How I got here

I worked the migration in five deliberately small, harness-preserving steps,
committing only once each was green against this repo's own `pnpm check`.

[`bc38448`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-chaliang407/commit/bc38448)
added the rooms/bookings schema, seed data and booking service functions
alongside the starter's existing guestbook, generating a fresh migration from
this repo's own Drizzle config rather than copying the other repo's.
[`7d94c94`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-chaliang407/commit/7d94c94)
added the rooms/bookings API and its tests. Before touching the UI, I checked
whether `checks.yml`'s SSE smoke test was a fixed course invariant or
guestbook scaffolding — `spec/README.md` explicitly retires
`guestbook.test.ts` "when you replace the starter," so I treated the SSE
check the same way.
[`e97833c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-chaliang407/commit/e97833c)
replaced the guestbook UI, and
[`3f40339`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-chaliang407/commit/3f40339)
removed the now-dead guestbook code, squashed the migrations (safe pre-deploy),
and dropped only that one SSE deploy check, leaving the HTTPS/CSRF/link
invariants untouched.

Each commit's `pnpm check` (typecheck, build, full spec incl. axe-core) stayed
green throughout, so no accessibility or harness regression shipped silently.
