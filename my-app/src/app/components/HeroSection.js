'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const typewriterLines = [
  "Hi, I'm Rithwik.",
  "Video Editor.",
  "Motion Designer.",
  "I turn footage into cinematic experiences."
];

function Particles() {
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 2 + Math.random() * 3,
      color: ['#ED1C24', '#235789', '#F1D302'][Math.floor(Math.random() * 3)],
    })),
    []
  );

  return (
    <div className="hero-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const line = typewriterLines[currentLine];
    
    if (!isDeleting) {
      if (currentChar < line.length) {
        const timeout = setTimeout(() => {
          setDisplayText(line.substring(0, currentChar + 1));
          setCurrentChar(prev => prev + 1);
        }, 60 + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          if (currentLine < typewriterLines.length - 1) {
            setIsDeleting(true);
          }
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentChar > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(line.substring(0, currentChar - 1));
          setCurrentChar(prev => prev - 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentLine(prev => prev + 1);
      }
    }
  }, [currentChar, currentLine, isDeleting]);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-video-bg" />
      <div className="hero-grid" />
      <div className="hero-scanlines" />
      <Particles />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, letterSpacing: '10px' }}
          animate={{ opacity: 0.8, letterSpacing: '4px' }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          ● Creative Lab
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Rithwik
        </motion.h1>

        <div className="hero-typewriter">
          <span className="typewriter-text">{displayText}</span>
        </div>

        {/* Glowing accent orbs */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(237,28,36,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(35,87,137,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => {
          document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-line" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'var(--accent-red)', fontSize: 14 }}
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  );
}
