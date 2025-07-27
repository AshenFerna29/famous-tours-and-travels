'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'ආයුබෝවන්',    // Sinhala
  'வணக்கம்',      // Tamil
  'Hello',
  'Hola',
  'Bonjour',
];

export default function SplashPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // Cycle greetings
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Redirect after 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 6000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-[#52ACE4] to-[#F8FAFC] flex flex-col items-center justify-center text-center transition-all duration-500 px-4">
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
          width={200}
          height={100}
        />
      </motion.div>
    </div>
  );
}
