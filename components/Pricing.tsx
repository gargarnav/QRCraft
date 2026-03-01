"use client";
// @ts-nocheck


const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK_HERE"


export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-dark-raised/30 border-t border-white/5 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 center w-3/4 max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 left-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-5xl font-syne font-bold text-white mb-6">Simple, honest pricing</h2>
                    <p className="text-textSecondary text-lg max-w-lg mx-auto">Start for free. Pay only when you're ready to download.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">

                    {/* Free Tier */}
                    <div className="bg-card rounded-2xl p-8 border border-border flex flex-col hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">Free</h3>
                        <div className="flex items-start mb-6 font-syne font-bold text-textLight">
                            <span className="text-2xl mt-1 opacity-50">$</span>
                            <span className="text-5xl">0</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "QR code preview",
                                "PNG & SVG download",
                                "Basic black & white style",
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-textSecondary text-sm">
                                    <svg className="w-5 h-5 text-success/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                            {[
                                "Custom colors",
                                "Logo upload",
                                "High-res download (watermark-free)"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-textDisabled text-sm">
                                    <svg className="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })} className="w-full btn-secondary py-3 text-sm">
                            Start for Free
                        </button>
                    </div>

                    {/* Single Download */}
                    <div className="relative bg-gradient-to-b from-[#1e1e35] to-card rounded-[24px] p-8 border border-primary/40 flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-glow z-10">
                        <div className="absolute top-0 right-0 left-0 -mt-3.5 flex justify-center">
                            <span className="bg-accent text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">Most Popular</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 font-syne">Single Download</h3>
                        <div className="flex items-start mb-6 font-syne font-bold text-white">
                            <span className="text-2xl mt-1 opacity-50">$</span>
                            <span className="text-5xl">2.99</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Full color customization",
                                "Logo in center",
                                "High-res PNG (2000px) + SVG",
                                "Watermark-free download",
                                "All dot styles",
                                "Instant clean download"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-textLight text-[15px]">
                                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href={STRIPE_PAYMENT_LINK} className="block w-full btn-primary text-center py-4 shadow-glow-strong text-base">
                            Get This Download
                        </a>
                    </div>

                    {/* 5-Pack */}
                    <div className="bg-card rounded-2xl p-8 border border-warning/20 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-warning mb-2">5-Pack</h3>
                        <div className="flex items-start mb-6 font-syne font-bold text-textLight">
                            <span className="text-2xl mt-1 opacity-50">$</span>
                            <span className="text-5xl">9.99</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Everything in Single Download",
                                "5 separate high-res downloads",
                                "Save downloads for later",
                                "Great for agencies & freelancers"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-textSecondary text-sm">
                                    <svg className="w-5 h-5 text-warning/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href={STRIPE_PAYMENT_LINK} className="block w-full py-3 rounded-full font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors text-center text-sm">
                            Buy 5-Pack
                        </a>
                    </div>

                </div>

                <p className="text-center text-sm text-textMuted mt-12 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure payment via Stripe. No subscription, no hidden fees.
                </p>
            </div>
        </section>
    )
}
