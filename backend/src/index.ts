import { router } from "@backend/router";
import { factory } from "@backend/lib/utils/factory";
import { errorHandler } from "@backend/lib/utils/error";
import { dbMiddleware } from "@backend/services/db";

const app = factory
  //
  .createApp()
  .onError(errorHandler)
  .use(dbMiddleware)
  .route("/api", router);

export default app;

export type AppType = typeof app;
