// Shared storage for the Spends Board on Netlify.
// Each expense is one blob in the "expenses" store, keyed by its id.
//   GET    /api/expenses       -> every expense
//   PUT    /api/expenses/:id   -> create or replace one expense
//   DELETE /api/expenses/:id   -> remove one expense
import { getStore } from "@netlify/blobs";

const ID = /^e[a-z0-9]{6,40}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_BYTES = 8000;

const json = (body, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

const isEntry = (d, id) =>
  d && typeof d === "object" && !Array.isArray(d) &&
  d.id === id &&
  typeof d.date === "string" && DATE.test(d.date) &&
  typeof d.vendor === "string" && d.vendor.trim() &&
  typeof d.category === "string" && d.category.trim() &&
  Number.isFinite(Number(d.amount));

export default async (req, context) => {
  const store = getStore({ name: "expenses", consistency: "strong" });
  const id = context.params.id;

  if (!id) {
    if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);
    const { blobs } = await store.list();
    const rows = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    return json(rows.filter(Boolean));
  }

  if (!ID.test(id)) return json({ error: "Bad expense id" }, 400);

  if (req.method === "PUT") {
    const text = await req.text();
    if (text.length > MAX_BYTES) return json({ error: "Entry too large" }, 413);
    let d;
    try { d = JSON.parse(text); } catch { return json({ error: "Bad JSON" }, 400); }
    if (!isEntry(d, id)) return json({ error: "Date, vendor, category and amount are needed" }, 400);
    await store.setJSON(id, d);
    return json(d);
  }

  if (req.method === "DELETE") {
    await store.delete(id);
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: ["/api/expenses", "/api/expenses/:id"] };
