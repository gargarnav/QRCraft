"use client";
// @ts-nocheck// @ts-nocheck


import React from 'react'


export default function About({ setCurrentPage }: any) {
    return (
        <div className="bg-dark text-textLight min-h-screen">
            {/* HER0 SECTION */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-dark to-dark pointer-events-none" />

                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                        <span className="text-xs font-bold tracking-wider text-primary-light uppercase">Built by a student. Used by businesses.</span>
                    </div>

                    <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-white mb-6 leading-tight">
                        The story behind <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#9B8FFD] to-accent animate-gradient-x">QRcraft</span>
                    </h1>

                    <p className="font-dm-sans text-lg text-textSecondary max-w-xl mx-auto leading-relaxed">
                        QRcraft started as a weekend project and turned into something people actually use. Here's the honest story.
                    </p>
                </div>
            </section>

            {/* FOUNDER CARD */}
            <section className="px-4 pb-24">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-card border border-primary/20 rounded-[32px] p-8 md:p-12 shadow-glow hover:shadow-glow-strong transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shadow-lg">
                                    <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                                        <span className="font-syne font-bold text-2xl text-white">AG</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="text-center md:text-left flex-1">
                                <h2 className="font-syne font-bold text-3xl text-white mb-1">Arnav Garg</h2>
                                <p className="font-dm-sans font-medium text-textMuted text-sm mb-4 flex items-center justify-center md:justify-start gap-2">
                                    Front-End Developer & Student
                                    <span className="inline-block w-1 h-1 rounded-full bg-textMuted/50" />
                                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-[11px] border border-white/10">📍 New Delhi, India</span>
                                </p>

                                <div className="font-dm-sans text-textSecondary space-y-4 mb-8 leading-relaxed">
                                    <p>
                                        I'm a first-year student at BITS Pilani, currently deep in the world of React, Tailwind, and modern web development. I build things to learn — and QRcraft is one of those things that ended up being genuinely useful.
                                    </p>
                                    <p>
                                        I noticed that every QR code tool was either ugly and free, or beautiful and expensive. There was nothing in between for a small business owner who just wants something that looks good without a monthly subscription. So I built it.
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <a href="https://www.linkedin.com/in/arnavrg/" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark border border-border text-textMuted text-sm font-medium hover:border-primary hover:text-white transition-all group/link">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        LinkedIn
                                    </a>
                                    <a href="https://github.com/gargarnav" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark border border-border text-textMuted text-sm font-medium hover:border-primary hover:text-white transition-all group/link">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        GitHub
                                    </a>
                                    <a href="https://arnavgarg-zeta.vercel.app" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark border border-border text-textMuted text-sm font-medium hover:border-primary hover:text-white transition-all group/link">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION */}
            <section className="px-4 py-16 bg-[#05050A]">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-xs font-bold text-textMuted uppercase tracking-[0.2em] mb-4 block">Mission</span>
                    <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">Design shouldn't be a luxury</h2>
                    <div className="font-dm-sans text-textSecondary text-lg space-y-6 leading-relaxed">
                        <p>
                            Most QR code tools make you choose: pay $50/month for a professional platform, or use a free tool that makes your brand look amateur. That's a false choice.
                        </p>
                        <p>
                            QRcraft exists to give small businesses, event organizers, freelancers, and creators access to professional-quality QR codes without the enterprise price tag. Beautiful design should be accessible to everyone — not just companies with a design budget.
                        </p>
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="px-4 py-24">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold text-textMuted uppercase tracking-[0.2em]">Building in Public</span>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/20 space-y-12">
                        {/* Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-dark shadow-[0_0_10px_rgba(124,110,250,0.5)]" />
                            <div className="mb-1">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">February 2026</span>
                            </div>
                            <h3 className="font-syne font-bold text-xl text-white mb-2">QRcraft Launched</h3>
                            <p className="text-textSecondary leading-relaxed">
                                Built the MVP in a weekend using React, Vite, and qr-code-styling. Launched on qrcraft.fun.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-dark border-2 border-primary shadow-[0_0_10px_rgba(124,110,250,0.2)]" />
                            <div className="mb-1">
                                <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Coming Soon</span>
                            </div>
                            <h3 className="font-syne font-bold text-xl text-white mb-2">Dynamic QR Codes</h3>
                            <p className="text-textSecondary leading-relaxed">
                                Update your QR code's destination after printing. No more reprints.
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="relative opacity-70 hover:opacity-100 transition-opacity">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-dark border-2 border-textMuted" />
                            <div className="mb-1">
                                <span className="text-xs font-bold text-textMuted uppercase tracking-wider">Coming Soon</span>
                            </div>
                            <h3 className="font-syne font-bold text-xl text-white mb-2">Full Scan Analytics</h3>
                            <p className="text-textSecondary leading-relaxed">
                                See where your scans come from — by country, device, and time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section className="px-4 py-16 bg-[#05050A]">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold text-textMuted uppercase tracking-[0.2em] mb-12 block">Built With</span>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Vite', 'Tailwind CSS', 'qr-code-styling', 'Stripe', 'Vercel'].map(tech => (
                            <div key={tech} className="w-28 h-24 bg-card border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-textMuted group-hover:bg-primary transition-colors" />
                                </div>
                                <span className="text-xs font-medium text-textSecondary group-hover:text-white transition-colors">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-card border border-primary/30 rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(124,110,250,0.1)]">
                        <h3 className="font-syne font-bold text-2xl md:text-3xl text-white mb-4">Have feedback or questions?</h3>
                        <p className="font-dm-sans text-textSecondary mb-8 max-w-lg mx-auto">
                            I read every message. Whether it's a bug, a feature idea, or just saying hi — reach out.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://arnavgarg-zeta.vercel.app" target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dim text-white rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                                View my work
                            </a>
                            <a href="https://www.linkedin.com/in/arnavrg/" target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-bold transition-all hover:bg-white/5">
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
