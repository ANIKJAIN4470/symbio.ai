export default function StatCard({ label, value, trend, accent = 'emerald' }) {
  const accentClasses = {
    emerald: 'text-emerald-300',
    blue: 'text-sky-300',
    violet: 'text-violet-300',
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20 backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className={`mt-2 text-sm ${accentClasses[accent]}`}>{trend}</p>
    </div>
  );
}
