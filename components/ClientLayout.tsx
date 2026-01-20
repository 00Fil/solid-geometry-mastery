'use client';

import React from 'react';
import Preloader from './Preloader';

import Noise from './Noise';
import Cursor from './Cursor';
import Footer from './Footer';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <Preloader />
            <Preloader />
            <Noise />
            <Cursor />
            {children}
            <Footer />
        </>
    );
}
