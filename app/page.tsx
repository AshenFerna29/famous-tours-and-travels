'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'ආයුබෝවන් !', 
  'Welcome !',
  'வணக்கம் !', 
  '欢迎 !',      
  'नमस्ते !',    
];

export default function SplashPage() {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  // Cycle greetings
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Trigger fade out and navigate
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // start fade out
    }, 7000); // trigger fade out before redirect
    return () => clearTimeout(timer);
  }, []);

  // After fade-out animation ends
  useEffect(() => {
    if (fadeOut) {
      const redirectTimer = setTimeout(() => {
        router.push('/home');
      }, 1000); // wait for fade-out animation
      return () => clearTimeout(redirectTimer);
    }
  }, [fadeOut, router]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🎬 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/splash-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground Content */}
      <div className="relative z-10 h-full w-full bg-black/50 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={greetings[index]}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg font-poppins"
          >
            {greetings[index]}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-xl md:text-2xl text-white/80 font-medium"
        >
          Welcome to
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8"
        >
          <Image
            src="/images/logo.png"
            alt="Famous Tours & Travels"
            width={320}
            height={200}
            style={{ width: 'auto', height: '200px' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
