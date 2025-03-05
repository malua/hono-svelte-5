import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ErrorHandler } from "hono";
const fail = (
  code: ContentfulStatusCode,
  message: string,
  additionalData?: { res: Response; cause: Error }
) => new HTTPException(code, { message, ...additionalData });

const errorMiddleware: ErrorHandler = (err, c) => {
  console.info("error: ", err);
  if (err instanceof HTTPException) {
    const { status, message } = err;
    return c.json({ error: message }, { status });
  }
  return c.json({ error: "Internal Server Error" }, { status: 500 });
};
export { errorMiddleware, fail };
