'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Loader from './components/Loader';
import HeroSection from './components/HeroSection';
import PlaygroundSection from './components/PlaygroundSection';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import QuoteSection from './components/QuoteSection';
import ContactSection from './components/ContactSection';

const CustomCursor = dynamic(() => import('./components/CustomCursor'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" />

      {!loaded && <Loader onComplete={handleLoadComplete} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <HeroSection />

        <QuoteSection quote="Editing is invisible storytelling." />

        <PlaygroundSection />

        <QuoteSection quote="If you notice the cut, the edit probably failed." />

        <ProjectsSection />

        <QuoteSection quote="Great edits are felt, not seen." />

        <ProcessSection />

        <ContactSection />

        <footer className="footer">
          <p>© 2025 Rithwik — Crafted with passion & precision</p>
        </footer>
      </div>
    </>
  );
}
