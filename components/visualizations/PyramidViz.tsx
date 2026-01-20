
'use client';
import React, { useState } from 'react';
import { Box, Circle } from 'lucide-react';

interface Props {
    stepIndex?: number;
}

export const PyramidViz: React.FC<Props> = ({ stepIndex = 0 }) => {
    const [is3D, setIs3D] = useState(false);
    const showVars = stepIndex >= 1;

    return (
        <div className="relative w-full h-[400px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
                onClick={() => setIs3D(!is3D)}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
                {is3D ? <Circle className="w-4 h-4 text-blue-500" /> : <Box className="w-4 h-4 text-purple-500" />}
                {is3D ? "Passa a 2D (Radiografia)" : "Passa a 3D (Solido)"}
            </button>

            {is3D ? <Pyramid3D showVars={showVars} /> : <Pyramid2D showVars={showVars} />}
        </div>
    )
}

function Pyramid2D({ showVars }: any) {
    const cx = 200;
    const cy = 300;
    const topY = 50;
    const baseWidth = 120;

    return (
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="overflow-visible transition-all duration-500">
            <path d={`M ${cx} ${topY} L ${cx + baseWidth} ${cy} L ${cx} ${cy} Z`} fill={showVars ? "#fef3c7" : "#e2e8f0"} stroke="#fbbf24" strokeWidth="2" className="transition-all" />

            <g style={{ opacity: showVars ? 1 : 0, transition: 'opacity 0.5s' }}>
                <line x1={cx} y1={topY} x2={cx} y2={cy} stroke="#2563eb" strokeWidth="3" />
                <text x={cx - 20} y={200} className="font-bold fill-blue-600 text-lg">h</text>
                <line x1={cx} y1={cy} x2={cx + baseWidth} y2={cy} stroke="#16a34a" strokeWidth="3" />
                <text x={cx + 50} y={cy + 25} className="font-bold fill-green-600 text-lg">L/2</text>
                <line x1={cx} y1={topY} x2={cx + baseWidth} y2={cy} stroke="#dc2626" strokeWidth="3" />
                <text x={cx + 70} y={180} className="font-bold fill-red-600 text-lg">a</text>
                <path d={`M ${cx + 10} ${cy} L ${cx + 10} ${cy - 10} L ${cx} ${cy - 10}`} fill="none" stroke="#94a3b8" />
            </g>

            <text x={20} y={380} className="text-xs fill-gray-400 font-mono">VISTA 2D (SEZIONE)</text>
            <text x={cx - 80} y={topY} className="text-sm fill-gray-500 font-bold">Vertice</text>
            <text x={cx - 80} y={cy} className="text-sm fill-gray-500 font-bold">Centro Base</text>
        </svg>
    )
}

function Pyramid3D({ showVars }: any) {
    const peak = { x: 200, y: 70 };
    const baseFL = { x: 100, y: 300 };
    const baseFR = { x: 300, y: 300 };
    const baseBL = { x: 150, y: 250 };
    const center = { x: 200, y: 275 };
    const midRight = { x: 275, y: 275 };

    return (
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="overflow-visible transition-all">
            <path d={`M ${baseFL.x} ${baseFL.y} L ${baseFR.x} ${baseFR.y} L 250 250 L ${baseBL.x} ${baseBL.y} Z`} fill="#f0f9ff" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
            <line x1={peak.x} y1={peak.y} x2={baseFL.x} y2={baseFL.y} stroke="#64748b" strokeWidth="2" />
            <line x1={peak.x} y1={peak.y} x2={baseFR.x} y2={baseFR.y} stroke="#64748b" strokeWidth="2" />
            <line x1={peak.x} y1={peak.y} x2={baseBL.x} y2={baseBL.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />

            <g style={{ opacity: showVars ? 1 : 0, transition: 'opacity 1s' }}>
                <line x1={peak.x} y1={peak.y} x2={center.x} y2={center.y} stroke="#2563eb" strokeWidth="2" />
                <line x1={center.x} y1={center.y} x2={midRight.x} y2={midRight.y} stroke="#16a34a" strokeWidth="2" />
                <line x1={peak.x} y1={peak.y} x2={midRight.x} y2={midRight.y} stroke="#dc2626" strokeWidth="2" />
                <path d={`M ${peak.x} ${peak.y} L ${center.x} ${center.y} L ${midRight.x} ${midRight.y} Z`} fill="#fef3c7" opacity="0.4" />
                <text x={260} y={180} className="font-bold fill-red-600 text-sm">a</text>
                <text x={185} y={200} className="font-bold fill-blue-600 text-sm">h</text>
            </g>

            <text x={20} y={380} className="text-xs fill-gray-400 font-mono">VISTA 3D (PROSPETTIVA)</text>
        </svg>
    )
}
