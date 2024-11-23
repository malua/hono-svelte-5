import { Argon2id } from "oslo/password";

const argon2id = new Argon2id();

export const passwordActions = {
  async hash(password: string): Promise<string> {
    return await argon2id.hash(password);
  },

  async verify(password: string, storedHash: string): Promise<boolean> {
    return await argon2id.verify(storedHash, password);
  },
};
