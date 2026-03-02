import QRTool from '@/components/QRTool';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GeneratePage() {
    return (
        <div className="bg-dark text-textLight min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-1 py-12 px-4 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Generator</h1>
                    <p className="text-gray-400">Design, customize, and download your QR code.</p>
                </div>
                <QRTool />
            </main>
            <Footer />
        </div>
    );
}
