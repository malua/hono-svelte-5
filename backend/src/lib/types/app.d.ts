import { Context } from "hono";
import { DB } from "@backend/services/db";
import { User } from "@backend/services/db/schema";
import { StatusCode } from "hono/utils/http-status";

interface Env {
  Bindings: WorkerEnv & {};
  Variables: {
    db: DB;
    user: User;
  };
}

type Context = Context<Env>;
