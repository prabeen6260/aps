'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface IWindow extends Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

declare const window: IWindow;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const signIcons: { [key: string]: string } = {
  hi: '/icons/hi.png',
  hello: '/icons/hi.png',
  hey: '/icons/hi.png',
  world: '/icons/world.png',
  thank: '/icons/thank.png',
  love: '/icons/love.png',
  loves: '/icons/loves.png',
  you: '/icons/you.png',
  bathroom: '/icons/bathroom.png',
  dad: '/icons/dad.png',
  father: '/icons/dad.png',
  mother: '/icons/mother.png',
  mom: '/icons/mother.png',
  friend: '/icons/friend.png',
  friends: '/icons/friend.png',
  no: '/icons/no.png',
  nah: '/icons/no.png',
  yes: '/icons/yes.png',
  yeah: '/icons/yes.png',
  yup: '/icons/yes.png',
  please: '/icons/please.png',
  school: '/icons/school.png',
  deaf: '/icons/deaf.png',
  baby: '/icons/baby.png',
  I: '/icons/I.png',
  i: '/icons/I.png',
  bye: '/icons/bye.png',
  byebye: '/icons/bye.png',
  goodbye: '/icons/bye.png',
  goodbyebye: '/icons/bye.png',
  goodnight: '/icons/bye.png',
  goodnightnight: '/icons/bye.png',
  goodnightnightnight: '/icons/bye.png',
  goodnightnightnightnight: '/icons/bye.png',
  good: '/icons/good.png',
  excuseme: '/icons/excuseme.png',
  excuse: '/icons/excuseme.png',
  help: '/icons/help.png',
  sleep: '/icons/sleep.png',
  sad: '/icons/sad.png',
};

const SpeechToSign: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [recognition, setRecognition] = useState<any>(null);

  const initializeSpeechRecognition = useCallback(() => {
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-US';

      newRecognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setSpokenText(prevText => prevText + finalTranscript + ' ');
      };

      newRecognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      newRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, []);

  useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [initializeSpeechRecognition]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setSpokenText('');
  };

  const getRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  const getSignIcon = (word: string): string | null => {
    const lowerWord = word.toLowerCase();
    return signIcons[lowerWord] || null;
  };

  return (
    <div className="bg-charcoal w-full h-full shadow-lg rounded-lg p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-milk text-center">Speech to Sign Language</h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={toggleListening}
          className={`px-6 py-3 rounded-full ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-signverse to-[#CB6CE6] hover:opacity-90'
          } text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center`}
        >
          {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={resetTranscript}
          className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
        >
          <RefreshCw className="mr-2" />
          Reset
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-inner max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Spoken Text:</h2>
        <p className="text-gray-600">{spokenText || 'Start speaking to see transcription...'}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 shadow-inner max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sign Language:</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {spokenText.split(' ')
            .map(word => word.toLowerCase())
            .filter(word => word in signIcons)
            .map((word, index) => (
              <div key={index} className="relative w-24 h-24 bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={signIcons[word]}
                  alt={`Sign for ${word}`}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                  onError={() => console.error(`Failed to load icon for word: ${word}`)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent py-1 px-2">
                  <span className="text-xs text-gray-600 font-medium">{word}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpeechToSign;