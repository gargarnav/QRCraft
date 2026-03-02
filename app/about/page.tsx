import About from '@/components/About';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <div className="bg-dark text-textLight min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-1">
                <About />
            </main>
            <Footer />
        </div>
    );
}
