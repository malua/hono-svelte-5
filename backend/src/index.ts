import { router } from "@backend/router";
import { factory } from "@backend/lib/utils/factory";
import { DBService } from "@backend/services/db";
import { errorHandler } from "@backend/lib/utils/error";

const app = factory
  //
  .createApp()
  .onError(errorHandler)
  .use(DBService.dbMiddleware)
  .route("/api", router);

export default app;

export type AppType = typeof app;
