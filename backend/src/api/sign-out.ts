import { factory } from "@backend/lib/utils/factory";
import { auth } from "@backend/services/auth";

export const signOut = factory.createHandlers(async (c) => {
  auth.token.delete(c);
  return c.json(null);
});
