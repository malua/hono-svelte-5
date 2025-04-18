import { auth } from "@backend/services/auth";
import { factory } from "@backend/lib/utils/factory";
import { gen } from "@backend/lib/utils/generator";
import { validators } from "@backend/lib/utils/validators";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { fail } from "@backend/services/error";

export const signIn = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      email: validators.email(),
      password: validators.password(),
    }),
  ),
  async (c) => {
    const requestPayload = c.req.valid("json");

    const userData = await c.var.db.query.users.findFirst({
      where({ email }, { eq }) {
        return eq(email, requestPayload.email);
      },
    });

    if (!userData) {
      throw fail(401, "Invalid email or password");
    }
    const { hashedPassword, ...publicUserData } = userData;
    const validPassword = await auth.password.verify(
      requestPayload.password,
      userData.hashedPassword,
    );

    if (!validPassword) {
      throw fail(401, "Invalid email or password");
    }
    const accessTokenPayload = {
      exp: gen.x_hours_from_now_in_sec(1),
      user: publicUserData,
    };
    const accessToken = await auth.token.create(accessTokenPayload, c);
    auth.token.saveUserToCookie(publicUserData, c);
    auth.token.saveToCookie(accessToken, c);
    return c.json(null);
  },
);
