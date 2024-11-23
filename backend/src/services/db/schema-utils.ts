import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

const id = text().primaryKey().notNull();
const createdAt = integer("created_at", { mode: "timestamp" })
  .default(sql`(unixepoch())`)
  .notNull();

const updatedAt = integer("updated_at", { mode: "timestamp" })
  .default(sql`(unixepoch())`)
  .notNull();

export const schemaUtils = { id, createdAt, updatedAt };
