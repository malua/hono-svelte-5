import { Hono } from "hono";
import { hello } from "@backend/api/hello";
import { signUp } from "@backend/api/sighn-up";
import { signIn } from "@backend/api/sign-in";

export const router = new Hono()
  //
  .get("/hello", ...hello)
  .post("/user/signUp", ...signUp)
  .post("/user/signIn", ...signIn);
