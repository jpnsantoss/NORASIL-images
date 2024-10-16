import { eq } from "drizzle-orm";
import db from '../config/database';
import { images } from '../config/schema';

export interface Image {
  id: number;
  filename: string;
  path: string;
  createdAt: Date;
}

export const ImageModel = {
  insert: async (image: Omit<Image, 'id' | 'createdAt'>) => {
    const result = await db.insert(images).values(image).returning();
    return result[0];
  },
  findAll: async () => {
    return await db.select().from(images);
  },
  findById: async (id: number) => {
    const result = await db.select().from(images).where(eq(images.id, id));
    return result[0];
  },
};