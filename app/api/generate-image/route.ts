// app/api/generate-image/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { word } = await req.json();
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A clear, simple illustration of the American Sign Language (ASL) hand sign for the word "${word}". The image should be on a plain white background, showing only the hands and arms necessary to form the sign.`,
      n: 1,
      size: "1024x1024",
    });

    return NextResponse.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}