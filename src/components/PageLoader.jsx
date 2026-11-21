import React, { useState, useEffect } from 'react';
import SiriWave from '@/components/ui/siri-wave';

export default function PageLoader({ minDuration = 2200 }) {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [canvasSize, setCanvasSize] = useState(320);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setCanvasSize(240);
      } else if (width < 640) {
        setCanvasSize(280);
      } else {
        setCanvasSize(320);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Fade out after minDuration
    const timer = setTimeout(() => {
      setFading(true);
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 700); // 700ms smooth fade transition
      return () => clearTimeout(exitTimer);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSize);
    };
  }, [minDuration]);

  if (!loading) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none transition-opacity duration-700 ease-out ${
        fading
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Centered: Only Loader and Nuvaro Logo Below */}
      <div className="flex flex-col items-center justify-center">
        {/* WebGL Fluid-Dots Siri Shader */}
        <SiriWave
          variant="fluid-dots"
          size={canvasSize}
          className="bg-black"
        />

        {/* Nuvaro Logo Directly Below Loader */}
        <div className="mt-4 flex flex-col items-center">
          <img
            src="/images/nuvaro-logo-white.png"
            alt="Nuvaro"
            className="h-10 sm:h-12 w-auto object-contain opacity-95 transition-opacity duration-500"
          />
        </div>
      </div>
    </div>
  );
}
