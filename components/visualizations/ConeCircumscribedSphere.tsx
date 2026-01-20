'use client';
import React, { useState } from 'react';

interface Props {
    stepIndex?: number;
}

export const ConeCircumscribedViz: React.FC<Props> = ({ stepIndex = 0 }) => {
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
// 2D VIEW - Cone with inscribed sphere
// ============================================
function View2D({ stepIndex }: { stepIndex: number }) {
    const W = 400, H = 420;
    const cx = W / 2;

    // Geometry: sphere inside cone
    const r = 50;  // Sphere radius
    const O = { x: cx, y: 260 };  // Sphere center
    const V = { x: cx, y: 80 };   // Cone vertex
    const H_pt = { x: cx, y: 350 }; // Cone base center

    // Cone geometry (tangent to sphere)
    const h = H_pt.y - V.y;  // Height
    const y = 100; // Base radius (adjusted for visual)
    const K = { x: cx + y, y: H_pt.y }; // Base edge

    // Tangent point T (where sphere touches cone side)
    const T = { x: cx + 40, y: 220 };

    const showPoints = stepIndex >= 0;
    const showCone = stepIndex >= 1;
    const showTangent = stepIndex >= 2;
    const showVars = stepIndex >= 3;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <rect width={W} height={H} fill="#fafaff" />

            {/* SPHERE (inscribed) */}
            <circle cx={O.x} cy={O.y} r={r} fill="#dbeafe" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2" />

            {/* CONE (circumscribed) */}
            {showCone && (
                <g>
                    <path
                        d={`M ${V.x} ${V.y} L ${K.x} ${K.y} L ${cx - y} ${H_pt.y} Z`}
                        fill="none" stroke="#dc2626" strokeWidth="2.5"
                    />
                    {/* Base line */}
                    <line x1={cx - y} y1={H_pt.y} x2={K.x} y2={K.y} stroke="#dc2626" strokeWidth="2.5" />
                </g>
            )}

            {/* TANGENT POINT and radius */}
            {showTangent && (
                <g>
                    {/* Radius to tangent point (perpendicular to side) */}
                    <line x1={O.x} y1={O.y} x2={T.x} y2={T.y} stroke="#059669" strokeWidth="2" strokeDasharray="4" />
                    <circle cx={T.x} cy={T.y} r="5" fill="#059669" />
                    <text x={T.x + 10} y={T.y} className="text-xs font-bold fill-emerald-700">T</text>

                    {/* Right angle marker at T */}
                    <rect x={T.x - 8} y={T.y - 2} width="8" height="8" fill="none" stroke="#059669" strokeWidth="1" transform={`rotate(-25 ${T.x} ${T.y})`} />
                </g>
            )}

            {/* VARIABLES */}
            {showVars && (
                <g>
                    {/* r (sphere radius) */}
                    <line x1={O.x} y1={O.y} x2={O.x + r} y2={O.y} stroke="#3b82f6" strokeWidth="3" />
                    <rect x={O.x + r / 2 - 9} y={O.y + 8} width="18" height="16" rx="3" fill="#dbeafe" stroke="#3b82f6" />
                    <text x={O.x + r / 2} y={O.y + 20} textAnchor="middle" className="text-xs font-bold fill-blue-700">r</text>

                    {/* h (height - on left) */}
                    <line x1={cx - y - 25} y1={V.y} x2={cx - y - 25} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={cx - y - 32} y1={V.y} x2={cx - y - 18} y2={V.y} stroke="#ea580c" strokeWidth="2" />
                    <line x1={cx - y - 32} y1={H_pt.y} x2={cx - y - 18} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <rect x={cx - y - 50} y={(V.y + H_pt.y) / 2 - 8} width="18" height="16" rx="3" fill="#fff7ed" stroke="#ea580c" />
                    <text x={cx - y - 41} y={(V.y + H_pt.y) / 2 + 5} textAnchor="middle" className="text-xs font-bold fill-orange-700">h</text>

                    {/* y (base radius) */}
                    <line x1={H_pt.x + 5} y1={H_pt.y + 15} x2={K.x - 5} y2={K.y + 15} stroke="#dc2626" strokeWidth="2" />
                    <rect x={(H_pt.x + K.x) / 2 - 9} y={H_pt.y + 22} width="18" height="16" rx="3" fill="#fef2f2" stroke="#dc2626" />
                    <text x={(H_pt.x + K.x) / 2} y={H_pt.y + 34} textAnchor="middle" className="text-xs font-bold fill-red-700">y</text>
                </g>
            )}

            {/* POINT LABELS */}
            {showPoints && (
                <g>
                    {/* V - Vertex */}
                    <circle cx={V.x} cy={V.y} r="6" fill="#dc2626" />
                    <text x={V.x + 12} y={V.y + 5} className="text-sm font-bold fill-red-700">V</text>

                    {/* O - Sphere center */}
                    <circle cx={O.x} cy={O.y} r="6" fill="#3b82f6" />
                    <text x={O.x - 18} y={O.y + 5} className="text-sm font-bold fill-blue-700">O</text>

                    {/* H - Base center */}
                    <circle cx={H_pt.x} cy={H_pt.y} r="5" fill="#059669" />
                    <text x={H_pt.x - 18} y={H_pt.y + 5} className="text-sm font-bold fill-emerald-700">H</text>

                    {/* K - Base edge */}
                    <circle cx={K.x} cy={K.y} r="5" fill="#dc2626" />
                    <text x={K.x + 10} y={K.y + 5} className="text-sm font-bold fill-red-700">K</text>
                </g>
            )}

            {/* Legend */}
            <g transform="translate(20, 400)">
                <text className="text-[10px] fill-slate-400">
                    Sfera inscritta (blu) · Cono circoscritto (rosso)
                </text>
            </g>
        </svg>
    );
}

