'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Beams from '@/components/Beams';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import Magnet from '@/components/Magnet';

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email) return;

        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            });

            if (res.ok) {
                setStatus('success');
                setFormState({ name: '', email: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main className="relative w-full min-h-screen bg-black text-white overflow-hidden selection:bg-[#0040FF] selection:text-white">
            <Navbar />

            {/* Background - TRUE BLUE BEAMS & BRIGHTER */}
            <div className="fixed inset-0 z-0 opacity-50">
                <Beams
                    beamWidth={3}
                    beamHeight={30}
                    beamNumber={12}
                    lightColor="#0040FF"
                    speed={1}
                    noiseIntensity={1.2}
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
                            className="font-display text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-8 drop-shadow-lg"
                        >
                            Resta<br /><span className="text-[#0040FF]">Connesso</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-white/80 text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0"
                        >
                            Stiamo selezionando i partner per il lancio Q4 2026. Se cerchi l'eccellenza, parliamone ora.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col gap-4 mt-12 items-center lg:items-start"
                        >
                            <a href="mailto:info@lotus.agency" className="text-sm uppercase tracking-widest text-white/60 hover:text-[#0040FF] transition-colors flex items-center gap-2 font-medium">
                                <Mail size={16} /> info@lotus.agency
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0040FF] blur-[100px] opacity-20 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center text-center space-y-4 py-12"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#0040FF]/20 text-[#0040FF]">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-light">Messaggio Inviato</h3>
                                    <p className="text-white/70">Grazie per il tuo interesse. Ti contatteremo presto.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mt-8"
                                    >
                                        Invia un altro messaggio
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-8 relative z-10"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-white/60 group-focus-within:text-[#0040FF] transition-colors font-medium">Nome</label>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-[#0040FF] outline-none transition-all placeholder:text-white/20 text-white"
                                            placeholder="Il tuo nome"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-white/60 group-focus-within:text-[#0040FF] transition-colors font-medium">Email</label>
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            required
                                            className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-[#0040FF] outline-none transition-all placeholder:text-white/20 text-white"
                                            placeholder="latua@email.com"
                                        />
                                    </div>

                                    <div className="pt-8">
                                        <Magnet>
                                            <button
                                                disabled={status === 'submitting'}
                                                type="submit"
                                                className="w-full py-4 bg-[#0040FF] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#0030CC] transition-all hover:shadow-[0_0_30px_rgba(0,64,255,0.4)] disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 size={16} className="animate-spin" />
                                                        Invio in corso...
                                                    </>
                                                ) : (
                                                    "Iscriviti alla Waitlist"
                                                )}
                                            </button>
                                        </Magnet>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                    </motion.div>

                </div>

            </div>
        </main>
    );
}
