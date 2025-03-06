import { factory } from "@backend/lib/utils/factory";

export const hello = factory.createHandlers(async (c) => {
  return c.text("Hello, Hono!");
});
