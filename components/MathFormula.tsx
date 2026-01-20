
'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
    tex: string;
    block?: boolean;
}

export const MathFormula: React.FC<MathProps> = ({ tex, block = false }) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(tex, containerRef.current, {
                    throwOnError: false,
                    displayMode: block,
                    output: 'html' // Use HTML output for accessibility and simpler structure
                });
            } catch (error) {
                console.error('KaTeX rendering error:', error);
                containerRef.current.textContent = tex;
            }
        }
    }, [tex, block]);

    return <span ref={containerRef} className={block ? "block my-4 text-center" : "inline-block mx-1"} />;
};
