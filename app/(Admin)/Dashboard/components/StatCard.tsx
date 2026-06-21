// Small stat card used in the top row
export default function StatCard({ title, value, change }: { title: string; value: string; change?: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4 w-full">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {change && (
          <div className={`text-sm font-medium ${change.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}
