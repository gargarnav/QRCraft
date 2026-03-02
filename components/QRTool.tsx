// @ts-nocheck
"use client";

import { useQRConfig } from '@/hooks/useQRConfig'
import Controls from './Controls'
import Preview from './Preview'

export default function QRTool() {
    // Config State Hook
    const { config, updateConfig } = useQRConfig()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full max-h-[85vh]">
            {/* Left Side - Controls */}
            <div className="lg:col-span-5 h-[85vh]">
                <Controls config={config} updateConfig={updateConfig} />
            </div>

            {/* Right Side - Preview */}
            <div className="lg:col-span-7 h-[85vh] bg-dark-raised rounded-[24px] border border-border p-8 shadow-inner overflow-hidden flex flex-col items-center justify-center">
                <Preview config={config} updateConfig={updateConfig} />
            </div>
        </div>
    )
}
