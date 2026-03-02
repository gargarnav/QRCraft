import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
    return (
        <div className="bg-dark text-textLight min-h-screen font-inter">
            <Header />
            <main>
                <Dashboard />
            </main>
            <Footer />
        </div>
    );
}
