import { drizzle } from "drizzle-orm/d1";
import { factory } from "@backend/lib/utils/factory";
import schema from "@backend/services/db/schema";
export type DB = ReturnType<typeof createDB>;

const createDB = (binding: D1Database) => {
  return drizzle(binding, { schema });
};

const dbMiddleware = factory.createMiddleware((c, next) => {
  c.set("db", createDB(c.env.DB));
  return next();
});

export const DBService = {
  dbMiddleware,
};
