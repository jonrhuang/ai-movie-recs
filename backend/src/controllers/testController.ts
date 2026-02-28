import type { RequestHandler } from "express";

export const getTest: RequestHandler = (_req, res) => {
  res.json({message: 'Hello from backend'});
}