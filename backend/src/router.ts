import { Hono } from "hono";
import { hello } from "@backend/api/hello";
import { signUp } from "@backend/api/sign-up";
import { signIn } from "@backend/api/sign-in";
import { signOut } from "./api/sign-out";

export const router = new Hono()
  //
  .get("/hello", ...hello)
  .post("/user/signUp", ...signUp)
  .post("/user/signOut", ...signOut)
  .post("/user/signIn", ...signIn);
