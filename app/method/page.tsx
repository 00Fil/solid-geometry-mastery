
'use client';

import { Sidebar } from '@/components/Sidebar';
import { BookOpen, Shield, Zap, Search, PenTool, Target, TrendingUp, CheckCircle, Lightbulb, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import { MathFormula } from '@/components/MathFormula';

export default function MethodPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 flex-1 p-12 overflow-y-auto font-sans text-gray-800">
                <div className="max-w-5xl mx-auto space-y-16">

                    <header className="text-center space-y-4">
                        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">Il Metodo Universale</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Kit di sopravvivenza visivo. Non imparare a memoria, <span className="text-blue-600 font-bold">guarda</span> come funzionano i teoremi.
                        </p>
                    </header>

                    {/* FASE 1: KIT SOPRAVVIVENZA VISIVO */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 show-on-scroll">
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 text-gray-900">
                            <Shield className="w-8 h-8 text-red-500" />
                            1. Le Armi (Teoria Visuale)
                        </h2>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* PITAGORA CARD */}
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center">
                                    <h3 className="font-bold text-blue-900 mb-2">Il "Motore" della Sfera (Pitagora)</h3>
                                    <PitagoraViz />
                                    <p className="text-sm text-blue-800 mt-3 text-center">
                                        In ogni sfera c'è un triangolo rettangolo nascosto. <br />
                                        <strong>Ipotenusa = Raggio Sfera (r)</strong>. <br />
                                        Cateti = Raggio figura (y) e Distanza (x).
                                    </p>
                                </div>
                                <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-center shadow-md">
                                    <MathFormula tex="r^2 = x^2 + y^2" />
                                </div>
                            </div>

                            {/* SIMILITUDINE CARD */}
                            <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center">
                                    <h3 className="font-bold text-green-900 mb-2">Il "Motore" del Cono (Similitudine)</h3>
                                    <SimilitudineViz />
                                    <p className="text-sm text-green-800 mt-3 text-center">
                                        Se tagli un cono, ottieni triangoli incastrati. <br />
                                        Il triangolo piccolo in cima è <strong>Simile</strong> a quello grande. <br />
                                        I rapporti sono identici.
                                    </p>
                                </div>
                                <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-center shadow-md">
                                    <MathFormula tex="\frac{r}{h} = \frac{R}{H}" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FASE 2: ALGORITMO */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold text-center text-gray-800">2. L'Algoritmo in 5 Step</h2>
                        <div className="space-y-6">
                            <AlgorithmStep
                                num="1" title="La Radiografia (2D)"
                                icon={<Search />} color="bg-blue-600"
                                desc="Smetti di pensare in 3D. Disegna solo la sezione."
                                hint="Sfera => Cerchio. Cono => Triangolo."
                            />
                            <AlgorithmStep
                                num="2" title="La Variabile x"
                                icon={<PenTool />} color="bg-indigo-600"
                                desc="Poni x = distanza dal centro o altezza."
                                hint="Cerca quella che rende Pitagora più facile."
                            />
                            <AlgorithmStep
                                num="3" title="I Limiti"
                                icon={<TrendingUp />} color="bg-green-600"
                                desc="Scrivi subito dove vive la x."
                                hint={<MathFormula tex="0 < x < r" />}
                            />
                            <AlgorithmStep
                                num="4" title="Funzione Obiettivo"
                                icon={<Target />} color="bg-purple-600"
                                desc="Unisci i pezzi. V(x) = ... solo con x e r."
                            />
                            <AlgorithmStep
                                num="5" title="Derivata"
                                icon={<CheckCircle />} color="bg-rose-600"
                                desc="Trova il picco della montagna."
                                hint={<MathFormula tex="V'(x) \ge 0" />}
                            />
                        </div>
                    </section>

                    <div className="text-center pt-8 pb-12">
                        <Link href="/exercise/166-cono-sfera-volume" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-transform hover:scale-105 shadow-xl ring-4 ring-blue-100">
                            <MousePointerClick className="w-6 h-6" />
                            Inizia la Masterclass Interattiva
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

// --- VISUALIZATIONS FOR METHOD ---

function PitagoraViz() {
    return (
        <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
            {/* Circle Arc */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="4" />

            {/* Triangle */}
            <path d="M 100 100 L 100 40 L 160 100 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />

            {/* Radius Hypotenuse */}
            <line x1={100} y1={100} x2={160} y2={40} stroke="#ef4444" strokeWidth="2" />
            <text x={135} y={65} className="text-xs font-bold fill-red-600 bg-white">r (Costante)</text>

            {/* Height x */}
            <text x={85} y={70} className="text-xs font-bold fill-blue-600">x</text>

            {/* Base y */}
            <text x={130} y={115} className="text-xs font-bold fill-green-600">y</text>

            <circle cx={100} cy={100} r="3" fill="blue" />
            <text x={90} y={115} className="text-xs font-bold fill-gray-500">Centro</text>
        </svg>
    )
}

function SimilitudineViz() {
    return (
        <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            {/* Big Triangle */}
            <path d="M 100 10 L 160 140 L 40 140 Z" fill="none" stroke="#bbf7d0" strokeWidth="2" />
            <line x1={100} y1={10} x2={100} y2={140} stroke="#86efac" strokeWidth="1" strokeDasharray="4" />

            {/* Small Triangle (Cut) */}
            <path d="M 100 10 L 130 75 L 70 75 Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />

            {/* Labels */}
            <text x={140} y={75} className="text-xs font-bold fill-green-600">r</text>
            <text x={170} y={140} className="text-xs font-bold fill-green-400">R (Grande)</text>

            <text x={85} y={50} className="text-xs font-bold fill-green-700">h</text>
            <text x={80} y={120} className="text-xs font-bold fill-green-300">H</text>

            <text x={10} y={100} className="text-[10px] fill-gray-500 italic">h/r = H/R</text>
        </svg>
    )
}


function AlgorithmStep({ num, title, desc, icon, color, hint }: any) {
    return (
        <div className="flex gap-6 items-start group">
            <div className={`flex-shrink-0 w-14 h-14 ${color} text-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-300 text-xl">0{num}.</span>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-700 mb-3">{desc}</p>
                {hint && (
                    <div className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-500 italic border-l-2 border-gray-300">
                        💡 {hint}
                    </div>
                )}
            </div>
        </div>
    )
}
