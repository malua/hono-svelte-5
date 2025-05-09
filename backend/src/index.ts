import { router } from "@backend/router";
import { factory } from "@backend/lib/utils/factory";
import { errorMiddleware } from "@backend/services/error";
import { dbMiddleware } from "@backend/services/db";
import { authenticationMiddleware } from "@backend/services/auth/authentication-middleware";
import { authorizationMiddleware } from "@backend/services/auth/authorization-middleware";
import { cors } from "hono/cors";

const app = factory
  .createApp()
  .use(dbMiddleware)
  .use(
    "/api/*",
    cors({
      origin: ["https://tools.malua.dev"],
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  )
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .route("/api", router)
  .onError(errorMiddleware);

export default app;

export type AppType = typeof app;
