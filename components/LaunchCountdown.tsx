'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LaunchCountdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        // Set launch date to 60 days from now relative to client mount to keep it consistent for demo
        // In production this would be a fixed date e.g. new Date('2026-11-01')
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 60);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'); // Allow 3 digits if needed, but pad 2
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label }: { value: string, label: string }) => (
        <div className="flex flex-col items-center gap-2">
            <div className="relative group">
                {/* Housing */}
                <div className="relative w-12 h-16 md:w-16 md:h-20 bg-gradient-to-b from-[#1a1a1a] to-black rounded-lg border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_20px_-5px_rgba(0,64,255,0.2)] overflow-hidden flex items-center justify-center">
                    {/* The Number */}
                    <span className="font-mono text-2xl md:text-4xl font-bold text-white z-10 tabular-nums">
                        {value}
                    </span>

                    {/* Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none h-1/2 opacity-50" />

                    {/* Texture */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)`,
                            backgroundSize: '100% 4px'
                        }}
                    />
                </div>
                {/* Glow */}
                <div className="absolute inset-0 bg-[#0040FF] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/30">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-6">

            {/* Label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#0040FF]"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0040FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0040FF]"></span>
                </span>
                <span>Launch Sequence Initiated</span>
            </motion.div>

            {/* Counter Units */}
            <div className="flex gap-3 md:gap-4">
                <TimeUnit value={timeLeft.days} label="Days" />
                <span className="text-2xl mt-4 text-white/20 font-mono">:</span>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <span className="text-2xl mt-4 text-white/20 font-mono">:</span>
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <span className="text-2xl mt-4 text-white/20 font-mono">:</span>
                <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>

        </div>
    );
}
