import { zValidator } from "@hono/zod-validator";
import { factory } from "@backend/lib/utils/factory";
import { gen } from "@backend/lib/utils/generator";
import { z } from "zod";
import * as schema from "@backend/services/db/schema";
import { auth } from "@backend/services/auth";

const createUser = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      name: z.string().max(255).optional(),
      email: z.string().email().max(255),
      password: z.string().min(8).max(255),
    }),
  ),
  async (c) => {
    const requestPayload = c.req.valid("json");

    const existingUser = await c.var.db.query.users.findFirst({
      where({ email }, { eq }) {
        return eq(email, requestPayload.email);
      },
    });
    if (existingUser) return c.json({ error: "User already exists" }, 400);

    const id = gen.id();
    const passwordHash = await auth.password.hash(requestPayload.password);
    const [userData] = await c.var.db
      .insert(schema.users)
      .values({
        id,
        email: requestPayload.email,
        hashedPassword: passwordHash,
        name: requestPayload.name,
      })
      .returning();

    const jwtAccessPayload = {
      exp: gen.x_hours_from_now_in_sec(1),
      ...userData,
      hashedPassword: undefined,
    };

    const accessToken = await auth.token.create(jwtAccessPayload, c);
    auth.token.saveToCookie(accessToken, c);
    return c.json({ id });
  },
);

export { createUser };
