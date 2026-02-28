import express from 'express'
import { recommendController } from '../controllers/recommendController.js';

export const recommendRouter = express.Router();

recommendRouter.post('/', recommendController);