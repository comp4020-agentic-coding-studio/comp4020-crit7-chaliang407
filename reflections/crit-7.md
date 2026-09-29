# Crit 7 reflection

**What was the breakthrough that moved the work forward?**

I'd built the whole ANU Room Booking app before this crit even started — just
in the wrong repository. The breakthrough wasn't a coding insight, it was
realising that "the app works" and "the submission is correct" are two
different claims, and only the second one is gradeable. The actual work of
this crit was untangling what the finished app assumed about its environment
(a looser three-crit harness, a different `DATABASE_PATH` convention, no
accessibility floor) from what it actually needed to keep, then rebuilding it
inside this repo's own starter in five commits I could each verify
independently against `pnpm check`. Treating the working app as a reference
to port from, rather than a thing to copy wholesale, is what let me catch a
real bug in it along the way — a "CSRF fix" in the original that was actually
sidestepping the check with a content-type header, not fixing it — instead of
carrying that bug forward.

**What did this work change about who I want to be as a software developer?**

It sharpened my sense that a repo's harness — its CI, its test config, its
conventions — is part of the deliverable, not scaffolding around it. It's easy
to treat "does the feature work" as the whole job when you're heads-down
building; this crit forced me to also ask "does it work *here*, under *these*
rules," and to notice when the two questions have different answers before
shipping anything.
