// src/controllers/imageController.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ImageService } from '../services/imageService';

const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const ImageController = {
  uploadImage: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      const { filename } = req.file;
      const filePath = path.join(uploadDir, filename);

      const image = await ImageService.createImage(filename, filePath);
      res.status(201).json(image);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getAllImages: async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await ImageService.getAllImages();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getImageById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const image = await ImageService.getImageById(Number(id));
      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  serveImage: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const image = await ImageService.getImageById(Number(id));
      if (image) {
        res.sendFile(image.path);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};