// app/api/translate/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.geminiAPIKEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const { signs } = await req.json();
    
    // Prepare the prompt for Gemini
    const prompt = `Translate the following sequence of ASL signs into a natural English sentence: ${signs.join(' ')}`;

    // Generate content with the Gemini model
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const translation = response.text();
    console.log(response.text())

    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Error during translation:', error);
    return NextResponse.json({ error: 'An error occurred during translation' }, { status: 500 });
  }
}
