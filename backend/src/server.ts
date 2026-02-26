import http from 'node:http';
import path from 'node:path';
import fs, { appendFile } from 'node:fs';
import express from 'express';
import cors from 'cors';
import { seedDB } from './db/seedDB.js';
//import { serveApp } from './utils/serveApp.ts';

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

app.get('/api', (req, res) => {
  res.json({message: "greetings from backend"});
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});