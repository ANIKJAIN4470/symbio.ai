import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { aiMatches } from '../services/dummyData';

export default function AiMatchPage() {
  return (
    <div className="space-y-6">
      <PageHeader
a        title="AI match engine"
        description="Review high-confidence pairings based on chemistry, proximity, and carbon impact."
      />

      <div className="grid gap-4">
        {aiMatches.map((match) => (
          <div key={match.name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/25">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">Match ready</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{match.name}</h2>
                <p className="mt-2 text-sm text-slate-400">Partner: {match.partner}</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-emerald-300">
                Symbio Score {match.score}/100
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Distance</p>
                <p className="mt-2 text-lg font-semibold text-white">{match.distance}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Estimated carbon savings</p>
                <p className="mt-2 text-lg font-semibold text-white">{match.carbon}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Next action</p>
                <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                  Contact buyer
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
