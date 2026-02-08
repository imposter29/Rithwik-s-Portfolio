'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuoteSection({ quote }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="quote-section" ref={ref}>
      <motion.div
        className="quote-text"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1, color: 'rgba(253, 255, 252, 0.6)' } : {}}
        transition={{ duration: 1 }}
      >
        {quote}
      </motion.div>
    </section>
  );
}
