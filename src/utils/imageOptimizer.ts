import { promises as fs } from "fs";
import sharp from "sharp";

const MAX_WIDTH = 1400;
const QUALITY = 90;

export const optimizeImage = async (filePath: string): Promise<string> => {
  const optimizedPath = filePath.replace(/\.[^/.]+$/, ".webp");

  // Get metadata to check the image dimensions
  const metadata = await sharp(filePath).metadata();

  const transformer = sharp(filePath)
    .toFormat("webp")
    .webp({ quality: QUALITY }); // Adjust quality as needed

  // Only resize if the width is greater than MAX_WIDTH pixels
  if (metadata.width && metadata.width > MAX_WIDTH) {
    transformer.resize(MAX_WIDTH); // Resize to a width of MAX_WIDTH pixels, maintaining aspect ratio
  }

  await transformer.toFile(optimizedPath);
  await fs.unlink(filePath); // Remove the original file

  return optimizedPath;
};
