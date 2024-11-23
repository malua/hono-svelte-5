import { auth } from "@backend/services/auth";
import { factory } from "@backend/lib/utils/factory";
import { gen } from "@backend/lib/utils/generator";
import { validators } from "@backend/lib/utils/validators";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const login = factory.createHandlers(
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
            return c.json({ error: "Invalid email or password" }, 401);
        }

        const validPassword = await auth.password.verify(
            requestPayload.password,
            userData.hashedPassword,
        );

        if (!validPassword) {
            return c.json({ error: "Invalid email or password" }, 401);
        }

        const jwtAccessPayload = {
            exp: gen.x_hours_from_now_in_sec(1),
            ...userData,
            hashedPassword: undefined,
        };
        const accessToken = await auth.token.create(jwtAccessPayload, c);
        auth.token.saveToCookie(accessToken, c);
        return c.json({ success: true });
    },
);
