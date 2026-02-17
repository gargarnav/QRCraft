import { useState, useRef, useEffect } from 'react'
import { ChromePicker } from 'react-color'

export default function Controls({ config, updateConfig }) {
    const [showFgPicker, setShowFgPicker] = useState(false)
    const [showBgPicker, setShowBgPicker] = useState(false)
    const [localContent, setLocalContent] = useState(config.content)
    const [wifiSsid, setWifiSsid] = useState('')
    const [wifiPass, setWifiPass] = useState('')

    useEffect(() => {
        setLocalContent(config.content)
    }, [config.content])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (config.qrType !== 'wifi') {
                updateConfig('content', localContent)
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [localContent, config.qrType])

    useEffect(() => {
        if (config.qrType === 'wifi') {
            const wifiString = `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`
            updateConfig('content', wifiString)
        }
    }, [wifiSsid, wifiPass, config.qrType])


    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                updateConfig('logo', reader.result)
                updateConfig('errorCorrection', 'H')
            }
            reader.readAsDataURL(file)
        }
    }

    // Common input classes
    const inputClass = "w-full bg-dark border border-border focus:border-primary focus:ring-4 focus:ring-primary/15 rounded-xl px-4 py-3 text-textLight placeholder-textMuted outline-none transition-all font-mono text-sm shadow-sm"
    const labelClass = "block text-xs font-medium text-textMuted uppercase tracking-wider mb-2"

    return (
        <div className="bg-card border border-border rounded-[24px] p-8 space-y-8 h-full overflow-y-auto custom-scrollbar shadow-lg">

            {/* Type Selector */}
            <div>
                <label className={labelClass}>QR Type</label>
                <div className="flex bg-dark-raised rounded-xl p-1 gap-1 overflow-x-auto border border-border">
                    {['url', 'text', 'wifi', 'email', 'phone'].map(type => (
                        <button
                            key={type}
                            onClick={() => updateConfig('qrType', type)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap ${config.qrType === type
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-textMuted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {type === 'url' ? 'URL' : type === 'wifi' ? 'WiFi' : type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Input */}
            <div>
                <label className={labelClass}>
                    {config.qrType === 'url' ? 'Website URL' :
                        config.qrType === 'text' ? 'Text Content' :
                            config.qrType === 'email' ? 'Email Address' :
                                config.qrType === 'phone' ? 'Phone Number' : 'Network Details'}
                </label>

                {config.qrType === 'wifi' ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="SSID (Network Name)"
                            value={wifiSsid}
                            onChange={(e) => setWifiSsid(e.target.value)}
                            className={inputClass}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={wifiPass}
                            onChange={(e) => setWifiPass(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                        placeholder={
                            config.qrType === 'url' ? 'https://yourwebsite.com' :
                                config.qrType === 'email' ? 'name@example.com' :
                                    config.qrType === 'phone' ? '+1 234 567 8900' : 'Enter text'
                        }
                        className={inputClass}
                    />
                )}
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
                {/* Foreground */}
                <div className="relative">
                    <label className={labelClass}>QR Color</label>
                    <button
                        onClick={() => { setShowFgPicker(!showFgPicker); setShowBgPicker(false) }}
                        className="group flex items-center gap-3 w-full bg-dark border border-border rounded-xl p-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    >
                        <div className="w-10 h-10 rounded-lg shadow-inner border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 transition-transform group-hover:scale-110" style={{ backgroundColor: config.fgColor }} />
                        </div>
                        <span className="text-sm font-mono text-textSecondary uppercase">{config.fgColor}</span>
                    </button>
                    {showFgPicker && (
                        <div className="absolute z-20 top-full mt-2 animate-fade-in origin-top-left">
                            <div className="fixed inset-0" onClick={() => setShowFgPicker(false)} />
                            <ChromePicker
                                color={config.fgColor}
                                onChange={(c) => updateConfig('fgColor', c.hex)}
                                disableAlpha
                            />
                        </div>
                    )}
                </div>

                {/* Background */}
                <div className="relative">
                    <label className={labelClass}>Background</label>
                    <button
                        onClick={() => { setShowBgPicker(!showBgPicker); setShowFgPicker(false) }}
                        className="group flex items-center gap-3 w-full bg-dark border border-border rounded-xl p-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    >
                        <div className="w-10 h-10 rounded-lg shadow-inner border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 transition-transform group-hover:scale-110" style={{ backgroundColor: config.bgColor }} />
                        </div>
                        <span className="text-sm font-mono text-textSecondary uppercase">{config.bgColor}</span>
                    </button>
                    {showBgPicker && (
                        <div className="absolute z-20 top-full mt-2 right-0 animate-fade-in origin-top-right">
                            <div className="fixed inset-0" onClick={() => setShowBgPicker(false)} />
                            <ChromePicker
                                color={config.bgColor}
                                onChange={(c) => updateConfig('bgColor', c.hex)}
                                disableAlpha
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Dot Style */}
            <div>
                <label className={labelClass}>Dot Style</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {['square', 'rounded', 'dots', 'classy', 'classy-rounded'].map(style => (
                        <button
                            key={style}
                            onClick={() => updateConfig('dotStyle', style)}
                            className={`flex-shrink-0 w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${config.dotStyle === style
                                    ? 'border-primary bg-primary/10 shadow-glow'
                                    : 'border-border bg-dark-raised hover:border-textMuted'
                                }`}
                            title={style}
                        >
                            <div className={`w-6 h-6 bg-current transition-colors ${config.dotStyle === style ? 'text-primary' : 'text-textMuted'
                                } ${style === 'rounded' ? 'rounded-md' :
                                    style === 'dots' ? 'rounded-full' :
                                        style.includes('classy') ? 'rounded-tr-lg rounded-bl-lg' :
                                            'rounded-none'
                                }`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Corner Style */}
            <div>
                <label className={labelClass}>Corner Style</label>
                <div className="flex bg-dark-raised rounded-xl p-1 gap-1 border border-border w-full inline-flex">
                    {['square', 'extra-rounded'].map(style => (
                        <button
                            key={style}
                            onClick={() => updateConfig('cornerStyle', style)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${config.cornerStyle === style
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-textMuted hover:text-white'
                                }`}
                        >
                            {style === 'square' ? 'Square' : 'Rounded'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logo Upload */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className={labelClass}>Logo (Optional)</label>
                    {!config.hasPaid && <span className="text-[11px] text-accent flex items-center gap-1 font-bold bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">🔒 PRO ONLY</span>}
                </div>

                <div className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all overflow-hidden group ${config.hasPaid ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' : 'border-border/30 bg-black/20'
                    }`}>
                    {!config.hasPaid && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#080810]/85 backdrop-blur-[2px]">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 border border-primary/20">
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            </div>
                            <button onClick={() => updateConfig('triggerPaywall', true)} className="text-xs font-bold text-white hover:text-primary transition-colors underline decoration-primary/50 underline-offset-4">
                                Unlock Feature
                            </button>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        disabled={!config.hasPaid}
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />

                    {config.logo ? (
                        <div className="relative inline-block group">
                            <img src={config.logo} alt="Logo" className="w-16 h-16 object-contain rounded-md shadow-lg border border-border bg-white" />
                            <button
                                onClick={(e) => { e.preventDefault(); updateConfig('logo', null) }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-20"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2 group-hover:scale-105 transition-transform duration-300">
                            <div className="w-10 h-10 mx-auto border-2 border-border rounded-lg flex items-center justify-center border-dashed">
                                <svg className="h-5 w-5 text-textMuted" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </div>
                            <div className="text-xs text-textMuted">
                                Drop logo or <span className="text-primary-light border-b border-primary/30">browse</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Correction */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <label className={labelClass}>Error Correction</label>
                    <div className="group relative flex items-center cursor-help">
                        <svg className="w-4 h-4 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-black/90 border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Higher = more reliable scan, but denser pattern.
                        </span>
                    </div>
                </div>
                <div className="flex bg-dark-raised rounded-xl p-1 w-full inline-flex border border-border">
                    {['L', 'M', 'Q', 'H'].map(level => (
                        <button
                            key={level}
                            onClick={() => updateConfig('errorCorrection', level)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${config.errorCorrection === level
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-textMuted hover:text-white'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}
