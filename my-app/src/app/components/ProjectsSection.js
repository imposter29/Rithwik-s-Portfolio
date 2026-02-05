'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Brand Film — Midnight Collective',
    description: 'A cinematic brand film blending narrative storytelling with dynamic motion graphics for a premium streetwear launch.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    duration: '02:45',
    color: '#ED1C24',
  },
  {
    name: 'Music Video — Echoes',
    description: 'High-energy music video edit with beat-synced transitions, visual effects, and color grading that matches the song\'s vibe.',
    tools: ['Premiere Pro', 'After Effects'],
    duration: '03:30',
    color: '#235789',
  },
  {
    name: 'Title Sequence — Neon Dreams',
    description: 'Futuristic animated title sequence with glitch effects, kinetic typography, and particle simulations.',
    tools: ['After Effects', 'Cinema 4D'],
    duration: '00:45',
    color: '#F1D302',
  },
  {
    name: 'Documentary — Behind the Lens',
    description: 'Intimate documentary edit with natural pacing, atmospheric sound design, and minimal color correction.',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    duration: '12:00',
    color: '#ED1C24',
  },
  {
    name: 'Social Campaign — Pulse',
    description: 'Series of short-form vertical videos optimized for engagement, featuring punchy edits and motion graphics.',
    tools: ['Premiere Pro', 'After Effects'],
    duration: '00:30',
    color: '#235789',
  },
  {
    name: 'Motion Reel 2025',
    description: 'Personal showreel showcasing the best motion design and editing work from the past year.',
    tools: ['After Effects', 'Premiere Pro', 'Cinema 4D'],
    duration: '01:30',
    color: '#F1D302',
  },
];

const timeMarks = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00'];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        <div className="section-label">Selected Work</div>
        <div className="section-title">Project Timeline</div>
      </motion.div>

      <div className="timeline-container">
        {/* Timeline ruler */}
        <motion.div
          className="timeline-ruler"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: 'left' }}
        >
          <div className="ruler-marks">
            {timeMarks.map((mark, i) => (
              <div key={i} className="ruler-mark" style={{ flex: 1 }}>
                <span className="ruler-mark-text">{mark}</span>
                <div className={`ruler-mark-line ${i % 2 === 0 ? 'tall' : ''}`} />
              </div>
            ))}
          </div>
          {/* Playhead */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              width: 2,
              height: '100%',
              background: '#ED1C24',
              boxShadow: '0 0 10px rgba(237,28,36,0.5)',
              zIndex: 2,
            }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Track rows */}
        <div className="timeline-tracks">
          {/* Track V1 */}
          <motion.div
            className="timeline-track"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="track-label">V1</div>
            <div className="track-clips">
              {projects.slice(0, 3).map((project, i) => (
                <motion.div
                  key={i}
                  className="timeline-clip"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                >
                  <div className="clip-header">
                    <span className="clip-name">{project.name}</span>
                    <span className="clip-duration">{project.duration}</span>
                  </div>
                  <div className="clip-description">{project.description}</div>
                  <div className="clip-tools">
                    {project.tools.map((tool, j) => (
                      <span key={j} className="clip-tool-tag">{tool}</span>
                    ))}
                  </div>
                  <div className="clip-preview">
                    <div className="clip-preview-inner">
                      <div className="play-icon">
                        <svg viewBox="0 0 24 24">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Track V2 */}
          <motion.div
            className="timeline-track"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="track-label">V2</div>
            <div className="track-clips">
              {projects.slice(3, 6).map((project, i) => (
                <motion.div
                  key={i}
                  className="timeline-clip"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                >
                  <div className="clip-header">
                    <span className="clip-name">{project.name}</span>
                    <span className="clip-duration">{project.duration}</span>
                  </div>
                  <div className="clip-description">{project.description}</div>
                  <div className="clip-tools">
                    {project.tools.map((tool, j) => (
                      <span key={j} className="clip-tool-tag">{tool}</span>
                    ))}
                  </div>
                  <div className="clip-preview">
                    <div className="clip-preview-inner">
                      <div className="play-icon">
                        <svg viewBox="0 0 24 24">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Audio track */}
          <motion.div
            className="timeline-track"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="track-label" style={{ color: '#4CAF50' }}>A1</div>
            <div className="track-clips">
              <div
                style={{
                  flex: 1,
                  height: 40,
                  background: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: 3,
                }}
              >
                {/* Audio waveform visualization */}
                {Array.from({ length: 60 }, (_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: 2,
                      background: 'rgba(76, 175, 80, 0.5)',
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                    animate={{
                      height: [
                        4 + Math.random() * 20,
                        8 + Math.random() * 24,
                        4 + Math.random() * 20,
                      ],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
