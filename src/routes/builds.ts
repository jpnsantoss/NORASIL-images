import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { promises as fs } from "fs";
import { Hono } from "hono";

config(); // Load environment variables

const prisma = new PrismaClient();
const router = new Hono();

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// Fetch all images from a build
router.get("/builds/:id", async (c) => {
  const buildId = c.req.param("id");
  const images = await prisma.image.findMany({
    where: { buildId },
  });

  const imagesWithFullUrl = images.map((image) => ({
    ...image,
    url: `${baseUrl}/${image.url}`,
  }));

  return c.json(imagesWithFullUrl);
});

// Delete all images of a build
router.delete("/builds/:id", async (c) => {
  const buildId = c.req.param("id");
  const images = await prisma.image.findMany({
    where: { buildId },
  });

  if (images.length > 0) {
    await prisma.image.deleteMany({
      where: { buildId },
    });

    for (const image of images) {
      await fs.unlink(image.url);
    }

    return c.json({ message: "All images of the build deleted successfully" });
  }

  return c.json({ message: "No images found for the build" }, 404);
});

export default router;
