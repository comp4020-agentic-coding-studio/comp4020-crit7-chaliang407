import type { APIRoute } from "astro";
import { db } from "../../lib/db";
import { rooms } from "../../lib/schema";

// The seeded, fixed catalogue of demo rooms as JSON.
export const GET: APIRoute = async () => {
  const all = db.select().from(rooms).all();
  return new Response(JSON.stringify(all), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
