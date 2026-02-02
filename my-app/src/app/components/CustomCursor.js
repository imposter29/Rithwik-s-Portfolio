'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }
      requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .playground-item, .timeline-clip, .contact-link, .hero-scroll-indicator')) {
        setHovering(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .playground-item, .timeline-clip, .contact-link, .hero-scroll-indicator')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
