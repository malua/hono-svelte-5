import { z } from "zod";
export const validators = {
  name: () => z.string().max(255),
  email: () => z.string().email().max(255),
  password: () => z.string().min(8).max(255),
};
