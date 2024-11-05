import { hc } from "hono/client";
import type { AppType } from "@backend/index";

export const { api } = hc<AppType>("/");
