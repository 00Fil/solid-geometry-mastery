
'use client';
import React, { use, useState, useEffect } from 'react';
import { exercises, Step } from '@/data/exercises';
import { notFound } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { SurvivalKit } from '@/components/SurvivalKit';
import { MathFormula } from '@/components/MathFormula';
import { MarkdownMath } from '@/components/MarkdownMath';
import { Exercise166SignChart } from '@/components/SignChart';
import { CylinderInSphereViz } from '@/components/visualizations/CylinderInSphere';
import { ConeInSphereViz } from '@/components/visualizations/ConeInSphere';
import { ConeCircumscribedViz } from '@/components/visualizations/ConeCircumscribedSphere';
import { PyramidViz } from '@/components/visualizations/PyramidViz';
import { ChevronRight, CheckCircle2, Lightbulb, GraduationCap, Lock, Shield, Eye, ArrowRight, AlertCircle, Check, Calculator, BookOpen, PenTool, Hash } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const exercise = exercises.find(e => e.id === id);
    const [showSurvivalKit, setShowSurvivalKit] = useState(false);
    const [unlockedStepIndex, setUnlockedStepIndex] = useState(0);

    if (!exercise) notFound();

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <Sidebar />
            <SurvivalKit isOpen={showSurvivalKit} onClose={() => setShowSurvivalKit(false)} />

            <main className="flex-1 flex flex-col h-full ml-64">
                {/* HEADLINE */}
                <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                            {exercise.id.split('-')[0]}
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 leading-tight">{exercise.title}</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">{exercise.category}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowSurvivalKit(true)} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
                        <Shield className="w-5 h-5" /> Kit
                    </button>
                </header>

                {/* 2-COLUMN SPLIT */}
                <div className="flex-1 grid grid-cols-12 overflow-hidden">

                    {/* LEFT: VISUALIZATION (Sticky) - 40% */}
                    <div className="col-span-5 bg-slate-100 border-r border-slate-200 p-6 flex flex-col items-center overflow-y-auto">
                        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-6">
                            <div className="p-3 border-b bg-slate-50 flex justify-between items-center bg-slate-50/50 backdrop-blur-sm rounded-t-2xl">
                                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                                    <Eye className="w-4 h-4" /> Visualizzazione
                                </span>
                            </div>
                            <div className="p-4 flex items-center justify-center min-h-[400px]">
                                {renderVisualization(exercise.visualizationType, unlockedStepIndex)}
                            </div>
                        </div>

                        {/* Variables Legend */}
                        <div className="w-full mt-6 grid grid-cols-1 gap-2 sticky top-[480px]">
                            {exercise.variables.map((v, i) => (
                                <div key={i} className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                                    <span className={clsx("font-mono font-bold text-xl", v.color)}>{v.symbol}</span>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{v.name}</span>
                                        <span className="text-[11px] text-slate-500 leading-tight">{v.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: THE UNIFIED NOTEBOOK (Scrollable) - 60% */}
                    <div className="col-span-7 bg-white overflow-y-auto">
                        <div className="max-w-3xl mx-auto p-8 pb-32">

                            {/* Problem Statement Card */}
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 shadow-sm">
                                <h3 className="text-blue-900 font-black mb-3 text-lg flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" /> Problema
                                </h3>
                                <MarkdownMath content={exercise.problemStatement} className="text-blue-900/80 text-lg leading-relaxed font-medium" />
                            </div>

                            {/* The Notebook Stream */}
                            <div className="relative border-l-2 border-slate-100 pl-8 ml-4 space-y-12">
                                {exercise.steps.map((step, index) => (
                                    <NotebookStep
                                        key={step.id}
                                        step={step}
                                        index={index}
                                        isUnlocked={index <= unlockedStepIndex}
                                        isCurrent={index === unlockedStepIndex}
                                        onUnlock={() => setUnlockedStepIndex(Math.min(unlockedStepIndex + 1, exercise.steps.length))}
                                    />
                                ))}
                            </div>

                            {/* Completion State */}
                            {unlockedStepIndex >= exercise.steps.length && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h2 className="text-2xl font-black text-green-900 mb-2">Esercizio Completato!</h2>
                                    <p className="text-green-700">Hai costruito la soluzione passo dopo passo sul tuo quaderno virtuale.</p>
                                </motion.div>
                            )}

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// ... Visualizations Helper ...
function renderVisualization(type: string, stepIndex: number) {
    switch (type) {
        case 'cylinder-in-sphere': return <CylinderInSphereViz stepIndex={stepIndex} />;
        case 'cone-in-sphere': return <ConeInSphereViz stepIndex={stepIndex} />;
        case 'cone-circumscribed-sphere': return <ConeCircumscribedViz stepIndex={stepIndex} />;
        case 'pyramid': return <PyramidViz stepIndex={stepIndex} />;
        default: return <div className="text-gray-400 italic">Visualizzazione non disponibile</div>;
    }
}

// ... Unified Notebook Step Component ...
function NotebookStep({ step, index, isUnlocked, isCurrent, onUnlock }: any) {
    // If locked, show a placeholder
    if (!isUnlocked) {
        return (
            <div className="opacity-30 grayscale pointer-events-none select-none py-4">
                <div className="flex items-center gap-4 mb-2">
                    <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">{index + 1}</span>
                    <h3 className="font-bold text-slate-400 text-xl">???</h3>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={clsx(
                "relative group transition-all duration-500",
                isCurrent ? "scale-[1.01]" : "opacity-80 hover:opacity-100"
            )}
        >
            {/* Step Number Bubble */}
            <div className={clsx(
                "absolute -left-[45px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border-2 z-10",
                isCurrent ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100" : "bg-white text-slate-500 border-slate-200"
            )}>
                {index + 1}
            </div>

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className={clsx("font-bold text-xl", isCurrent ? "text-slate-900" : "text-slate-700")}>
                    {step.title}
                </h3>
                {step.tags && (
                    <div className="flex gap-2">
                        {step.tags.map((t: any) => (
                            <span key={t.label} className={clsx(
                                "text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm border",
                                t.type === 'teorema' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                    t.type === 'formula' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        'bg-slate-50 text-slate-600 border-slate-200'
                            )}>
                                {t.label}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Card (The "Notebook Page") */}
            <div className={clsx(
                "rounded-xl border p-6 shadow-sm transition-all",
                isCurrent ? "bg-white border-blue-200 shadow-md ring-1 ring-blue-100" : "bg-slate-50/50 border-slate-200"
            )}>
                {/* 1. The Explanation (Why & How) */}
                <div className="mb-6 text-slate-700 leading-relaxed text-base">
                    <MarkdownMath content={step.description} />
                </div>

                {/* 2. The Formal Math (Notebook style - Light Mode) */}
                {(step.notebookExplanation || step.formula) && (
                    <div className="bg-white rounded-lg p-6 border-2 border-slate-100 shadow-sm overflow-x-auto mt-4 relative">
                        <div className="text-slate-800 text-lg font-mono font-medium">
                            <MarkdownMath content={step.notebookExplanation || step.formula} />
                        </div>
                    </div>
                )}

                {/* 3. Special: Sign Chart for Step 12 */}
                {step.id === '12' && <Exercise166SignChart />}
            </div>

            {/* Action Button */}
            {isCurrent && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onUnlock}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 transform transition-all hover:scale-105 active:scale-95"
                    >
                        Prosegui <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </motion.div>
    )
}
