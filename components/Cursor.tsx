'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, Variants } from 'framer-motion';

export default function Cursor() {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text'>('default');
  
  // Using direct coordinates for left/top is sometimes more reliable for centering different sized elements
  // but let's stick to transform for performance, just fix the offset logic.
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 }); // Faster response
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
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
      className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    >
        {/* Only the inner element animates size, outer follows mouse. 
            We translate the outer element by -50% of itself? No, we translate by -50% of the *inner* element relative to the point.
            Actually, simplest way: Outer div is 0x0 at cursor pos. Inner div transforms centered.
        */}
      <motion.div 
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
