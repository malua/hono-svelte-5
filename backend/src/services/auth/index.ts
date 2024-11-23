import { passwordActions } from "@backend/services/auth/password";
import { tokenActions } from "@backend/services/auth/token";

export const auth = {
  password: passwordActions,
  token: tokenActions,
};
