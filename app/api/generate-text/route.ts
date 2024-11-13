// app/api/generate-text/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI('AIzaSyBCag4JyNXDZDsZhUdltv-ftc-0Jfcy7GM');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: Request) {
  try {
    const prompt = 'You are a helpful assistant that explains ASL signs and teaches ASL.';

    // Generate content using the Gemini model
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const explanation = response.text();

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Error generating text:', error);
    return NextResponse.json(
      { error: 'Failed to generate text explanation' },
      { status: 500 }
    );
  }
}
