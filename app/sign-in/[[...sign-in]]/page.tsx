'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { SparklesCore } from '@/components/ui/sparkles';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc'; // Make sure to install react-icons

const CustomSignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Sign-in failed", result);
        setErrorMessage(`Sign-in failed. Status: ${result.status}`);
      }
    } catch (err: any) {
      console.error("Error during sign-in:", err);
      setErrorMessage(`An error occurred during sign-in: ${err.message || 'Unknown error'}`);
    }
  };

  const signInWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      console.error("Error signing in with Google:", err);
      setErrorMessage(`Error signing in with Google: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 z-10"
      >
        <div className='flex flex-col z-20 items-center justify-center w-full h-full'>
          <h1 className='text-5xl mb-8 font-medium text-transparent bg-clip-text bg-gradient-to-r from-signverse to-[#CB6CE6]'>
            Welcome Back
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-signverse"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-signverse"
            />
            <button type="submit" className='text-xl bg-gradient-to-r from-signverse to-[#CB6CE6] hover:opacity-90 text-white font-medium px-4 py-2 rounded-lg'>
              Sign In
            </button>
          </form>

          <div className="my-4 flex items-center justify-between w-80">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          {errorMessage && (
            <p className="mt-4 text-red-500">{errorMessage}</p>
          )}

          <p className="mt-4 text-subtext">
            Don't have an account? <Link href="/sign-up" className="text-signverse hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default CustomSignIn;