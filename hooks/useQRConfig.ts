// @ts-nocheck
import { useState } from 'react'

export function useQRConfig() {
    const [config, setConfig] = useState({
        content: "",
        qrType: "url",
        fgColor: "#6C63FF",
        bgColor: "#FFFFFF",
        dotStyle: "square",
        cornerStyle: "square",
        logo: null, // base64 string
        errorCorrection: "M",
        hasPaid: false,
        // New fields for Dynamic QRs API
        isDynamic: false,
        qrName: "",
        destinationUrl: "",
        shortUrl: "",

        // Generate Flow
        isGenerated: false,
        isSaving: false,
        saveStatus: "idle", // 'idle' | 'saving' | 'saved' | 'error'
    })

    const updateConfig = (key, value) => {
        setConfig(prev => {
            const systemKeys = ['isGenerated', 'isSaving', 'saveStatus', 'triggerPaywall', 'paywallMessage', 'hasPaid', 'shortUrl'];
            if (!systemKeys.includes(key)) {
                return { ...prev, [key]: value, isGenerated: false, saveStatus: 'idle' };
            }
            return { ...prev, [key]: value };
        });
    }

    return { config, updateConfig, setConfig }
}
