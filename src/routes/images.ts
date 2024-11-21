import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { promises as fs } from "fs";
import { Hono } from "hono";
import { optimizeImage } from "../utils/imageOptimizer.ts";

config(); // Load environment variables

const prisma = new PrismaClient();
const router = new Hono();

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

router.post("/upload", async (c) => {
  const body = await c.req.parseBody();
  const file = body["image"];

  if (file && file instanceof File) {
    const buffer = await file.arrayBuffer();
    const filePath = `uploads/${Date.now()}-${file.name}`;
    await fs.writeFile(filePath, new Uint8Array(buffer));

    const optimizedPath = await optimizeImage(filePath);

    const image = await prisma.image.create({
      data: {
        url: optimizedPath,
      },
    });

    const fullUrl = `${baseUrl}/${optimizedPath}`;

    return c.json({
      message: "Image uploaded successfully",
      image: { ...image, url: fullUrl },
    });
  }

  return c.json({ message: "No file uploaded" }, 400);
});

export default router;
