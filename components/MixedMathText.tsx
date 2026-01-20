
'use client';
import React from 'react';
import { MathFormula } from './MathFormula';

interface Props {
    text: string;
    className?: string; // Allow passing styles
}

export const MixedMathText: React.FC<Props> = ({ text, className = "" }) => {
    if (!text) return null;

    // Split by '$' delimiters.
    // Example: "Hello $x^2$ world" -> ["Hello ", "x^2", " world"]
    const parts = text.split('$');

    return (
        <div className={className}>
            {parts.map((part, index) => {
                // Even indices (0, 2, 4...) are TEXT (outside $)
                // Odd indices (1, 3, 5...) are MATH (inside $)
                if (index % 2 === 0) {
                    // Check for newlines and render them as breaks
                    return (
                        <span key={index}>
                            {part.split('\n').map((line, i, arr) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < arr.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                } else {
                    return <MathFormula key={index} tex={part} />;
                }
            })}
        </div>
    );
};
