'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

interface Props {
    content: string;
    className?: string;
}

/**
 * Complete Markdown + Math Renderer
 * Supports: Tables, Display Math ($$), Inline Math ($), Bold, Italic, Lists, Headers
 */
export const MarkdownMath: React.FC<Props> = ({ content, className = "" }) => {
    if (!content) return null;

    return (
        <div className={`markdown-math-container ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Custom styling for elements
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-black mb-4 mt-6" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-4" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                    // Table styling
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-slate-300 rounded-lg overflow-hidden" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-slate-100" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-slate-200" {...props} />,
                    tr: ({ node, ...props }) => <tr className="hover:bg-slate-50" {...props} />,
                    th: ({ node, ...props }) => (
                        <th className="px-4 py-2 text-left text-sm font-bold text-slate-700 border border-slate-300" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-4 py-2 text-sm text-slate-600 border border-slate-300" {...props} />
                    ),
                    // Code blocks
                    code: ({ node, className: codeClassName, children, ...props }) => {
                        const isInline = !codeClassName;
                        if (isInline) {
                            return <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-rose-600" {...props}>{children}</code>;
                        }
                        return <code className={`block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto ${codeClassName}`} {...props}>{children}</code>;
                    },
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r-lg italic text-slate-700" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

// Simple inline formula component (kept for backward compatibility)
export const MathInline: React.FC<{ tex: string }> = ({ tex }) => {
    return <MarkdownMath content={`$${tex}$`} className="inline" />;
};
