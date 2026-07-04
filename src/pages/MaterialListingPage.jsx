import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const initialState = {
  materialName: '',
  composition: '',
  physicalState: 'Solid',
  quantity: '',
  frequency: 'Monthly',
  certificate: '',
};

export default function MaterialListingPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.materialName.trim()) nextErrors.materialName = 'Material name is required';
    if (!form.composition.trim()) nextErrors.composition = 'Chemical composition is required';
    if (!form.quantity.trim()) nextErrors.quantity = 'Quantity is required';
    if (!form.certificate.trim()) nextErrors.certificate = 'A certificate upload is required';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Material listing"
        description="Publish by-products and secondary materials for AI-powered industrial matching."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/25">
          <h2 className="text-xl font-semibold text-white">Listing guidance</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <li>• Include exact chemical composition to improve AI match quality.</li>
            <li>• Upload a certificate to activate verified-source visibility.</li>
            <li>• Update frequency to support ongoing supply planning.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/25">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Material Name</span>
              <input name="materialName" value={form.materialName} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0" placeholder="Blast furnace slag" />
              {errors.materialName ? <p className="text-sm text-rose-400">{errors.materialName}</p> : null}
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Physical State</span>
              <select name="physicalState" value={form.physicalState} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none">
                <option>Solid</option>
                <option>Liquid</option>
                <option>Gas</option>
                <option>Heat</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>Chemical Composition</span>
              <textarea name="composition" value={form.composition} onChange={handleChange} rows="3" className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="SiO₂ 38%, CaO 24%, Fe₂O₃ 18%" />
              {errors.composition ? <p className="text-sm text-rose-400">{errors.composition}</p> : null}
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Quantity</span>
              <input name="quantity" value={form.quantity} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="1,200 tons" />
              {errors.quantity ? <p className="text-sm text-rose-400">{errors.quantity}</p> : null}
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Frequency</span>
              <select name="frequency" value={form.frequency} onChange={handleChange} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>Upload Certificate</span>
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 px-4 py-5">
                <UploadCloud size={18} className="text-emerald-300" />
                <input name="certificate" value={form.certificate} onChange={handleChange} className="w-full bg-transparent text-sm text-slate-300 outline-none" placeholder="certificate.pdf" />
              </div>
              {errors.certificate ? <p className="text-sm text-rose-400">{errors.certificate}</p> : null}
            </label>
          </div>

          <button type="submit" className="mt-6 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
            Submit listing
          </button>

          {submitted ? <p className="mt-4 text-sm text-emerald-300">Listing submitted successfully and queued for AI review.</p> : null}
        </form>
      </div>
    </div>
  );
}
