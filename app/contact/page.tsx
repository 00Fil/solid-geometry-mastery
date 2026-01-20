'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Smartphone } from 'lucide-react';
import Magnet from '@/components/Magnet';

export default function Contact() {
    return (
        <main className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-[#5227FF] selection:text-white">
            <Navbar />

            {/* Background - BLUE BEAMS */}
            <div className="fixed inset-0 z-0 opacity-30">
                <Beams
                    beamWidth={3}
                    beamHeight={30}
                    beamNumber={12}
                    lightColor="#5227FF"
                    speed={1}
                    noiseIntensity={1.5}
                    scale={0.25}
                    rotation={-15}
                />
            </div>

            <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

                    {/* Left Column: Context */}
                    <div className="pt-24 lg:pt-0 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-display text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-8"
                        >
                            Resta<br /><span className="text-[#5227FF]">Connesso</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-white/60 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0"
                        >
                            Stiamo selezionando i partner per il lancio Q4 2026. Se cerchi l'eccellenza, parliamone ora.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col gap-4 mt-12 items-center lg:items-start"
                        >
                            <a href="mailto:info@lotus.agency" className="text-sm uppercase tracking-widest text-white/40 hover:text-[#5227FF] transition-colors flex items-center gap-2">
                                <Mail size={14} /> info@lotus.agency
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5227FF] blur-[100px] opacity-20 pointer-events-none" />

                        <form className="space-y-8 relative z-10">
                            <div className="space-y-2 group">
                                <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-[#5227FF] transition-colors">Nome</label>
                                <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-[#5227FF] outline-none transition-all placeholder:text-white/10" placeholder="Il tuo nome" />
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-[#5227FF] transition-colors">Email</label>
                                <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-[#5227FF] outline-none transition-all placeholder:text-white/10" placeholder="latua@email.com" />
                            </div>

                            <div className="pt-8">
                                <Magnet>
                                    <button className="w-full py-4 bg-[#5227FF] text-white font-medium text-sm tracking-widest uppercase rounded-full hover:bg-[#4015FF] transition-all hover:shadow-[0_0_30px_rgba(82,39,255,0.4)]">
                                        Iscriviti alla Waitlist
                                    </button>
                                </Magnet>
                            </div>
                        </form>

                    </motion.div>

                </div>

            </div>
        </main>
    );
}
