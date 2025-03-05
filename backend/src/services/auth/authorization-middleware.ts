import { factory } from "@backend/lib/utils/factory";
import { Context } from "@backend/lib/types/app";
import { fail } from "../error";

type Exposer = (c: Context) => boolean;

const exposers: Exposer[] = [
  //
  (c) => !!c.var.user?.isAdmin,
  (c) => c.req.path === "/api/user/signIn" && c.req.method === "POST",
  (c) => c.req.path === "/api/user/signUp" && c.req.method === "POST",
];

export const authorizationMiddleware = factory.createMiddleware(
  async (c, next) => {
    if (!exposers.some((exposer) => exposer(c))) {
      throw fail(401, "Unauthorized");
    }

    await next();
  }
);
