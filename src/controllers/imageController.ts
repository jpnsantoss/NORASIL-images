import { Request, Response } from 'express';
import { ImageService } from '../services/imageService';

export const ImageController = {
  uploadImage: async (req: Request, res: Response) => {
    const { filename, path } = req.body;
    const image = await ImageService.createImage(filename, path);
    res.status(201).json(image);
  },
  getAllImages: async (req: Request, res: Response) => {
    const images = await ImageService.getAllImages();
    res.status(200).json(images);
  },
  getImageById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const image = await ImageService.getImageById(Number(id));
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  },
};