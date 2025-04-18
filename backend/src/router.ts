import { Hono } from "hono";
import { signUp } from "@backend/api/sign-up";
import { signIn } from "@backend/api/sign-in";
import { signOut } from "./api/sign-out";

import { getAllTags, saveNewTag } from "./api/tag";
import {
  deleteEntry,
  getAllEntries,
  getEntryById,
  saveNewEntry,
  updateEntry,
} from "./api/entry";

export const router = new Hono()
  .post("/user/signUp", ...signUp)
  .post("/user/signOut", ...signOut)
  .post("/user/signIn", ...signIn)
  .post("/entry/add", ...saveNewEntry)
  .get("/entry/list", ...getAllEntries)
  .get("/entry/search", ...getEntryById)
  .put("/entry/update/:id", ...updateEntry)
  .delete("/entry/delete/:id", ...deleteEntry)
  .post("/tag/add", ...saveNewTag)
  .get("/tag/list", ...getAllTags);
