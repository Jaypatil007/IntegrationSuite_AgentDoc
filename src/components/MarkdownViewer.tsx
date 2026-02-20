import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { AlertCircle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface MarkdownViewerProps {
    path: string;
}

export function MarkdownViewer({ path }: MarkdownViewerProps) {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        // Strip out frontmatter to only render the markdown body
        const stripFrontmatter = (md: string) => {
            const match = md.match(/^---[\s\S]+?---([\s\S]*)$/);
            return match ? match[1] : md;
        };

        fetch(path)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`);
                return res.text();
            })
            .then((text) => {
                if (isMounted) {
                    setContent(stripFrontmatter(text));
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [path]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-brand">
                <div className="animate-pulse flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand rounded-full"></div>
                    <div className="w-2 h-2 bg-brand rounded-full animation-delay-200"></div>
                    <div className="w-2 h-2 bg-brand rounded-full animation-delay-400"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card border-red-500/50 text-red-400 p-6 flex items-start gap-4">
                <AlertCircle className="mt-1" />
                <div>
                    <h3 className="font-display font-bold text-lg mb-2">Error Loading Document</h3>
                    <p className="font-mono text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl markdown-body"
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-8 uppercase" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <div className="mt-16 mb-8 flex items-center gap-3 group">
                            <div className="h-6 w-1 bg-brand transform origin-left transition-transform group-hover:scale-y-150" />
                            <h2 className="text-2xl font-display font-bold uppercase tracking-tight" {...props} />
                        </div>
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-display font-bold mt-12 mb-6 tracking-tight text-white/90" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="text-base text-text-muted leading-relaxed mb-6 font-mono" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-none space-y-3 mb-8 my-6 pl-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal text-text-muted space-y-3 mb-8 my-6 pl-8 font-mono marker:text-brand marker:font-bold" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-text-muted font-mono leading-relaxed relative flex items-start gap-3 before:content-[''] before:absolute before:left-[-12px] before:top-[12px] before:w-1.5 before:h-1.5 before:bg-brand/50 before:rounded-full" {...props}>
                            {/* Reset inner stuff to prevent double list-styles, custom rendering above */}
                            <span className="flex-1">{props.children}</span>
                        </li>
                    ),
                    a: ({ node, ...props }) => (
                        <a className="text-brand hover:text-brand/80 underline decoration-brand/30 underline-offset-4 transition-colors font-semibold py-1" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="text-white font-bold tracking-wide" {...props} />
                    ),
                    hr: ({ node, ...props }) => (
                        <div className="w-full h-[1px] bg-border my-16" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isAlert = !inline && match && match[1] === 'alert'; // Handle GH alerts if parsed

                        if (inline) {
                            return (
                                <code className="bg-surface border border-border px-1.5 py-0.5 rounded font-mono text-xs text-brand/90" {...props}>
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <div className="glass-card mb-8 relative overflow-hidden group">
                                {match && (
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-border text-[10px] items-center font-mono uppercase tracking-widest text-text-muted rounded-bl cursor-default hidden md:flex">
                                        {match[1]}
                                    </div>
                                )}
                                <pre className="overflow-x-auto">
                                    <code className="font-mono text-sm text-white/80" {...props}>
                                        {children}
                                    </code>
                                </pre>
                            </div>
                        );
                    },
                    blockquote: ({ node, ...props }: any) => {
                        const text = String(props.children[1]?.props?.children || props.children).trim();

                        // GitHub Flavored Alerts Logic
                        let type = 'default';
                        let icon = <Info className="text-blue-400" size={20} />;
                        let borderColor = 'border-blue-500/20';
                        let bgColor = 'bg-blue-500/5';

                        if (text.includes('[!NOTE]')) {
                            type = 'NOTE';
                            icon = <Info className="text-blue-400" size={20} />;
                            borderColor = 'border-blue-500/20';
                            bgColor = 'bg-blue-500/5';
                        } else if (text.includes('[!TIP]')) {
                            type = 'TIP';
                            icon = <CheckCircle2 className="text-emerald-400" size={20} />;
                            borderColor = 'border-emerald-500/20';
                            bgColor = 'bg-emerald-500/5';
                        } else if (text.includes('[!IMPORTANT]')) {
                            type = 'IMPORTANT';
                            icon = <AlertCircle className="text-purple-400" size={20} />;
                            borderColor = 'border-purple-500/20';
                            bgColor = 'bg-purple-500/5';
                        } else if (text.includes('[!WARNING]')) {
                            type = 'WARNING';
                            icon = <AlertCircle className="text-amber-400" size={20} />;
                            borderColor = 'border-amber-500/20';
                            bgColor = 'bg-amber-500/5';
                        } else if (text.includes('[!CAUTION]')) {
                            type = 'CAUTION';
                            icon = <ShieldAlert className="text-red-400" size={20} />;
                            borderColor = 'border-red-500/20';
                            bgColor = 'bg-red-500/5';
                        }

                        if (type !== 'default') {
                            // Remove the alert tag from text
                            const contentNodes = props.children;

                            return (
                                <div className={`my-8 p-6 rounded-lg border ${borderColor} ${bgColor} flex gap-4 items-start`}>
                                    <div className="mt-0.5">{icon}</div>
                                    <div className="flex-1 text-sm text-text-muted font-mono leading-relaxed alert-content">
                                        {contentNodes}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <blockquote className="border-l-4 border-brand/50 pl-6 my-8 text-text-muted italic bg-surface/30 py-4 rounded-r" {...props} />
                        );
                    },
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-8 glass-card p-0">
                            <table className="w-full text-left font-mono text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-surface/50 border-b border-border uppercase tracking-widest text-[10px] text-text-muted" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                        <tr className="border-b border-border/50 hover:bg-white/[0.02] transition-colors" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th className="px-6 py-4 font-bold" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-6 py-4 text-white/80" {...props} />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </motion.div>
    );
}
