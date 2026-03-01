export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid flex-col items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative flex flex-col items-center justify-center p-4">
                {/* QRCraft Logo Text */}
                <div className="mb-8 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">QRCraft</h1>
                    <p className="text-slate-400 text-sm">Professional QR codes, beautifully simple.</p>
                </div>

                {/* Auth component wrapper */}
                <div className="w-full max-w-[400px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
