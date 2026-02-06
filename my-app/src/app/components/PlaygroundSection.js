'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const playgroundItems = [
  {
    id: 'laptop',
    icon: '💻',
    label: 'Video Projects',
    className: 'laptop',
    position: { top: '15%', left: '15%' },
    floatDelay: 0,
    modalTitle: 'Video Projects',
    modalDesc: 'From brand films to social content — every project starts with a vision and a timeline. Using Premiere Pro and DaVinci Resolve, raw footage transforms into stories that captivate audiences. Each cut is intentional, each transition purposeful.',
  },
  {
    id: 'camera',
    icon: '🎬',
    label: 'Cinematic Edits',
    className: 'camera',
    position: { top: '10%', right: '20%' },
    floatDelay: 0.5,
    modalTitle: 'Cinematic Edits',
    modalDesc: 'Cinematic editing is about rhythm and emotion. Color grading that sets the mood, sound design that pulls you in, and pacing that keeps you hooked. Every frame is crafted to deliver a theatrical experience.',
  },
  {
    id: 'timeline',
    icon: '⏱️',
    label: 'Edit Breakdowns',
    className: 'timeline',
    position: { bottom: '25%', left: '25%' },
    floatDelay: 1,
    modalTitle: 'Editing Breakdowns',
    modalDesc: 'Behind every polished video is a complex timeline. Hundreds of cuts, keyframes, effects layers, and audio tracks working in harmony. Breakdowns reveal the craft behind the magic — from rough cut to final render.',
  },
  {
    id: 'filmstrip',
    icon: '🎞️',
    label: 'Motion Design',
    className: 'filmstrip',
    position: { bottom: '20%', right: '15%' },
    floatDelay: 1.5,
    modalTitle: 'Motion Design',
    modalDesc: 'Motion graphics bring static ideas to life. Logo animations, title sequences, kinetic typography, and visual effects — all crafted in After Effects. Movement creates meaning, and every keyframe tells a story.',
  },
  {
    id: 'character',
    icon: '✨',
    label: 'Pro Tips',
    className: 'character',
    position: { top: '45%', left: '48%' },
    floatDelay: 2,
    isCharacter: true,
    tips: [
      "Pro tip: Always cut on action — it makes edits invisible! ✂️",
      "Fun fact: I spend 80% of editing time on the first 10 seconds! ⚡",
      "Secret: The best edits are the ones nobody notices 🎯",
      "Tip: Sound design is 50% of the viewing experience! 🔊",
      "Did you know? Mood is set by color, not just content 🎨",
    ],
  },
];

export default function PlaygroundSection() {
  const [activeModal, setActiveModal] = useState(null);
  const [speechBubble, setSpeechBubble] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleItemClick = useCallback((item) => {
    if (item.isCharacter) {
      const tip = item.tips[tipIndex % item.tips.length];
      setSpeechBubble(tip);
      setTipIndex(prev => prev + 1);
      setTimeout(() => setSpeechBubble(null), 4000);
    } else {
      setActiveModal(item);
    }
  }, [tipIndex]);

  return (
    <section className="section playground-section" id="playground" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Interactive Workspace</div>
        <div className="section-title">Creative Playground</div>
      </motion.div>

      <div className="playground-canvas">
        {playgroundItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="playground-item"
            style={item.position}
            onClick={() => handleItemClick(item)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? {
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            } : {}}
            transition={{
              opacity: { duration: 0.5, delay: item.floatDelay },
              scale: { duration: 0.5, delay: item.floatDelay },
              y: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.floatDelay,
              },
            }}
          >
            <div className={`playground-icon ${item.className}`}>
              {item.isCharacter ? (
                <Image
                  src="/characters/happy.png"
                  alt="Character"
                  width={50}
                  height={50}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <span>{item.icon}</span>
              )}
            </div>
            <span className="playground-label">{item.label}</span>
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(237,28,36,0.15)" />
              <stop offset="100%" stopColor="rgba(35,87,137,0.1)" />
            </linearGradient>
          </defs>
          <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>

        {/* Speech bubble */}
        <AnimatePresence>
          {speechBubble && (
            <motion.div
              className="speech-bubble"
              style={{ top: '25%', left: '35%' }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
            >
              {speechBubble}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{activeModal.icon}</div>
              <div className="modal-title">{activeModal.modalTitle}</div>
              <div className="modal-description">{activeModal.modalDesc}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
