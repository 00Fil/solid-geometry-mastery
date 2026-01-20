'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Filosofia', path: '/philosophy' },
    { name: 'Contatti', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
        >
            <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto shadow-2xl shadow-purple-900/10">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <div
                            key={item.path}
                            className="relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                                />
                            )}
                            <Link
                                href={item.path}
                                className={`relative block px-6 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${isActive ? 'text-black' : 'text-white/60 hover:text-white'}`}
                            >
                                {item.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </motion.nav>
    );
}
