import { factory } from "@backend/lib/utils/factory";
import { Context } from "@backend/lib/types/app";
import { fail } from "../error";

type Exposer = (c: Context) => boolean;

const checkMethod = (method: string) => (c: Context) =>
  c.req.method === method || c.req.method === "OPTIONS";

const exposers: Exposer[] = [
  (c) => !!c.var.user?.id,
  (c) => c.req.path === "/api/user/signIn" && checkMethod("POST")(c),
  (c) => c.req.path === "/api/user/signUp" && checkMethod("POST")(c),
  (c) => c.req.path === "/api/user/signOut" && checkMethod("POST")(c),
  (c) => c.req.path === "/api/tag/list" && checkMethod("GET")(c),
  (c) => c.req.path === "/api/entry/list" && checkMethod("GET")(c),
];

export const authorizationMiddleware = factory.createMiddleware(
  async (c, next) => {
    if (!exposers.some((exposer) => exposer(c))) {
      throw fail(401, "Unauthorized");
    }

    console.log("NEXTs");
    await next();
  },
);
