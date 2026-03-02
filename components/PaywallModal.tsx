// @ts-nocheck
"use client";

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK_HERE"

export default function PaywallModal({ isOpen, onClose, message, targetPlan }: any) {
    const { user, isLoaded } = useUser()
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        if (!isOpen || !isLoaded || !user) return;
        const fetchProfile = async () => {
            const res = await fetch('/api/profile');
            if (res.ok) setProfile(await res.json());
        }
        fetchProfile();
    }, [isOpen, isLoaded, user])

    if (!isOpen) return null

    const currentPlan = profile?.plan || 'free';

    // Determine which plan details to show based on either the requested targetPlan or the natural next progressive plan
    const displayPlan = targetPlan || (currentPlan === 'pro' ? 'enterprise' : (currentPlan === 'maker' ? 'pro' : 'maker'));

    let nextPlanData = {
        name: "Maker",
        price: "$2.99",
        subtitle: "one-time · no subscription",
        buttonText: "Start Maker Plan — $2.99",
        features: [
            "25 static QR codes per month",
            "10 dynamic QR codes total",
            "Remove watermark",
            "Upload your own logo"
        ]
    };

    if (displayPlan === 'pro') {
        nextPlanData = {
            name: "Pro",
            price: "$6.99",
            subtitle: "per month",
            buttonText: "Start Pro Plan — $6.99/mo",
            features: [
                "Unlimited static QR codes",
                "Unlimited dynamic QR codes",
                "Advanced analytics",
                "PNG + SVG + PDF downloads"
            ]
        }
    } else if (displayPlan === 'enterprise') {
        nextPlanData = {
            name: "Enterprise",
            price: "Custom",
            subtitle: "built for your team",
            buttonText: "Contact Sales",
            features: [
                "Custom short domain",
                "Full REST API access",
                "White-label QR codes",
                "Dedicated account manager"
            ]
        }
    }

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
                        <svg className="w-9 h-9 text-primary relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse"></div>
                    </div>

                    <h2 className="text-2xl font-syne font-bold text-white mb-3">Unlock {nextPlanData.name}</h2>
                    <p className="text-textSecondary text-[15px] leading-relaxed">
                        {message || `Upgrade to ${nextPlanData.name} to access these features.`}
                    </p>
                </div>

                <div className="space-y-4 mb-10 pl-2">
                    {nextPlanData.features.map((feature, i) => (
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
                        <span className="font-syne font-extrabold text-[44px] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 leading-none mb-1">{nextPlanData.price}</span>
                        <span className="text-textMuted text-[13px] font-medium">{nextPlanData.subtitle}</span>
                    </div>

                    <a href={STRIPE_PAYMENT_LINK} className="block w-full btn-primary text-center py-4 text-base shadow-glow-strong">
                        {nextPlanData.buttonText}
                    </a>

                    <button onClick={onClose} className="block w-full text-center text-sm text-textMuted hover:text-white transition-colors py-2">
                        Just browsing? Keep using current plan
                    </button>
                </div>
            </div>
        </div>
    )
}
