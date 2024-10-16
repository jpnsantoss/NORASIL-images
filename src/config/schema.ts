import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  path: text('path').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});