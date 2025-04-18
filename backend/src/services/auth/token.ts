import { Context, EnvUser } from "@backend/lib/types/app";
import { gen } from "@backend/lib/utils/generator";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const tokenActions = {
  async create(jwt: JWTPayload & { user: NonNullable<EnvUser> }, c: Context) {
    if (!c.env.JWT_SECRET)
      throw new Error("Please add JWT_SECRET to your .dev.vars file");
    return await sign(jwt, c.env.JWT_SECRET, "HS256");
  },

  async verify(token: string, c: Context) {
    if (!c.env.JWT_SECRET)
      throw new Error("Please add JWT_SECRET to your .dev.vars file");
    try {
      const jwt = await verify(token, c.env.JWT_SECRET, "HS256");
      return jwt as JWTPayload & { user: NonNullable<EnvUser> };
    } catch {
      throw new Error("Invalid or expired token");
    }
  },

  saveToCookie(token: string, c: Context) {
    setCookie(c, "access-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(gen.x_hours_from_now_in_ms(1)),
    });
  },
  saveUserToCookie(user: EnvUser, c: Context) {
    setCookie(c, "user-data", encodeURI(JSON.stringify(user)), {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(gen.x_hours_from_now_in_ms(1)),
    });
  },
  async loadFromCookie(c: Context) {
    const tokenCookie = getCookie(c, "access-token");
    if (!tokenCookie) {
      throw new Error("No token found in cookie");
    }
    return await tokenActions.verify(tokenCookie, c);
  },
  delete(c: Context) {
    deleteCookie(c, "access-token");
    deleteCookie(c, "user-data");
  },
};
