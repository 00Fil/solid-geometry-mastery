'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';
import { motion } from 'framer-motion';

export default function Philosophy() {
    return (
        <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#0040FF] selection:text-white">
            <Navbar />

            {/* Brighter Background - TRUE BLUE BEAMS */}
            <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
                <Beams
                    beamWidth={2}
                    beamHeight={20}
                    beamNumber={15}
                    lightColor="#0040FF"
                    speed={0.5}
                    noiseIntensity={0.8}
                    scale={0.15}
                    rotation={10}
                />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">

                {/* Header - GROUNDED & STUDIED */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-end">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-5xl md:text-7xl font-thin tracking-tight mix-blend-exclusion leading-[1.1] text-white"
                    >
                        Non è magia.<br />
                        È <span className="text-[#0040FF] italic font-serif">Ingegneria</span>.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col justify-end pb-2"
                    >
                        <p className="text-white/80 leading-relaxed font-light text-lg">
                            Il web è saturo di rumore. Noi lavoriamo per sottrarre, non per aggiungere. Costruiamo strumenti digitali che servono uno scopo chiaro, con un'estetica che non invecchia.
                        </p>
                    </motion.div>
                </div>

                {/* Divider - Blue Gradient */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#0040FF] to-transparent mb-32 origin-left opacity-80"
                />

                {/* Core Principles - TRUE BLUE ACCENTS & BRIGHTER TEXT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">

                    {/* 01 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.0 }}
                        className="group"
                    >
                        <span className="block text-9xl font-display text-white/10 mb-8 group-hover:text-[#0040FF]/30 transition-colors duration-700">01</span>
                        <h3 className="text-xl uppercase tracking-[0.2em] font-bold mb-4 text-white group-hover:text-[#0040FF] transition-colors">Precisione</h3>
                        <p className="text-white/60 leading-relaxed font-normal group-hover:text-white/90 transition-colors">
                            Ogni interazione, ogni micro-animazione e ogni linea di codice è misurata. Non lasciamo nulla al caso. Se è sullo schermo, c'è un motivo.
                        </p>
                    </motion.div>

                    {/* 02 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group"
                    >
                        <span className="block text-9xl font-display text-white/10 mb-8 group-hover:text-[#0040FF]/30 transition-colors duration-700">02</span>
                        <h3 className="text-xl uppercase tracking-[0.2em] font-bold mb-4 text-white group-hover:text-[#0040FF] transition-colors">Performance</h3>
                        <p className="text-white/60 leading-relaxed font-normal group-hover:text-white/90 transition-colors">
                            La bellezza senza velocità è vanità. Utilizziamo le tecnologie più avanzate (Next.js, WebGL) per garantire che l'esperienza sia istantanea, fluida e reattiva su ogni dispositivo.
                        </p>
                    </motion.div>

                    {/* 03 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="group"
                    >
                        <span className="block text-9xl font-display text-white/10 mb-8 group-hover:text-[#0040FF]/30 transition-colors duration-700">03</span>
                        <h3 className="text-xl uppercase tracking-[0.2em] font-bold mb-4 text-white group-hover:text-[#0040FF] transition-colors">Sostanza</h3>
                        <p className="text-white/60 leading-relaxed font-normal group-hover:text-white/90 transition-colors">
                            Non vendiamo "siti web". Costruiamo asset digitali di valore. Strumenti pensati per durare nel tempo e per comunicare l'autorevolezza del tuo brand senza urlare.
                        </p>
                    </motion.div>

                </div>

                {/* Final Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-48 text-center"
                >
                    <p className="text-xs uppercase tracking-[0.5em] text-[#0040FF] mb-8 font-bold">Lotus Agency</p>
                    <p className="font-display text-4xl md:text-5xl font-thin text-white">
                        La qualità è l'unico standard accettabile.
                    </p>
                </motion.div>

            </div>
        </main>
    );
}
