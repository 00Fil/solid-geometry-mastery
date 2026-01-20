'use client';
import React, { useState } from 'react';

interface Props {
    stepIndex?: number;
}

export const ConeInSphereViz: React.FC<Props> = ({ stepIndex = 0 }) => {
    const [is3D, setIs3D] = useState(true); // Default to 3D as user prefers

    return (
        <div className="relative w-full bg-white rounded-xl p-4">
            {/* Toggle */}
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
    const r = 130;
    const x = r / 3;
    const y = Math.sqrt(r * r - x * x);

    const O = { x: cx, y: cy };
    const V = { x: cx, y: cy - r };
    const H_pt = { x: cx, y: cy + x };
    const K = { x: cx + y, y: cy + x };

    const showPoints = stepIndex >= 0;
    const showCone = stepIndex >= 1;
    const showTriangle = stepIndex >= 2;
    const showX = stepIndex >= 3;
    const showAllVars = stepIndex >= 4;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <rect width={W} height={H} fill="#fafaff" />
            <circle cx={O.x} cy={O.y} r={r} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 4" />

            {showCone && (
                <polygon
                    points={`${V.x},${V.y} ${K.x},${K.y} ${cx - y},${H_pt.y}`}
                    fill="#dbeafe" fillOpacity="0.5" stroke="#2563eb" strokeWidth="2.5"
                />
            )}

            {showTriangle && (
                <g>
                    <polygon
                        points={`${O.x},${O.y} ${K.x},${K.y} ${H_pt.x},${H_pt.y}`}
                        fill="#fef08a" fillOpacity="0.7" stroke="#ca8a04" strokeWidth="2"
                    />
                    <rect x={H_pt.x} y={H_pt.y - 15} width="15" height="15" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                </g>
            )}

            {showX && (
                <g>
                    <line x1={O.x - 10} y1={O.y} x2={O.x - 10} y2={H_pt.y} stroke="#2563eb" strokeWidth="4" />
                    <rect x={O.x - 38} y={(O.y + H_pt.y) / 2 - 10} width="22" height="18" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                    <text x={O.x - 27} y={(O.y + H_pt.y) / 2 + 4} textAnchor="middle" className="text-sm font-bold fill-blue-700">x</text>
                </g>
            )}

            {showAllVars && (
                <g>
                    <line x1={O.x} y1={O.y} x2={K.x} y2={K.y} stroke="#dc2626" strokeWidth="3" />
                    <rect x={(O.x + K.x) / 2 + 8} y={(O.y + K.y) / 2 - 18} width="18" height="16" rx="3" fill="#fef2f2" stroke="#dc2626" />
                    <text x={(O.x + K.x) / 2 + 17} y={(O.y + K.y) / 2 - 6} textAnchor="middle" className="text-xs font-bold fill-red-700">r</text>

                    <line x1={H_pt.x + 5} y1={H_pt.y + 20} x2={K.x - 5} y2={K.y + 20} stroke="#059669" strokeWidth="2" />
                    <rect x={(H_pt.x + K.x) / 2 - 9} y={H_pt.y + 28} width="18" height="16" rx="3" fill="#dcfce7" stroke="#059669" />
                    <text x={(H_pt.x + K.x) / 2} y={H_pt.y + 40} textAnchor="middle" className="text-xs font-bold fill-emerald-700">y</text>

                    <line x1={K.x + 25} y1={V.y} x2={K.x + 25} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={K.x + 20} y1={V.y} x2={K.x + 30} y2={V.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={K.x + 20} y1={H_pt.y} x2={K.x + 30} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <rect x={K.x + 33} y={(V.y + H_pt.y) / 2 - 8} width="18" height="16" rx="3" fill="#fff7ed" stroke="#ea580c" />
                    <text x={K.x + 42} y={(V.y + H_pt.y) / 2 + 5} textAnchor="middle" className="text-xs font-bold fill-orange-700">h</text>
                </g>
            )}

            {showPoints && (
                <g>
                    <circle cx={O.x} cy={O.y} r="6" fill="#1e293b" />
                    <text x={O.x - 18} y={O.y + 5} className="text-sm font-bold fill-slate-800">O</text>
                    <circle cx={V.x} cy={V.y} r="6" fill="#2563eb" />
                    <text x={V.x + 12} y={V.y + 5} className="text-sm font-bold fill-blue-700">V</text>
                    <circle cx={H_pt.x} cy={H_pt.y} r="5" fill="#059669" />
                    <text x={H_pt.x - 18} y={H_pt.y + 5} className="text-sm font-bold fill-emerald-700">H</text>
                    <circle cx={K.x} cy={K.y} r="5" fill="#dc2626" />
                    <text x={K.x + 10} y={K.y + 5} className="text-sm font-bold fill-red-700">K</text>
                </g>
            )}
        </svg>
    );
}

// ============================================
// 3D VIEW - CLEAR WITH ALL VARIABLES
// ============================================
function View3D({ stepIndex }: { stepIndex: number }) {
    const W = 400, H = 420;
    const cx = W / 2, cy = 200;
    const r = 130;
    const x = r / 3;
    const y = Math.sqrt(r * r - x * x);

    // 3D positions
    const O = { x: cx, y: cy };
    const V = { x: cx, y: cy - r };           // Vertex at top
    const H_pt = { x: cx, y: cy + x };        // Base center
    const K = { x: cx + y, y: cy + x };       // Base edge right
    const K2 = { x: cx - y, y: cy + x };      // Base edge left

    const ellipseRy = y * 0.28;

    const showPoints = stepIndex >= 0;
    const showCone = stepIndex >= 1;
    const showX = stepIndex >= 3;
    const showAllVars = stepIndex >= 4;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <defs>
                <radialGradient id="sphereGrad3D" cx="30%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#94a3b8" />
                </radialGradient>
            </defs>

            <rect width={W} height={H} fill="#f8fafc" />

            {/* SPHERE (transparent shell) */}
            <circle cx={O.x} cy={O.y} r={r} fill="url(#sphereGrad3D)" fillOpacity="0.25" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />

            {/* CONE - Step 2+ */}
            {showCone && (
                <g>
                    {/* Back of base (dashed ellipse) */}
                    <ellipse cx={cx} cy={H_pt.y} rx={y} ry={ellipseRy} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />

                    {/* Cone surface */}
                    <path
                        d={`M ${K2.x} ${K2.y} L ${V.x} ${V.y} L ${K.x} ${K.y}`}
                        fill="#dbeafe" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2"
                    />

                    {/* Front of base (solid ellipse) */}
                    <path
                        d={`M ${K2.x} ${K2.y} A ${y} ${ellipseRy} 0 0 0 ${K.x} ${K.y}`}
                        fill="none" stroke="#2563eb" strokeWidth="2"
                    />

                    {/* Central axis (dashed) */}
                    <line x1={V.x} y1={V.y} x2={H_pt.x} y2={H_pt.y} stroke="#64748b" strokeWidth="1" strokeDasharray="5 3" />
                </g>
            )}

            {/* VARIABLE x (blue) - Distance O to H */}
            {showX && (
                <g>
                    <line x1={O.x + 12} y1={O.y} x2={O.x + 12} y2={H_pt.y} stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                    <circle cx={O.x + 12} cy={O.y} r="3" fill="#2563eb" />
                    <circle cx={O.x + 12} cy={H_pt.y} r="3" fill="#2563eb" />
                    {/* Label x */}
                    <rect x={O.x + 22} y={(O.y + H_pt.y) / 2 - 10} width="24" height="20" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                    <text x={O.x + 34} y={(O.y + H_pt.y) / 2 + 5} textAnchor="middle" className="text-sm font-black fill-blue-700">x</text>
                </g>
            )}

            {/* ALL VARIABLES - Step 5+ */}
            {showAllVars && (
                <g>
                    {/* r (red) - O to K (hypotenuse) */}
                    <line x1={O.x} y1={O.y} x2={K.x - 5} y2={K.y - ellipseRy * 0.3} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                    <rect x={(O.x + K.x) / 2 + 15} y={(O.y + K.y) / 2 - 20} width="24" height="20" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
                    <text x={(O.x + K.x) / 2 + 27} y={(O.y + K.y) / 2 - 5} textAnchor="middle" className="text-sm font-black fill-red-700">r</text>

                    {/* y (green) - Base radius H to K */}
                    <line x1={H_pt.x} y1={H_pt.y + ellipseRy + 15} x2={K.x} y2={K.y + ellipseRy + 15} stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                    <polygon points={`${H_pt.x},${H_pt.y + ellipseRy + 15} ${H_pt.x + 8},${H_pt.y + ellipseRy + 12} ${H_pt.x + 8},${H_pt.y + ellipseRy + 18}`} fill="#059669" />
                    <polygon points={`${K.x},${K.y + ellipseRy + 15} ${K.x - 8},${K.y + ellipseRy + 12} ${K.x - 8},${K.y + ellipseRy + 18}`} fill="#059669" />
                    <rect x={(H_pt.x + K.x) / 2 - 12} y={H_pt.y + ellipseRy + 25} width="24" height="20" rx="4" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
                    <text x={(H_pt.x + K.x) / 2} y={H_pt.y + ellipseRy + 40} textAnchor="middle" className="text-sm font-black fill-emerald-700">y</text>

                    {/* h (orange) - Height V to H (bracket on left) */}
                    <line x1={K2.x - 25} y1={V.y} x2={K2.x - 25} y2={H_pt.y} stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                    <line x1={K2.x - 32} y1={V.y} x2={K2.x - 18} y2={V.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={K2.x - 32} y1={H_pt.y} x2={K2.x - 18} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <rect x={K2.x - 60} y={(V.y + H_pt.y) / 2 - 10} width="24" height="20" rx="4" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
                    <text x={K2.x - 48} y={(V.y + H_pt.y) / 2 + 5} textAnchor="middle" className="text-sm font-black fill-orange-700">h</text>
                </g>
            )}

            {/* POINT LABELS - Always visible */}
            {showPoints && (
                <g>
                    {/* O - Center of sphere */}
                    <circle cx={O.x} cy={O.y} r="7" fill="#1e293b" stroke="white" strokeWidth="2" />
                    <text x={O.x - 20} y={O.y + 5} className="text-sm font-black fill-slate-800">O</text>

                    {/* V - Vertex */}
                    <circle cx={V.x} cy={V.y} r="7" fill="#2563eb" stroke="white" strokeWidth="2" />
                    <text x={V.x + 15} y={V.y + 5} className="text-sm font-black fill-blue-700">V</text>

                    {/* H - Base center */}
                    <circle cx={H_pt.x} cy={H_pt.y} r="6" fill="#059669" stroke="white" strokeWidth="2" />
                    <text x={H_pt.x - 20} y={H_pt.y + 5} className="text-sm font-black fill-emerald-700">H</text>

                    {/* K - Base edge */}
                    <circle cx={K.x} cy={K.y} r="6" fill="#dc2626" stroke="white" strokeWidth="2" />
                    <text x={K.x + 12} y={K.y + 5} className="text-sm font-black fill-red-700">K</text>
                </g>
            )}

            {/* Legend at bottom */}
            <g transform="translate(20, 395)">
                <text className="text-[10px] fill-slate-400 font-medium">
                    O=centro sfera · V=vertice · H=centro base · K=bordo base
                </text>
            </g>
        </svg>
    );
}
