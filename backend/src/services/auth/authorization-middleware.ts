import { factory } from "@backend/lib/utils/factory";
import { Context } from "@backend/lib/types/app";

type Exposer = (c: Context) => boolean;

const exposers: Exposer[] = [
    //
    (c) => !!c.var.user?.isAdmin,
    (c) => c.req.path === "/api/sign-in" && c.req.method === "POST",
];

export const authorizationMiddleware = factory.createMiddleware(
    async (c, next) => {
        if (exposers.some((exposer) => exposer(c))) return next();
        if (!c.var.user) return c.redirect("/sign-in");
        return new Response("Unauthorized", { status: 401 });
    },
);
