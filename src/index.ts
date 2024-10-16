import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from 'express';

const app = express();
const port = 8080;

const db = drizzle(process.env.DATABASE_URL!);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});