// app/api/text-to-speech/route.js
import { NextResponse } from 'next/server';
import textToSpeech from '@google-cloud/text-to-speech';

// Initialize the Google TTS client
const client = new textToSpeech.TextToSpeechClient();

export async function POST(request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  try {
    // Set up the TTS request
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    // Return the audio content as an MP3 file
    return new NextResponse(response.audioContent, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error in text-to-speech API:', error);
    return NextResponse.json({ error: 'Error generating speech' }, { status: 500 });
  }
}
