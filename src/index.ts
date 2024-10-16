import 'dotenv/config';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import imageRoutes from './routes/imageRoutes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', imageRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});