import express from 'express';
import cors from 'cors';
import { seedDB } from './db/seedDB.js';
import { testRouter } from './routes/test.js';
import { recommendRouter } from './routes/recommend.js';

const PORT = 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

const app = express();

try {
  await seedDB();
} 
catch (err) {
  throw new Error('Failed to seed database');
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

app.use('/test', testRouter);

app.use('/recommend', recommendRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});