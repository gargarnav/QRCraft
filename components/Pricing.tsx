"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: "Free",
            tagline: "Try before you buy",
            priceMonthly: 0,
            priceYearly: 0,
            target: "First-time users, students, hobbyists",
            features: [
                "3 static QR codes total (lifetime)",
                "All QR types (URL, Text, WiFi, Email, Phone)",
                "Basic customization (colors, dot styles)",
                "PNG download only",
                "Standard error correction"
            ],
            notIncluded: [
                "No dynamic QR codes",
                "No logo on QR",
                "No analytics",
                "No bulk generation"
            ],
            watermark: true,
            ctaText: "Get Started Free",
            ctaLink: "/auth/signup",
            highlight: false
        },
        {
            name: "Maker",
            tagline: "For creators and freelancers",
            priceMonthly: 299,
            priceYearly: 2990,
            savings: 598,
            target: "Bloggers, freelancers, small creators",
            features: [
                "25 static QR codes per month",
                "10 dynamic QR codes total",
                "All QR types",
                "Full customization (colors, pattern)",
                "Logo upload on QR",
                "PNG + SVG download",
                "Basic analytics (total scans)",
                "7-day scan history",
                "No watermark"
            ],
            notIncluded: [
                "No detailed analytics",
                "No bulk generation",
                "No API access",
                "No custom domain"
            ],
            watermark: false,
            ctaText: "Start Maker Plan",
            ctaLink: "#",
            highlight: false
        },
        {
            name: "Pro",
            tagline: "For professionals and growing businesses",
            priceMonthly: 699,
            priceYearly: 6990,
            savings: 1398,
            target: "Marketing teams, agencies, small businesses",
            features: [
                "Unlimited static QR codes",
                "Unlimited dynamic QR codes",
                "All QR types",
                "Full customization",
                "Logo upload on QR",
                "PNG + SVG + PDF download",
                "Advanced analytics (geo, device, etc.)",
                "90-day scan history",
                "Bulk QR generation (via CSV)",
                "No watermark",
                "Priority email support"
            ],
            notIncluded: [
                "No custom short domain",
                "No API access",
                "No white-label"
            ],
            watermark: false,
            ctaText: "Start Pro Plan",
            ctaLink: "#",
            highlight: true
        },
        {
            name: "Enterprise",
            tagline: "For large teams and enterprises",
            priceMonthly: 1999,
            priceYearly: 19990,
            savings: 3998,
            target: "Large companies, agencies managing multiple brands",
            features: [
                "Everything in Pro",
                "Custom short domain (e.g. go.brand.com)",
                "Unlimited bulk generation",
                "1-year scan history",
                "Full REST API access",
                "White-label QR codes",
                "Team members (up to 10 seats)",
                "Dedicated account manager",
                "SLA: 99.9% uptime guarantee",
                "Custom invoice / GST billing",
                "Priority phone + email support"
            ],
            notIncluded: [],
            watermark: false,
            ctaText: "Contact Sales",
            ctaLink: "mailto:sales@qrcraft.fun",
            highlight: false
        }
    ];

    const faqs = [
        {
            q: "Can I upgrade or downgrade anytime?",
            a: "Yes, changes take effect immediately. Downgrades apply at end of billing cycle."
        },
        {
            q: "Is there a free trial for paid plans?",
            a: "Maker and Pro plans have a 7-day free trial. No credit card required to start."
        },
        {
            q: "What payment methods do you accept?",
            a: "All major credit/debit cards, UPI, Net Banking via Razorpay."
        },
        {
            q: "Do you offer refunds?",
            a: "Yes, full refund within 7 days of purchase if you're not satisfied."
        },
        {
            q: "I need a GST invoice. Is that possible?",
            a: "Yes, Enterprise plan includes GST billing. For other plans, contact support."
        },
        {
            q: "What happens to my QR codes if I downgrade?",
            a: "Your existing QR codes remain active. You just won't be able to create new ones beyond your new plan's limit."
        }
    ];

    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="font-syne font-extrabold text-4xl lg:text-5xl text-white mb-6">Plans that scale with you</h1>
                    <p className="text-textSecondary text-lg max-w-2xl mx-auto mb-10">
                        From personal projects to enterprise marketing campaigns. Create beautiful QR codes and track them easily.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-bold ${!isYearly ? 'text-white' : 'text-textMuted'}`}>Monthly</span>
                        <button
                            className="relative inline-flex items-center h-8 rounded-full w-14 bg-white/10"
                            onClick={() => setIsYearly(!isYearly)}
                        >
                            <span
                                className={`inline-block w-6 h-6 transform bg-primary rounded-full transition-transform duration-300 ease-in-out ${isYearly ? 'translate-x-7' : 'translate-x-1'}`}
                            />
                        </button>
                        <span className={`flex items-center gap-2 text-sm font-bold ${isYearly ? 'text-white' : 'text-textMuted'}`}>
                            Yearly
                            <span className="bg-success/20 text-success text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">2 Months Free</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`flex flex-col h-full bg-card rounded-[24px] border ${plan.highlight ? 'border-primary shadow-glow ring-1 ring-primary/50' : 'border-border'} p-8 relative`}
                            style={{
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                willChange: "transform"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-primary text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">Most Popular</span>
                                </div>
                            )}

                            <h3 className="font-syne font-bold text-2xl text-white mb-2">{plan.name}</h3>
                            <p className="text-textMuted text-sm mb-6 h-10">{plan.target}</p>

                            <div className="mb-6">
                                <div className="flex items-start text-white">
                                    <span className="text-xl mt-1 opacity-60">₹</span>
                                    <span className="text-5xl font-extrabold font-syne lining-nums tracking-tight">
                                        {isYearly ? (plan.priceYearly === 0 ? "0" : (plan.priceYearly / 12).toFixed(0)) : plan.priceMonthly}
                                    </span>
                                    <span className="text-textMuted mt-auto mb-1 ml-1 text-sm">/mo</span>
                                </div>
                                {isYearly && plan.priceYearly > 0 ? (
                                    <div className="text-success text-sm font-medium mt-2 flex items-center gap-2">
                                        <span>Billed ₹{plan.priceYearly.toLocaleString()}/yr</span>
                                        <span className="line-through text-textMuted text-xs">₹{(plan.priceMonthly * 12).toLocaleString()}</span>
                                    </div>
                                ) : (
                                    <div className="h-5 mt-2"></div>
                                )}
                            </div>

                            <a
                                href={plan.ctaLink}
                                className={`w-full py-3.5 rounded-full font-bold text-sm text-center mb-8 transition-colors ${plan.highlight ? 'bg-primary text-white hover:bg-primary-dim shadow-lg shadow-primary/20' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                            >
                                {plan.ctaText}
                            </a>

                            <div className="flex-1 space-y-4">
                                <p className="text-xs font-bold text-textMuted tracking-wider uppercase mb-4">Includes</p>
                                <ul className="space-y-3">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start text-[14px] text-textSecondary gap-3 leading-snug">
                                            <svg className="w-5 h-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            {f}
                                        </li>
                                    ))}
                                    {plan.watermark && (
                                        <li className="flex items-start text-[14px] text-textSecondary gap-3 leading-snug">
                                            <svg className="w-5 h-5 text-warning shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            Watermark on QR Code
                                        </li>
                                    )}
                                </ul>

                                {plan.notIncluded.length > 0 && (
                                    <>
                                        <div className="h-px bg-white/5 my-4"></div>
                                        <ul className="space-y-3">
                                            {plan.notIncluded.map(nf => (
                                                <li key={nf} className="flex items-start text-[14px] text-textDisabled gap-3 leading-snug opacity-75">
                                                    <svg className="w-5 h-5 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    {nf}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="font-syne font-bold text-3xl text-center text-white mb-10">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl h-full">
                                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                                <p className="text-textSecondary text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-10 border-t border-white/5 opacity-80">
                    <div className="flex items-center gap-2 text-textSecondary font-medium text-sm">
                        <svg className="w-6 h-6 text-[#3395FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Secure payments by Razorpay
                    </div>
                    <div className="flex items-center gap-2 text-textSecondary font-medium text-sm">
                        <span>🇮🇳</span> Made in India
                    </div>
                    <div className="flex items-center gap-2 text-textSecondary font-medium text-sm">
                        <span className="text-success">⚡</span> 99.9% Uptime guarantee
                    </div>
                    <div className="flex items-center gap-2 text-textSecondary font-medium text-sm">
                        <span>💬</span> Priority Email Support
                    </div>
                </div>

            </div>
        </section>
    );
}
