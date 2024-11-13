'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect, useRef } from 'react';

export default function TextToSpeech() {
  const { user, isLoaded } = useUser();
  const [error, setError] = useState(null);
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    const generateAndPlayAudio = async () => {
      if (!isLoaded || audioPlayedRef.current) return;

      console.log('Generating audio...');
      setError(null);

      try {
        const response = await fetch('/api/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: `Hello ${user?.firstName || ''}, I am SignBot. Your personal sign language tutor`
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        console.log('Audio generated successfully');

        const audio = new Audio(url);
        await audio.play();
        console.log('Audio played successfully');

        audioPlayedRef.current = true;

        // Clean up the object URL after playback
        audio.onended = () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        console.error('Error generating or playing audio:', err);
        setError(err.message);
      }
    };

    generateAndPlayAudio();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      {error && <div>Error: {error}</div>}
    </div>
  );
}