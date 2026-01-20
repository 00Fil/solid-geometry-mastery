
'use client';

import React from 'react';
import { X, Shield, Zap, BookOpen, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathFormula } from './MathFormula';

export const SurvivalKit = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40" onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full"><Shield className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="text-2xl font-bold">Kit di Sopravvivenza</h2>
                                    <p className="text-red-100 text-sm">Tutto ciò che ti serve per non bloccarti mai.</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto p-8 flex-1 bg-gray-50">
                            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                                {/* COLONNA 1: FORMULE VOLUMI (IL BASILARE) */}
                                <div className="space-y-6">
                                    <SectionHeader icon={<BookOpen className="text-blue-600" />} title="Formule Essenziali" color="text-blue-900" />

                                    <FormulaCard title="Cilindro" math="V = \pi r^2 h" sub="Sl = 2\pi r h" />
                                    <FormulaCard title="Cono" math="V = \frac{1}{3}\pi r^2 h" sub="Sl = \pi r a" />
                                    <FormulaCard title="Sfera" math="V = \frac{4}{3}\pi r^3" sub="S = 4\pi r^2" />

                                    <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 mt-4">
                                        <h4 className="font-bold text-yellow-800 text-sm mb-1">⚠️ Attenzione:</h4>
                                        <p className="text-xs text-yellow-900 leading-relaxed">
                                            Spesso non ti serve calcolare il Volume. Ti serve <strong>scrivere la formula in funzione di x</strong> e derivarla. Non preoccuparti se non hai i numeri!
                                        </p>
                                    </div>
                                </div>

                                {/* COLONNA 2: TEOREMI VISIVI (IL MOTORE) */}
                                <div className="space-y-6">
                                    <SectionHeader icon={<Zap className="text-green-600" />} title="I Motori Geometrici" color="text-green-900" />

                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-2">1. Pitagora (Figure Inscritte)</h4>
                                        <PitagoraKitViz />
                                        <div className="mt-3 text-center">
                                            <MathFormula tex="r^2 = x^2 + R_{base}^2" block />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 text-center">Usa questo quando hai qualcosa <strong>dentro una sfera</strong>.</p>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-2">2. Similitudine (Coni/Simili)</h4>
                                        <SimilitudineKitViz />
                                        <div className="mt-3 text-center">
                                            <MathFormula tex="\frac{r}{h} = \frac{R}{H}" block />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 text-center">Usa questo per coni inscritti o figure tagliate.</p>
                                    </div>
                                </div>

                                {/* COLONNA 3: DERIVATE & TRUCCHI (L'ESECUZIONE) */}
                                <div className="space-y-6">
                                    <SectionHeader icon={<PenTool className="text-purple-600" />} title="Analisi & Derivate" color="text-purple-900" />

                                    <div className="space-y-3">
                                        <DerivativeRule func="x^n" der="n x^{n-1}" desc="Regola base potenze" />
                                        <DerivativeRule func="\sqrt{f(x)}" der="\frac{f'(x)}{2\sqrt{f(x)}}" desc="Radici quadrate" />
                                        <DerivativeRule func="k \cdot f(x)" der="k \cdot f'(x)" desc="Le costanti restano" />
                                    </div>

                                    <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg mt-6">
                                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                            <Zap className="text-yellow-400" /> Trucchi del Mestiere
                                        </h4>
                                        <ul className="space-y-3 text-sm text-indigo-100">
                                            <li>✅ <strong>Ignora π:</strong> Massimizzare V o V/π è uguale. Toglilo dalla derivata.</li>
                                            <li>✅ <strong>Quadrato Furbo:</strong> Se devi massimizzare una radice traslata <MathFormula tex="\sqrt{P(x)}" />, massimizza direttamente <MathFormula tex="P(x)" />.</li>
                                            <li>✅ <strong>Risultati Soliti:</strong> x è spesso r/2, r/3, r/√2. Se ti viene x=0.1239r hai sbagliato.</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

function SectionHeader({ icon, title, color }: any) {
    return (
        <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-3">
            <div className={`p-2 bg-white rounded-lg shadow-sm border border-gray-100`}>{icon}</div>
            <h3 className={`font-bold text-xl ${color}`}>{title}</h3>
        </div>
    )
}

function FormulaCard({ title, math, sub }: any) {
    return (
        <div className="bg-white p-4 rounded-xl border border-blue-50 hover:border-blue-200 transition-colors shadow-sm group">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">{title}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Volume</span>
            </div>
            <div className="text-center py-2 bg-blue-50/50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <MathFormula tex={math} />
            </div>
            {sub && <p className="text-xs text-center text-gray-400 mt-2 font-mono">{sub}</p>}
        </div>
    )
}

function DerivativeRule({ func, der, desc }: any) {
    return (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 text-sm">
            <div className="flex items-center gap-3">
                <div className="font-mono bg-gray-50 px-2 py-1 rounded text-purple-700 font-bold"><MathFormula tex={func} /></div>
                <span className="text-gray-400">→</span>
                <div className="font-mono text-gray-800"><MathFormula tex={der} /></div>
            </div>
            <span className="text-xs text-gray-400 italic hidden xl:block">{desc}</span>
        </div>
    )
}

// --- MICRO VISUALIZATIONS FOR KIT ---
function PitagoraKitViz() {
    return (
        <svg width="100%" height="100" viewBox="0 0 200 100" className="overflow-visible">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4" clipPath="inset(0 0 50% 0)" />
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
            <path d="M 100 100 L 100 40 L 160 100 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="135" y="65" className="text-xs font-bold fill-red-600">r (Ip.)</text>
            <text x="85" y="75" className="text-xs font-bold fill-blue-600">x</text>
            <text x="130" y="115" className="text-xs font-bold fill-green-600">y</text>
        </svg>
    )
}

function SimilitudineKitViz() {
    return (
        <svg width="100%" height="100" viewBox="0 0 200 120" className="overflow-visible">
            <path d="M 100 10 L 150 110 L 50 110 Z" fill="none" stroke="#dcfce7" strokeWidth="2" />
            <path d="M 100 10 L 125 60 L 75 60 Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="110" stroke="#86efac" strokeWidth="1" strokeDasharray="2" />
            <text x="130" y="60" className="text-[10px] font-bold fill-green-700">r</text>
            <text x="155" y="110" className="text-[10px] font-bold fill-green-400">R</text>
        </svg>
    )
}
