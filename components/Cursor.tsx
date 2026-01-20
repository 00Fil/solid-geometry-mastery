'use client';

import { useEffect, useState } from 'react';
import { motion, Variants, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text'>('default');

  // Use MotionValues for direct, lag-free updates
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Direct assignment = broken physics free, 1:1 tracking
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for links/buttons
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorState('pointer');
      }
      // Check for text inputs
      else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'P' || target.tagName === 'H1') {
        setCursorState('text');
      }
      else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const variants: Variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: '#0040FF',
      border: '0px solid transparent',
      mixBlendMode: 'difference'
    },
    pointer: {
      height: 60,
      width: 60,
      backgroundColor: 'transparent',
      border: '1px solid #0040FF',
      mixBlendMode: 'normal'
    },
    text: {
      height: 30,
      width: 4,
      backgroundColor: '#0040FF',
      border: '0px solid transparent',
      mixBlendMode: 'difference'
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block" // Hidden on mobile
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%', // Centers the div on the coordinate
        translateY: '-50%',
      }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center transform origin-center"
        variants={variants}
        animate={cursorState}
        // Smooth state transitions, instant position
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
