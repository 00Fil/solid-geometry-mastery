'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Magnet from './Magnet';
import { ArrowRight, Bell } from 'lucide-react';
import Link from 'next/link';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(12px)' },
    visible: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20
        }
    }
};

const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function Hero() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center select-none pointer-events-none">

            <motion.div
                className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 60 DAY COUNTDOWN REMOVED - Simple Badge Back or Clean Space */}
                <motion.div variants={itemVariants} className="pointer-events-auto">
                    <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white hover:text-white hover:bg-white/10 transition-all duration-500 cursor-default shadow-[0_0_25px_-5px_rgba(0,64,255,0.4)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0040FF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0040FF]"></span>
                        </span>
                        System Online
                    </span>
                </motion.div>

                {/* Main Heading - LOTUS - NEW FONT IDENTITY */}
                <motion.div variants={itemVariants} className="relative group mt-2">
                    {/* Used 'font-space' (Space Grotesk) which we added to layout */}
                    <h1 className="font-[family-name:var(--font-space)] font-bold text-7xl md:text-9xl lg:text-[12rem] tracking-tighter text-white mix-blend-overlay opacity-100 transition-opacity duration-700 drop-shadow-2xl leading-none">
                        LOTUS
                    </h1>
                </motion.div>

                {/* Decorative Line */}
                <motion.div variants={lineVariants} className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#0040FF] to-transparent opacity-80" />

                {/* Subheading */}
                <motion.div variants={itemVariants} className="space-y-6 max-w-2xl px-4">
                    <p className="font-sans text-sm md:text-lg tracking-[0.4em] uppercase text-white font-semibold text-shadow-md">
                        Eccellenza Digitale
                    </p>
                    <p className="text-white/80 font-normal text-sm md:text-lg leading-loose tracking-wide">
                        Stiamo costruendo il nuovo standard per le esperienze web.<br className="hidden md:block" />
                        Nessun template. Nessun compromesso. Solo risultato.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8 mt-16 pointer-events-auto">

                    <Magnet>
                        <Link href="/contact" className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold tracking-wide transition-all hover:shadow-[0_0_50px_-10px_rgba(0,64,255,0.6)] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                <Bell size={18} className="transition-transform group-hover:rotate-12 text-[#0040FF]" />
                                <span>Avvisami</span>
                            </span>
                        </Link>
                    </Magnet>

                    <Magnet>
                        <Link href="/philosophy" className="flex items-center gap-3 px-8 py-5 rounded-full text-white/90 hover:text-white transition-all group">
                            <span className="uppercase tracking-widest text-xs font-semibold">Il Nostro Metodo</span>
                            <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#0040FF]" />
                        </Link>
                    </Magnet>
                </motion.div>

            </motion.div>

        </section>
    );
}
