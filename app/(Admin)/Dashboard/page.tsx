import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatCard from './components/StatCard';
import { LineChart, DonutChart } from './components/Charts';
import RecentClaims from './components/RecentClaims';
import TopAgents from './components/TopAgents';
import { stats } from './data';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stats.map((s) => (
              <div key={s.title} className="md:col-span-1">
                <StatCard title={s.title} value={s.value} change={s.change} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LineChart />
            </div>
            <div>
              <DonutChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4"> 
                  {/* Premium Collection Trend placeholder */}
                  <div className="text-sm text-slate-500">Premium Collection Trend</div>
                  <div className="h-48 flex items-center justify-center text-slate-400">Chart placeholder</div>
                </div>
                <TopAgents />
              </div>
            </div>
            <div>
              <RecentClaims />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
