import { LayoutDashboard, PackagePlus, Sparkles, Repeat2, BarChart3, ShieldCheck, LogOut, Menu } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/listings', label: 'Listings', icon: PackagePlus },
  { to: '/matches', label: 'AI Matches', icon: Sparkles },
  { to: '/transactions', label: 'Transactions', icon: Repeat2 },
  { to: '/esg', label: 'ESG', icon: BarChart3 },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_35%),linear-gradient(135deg,_#031427_0%,_#061b2c_55%,_#020812_100%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <aside className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:w-64 lg:p-5">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-300">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">SymbioAI</p>
                <p className="text-sm text-slate-400">Industrial symbiosis</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-sm text-slate-400">{user?.role}</p>
            <button
              onClick={logout}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/70 px-4 py-4 shadow-xl shadow-slate-950/25 backdrop-blur-xl">
            <div>
              <p className="text-sm text-slate-400">Enterprise operations workspace</p>
              <h2 className="text-xl font-semibold text-white">SymbioAI Command Center</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-300">
              <Menu size={16} />
              Live network
            </div>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
