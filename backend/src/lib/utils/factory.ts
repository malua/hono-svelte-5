import { createFactory } from "hono/factory";
import { Env } from "@backend/lib/types/app";

export const factory = createFactory<Env>();
