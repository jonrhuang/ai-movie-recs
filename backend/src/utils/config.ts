import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

/** OpenAI config */
const openaiKey = process.env.OPENAI_API_KEY;
if (!openaiKey) throw new Error('OpenAI API key is missing or invalid.');
export const openai = new OpenAI({
  apiKey: openaiKey, 
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const supabaseKey = process.env.SUPABASE_API_KEY;
if (!supabaseKey) throw new Error('Supabase API key is missing or invalid.');
const url = process.env.SUPABASE_URL;
if (!url) throw new Error('Supabase Url is missing or invalid');
export const supabase = createClient(url, supabaseKey);