'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      {/* Render animation */}
      <motion.div
        className="render-animation"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="render-window">
          <div className="render-titlebar">
            <div className="render-dot red" />
            <div className="render-dot yellow" />
            <div className="render-dot green" />
            <span className="render-titlebar-text">collaboration_final_v2.mp4 — Exporting</span>
          </div>
          <div className="render-body">
            <div className="render-status">
              {renderProgress < 100
                ? '⏳ Rendering collaboration...'
                : '✅ Export complete!'}
            </div>
            <div className="render-bar-container">
              <div
                className="render-bar"
                style={{ width: `${renderProgress}%` }}
              />
            </div>
            <div className="render-details">
              <span>H.264 · 4K · 60fps</span>
              <span>{Math.round(renderProgress)}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        className="contact-message"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Ready to create something<br />
        <span>amazing together?</span>
      </motion.div>

      {/* Contact links */}
      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a href="mailto:rithwik@example.com" className="contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          Email
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
          </svg>
          Instagram
        </a>
        <a href="#" className="contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Freelance
        </a>
      </motion.div>
    </section>
  );
}
