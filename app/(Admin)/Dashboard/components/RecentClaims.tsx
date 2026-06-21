import { recentClaims } from '../data';

// Recent claims list on the right column
export default function RecentClaims() {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">Recent Claims</div>
        <div className="text-sm text-blue-600">View All</div>
      </div>
      <ul className="mt-3 space-y-3">
        {recentClaims.map((c) => (
          <li key={c.id} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{c.id} • {c.name}</div>
              <div className="text-xs text-slate-500">{c.time}</div>
            </div>
            <div className="text-sm font-medium text-right">
              <div>{c.amount}</div>
              <div className={`text-xs ${c.status === 'Approved' ? 'text-green-600' : c.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{c.status}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
