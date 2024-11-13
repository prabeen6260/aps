'use client';

import React from 'react'
import Link from 'next/link'
import { SparklesCore } from './ui/sparkles'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs';

const Hero = () => {
  const { isSignedIn } = useUser();
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
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
        <div className='flex flex-col z-20 items-center justify-center w-full h-full'>
            <h2 className='text-5xl mb-3 font-medium'>Welcome to</h2>
            <h1 className='text-9xl text-transparent bg-clip-text bg-gradient-to-r from-signverse to-[#CB6CE6] font-semibold tracking-widest'>
                SIGNVERSE
            </h1>
            <div className="w-[80rem] h-14 relative ml-20">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-signverse to-transparent h-[2px] wfull4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-signverse  to-transparent h-px w-full" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#CB6CE6] to-transparent h-[5px] w-1/2 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#CB6CE6] to-transparent h-px w-1/2" />
        
                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-charcoal [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <p className='text-subtext font-medium text-center text-lg'>
                SignVerse is your guide to the sign language universe. Instantly translate and trascribe ASL as you speak and watch.
                <br />
                Have conversations that matter with everyone. SignVerse breaks the sign-language barrier and connects everybody together.
            </p>
            <Link href={`${isSignedIn ? '/dashboard' : '/sign-up'}`}>
              <button className='text-xl bg-gradient-to-r from-signverse to-[#CB6CE6] hover:opacity-90 text-white font-medium px-4 py-2 rounded-lg mt-12'>
                  Get Started
              </button>
            </Link>
        </div>

        </motion.div>
    </main>
  )
}

export default Hero