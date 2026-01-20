'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            className="fixed bottom-6 left-0 right-0 z-40 px-6 md:px-12 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <div className="flex justify-between items-end text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-mono text-white/30 mix-blend-exclusion">

                {/* Left: Location & Coordinates */}
                <div className="flex flex-col gap-1 text-left">
                    <span className="text-[#0040FF]">Brescia, IT</span>
                    <span>45.5416° N, 10.2118° E</span>
                </div>

                {/* Center: System Status */}
                <div className="hidden md:flex flex-col items-center gap-1">
                    <span className="flex items-center gap-2">
                        System Status: <span className="text-white">Nominal</span>
                    </span>
                    <span className="text-[9px] opacity-50">LTS Build v2.0.4</span>
                </div>

                {/* Right: Copyright & Time */}
                <div className="flex flex-col gap-1 text-right">
                    <span>© {new Date().getFullYear()} Lotus Agency</span>
                    <span>All Systems Go</span>
                </div>
            </div>
        </motion.footer>
    );
}
