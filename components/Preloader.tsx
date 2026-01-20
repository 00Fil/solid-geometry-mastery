'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberFlow from '@number-flow/react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Duration: 2.5s (Slightly longer for smoothness)
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds total load time

    const frame = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease Out Quint: Starts very fast, decelerates to a crawl at the end
      // 1 - (1-t)^5
      const easeOut = 1 - Math.pow(1 - progress, 5);

      const currentVal = Math.floor(easeOut * 100);

      setPercentage(currentVal);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    requestAnimationFrame(frame);

  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-black text-white cursor-wait"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Odometer Display using NumberFlow */}
          <div className="flex items-end overflow-hidden leading-none">
            <div className="font-[family-name:var(--font-space)] text-[15vw] md:text-[12vw] font-bold tracking-tighter text-[#0040FF] tabular-nums flex items-baseline">
              <NumberFlow
                value={percentage}
                format={{ minimumIntegerDigits: 3 }}
              />
            </div>
            <span className="text-2xl md:text-5xl font-mono mb-4 md:mb-8 text-white/50 ml-4">%</span>
          </div>

          {/* Simple Line Progress */}
          <div className="w-64 h-[2px] bg-white/10 mt-12 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="h-full bg-[#0040FF]"
            />
          </div>

          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 95%, rgba(0, 64, 255, 0.2) 100%)`,
              backgroundSize: '100% 8px'
            }}
          />

          <motion.div
            className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-mono text-white/40"
          >
            <div>INITIALIZING CORE SYSTEMS</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-3 h-3 border border-white/20 border-t-[#0040FF] rounded-full"
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
