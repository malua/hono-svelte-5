import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

const id = text().primaryKey().notNull();
const createdAt = int("created_at", { mode: "timestamp" })
  .default(sql`current_timestamp`)
  .notNull();
export const updatedAt = int("updated_at", { mode: "timestamp" })
  .default(sql`current_timestamp`)
  .notNull();

export const users = sqliteTable("user", {
  id,
  name: text().notNull().notNull().default(""),
  email: text().notNull().unique(),
  hashedPassword: text().notNull(),
  isAdmin: integer({ mode: "boolean" }).notNull().default(false),
  createdAt,
});
export const posts = sqliteTable("post", {
  id,
  title: text().notNull(),
  description: text().notNull().default(""),
  content: text().notNull(),
  authorId: text()
    .notNull()
    .references(() => users.id),
  likes: integer().default(0),
  createdAt,
  updatedAt,
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
