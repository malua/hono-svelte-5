import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

const date = (name: string) =>
  integer(name, { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

const id = text().primaryKey().notNull();
const createdAt = date("created_at");
const updatedAt = date("updated_at");

export const schemaUtils = { id, createdAt, updatedAt };
