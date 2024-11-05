import { Hono } from "hono";
import { hello } from "@backend/api/hello";
import { createUser } from "./api/create-user";

export const router = new Hono()
  //
  .get("/hello", ...hello)
  .post("/user", ...createUser);
