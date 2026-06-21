// Simple SVG placeholders for line chart and donut chart to avoid extra deps
export function LineChart() {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4">
      <div className="text-sm text-slate-500">Business Overview</div>
      <svg viewBox="0 0 600 180" className="w-full h-40 mt-3">
        <polyline fill="none" stroke="#60a5fa" strokeWidth="3" points="0,120 80,90 160,100 240,70 320,90 400,60 480,80 560,50" />
        <polyline fill="none" stroke="#34d399" strokeWidth="3" points="0,140 80,120 160,110 240,100 320,110 400,95 480,100 560,85" />
        <polyline fill="none" stroke="#fb7185" strokeWidth="3" points="0,160 80,150 160,148 240,155 320,150 400,140 480,145 560,140" />
      </svg>
    </div>
  );
}

export function DonutChart() {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg p-4 flex flex-col items-center justify-center">
      <div className="text-sm text-slate-500">Contracts by Status</div>
      <svg viewBox="0 0 36 36" className="w-32 h-32 mt-4">
        <circle r="15.9155" cx="18" cy="18" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="65 35" strokeDashoffset="25"></circle>
        <circle r="11" cx="18" cy="18" fill="white"></circle>
        <text x="18" y="20" fontSize="4" textAnchor="middle">13,475</text>
      </svg>
    </div>
  );
}
