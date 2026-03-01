// @ts-nocheck
"use client";


import { useEffect, useRef } from 'react'


export default function UseCases() {
    const scrollRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible', 'translate-y-0', 'opacity-100')
                        entry.target.classList.remove('translate-y-8', 'opacity-0')
                    }
                })
            },
            { threshold: 0.1 }
        )

        scrollRef.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const cases = [
        { icon: "🍽️", title: "Restaurants & Cafés", desc: "Replace printed menus with a branded QR code that matches your restaurant's style. Update the menu anytime without reprinting." },
        { icon: "🎉", title: "Events & Weddings", desc: "Create a QR code that fits your event aesthetic — use your wedding colors, or match your brand at your next conference." },
        { icon: "💼", title: "Business Cards", desc: "Add a custom QR code to your business card linking to your portfolio, LinkedIn, or booking page. Looks professional, works instantly." },
        { icon: "📱", title: "Content Creators", desc: "Create a QR code in your brand colors linking to your link-in-bio, YouTube channel, or Spotify profile. Share in videos, merch, or posts." }
    ]

    return (
        <section className="py-24 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl lg:text-4xl font-syne font-bold text-center text-white mb-16">Perfect for any situation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((item, index) => (
                        <div
                            key={index}
                            ref={(el: HTMLDivElement | null) => {
                                scrollRef.current[index] = el as never;
                            }}
                            className="bg-card w-full border border-border rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 opacity-0 translate-y-8"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative corner accent */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/60 rotate-45"></div>

                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold font-syne text-white mb-3 group-hover:text-primary-light transition-colors">{item.title}</h3>
                            <p className="text-textSecondary leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
