import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The schema is the ground truth for the database. To change it: edit here,
// run `pnpm db:generate` to turn the diff into a migration under drizzle/,
// and commit both — the migration applies automatically when the server
// boots (see src/lib/db.ts), locally and deployed. Never edit the database
// by hand: state on the deployed volume outlives every deploy, and the
// migration trail is what keeps old state and new code compatible.

// A small, fixed catalogue of bookable study/meeting rooms. Seeded once at
// boot (see src/lib/seed.ts); nothing here creates or removes rooms at
// runtime yet.
export const rooms = sqliteTable("rooms", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  location: text().notNull(),
  capacity: int().notNull(),
});

// One row per booking. startsAt/endsAt are ISO-8601-shaped "YYYY-MM-DDTHH:mm"
// strings with no timezone rather than SQLite's native datetime type, so they
// compare and sort correctly as plain text.
export const bookings = sqliteTable("bookings", {
  id: int().primaryKey({ autoIncrement: true }),
  roomId: int("room_id")
    .notNull()
    .references(() => rooms.id),
  bookedBy: text("booked_by").notNull(),
  startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
