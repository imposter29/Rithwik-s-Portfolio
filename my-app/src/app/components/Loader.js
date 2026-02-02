'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const stages = [
  { min: 0, max: 20, image: '/characters/sleepy.png', text: 'Waking up the creative brain...' },
  { min: 20, max: 40, image: '/characters/waking.png', text: 'Loading ideas...' },
  { min: 40, max: 60, image: '/characters/focused.png', text: 'Rendering motion...' },
  { min: 60, max: 80, image: '/characters/excited.png', text: 'Almost ready...' },
  { min: 80, max: 100, image: '/characters/celebrate.png', text: "Welcome to Rithwik's Creative Lab" },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(() => onComplete(), 800);
          }, 600);
          return 100;
        }
        // Variable speed for natural feel
        const speed = prev < 30 ? 1.2 : prev < 60 ? 1.5 : prev < 85 ? 1.0 : 0.8;
        return Math.min(prev + speed, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentStage = stages.find(s => progress >= s.min && progress < s.max) || stages[stages.length - 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="loader-character">
            {stages.map((stage, i) => (
              <Image
                key={i}
                src={stage.image}
                alt={`Character ${i}`}
                width={180}
                height={180}
                style={{
                  opacity: currentStage === stage ? 1 : 0,
                }}
                priority
              />
            ))}
          </div>

          <motion.div
            className="loader-text"
            key={currentStage.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentStage.text}
          </motion.div>

          <div className="loader-bar-container">
            <div
              className="loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="loader-percentage">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
