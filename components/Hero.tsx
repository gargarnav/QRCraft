"use client";
// @ts-nocheck


import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'


export default function Hero({ setCurrentPage }: any) {
    const qrRef = useRef(null)

    useEffect(() => {
        // Render static example QR code on mount
        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            type: "svg",
            data: "https://qr-customizer.com",
            image: "",
            dotsOptions: {
                color: "#7C6EFA",
                type: "rounded"
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 20
            }
        })

        if (qrRef.current) {
            qrRef.current.innerHTML = ''
            qrCode.append(qrRef.current)
        }
    }, [])

    const scrollToTool = () => {
        document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative pt-12 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
            {/* Radial Gradient Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                radial-gradient(ellipse at 20% 50%, rgba(124,110,250,0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(255,107,138,0.05) 0%, transparent 50%)
            `
            }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                            <span className="text-primary-light text-[13px] font-medium tracking-wide">✦ No account needed — free to try</span>
                        </div>

                        <h1 className="font-syne font-extrabold text-5xl lg:text-[80px] leading-[1.05] tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            QR Codes That <br className="hidden lg:block" /> <span className="gradient-text">Actually Look Good</span>
                        </h1>

                        <p className="text-lg text-textSecondary mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in" style={{ animationDelay: '320ms' }}>
                            Stop sending customers ugly black squares. Design a branded QR code in seconds — no design skills needed.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in" style={{ animationDelay: '440ms' }}>
                            <button onClick={scrollToTool} className="btn-primary text-lg px-9 py-4 shadow-glow ring-4 ring-primary/20">
                                Create My QR Code — It's Free
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-textMuted font-medium animate-fade-in" style={{ animationDelay: '500ms' }}>
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                No account required
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                Instant preview
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                Download in seconds
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-[400px] lg:max-w-none flex justify-center lg:justify-end hidden md:flex animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-1 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 bg-primary/40 animate-pulse"></div>

                            <div
                                className="relative bg-white p-8 rounded-[32px] shadow-card-glow transform transition-all duration-500 ease-out hover:rotate-0 hover:scale-[1.02] -rotate-2"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div ref={qrRef} className="rounded-2xl overflow-hidden [&>svg]:block border border-gray-100" />

                                <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    This took 20 seconds to make
                                </div>
                            </div>

                            {/* Decorative border animation */}
                            <div className="absolute -inset-[2px] rounded-[34px] z-[-1] bg-gradient-to-br from-primary via-accent to-primary opacity-30 blur-[2px] animate-border-pulse pointer-events-none"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
