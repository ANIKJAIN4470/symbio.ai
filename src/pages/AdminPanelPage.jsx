import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { adminVerifications, disputeQueue } from '../services/dummyData';

export default function AdminPanelPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin panel"
        description="Approve factories, verify users, and resolve ecosystem disputes."
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/25">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">User verification & factory approvals</h2>
              <p className="text-sm text-slate-400">Pending ecosystem trust actions</p>
            </div>
          </div>

          <div className="space-y-3">
            {adminVerifications.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.type}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">{item.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/25">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Dispute management</h2>
              <p className="text-sm text-slate-400">Escalation queue and resolution metrics</p>
            </div>
          </div>

          {disputeQueue.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-6 text-center text-sm text-slate-400">
              No active disputes. The network is operating smoothly.
            </div>
          ) : (
            <div className="space-y-3">
              {disputeQueue.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="mt-1 text-amber-400" />
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
