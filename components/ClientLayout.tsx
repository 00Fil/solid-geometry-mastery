'use client';

import React from 'react';
import Preloader from './Preloader';
import SmoothScroll from './SmoothScroll';
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
            <SmoothScroll>
                <Noise />
                <Cursor />
                {children}
                <Footer />
            </SmoothScroll>
        </>
    );
}
