import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function listModels() {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!API_KEY) {
    console.error('Error: API key is missing in environment variables.');
    return;
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
  const data = await res.json();

  console.log('Available models:', JSON.stringify(data, null, 2));
}

listModels();
