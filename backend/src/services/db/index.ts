import { drizzle } from "drizzle-orm/d1";
import { factory } from "@backend/lib/utils/factory";
import * as schema from "@backend/services/db/schema";

export type DB = ReturnType<typeof createDB>;

const createDB = (binding: D1Database) => {
  return drizzle(binding, { schema });
};

export const dbMiddleware = factory.createMiddleware((c, next) => {
  c.set("db", createDB(c.env.DB));
  return next();
});