// ============================================
// 3D VIEW
// ============================================
function View3D({ stepIndex }: { stepIndex: number }) {
    const W = 400, H = 420;
    const cx = W / 2;

    const r = 45;
    const O = { x: cx, y: 250 };
    const V = { x: cx, y: 80 };
    const H_pt = { x: cx, y: 340 };
    const y = 95;
    const K = { x: cx + y, y: H_pt.y };
    const ellipseRy = y * 0.25;

    const showPoints = stepIndex >= 0;
    const showCone = stepIndex >= 1;
    const showVars = stepIndex >= 3;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            <defs>
                <radialGradient id="sphereGradCirc" cx="30%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#eff6ff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                </radialGradient>
            </defs>

            <rect width={W} height={H} fill="#f8fafc" />

            {/* CONE */}
            {showCone && (
                <g>
                    {/* Back ellipse */}
                    <ellipse cx={cx} cy={H_pt.y} rx={y} ry={ellipseRy} fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="4" />

                    {/* Cone sides */}
                    <path
                        d={`M ${cx - y} ${H_pt.y} L ${V.x} ${V.y} L ${cx + y} ${H_pt.y}`}
                        fill="#fee2e2" fillOpacity="0.3" stroke="#dc2626" strokeWidth="2"
                    />

                    {/* Front ellipse */}
                    <path d={`M ${cx - y} ${H_pt.y} A ${y} ${ellipseRy} 0 0 0 ${cx + y} ${H_pt.y}`} fill="none" stroke="#dc2626" strokeWidth="2" />

                    {/* Axis */}
                    <line x1={V.x} y1={V.y} x2={H_pt.x} y2={H_pt.y} stroke="#64748b" strokeWidth="1" strokeDasharray="5" />
                </g>
            )}

            {/* SPHERE (inside) */}
            <circle cx={O.x} cy={O.y} r={r} fill="url(#sphereGradCirc)" stroke="#3b82f6" strokeWidth="2" />

            {/* VARIABLES */}
            {showVars && (
                <g>
                    {/* r */}
                    <line x1={O.x} y1={O.y} x2={O.x + r} y2={O.y} stroke="#3b82f6" strokeWidth="3" />
                    <rect x={O.x + r / 2 - 9} y={O.y - 22} width="18" height="16" rx="3" fill="#dbeafe" stroke="#3b82f6" />
                    <text x={O.x + r / 2} y={O.y - 10} textAnchor="middle" className="text-xs font-bold fill-blue-700">r</text>

                    {/* h */}
                    <line x1={cx - y - 20} y1={V.y} x2={cx - y - 20} y2={H_pt.y} stroke="#ea580c" strokeWidth="2" />
                    <rect x={cx - y - 42} y={(V.y + H_pt.y) / 2 - 8} width="18" height="16" rx="3" fill="#fff7ed" stroke="#ea580c" />
                    <text x={cx - y - 33} y={(V.y + H_pt.y) / 2 + 5} textAnchor="middle" className="text-xs font-bold fill-orange-700">h</text>

                    {/* y */}
                    <rect x={cx + y / 2 - 9} y={H_pt.y + ellipseRy + 10} width="18" height="16" rx="3" fill="#fef2f2" stroke="#dc2626" />
                    <text x={cx + y / 2} y={H_pt.y + ellipseRy + 22} textAnchor="middle" className="text-xs font-bold fill-red-700">y</text>
                </g>
            )}

            {/* POINTS */}
            {showPoints && (
                <g>
                    <circle cx={V.x} cy={V.y} r="7" fill="#dc2626" stroke="white" strokeWidth="2" />
                    <text x={V.x + 12} y={V.y + 5} className="text-sm font-black fill-red-700">V</text>

                    <circle cx={O.x} cy={O.y} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                    <text x={O.x - 18} y={O.y + 5} className="text-sm font-black fill-blue-700">O</text>

                    <circle cx={H_pt.x} cy={H_pt.y} r="5" fill="#059669" stroke="white" strokeWidth="2" />
                    <text x={H_pt.x + 12} y={H_pt.y + 5} className="text-sm font-black fill-emerald-700">H</text>

                    <circle cx={K.x} cy={K.y} r="5" fill="#dc2626" stroke="white" strokeWidth="2" />
                    <text x={K.x + 10} y={K.y - 8} className="text-sm font-black fill-red-700">K</text>
                </g>
            )}

            {/* Legend */}
            <g transform="translate(20, 400)">
                <text className="text-[10px] fill-slate-400">
                    V=vertice · O=centro sfera · H=centro base · K=bordo
                </text>
            </g>
        </svg>
    );
}
