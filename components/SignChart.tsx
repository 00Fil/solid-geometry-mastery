'use client';
import React from 'react';

interface Props {
    functionName?: string;
}

/**
 * Italian School-Style Sign Chart
 * Shows: Domain | Critical Points | Sign rows | Arrows
 */
export const Exercise166SignChart: React.FC<Props> = ({ functionName = "V'(x)" }) => {
    return (
        <div className="w-full my-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
            <div className="text-sm font-bold text-amber-800 mb-4 flex items-center gap-2">
                📊 STUDIO DEL SEGNO DI {functionName}
            </div>

            {/* The Sign Table - School Style */}
            <div className="bg-white rounded-lg p-4 border border-amber-100 overflow-x-auto">
                <svg viewBox="0 0 400 160" className="w-full min-w-[350px]">
                    {/* Column headers */}
                    <text x="40" y="20" className="text-[11px] font-bold fill-slate-700" textAnchor="middle">x</text>
                    <text x="130" y="20" className="text-[11px] font-medium fill-slate-500" textAnchor="middle">0</text>
                    <text x="220" y="20" className="text-[11px] font-bold fill-blue-700" textAnchor="middle">r/3</text>
                    <text x="310" y="20" className="text-[11px] font-medium fill-slate-500" textAnchor="middle">r</text>

                    {/* Horizontal line under x */}
                    <line x1="80" y1="30" x2="360" y2="30" stroke="#94a3b8" strokeWidth="1" />

                    {/* Vertical separators */}
                    <line x1="80" y1="30" x2="80" y2="140" stroke="#94a3b8" strokeWidth="1" />
                    <line x1="170" y1="30" x2="170" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                    <line x1="270" y1="30" x2="270" y2="140" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="360" y1="30" x2="360" y2="140" stroke="#94a3b8" strokeWidth="1" />

                    {/* Row 1: V'(x) sign */}
                    <text x="40" y="55" className="text-[11px] font-bold fill-slate-700" textAnchor="middle">{functionName}</text>
                    <line x1="80" y1="65" x2="360" y2="65" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Signs */}
                    <text x="130" y="55" className="text-lg font-black fill-emerald-600" textAnchor="middle">+</text>
                    <text x="220" y="55" className="text-sm font-bold fill-amber-600" textAnchor="middle">0</text>
                    <text x="310" y="55" className="text-lg font-black fill-rose-600" textAnchor="middle">−</text>

                    {/* Row 2: V(x) behavior */}
                    <text x="40" y="95" className="text-[11px] font-bold fill-slate-700" textAnchor="middle">V(x)</text>
                    <line x1="80" y1="105" x2="360" y2="105" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Arrows */}
                    <text x="130" y="95" className="text-xl font-bold fill-emerald-600" textAnchor="middle">↗</text>
                    <text x="220" y="95" className="text-sm font-black fill-amber-600" textAnchor="middle">MAX</text>
                    <text x="310" y="95" className="text-xl font-bold fill-rose-600" textAnchor="middle">↘</text>

                    {/* Row 3: Domain indicators */}
                    <text x="40" y="130" className="text-[10px] font-medium fill-slate-500" textAnchor="middle">Dominio</text>

                    {/* Domain: hollow circles for excluded endpoints */}
                    <circle cx="90" cy="130" r="6" fill="white" stroke="#64748b" strokeWidth="2" />
                    <circle cx="350" cy="130" r="6" fill="white" stroke="#64748b" strokeWidth="2" />

                    {/* Domain line */}
                    <line x1="96" y1="130" x2="344" y2="130" stroke="#64748b" strokeWidth="2" />

                    {/* Critical point filled */}
                    <circle cx="220" cy="130" r="6" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
                </svg>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                <span><span className="text-emerald-600 font-bold">+ ↗</span> = cresce</span>
                <span><span className="text-rose-600 font-bold">− ↘</span> = decresce</span>
                <span><span className="inline-block w-3 h-3 rounded-full border-2 border-slate-500 bg-white"></span> = escluso</span>
                <span><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> = punto stazionario</span>
            </div>
        </div>
    );
};

// Default export for backward compatibility
export const SignChart = Exercise166SignChart;
