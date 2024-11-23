import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { schemaUtils } from "@backend/services/db/schema-utils";
import { relations } from "drizzle-orm";

const { createdAt, id, updatedAt } = schemaUtils;

const users = sqliteTable("user", {
  id,
  name: text().notNull().notNull().default(""),
  email: text().notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  createdAt,
});

const posts = sqliteTable("post", {
  id,
  title: text().notNull(),
  description: text().notNull().default(""),
  content: text().notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  likes: integer().default(0),
  createdAt,
  updatedAt,
});

const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

const postRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export { postRelations, posts, userRelations, users };
