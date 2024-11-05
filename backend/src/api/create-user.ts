import { zValidator } from "@hono/zod-validator";
import { factory } from "@backend/lib/utils/factory";
import { gen } from "@backend/lib/utils/generator";
import { z } from "zod";
import * as schema from "@backend/services/db/schema";
import { fail } from "@backend/lib/utils/error";
const createUser = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      name: z.string().max(255).optional(),
      email: z.string().email().max(255),
    })
  ),
  async (c) => {
    const data = c.req.valid("json");
    const id = gen.id();
    const [res] = await c.var.db
      .insert(schema.users)
      .values({ ...data, id })
      .onConflictDoNothing()
      .returning();

    if (!res) throw fail(400, "User already exists");
    return c.json({ id });
  }
);

export { createUser };
