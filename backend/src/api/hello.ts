import { factory } from "@backend/lib/utils/factory";

const hello = factory.createHandlers(async (c) => {
  return c.text("Hello, Hono!");
});

export { hello };
