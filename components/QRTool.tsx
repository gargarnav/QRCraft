// @ts-nocheck
"use client";


import Controls from '@/components/Controls'
import Preview from '@/components/Preview'


export default function QRTool({ config, updateConfig, dynamicCodes, setDynamicCodes }: any) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[700px]">
            {/* Left Panel - Controls */}
            <div className="w-full lg:w-[450px] lg:flex-shrink-0 h-full">
                <Controls config={config} updateConfig={updateConfig} dynamicCodes={dynamicCodes} setDynamicCodes={setDynamicCodes} />
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 h-full">
                <Preview config={config} updateConfig={updateConfig} />
            </div>
        </div>
    )
}
