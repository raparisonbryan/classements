import HomePage from '@/components/homePage/HomePage';
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <div className="flex">
        <Dashboard/>
        <HomePage/>
    </div>
  );
}
