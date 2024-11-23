import { Context } from "hono";
import { DB } from "@backend/services/db";
import { User } from "@backend/services/db/schema";
import { StatusCode } from "hono/utils/http-status";

type EnvUser = Omit<User, "hashedPassword"> | null;

interface Env {
  Bindings: WorkerEnv & {};
  Variables: {
    db: DB;
    user: EnvUser;
  };
}

type Context = Context<Env>;
