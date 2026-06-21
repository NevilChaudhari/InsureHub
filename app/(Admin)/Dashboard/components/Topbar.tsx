// Topbar with search and user avatar
export default function Topbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-slate-50">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 bg-slate-100 rounded">☰</button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <input className="hidden md:block rounded-full border px-3 py-1 text-sm" placeholder="Search anything..." />
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
}
