import express from 'express';
import {getTest} from '../controllers/testController.js';

export const testRouter = express.Router()

testRouter.get('/', getTest) 