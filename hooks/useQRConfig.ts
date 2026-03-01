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
        hasPaid: false
    })

    const updateConfig = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    return { config, updateConfig, setConfig }
}
