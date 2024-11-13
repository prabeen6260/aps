'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ASLTeacher = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { type: 'user', content: input }]);

    try {
      // Generate image
      // const imageResponse = await fetch('/api/generate-image', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ word: input })
      // });
      // const imageData = await imageResponse.json();

      // Generate text explanation
      const textResponse = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: input })
      });
      const textData = await textResponse.json();

      setChatHistory(prev => [
        ...prev,
        { 
          type: 'bot', 
          content: textData.explanation,
        }
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-neutral-900 text-white">
      <Card className="flex-grow mb-4 overflow-auto bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle>ASL Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          {chatHistory.map((message, index) => (
            <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-blue-600' : 'bg-neutral-700'}`}>
                <p>{message.content}</p>
                {/* {message.image && (
                  <img src={message.image} alt={`ASL sign for ${message.content}`} className="mt-2 rounded-lg max-w-full h-auto" />
                )} */}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a word to see its ASL sign..."
          className="flex-grow bg-neutral-800 border-neutral-700 text-white"
        />
        <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-signverse to-[#CB6CE6] hover:opacity-90">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ASLTeacher;