// Sidebar navigation component
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen p-6 hidden md:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center font-bold">IH</div>
        <div>
          <div className="font-semibold">InsureHub</div>
          <div className="text-xs text-slate-300">Insurance Management</div>
        </div>
      </div>

      <nav className="space-y-1">
        <Link href="#" className="block px-3 py-2 rounded bg-slate-700">Dashboard</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Agents</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Dealers</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Customers</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Insurance Products</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Claims</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Reports & Analytics</Link>
        <Link href="#" className="block px-3 py-2 rounded hover:bg-white/5">Settings</Link>
      </nav>

      <div className="mt-6 text-xs text-slate-400">Collapse Menu</div>
    </aside>
  );
}
