'use client';

import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Play, Square, Volume2 } from 'lucide-react';

const ASLGPTTranslation = () => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [recognizedSigns, setRecognizedSigns] = useState([]);
  const [translatedSentence, setTranslatedSentence] = useState('');
  const [liveSign, setLiveSign] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isCapturing) {
      intervalId = setInterval(() => {
        captureFrame();
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isCapturing]);

  const startCapture = () => {
    setIsCapturing(true);
    setRecognizedSigns([]);
    setTranslatedSentence('');
    setLiveSign('');
    setAudioUrl('');
  };

  const stopCapture = () => {
    setIsCapturing(false);
    translateSigns();
  };

  const captureFrame = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/handsspeak/2",
          params: {
            api_key: process.env.NEXT_PUBLIC_ROBOFLOW_API_KEY,
          },
          data: imageSrc.split(',')[1],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        const detections = response.data.predictions;
        if (detections && detections.length > 0) {
          const detectedSign = detections[0].class;
          setRecognizedSigns(prev => [...prev, detectedSign]);
          setLiveSign(detectedSign);
        }
      } catch (error) {
        console.error('Error during ASL recognition:', error);
      }
    }
  };

  const translateSigns = async () => {
    if (recognizedSigns.length === 0) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/translate', { signs: recognizedSigns });
      const translation = response.data.translation;
      setTranslatedSentence(translation);
      
      // Automatically speak the translation
      await speakTranslation(translation);
    } catch (error) {
      console.error('Error during translation:', error);
      setTranslatedSentence('Error occurred during translation.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakTranslation = async (text) => {
    if (!text) return;

    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // Play the audio
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Error during text-to-speech conversion:', error);
    }
  };

  return (
    <div className="bg-charcoal shadow-lg rounded-lg p-6 mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-milk text-center">ASL to Speech Translation</h1>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full max-w-lg rounded-lg shadow-md"
        />
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {!isCapturing ? (
          <button
            onClick={startCapture}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-signverse to-[#CB6CE6] text-white transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90 flex items-center"
          >
            <Play className="mr-2" />
            Start ASL Capture
          </button>
        ) : (
          <button
            onClick={stopCapture}
            className="px-6 py-3 rounded-full bg-red-500 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:bg-red-600 flex items-center"
          >
            <Square className="mr-2" />
            Stop and Translate
          </button>
        )}
      </div>

      <div className="bg-milk rounded-lg p-4 mb-6 shadow-inner">
        <h2 className="text-xl font-semibold mb-2 text-charcoal">Recognized Signs:</h2>
        <p className="text-charcoal">{recognizedSigns.join(' ') || 'No signs recognized yet'}</p>
      </div>

      <div className="bg-milk rounded-lg p-4 shadow-inner">
        <h2 className="text-xl font-semibold mb-2 text-charcoal">Translated Sentence:</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-signverse"></div>
            <span className="ml-2 text-charcoal">Translating and generating audio...</span>
          </div>
        ) : (
          <>
            <p className="text-charcoal mb-4">{translatedSentence || 'Translation will appear here'}</p>
            {audioUrl && (
              <div className="bg-milk rounded-lg shadow-md p-4 flex items-center">
                <Volume2 className="text-signverse mr-2" />
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ASLGPTTranslation;