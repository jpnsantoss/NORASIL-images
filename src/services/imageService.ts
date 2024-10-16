import { ImageModel } from '../models/imageModel';

export const ImageService = {
  createImage: async (filename: string, path: string) => {
    return await ImageModel.insert({ filename, path });
  },
  getAllImages: async () => {
    return await ImageModel.findAll();
  },
  getImageById: async (id: number) => {
    return await ImageModel.findById(id);
  },
};