# ANU Room Booking (student demo)

This is the ANU system I wish existed: a tiny, honest room-booking app. Pick a
fictional study room, give your name and a time, and it's booked — no login,
no approval workflow, no calendar sync. Bookings persist in SQLite on the
deployed machine's volume, so they survive a reload and a redeploy, and an
overlapping booking for the same room is rejected outright rather than
silently double-booked.

## What good looks like here

The brief was "build the ANU system you wish existed," not "build all of ANU's
room-booking system." Good here means the smallest version of that idea that's
actually trustworthy: a booking that's accepted is really held (checked against
every existing booking for that room, inside a transaction, not just against
what happened to be on screen when the form was filled in), and a booking that
survives a page reload also survives a server restart. That's the one
invariant I decided this app must never violate, and `src/lib/bookings.ts`'s
overlap check plus `spec/bookings.test.ts` are what keep it protected.

Deliberately out of scope: accounts, permissions, room-availability
calendars, email notifications, and recurring bookings. Each of those turns a
weekend prototype into a real product; none of them changes whether the core
promise — "booked means booked" — holds. `CLAUDE.md` records the working
rules that came out of this scoping decision, and `spec/` holds the checks
that enforce both the course's own harness (accessibility, README rendering,
HTTPS/CSRF) and this app's own behaviour (rooms and bookings).

Rooms are fictional demo data seeded at boot (`src/lib/seed.ts`) — "Nook 3B,"
"Pod 7," "Study Room 12" — not real ANU spaces, since this is a student
prototype, not an integration with ANU's actual booking systems.
