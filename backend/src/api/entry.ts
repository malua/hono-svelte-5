import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as schema from "../services/db/schema";
import { nanoid } from "nanoid";
import { factory } from "@backend/lib/utils/factory";
import { eq, inArray } from "drizzle-orm";

const entrySchema = z.object({
  name: z.string().min(1, "Name is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
});

export type Entry = z.infer<typeof entrySchema>;

export const saveNewEntry = factory.createHandlers(
  zValidator("json", entrySchema),
  async (c) => {
    const data = c.req.valid("json");

    const newEntry = await c.var.db
      .insert(schema.entries)
      .values({
        id: nanoid(),
        name: data.name,
        websiteUrl: data.websiteUrl || "",
        githubUrl: data.githubUrl || "",
      })
      .returning()
      .get({
        with: {
          entryTags: true,
        },
      });

    const tags = await c.var.db
      .select()
      .from(schema.tags)
      .where(inArray(schema.tags.name, data.tags))
      .all();

    await c.var.db.insert(schema.entriesToTags).values(
      tags.map((tag) => ({
        entryId: newEntry.id,
        tagId: tag.id,
      })),
    );

    return c.json({ entry: newEntry }, 201);
  },
);

export const getAllEntries = factory.createHandlers(async (c) => {
  const allEntries = await c.var.db.query.entries.findMany({
    with: {
      entryTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  return c.json({ entries: allEntries });
});

export const getEntryById = factory.createHandlers(async (c) => {
  const requestId = c.req.param("id");

  if (!requestId) {
    return c.json({ error: "Invalid request ID" }, 400);
  }

  const entry = await c.var.db.query.entries.findFirst({
    with: {
      entryTags: {
        with: {
          tag: true,
        },
      },
    },
    where({ id }, { eq }) {
      return eq(id, requestId!);
    },
  });

  if (!entry) {
    return c.json({ error: "Entry not found" }, 404);
  }

  return c.json({ entry });
});

export const updateEntry = factory.createHandlers(
  zValidator("json", entrySchema),
  async (c) => {
    const requestId = c.req.param("id");
    const data = c.req.valid("json");

    const updatedEntry = await c.var.db
      .update(schema.entries)
      .set({
        name: data.name,
        websiteUrl: data.websiteUrl || "",
        githubUrl: data.githubUrl || "",
        updatedAt: new Date(),
      })
      .where(eq(schema.entries.id, requestId!))
      .returning();
  },
);

export const deleteEntry = factory.createHandlers(async (c) => {
  const requestId = c.req.param("id");

  if (!requestId) {
    return c.json({ error: "Invalid request ID" }, 400);
  }

  const deleted = await c.var.db
    .delete(schema.entries)
    .where(eq(schema.entries.id, requestId!))
    .returning({ id: schema.entries.id });

  if (deleted.length === 0) {
    return c.json({ error: "Entry not found" }, 404);
  }

  return c.json({ success: true });
});
