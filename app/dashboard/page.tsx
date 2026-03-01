import { redirect } from 'next/navigation';

export default function DashboardPage() {
    // Our app is a single-page application built on /app/page.tsx
    // We use the ?tab=dashboard URL query to tell the home page to render the dashboard view
    redirect('/?tab=dashboard');
}
