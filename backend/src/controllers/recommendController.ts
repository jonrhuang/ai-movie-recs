import type { RequestHandler } from 'express';
import { queryAI } from '../utils/openai.js';

// response expected to be RecommendationData[]
export const recommendController: RequestHandler = async (req, res) => {
  try {
    const aiRec = await queryAI(req.body.answers)
    res.status(200).json({recommendation: aiRec})
  }
  catch (err) {
    res.status(500).json({error: 'Error querying AI'})
  }
}