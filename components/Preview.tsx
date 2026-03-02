// @ts-nocheck
"use client";


import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import PaywallModal from '@/components/PaywallModal'


export default function Preview({ config, updateConfig }: any) {
    const qrRef = useRef<any>(null)
    const [qrCode, setQrCode] = useState<any>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        setQrCode(new QRCodeStyling({
            width: 2000,
            height: 2000,
            type: "svg",
            data: "https://qr-customizer.com",
            image: "",
            dotsOptions: { color: "#7C6EFA", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            imageOptions: { crossOrigin: "anonymous", margin: 20 }
        }))
    }, [])
    const [showPaywall, setShowPaywall] = useState(false)
    const [paywallMessage, setPaywallMessage] = useState("")
    const [isUpdating, setIsUpdating] = useState(false) // Used for blink animation

    useEffect(() => {
        if (config.triggerPaywall) {
            setPaywallMessage(config.paywallMessage || "")
            setShowPaywall(true)
            updateConfig('triggerPaywall', false)
            updateConfig('paywallMessage', '')
        }
    }, [config.triggerPaywall, config.paywallMessage, updateConfig])

    useEffect(() => {
        if (!qrCode) return;
        if (qrRef.current) {
            qrRef.current.innerHTML = ''
            qrCode.append(qrRef.current)
        }
    }, [qrCode])

    // QR Update Logic with blink animation
    useEffect(() => {
        if (!qrCode) return;
        setIsUpdating(true)

        // Tiny delay to allow fade-out effect before update visually completes
        const timer = setTimeout(() => {
            const dataToEncode = config.isDynamic && config.shortUrl ? config.shortUrl : (config.content || "https://yourwebsite.com");
            qrCode.update({
                data: dataToEncode,
                image: config.hasPaid ? config.logo : null,
                dotsOptions: {
                    color: config.fgColor,
                    type: config.dotStyle === 'classy' ? 'extra-rounded' :
                        config.dotStyle === 'classy-rounded' ? 'extra-rounded' :
                            config.dotStyle
                },
                cornersSquareOptions: {
                    type: config.cornerStyle === 'square' ? 'square' : 'extra-rounded'
                },
                cornersDotOptions: {
                    type: config.cornerStyle === 'square' ? 'square' : 'dot'
                },
                backgroundOptions: {
                    color: config.bgColor
                },
                qrOptions: {
                    errorCorrectionLevel: config.errorCorrection
                }
            })
            setIsUpdating(false)
        }, 150) // Match the fade-out duration

        return () => clearTimeout(timer)
    }, [config, qrCode])

    const processDownload = (format: any) => {
        if (!qrCode) return;
        // PRO USER: Instant download, no watermark
        if (config.hasPaid) {
            qrCode.download({
                name: "qrcraft-code",
                extension: format
            })
            return
        }

        // FREE USER: Add watermark
        if (format === 'png') {
            qrCode.getRawData("png").then((blob: any) => {
                const url = URL.createObjectURL(blob)
                const img = new Image()
                img.onload = () => {
                    const watermarkHeight = 28
                    const canvas = document.createElement("canvas")
                    canvas.width = img.width
                    canvas.height = img.height + watermarkHeight
                    const ctx = canvas.getContext("2d")

                    if (ctx) {
                        // Draw white background
                        ctx.fillStyle = "#ffffff"
                        ctx.fillRect(0, 0, canvas.width, canvas.height)

                        // Draw the QR code image on top
                        ctx.drawImage(img, 0, 0)

                        // Draw the watermark bar below the QR
                        ctx.fillStyle = "#f4f4f8"
                        ctx.fillRect(0, img.height, canvas.width, watermarkHeight)

                        ctx.fillStyle = "#9999bb"
                        ctx.font = "500 11px 'DM Sans', sans-serif"
                        ctx.textAlign = "center"
                        ctx.textBaseline = "middle"
                        ctx.fillText(
                            "Made with qrcraft.fun",
                            canvas.width / 2,
                            img.height + watermarkHeight / 2
                        )
                    }

                    canvas.toBlob((outputBlob: any) => {
                        if (outputBlob) {
                            const downloadUrl = URL.createObjectURL(outputBlob)
                            const a = document.createElement("a")
                            a.href = downloadUrl
                            a.download = "qrcraft-free.png"
                            a.click()
                            URL.revokeObjectURL(downloadUrl)
                            URL.revokeObjectURL(url)
                        }
                    }, "image/png")
                }
                img.src = url
            })
        } else if (format === 'svg') {
            qrCode.getRawData("svg").then((blob: any) => {
                blob.text().then((svgText: any) => {
                    const qrSize = 2000 // Based on init config
                    const watermarkSvg = `
                        <rect x="0" y="${qrSize}" width="${qrSize}" height="24" fill="#f4f4f8"/>
                        <text
                            x="${qrSize / 2}"
                            y="${qrSize + 16}"
                            text-anchor="middle"
                            font-family="DM Sans, sans-serif"
                            font-size="11"
                            fill="#9999bb"
                        >Made with qrcraft.fun</text>`

                    // Inject before closing tag
                    const newSvgText = svgText.replace('</svg>', `${watermarkSvg}</svg>`)
                    // Update viewBox to include watermark
                    const updatedSvgText = newSvgText.replace(/viewBox="0 0 (\d+) (\d+)"/, (match: any, w: any, h: any) => {
                        return `viewBox="0 0 ${w} ${parseInt(h) + 24}"`
                    })
                    // Update height attribute
                    const finalSvgText = updatedSvgText.replace(/height="(\d+)"/, (match: any, h: any) => {
                        return `height="${parseInt(h) + 24}"`
                    })

                    const newBlob = new Blob([finalSvgText], { type: "image/svg+xml" })
                    const url = URL.createObjectURL(newBlob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = "qrcraft-free.svg"
                    a.click()
                    URL.revokeObjectURL(url)
                })
            })
        }
    }

    const handleDownload = async (format: any) => {
        if (!config.isGenerated || !config.content) return;
        setIsSaving(true);
        setTimeout(() => {
            processDownload(format);
            setIsSaving(false);
        }, 500);
    }

    return (
        <div className="flex flex-col items-center justify-center relative h-full w-full">
            <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} message={paywallMessage} />

            {/* QR Card */}
            <div className="relative mb-8 w-full max-w-[340px]">
                {/* Card Glow Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[60px] rounded-full pointer-events-none opacity-50"></div>

                <div className="bg-white rounded-[32px] p-8 shadow-card-glow transform transition-transform hover:scale-[1.01] duration-500 relative z-10 min-h-[340px] flex flex-col items-center justify-center">

                    {!config.isGenerated && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 rounded-[32px] p-8 m-2 border-2 border-dashed border-border/50 backdrop-blur-sm">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v4m0 0v4m0-4h4m-4 0H8m-4 8h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-textSecondary text-center">Fill in your details and click Generate to preview</p>
                        </div>
                    )}

                    <div
                        ref={qrRef}
                        className={`w-[276px] h-[276px] [&>svg]:w-full [&>svg]:h-full overflow-hidden transition-all duration-200 ${isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                    />

                    {/* Watermark for Free Users */}
                    {!config.hasPaid && config.isGenerated && (
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '6px 0',
                            backgroundColor: '#f4f4f8',
                            borderRadius: '0 0 12px 12px',
                            marginTop: '-12px',
                            position: 'relative',
                            zIndex: 20
                        }}>
                            <span style={{
                                fontSize: '11px',
                                color: '#9999bb',
                                fontFamily: 'DM Sans, sans-serif',
                                fontWeight: 500,
                                letterSpacing: '0.02em',
                            }}>
                                Made with qrcraft.fun
                            </span>
                        </div>
                    )}

                    {config.isGenerated && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <span className="text-xs font-medium text-gray-400 font-mono tracking-tight truncate max-w-[180px]">
                                {config.isDynamic && config.shortUrl ? config.shortUrl : (config.content || "https://yourwebsite.com")}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Badges & Buttons */}
            {config.isGenerated && (
                <div className="w-full max-w-[340px] space-y-4 relative z-10 animate-slide-in-up">
                    <div className="flex justify-between items-center mb-2">
                        {config.saveStatus === 'saved' && (
                            <span className="bg-success/10 border border-success/30 text-success text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Saved
                            </span>
                        )}
                        {config.saveStatus === 'error' && (
                            <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                Not Saved
                            </span>
                        )}

                        {!config.hasPaid ? (
                            <span className="border border-[#66668066] text-textMuted text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Free Preview
                            </span>
                        ) : (
                            <span className="bg-success/10 border border-success/30 text-success text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Pro Unlocked
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => handleDownload('png')}
                        disabled={isSaving}
                        className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        )}
                        {isSaving ? 'Processing...' : 'Download PNG'}
                    </button>

                    <button
                        onClick={() => handleDownload('svg')}
                        disabled={isSaving}
                        className="w-full btn-secondary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        )}
                        {isSaving ? 'Processing...' : 'Download SVG'}
                    </button>

                    {!config.hasPaid && (
                        <p className="text-[12px] text-textMuted text-center mt-4 pb-4">
                            Watermark removed & high-res files unlocked after payment.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
