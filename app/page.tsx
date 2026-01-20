
import { Sidebar } from '@/components/Sidebar';
import { ArrowRight, Box, Compass, Ruler } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 flex flex-col justify-center items-center p-12 text-center">
        <div className="max-w-2xl space-y-8">

          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Box className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Mastery Geometria Solida
          </h1>
          <p className="text-xl text-gray-500 max-w-lg mx-auto">
            Una guida interattiva e visuale per risolvere i problemi di ottimizzazione geometrica (massimi e minimi) per la quinta superiore.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-12">
            <FeatureCard
              icon={<Compass className="w-6 h-6 text-purple-600" />}
              title="Visualizzazioni"
              desc="Sezioni 2D chiare per capire la geometria interna."
            />
            <FeatureCard
              icon={<Ruler className="w-6 h-6 text-indigo-600" />}
              title="Passo-Passo"
              desc="Procedimenti logici scomposti in step elementari."
            />
            <FeatureCard
              icon={<Box className="w-6 h-6 text-blue-600" />}
              title="Tutti i Casi"
              desc="Dal cilindro nella sfera alla clessidra."
            />
          </div>

          <div className="mt-12">
            <Link href="/exercise/168-cilindro-sfera-volume" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
              Inizia con il primo esercizio
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
