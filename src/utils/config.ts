import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

/** OpenAI config */
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!openaiKey) throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: openaiKey, 
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
if (!supabaseKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = import.meta.env.VITE_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, supabaseKey);