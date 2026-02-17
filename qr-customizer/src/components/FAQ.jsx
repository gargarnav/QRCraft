import { useState } from 'react'

const faqs = [
    {
        q: "Are the QR codes I create actually scannable?",
        a: "Yes, 100%. All codes are tested to be scannable by any standard camera or QR reader app, even with heavy customization. We use proper error correction to ensure reliability."
    },
    {
        q: "What formats can I download?",
        a: "Free users get a low-res PNG. Paid users get high-res PNG (2000x2000px) and SVG (infinitely scalable for large print)."
    },
    {
        q: "Can I use the QR code commercially?",
        a: "Yes. Once you download it, it's yours to use however you like — on products, menus, flyers, packaging, anything."
    },
    {
        q: "Do the QR codes expire?",
        a: "No. Your QR code is static and works forever as long as the URL it points to is active."
    },
    {
        q: "Can I change the URL after downloading?",
        a: "No — the URL is baked into the QR code. If you change your URL, you'll need to generate a new code. (Dynamic QR codes are a future feature.)"
    },
    {
        q: "I paid but my download didn't work. Help?",
        a: "Email us at support@qr-customizer.com with your receipt and we'll sort it out immediately."
    },
    {
        q: "What file size do I get?",
        a: "High-res PNG files are typically 200KB–1MB depending on complexity. SVG files are under 50KB and scale perfectly to any size."
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className="py-24 bg-dark">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-syne font-bold text-center text-white mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-card border border-border rounded-xl transition-all hover:bg-white/5">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-sans font-medium text-white text-[15px]">{faq.q}</span>
                                <svg
                                    className={`w-5 h-5 text-textMuted transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-textSecondary text-[14px] leading-relaxed border-t border-white/5">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
