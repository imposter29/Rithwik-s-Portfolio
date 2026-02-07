'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: '📹',
    title: 'Raw Footage',
    desc: 'Import, organize, and review all source material. Tag best takes and sync audio.',
    className: 'step-1',
  },
  {
    icon: '✂️',
    title: 'Timeline Editing',
    desc: 'Build the story structure. Rough cut, fine cut, pacing adjustments.',
    className: 'step-2',
  },
  {
    icon: '✨',
    title: 'Effects & Color',
    desc: 'Motion graphics, VFX, color grading, and sound design polish.',
    className: 'step-3',
  },
  {
    icon: '🎬',
    title: 'Final Render',
    desc: 'Export in optimal format. Quality check. Deliver the cinematic experience.',
    className: 'step-4',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section process-section" id="process" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <div className="section-label">Behind the Edit</div>
        <div className="section-title">The Creative Process</div>
      </motion.div>

      <div className="process-flow">
        {steps.map((step, i) => (
          <motion.div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              className="process-step"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <motion.div
                className={`process-icon-container ${step.className}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span>{step.icon}</span>
              </motion.div>
              <div className="process-title">{step.title}</div>
              <div className="process-desc">{step.desc}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 0.5, x: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.2 + 0.3 }}
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
