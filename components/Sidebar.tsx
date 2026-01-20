
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { exercises } from '@/data/exercises';
import clsx from 'clsx';


export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 border-r border-gray-200 h-screen bg-gray-50 flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <Link href="/" className="block">
                    <h1 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">Geometria Solida</h1>
                </Link>
                <p className="text-xs text-gray-500 mt-1">Ottimizzazione (Max/Min)</p>

                <Link href="/method" className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors">
                    GUIDA AL METODO
                </Link>
            </div>

            <div className="p-4 space-y-6">
                {['Sfera', 'Cono', 'Piramide', 'Prisma'].map((category) => {
                    const categoryExercises = exercises.filter(e => e.category === category);
                    if (categoryExercises.length === 0) return null;

                    return (
                        <div key={category}>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                                {category}
                            </h3>
                            <div className="space-y-1">
                                {categoryExercises.map(exercise => (
                                    <Link
                                        key={exercise.id}
                                        href={`/exercise/${exercise.id}`}
                                        className={clsx(
                                            'block px-3 py-2 rounded-md text-sm transition-colors',
                                            pathname === `/exercise/${exercise.id}`
                                                ? 'bg-blue-100 text-blue-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        )}
                                    >
                                        {exercise.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
