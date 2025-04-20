import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/services/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/72e539ebcfbe5638569740ca360ca7fe647a30c46f06919442af7b9cbfc99e49.sqlite",
  },
});
