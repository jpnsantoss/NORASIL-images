import { Router } from 'express';
import { ImageController } from '../controllers/imageController';

const router = Router();

router.post('/upload', ImageController.uploadImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImageById);

export default router;