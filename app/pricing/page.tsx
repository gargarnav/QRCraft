import Pricing from '@/components/Pricing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
    return (
        <div className="bg-dark text-textLight min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-1">
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}
