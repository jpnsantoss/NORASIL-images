// src/routes/imageRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { ImageController } from '../controllers/imageController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), ImageController.uploadImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImageById);
router.get('/images/:id/file', ImageController.serveImage);

export default router;