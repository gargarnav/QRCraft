"use client";
// @ts-nocheck

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK_HERE"

export default function PaywallModal({ isOpen, onClose }: any) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-gradient-to-b from-[#161625] to-[#0F0F1A] w-full max-w-md rounded-[32px] border border-primary/20 p-10 shadow-2xl shadow-black/80 animate-spring border-t-white/10">
                <button onClick={onClose} className="absolute top-6 right-6 text-textMuted hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow border border-primary/20 relative">
                        <svg className="w-9 h-9 text-primary relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse"></div>
                    </div>

                    <h2 className="text-2xl font-syne font-bold text-white mb-3">Unlock Full Quality</h2>
                    <p className="text-textSecondary text-[15px] leading-relaxed">
                        Get high-resolution PNG & SVG files, remove the watermark, and add your logo.
                    </p>
                </div>

                <div className="space-y-4 mb-10 pl-2">
                    {[
                        "High-resolution 2000px PNG",
                        "Scalable vector SVG (for print)",
                        "Remove watermark",
                        "Upload your own logo"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3.5 text-[15px] text-textSecondary">
                            <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center mb-3">
                        <span className="font-syne font-extrabold text-[44px] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 leading-none mb-1">$2.99</span>
                        <span className="text-textMuted text-[13px] font-medium">one-time · no subscription</span>
                    </div>

                    <a href={STRIPE_PAYMENT_LINK} className="block w-full btn-primary text-center py-4 text-base shadow-glow-strong">
                        Pay with Card — $2.99
                    </a>

                    <button onClick={onClose} className="block w-full text-center text-sm text-textMuted hover:text-white transition-colors py-2">
                        Just browsing? Keep using free version
                    </button>
                </div>
            </div>
        </div>
    )
}
