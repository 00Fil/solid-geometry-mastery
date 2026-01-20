'use client';
import React, { useState } from 'react';

interface Props {
    stepIndex?: number;
}

export const CylinderInSphereViz: React.FC<Props> = ({ stepIndex = 0 }) => {
    const [is3D, setIs3D] = useState(true);

    return (
        <div className="relative w-full bg-white rounded-xl p-4">
            <div className="flex gap-2 mb-4 justify-center">
                <button
                    onClick={() => setIs3D(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!is3D ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    2D Sezione
                </button>
                <button
                    onClick={() => setIs3D(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${is3D ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    3D Vista
                </button>
            </div>

            <div className="w-full aspect-square max-w-[380px] mx-auto">
                {is3D ? <View3D stepIndex={stepIndex} /> : <View2D stepIndex={stepIndex} />}
            </div>
        </div>
    )
}

// ============================================
// 2D VIEW
// ============================================
function View2D({ stepIndex }: { stepIndex: number }) {
    const W = 400, H = 400;
    const cx = W / 2, cy = H / 2;
    const r = 140;

    // Cylinder geometry (x = half-height)
    const x = 60;
    const y = Math.sqrt(r * r - x * x); // base radius

    // Points
    const O = { x: cx, y: cy };
    const A = { x: cx, y: cy - x };      // Top center
    const B = { x: cx, y: cy + x };      // Bottom center
    const K = { x: cx + y, y: cy - x };  // Top edge

    const showPoints = stepIndex >= 0;
    const showCylinder = stepIndex >= 1;
    const showTriangle = stepIndex >= 2;
    const showX = stepIndex >= 3;
    const showAllVars = stepIndex >= 4;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <rect width={W} height={H} fill="#fafaff" />

            {/* Sphere */}
            <circle cx={O.x} cy={O.y} r={r} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 4" />

            {/* Cylinder rectangle */}
            {showCylinder && (
                <rect
                    x={cx - y} y={cy - x}
                    width={2 * y} height={2 * x}
                    fill="#dbeafe" fillOpacity="0.5" stroke="#2563eb" strokeWidth="2.5"
                />
            )}

            {/* Right triangle OAK */}
            {showTriangle && (
                <g>
                    <polygon
                        points={`${O.x},${O.y} ${K.x},${K.y} ${A.x},${A.y}`}
                        fill="#fef08a" fillOpacity="0.7" stroke="#ca8a04" strokeWidth="2"
                    />
                    <rect x={A.x} y={A.y} width="12" height="12" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                </g>
            )}

            {/* Variable x (half-height) */}
            {showX && (
                <g>
                    <line x1={O.x - 15} y1={O.y} x2={O.x - 15} y2={A.y} stroke="#2563eb" strokeWidth="4" />
                    <rect x={O.x - 45} y={(O.y + A.y) / 2 - 10} width="24" height="18" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                    <text x={O.x - 33} y={(O.y + A.y) / 2 + 4} textAnchor="middle" className="text-sm font-bold fill-blue-700">x</text>
                </g>
            )}

            {/* All variables */}
            {showAllVars && (
                <g>
                    {/* r (hypotenuse) */}
                    <line x1={O.x} y1={O.y} x2={K.x} y2={K.y} stroke="#dc2626" strokeWidth="3" />
                    <rect x={(O.x + K.x) / 2 + 5} y={(O.y + K.y) / 2 - 15} width="18" height="16" rx="3" fill="#fef2f2" stroke="#dc2626" />
                    <text x={(O.x + K.x) / 2 + 14} y={(O.y + K.y) / 2 - 3} textAnchor="middle" className="text-xs font-bold fill-red-700">r</text>

                    {/* y (base radius) */}
                    <line x1={A.x + 5} y1={A.y - 15} x2={K.x - 5} y2={K.y - 15} stroke="#059669" strokeWidth="2" />
                    <rect x={(A.x + K.x) / 2 - 9} y={A.y - 35} width="18" height="16" rx="3" fill="#dcfce7" stroke="#059669" />
                    <text x={(A.x + K.x) / 2} y={A.y - 23} textAnchor="middle" className="text-xs font-bold fill-emerald-700">y</text>

                    {/* h = 2x (full height on right) */}
                    <line x1={K.x + 25} y1={cy - x} x2={K.x + 25} y2={cy + x} stroke="#ea580c" strokeWidth="2" />
                    <line x1={K.x + 20} y1={cy - x} x2={K.x + 30} y2={cy - x} stroke="#ea580c" strokeWidth="2" />
                    <line x1={K.x + 20} y1={cy + x} x2={K.x + 30} y2={cy + x} stroke="#ea580c" strokeWidth="2" />
                    <rect x={K.x + 33} y={cy - 8} width="24" height="16" rx="3" fill="#fff7ed" stroke="#ea580c" />
                    <text x={K.x + 45} y={cy + 5} textAnchor="middle" className="text-xs font-bold fill-orange-700">h=2x</text>
                </g>
            )}

            {/* Point labels */}
            {showPoints && (
                <g>
                    <circle cx={O.x} cy={O.y} r="6" fill="#1e293b" />
                    <text x={O.x - 18} y={O.y + 5} className="text-sm font-bold fill-slate-800">O</text>

                    <circle cx={A.x} cy={A.y} r="5" fill="#2563eb" />
                    <text x={A.x - 18} y={A.y + 5} className="text-sm font-bold fill-blue-700">A</text>

                    <circle cx={B.x} cy={B.y} r="5" fill="#059669" />
                    <text x={B.x - 18} y={B.y + 5} className="text-sm font-bold fill-emerald-700">B</text>

                    <circle cx={K.x} cy={K.y} r="5" fill="#dc2626" />
                    <text x={K.x + 10} y={K.y + 5} className="text-sm font-bold fill-red-700">K</text>
                </g>
            )}
        </svg>
    );
}

// ============================================
// 3D VIEW
// ============================================
function View3D({ stepIndex }: { stepIndex: number }) {
    const W = 400, H = 420;
    const cx = W / 2, cy = 200;
    const r = 130;
    const x = 55; // half-height
    const y = Math.sqrt(r * r - x * x);

    const O = { x: cx, y: cy };
    const A = { x: cx, y: cy - x };
    const B = { x: cx, y: cy + x };
    const K = { x: cx + y, y: cy - x };

    const ellipseRy = y * 0.28;

    const showPoints = stepIndex >= 0;
    const showCylinder = stepIndex >= 1;
    const showX = stepIndex >= 3;
    const showAllVars = stepIndex >= 4;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <defs>
                <radialGradient id="sphereGradCyl" cx="30%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#94a3b8" />
                </radialGradient>
            </defs>

            <rect width={W} height={H} fill="#f8fafc" />

            {/* Sphere */}
            <circle cx={O.x} cy={O.y} r={r} fill="url(#sphereGradCyl)" fillOpacity="0.25" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />

            {/* Cylinder */}
            {showCylinder && (
                <g>
                    {/* Back ellipses (dashed) */}
                    <ellipse cx={cx} cy={A.y} rx={y} ry={ellipseRy} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
                    <ellipse cx={cx} cy={B.y} rx={y} ry={ellipseRy} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />

                    {/* Cylinder sides */}
                    <line x1={cx - y} y1={A.y} x2={cx - y} y2={B.y} stroke="#2563eb" strokeWidth="2" />
                    <line x1={cx + y} y1={A.y} x2={cx + y} y2={B.y} stroke="#2563eb" strokeWidth="2" />

                    {/* Front ellipses */}
                    <path d={`M ${cx - y} ${A.y} A ${y} ${ellipseRy} 0 0 0 ${cx + y} ${A.y}`} fill="none" stroke="#2563eb" strokeWidth="2" />
                    <path d={`M ${cx - y} ${B.y} A ${y} ${ellipseRy} 0 0 0 ${cx + y} ${B.y}`} fill="none" stroke="#2563eb" strokeWidth="2" />

                    {/* Fill for front face */}
                    <rect x={cx - y} y={A.y} width={2 * y} height={B.y - A.y} fill="#dbeafe" fillOpacity="0.3" />

                    {/* Axis */}
                    <line x1={cx} y1={A.y} x2={cx} y2={B.y} stroke="#64748b" strokeWidth="1" strokeDasharray="5 3" />
                </g>
            )}

            {/* Variable x */}
            {showX && (
                <g>
                    <line x1={O.x + 15} y1={O.y} x2={O.x + 15} y2={A.y} stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                    <circle cx={O.x + 15} cy={O.y} r="3" fill="#2563eb" />
                    <circle cx={O.x + 15} cy={A.y} r="3" fill="#2563eb" />
                    <rect x={O.x + 25} y={(O.y + A.y) / 2 - 10} width="24" height="20" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                    <text x={O.x + 37} y={(O.y + A.y) / 2 + 5} textAnchor="middle" className="text-sm font-black fill-blue-700">x</text>
                </g>
            )}

            {/* All variables */}
            {showAllVars && (
                <g>
                    {/* r */}
                    <line x1={O.x} y1={O.y} x2={K.x - 5} y2={K.y + ellipseRy * 0.3} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                    <rect x={(O.x + K.x) / 2 + 10} y={(O.y + K.y) / 2 - 18} width="24" height="20" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
                    <text x={(O.x + K.x) / 2 + 22} y={(O.y + K.y) / 2 - 3} textAnchor="middle" className="text-sm font-black fill-red-700">r</text>

                    {/* y */}
                    <line x1={cx} y1={A.y - ellipseRy - 15} x2={K.x} y2={A.y - ellipseRy - 15} stroke="#059669" strokeWidth="2" />
                    <rect x={(cx + K.x) / 2 - 12} y={A.y - ellipseRy - 40} width="24" height="20" rx="4" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
                    <text x={(cx + K.x) / 2} y={A.y - ellipseRy - 25} textAnchor="middle" className="text-sm font-black fill-emerald-700">y</text>

                    {/* h = 2x */}
                    <line x1={cx - y - 25} y1={A.y} x2={cx - y - 25} y2={B.y} stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                    <line x1={cx - y - 32} y1={A.y} x2={cx - y - 18} y2={A.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={cx - y - 32} y1={B.y} x2={cx - y - 18} y2={B.y} stroke="#ea580c" strokeWidth="2" />
                    <rect x={cx - y - 68} y={cy - 10} width="36" height="20" rx="4" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
                    <text x={cx - y - 50} y={cy + 5} textAnchor="middle" className="text-xs font-black fill-orange-700">h=2x</text>
                </g>
            )}

            {/* Points */}
            {showPoints && (
                <g>
                    <circle cx={O.x} cy={O.y} r="7" fill="#1e293b" stroke="white" strokeWidth="2" />
                    <text x={O.x - 20} y={O.y + 5} className="text-sm font-black fill-slate-800">O</text>

                    <circle cx={A.x} cy={A.y} r="6" fill="#2563eb" stroke="white" strokeWidth="2" />
                    <text x={A.x + 12} y={A.y + 5} className="text-sm font-black fill-blue-700">A</text>

                    <circle cx={B.x} cy={B.y} r="6" fill="#059669" stroke="white" strokeWidth="2" />
                    <text x={B.x + 12} y={B.y + 5} className="text-sm font-black fill-emerald-700">B</text>

                    <circle cx={K.x} cy={K.y} r="6" fill="#dc2626" stroke="white" strokeWidth="2" />
                    <text x={K.x + 12} y={K.y - 5} className="text-sm font-black fill-red-700">K</text>
                </g>
            )}

            {/* Legend */}
            <g transform="translate(20, 395)">
                <text className="text-[10px] fill-slate-400 font-medium">
                    O=centro · A=centro base sup · B=centro base inf · K=bordo
                </text>
            </g>
        </svg>
    );
}
