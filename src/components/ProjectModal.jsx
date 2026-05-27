import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ProjectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'development',
    budget: '$5k - $10k',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: 'development',
      budget: '$5k - $10k',
      details: '',
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-space-mid/95 p-8 shadow-glow-lg backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand-green/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-brand-violet/10 blur-3xl" />

        <div className="relative mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <span className="section-badge mb-3">
              <Sparkles className="h-3 w-3" />
              Get started
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white">Start Your Project</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="relative space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="input-field mt-0"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="input-field mt-0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Service Type
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="input-field mt-0 cursor-pointer"
                >
                  <option value="development">Development</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="media">Media Services</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="input-field mt-0 cursor-pointer"
                >
                  <option value="<$5k">&lt; $5,000</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k+">$25,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Project Details
              </label>
              <textarea
                rows="3"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Briefly describe your requirements..."
                className="input-field mt-0 resize-none"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-space-dark border-t-transparent" />
              ) : (
                <>
                  Send Proposal
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="relative py-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/20 animate-bounce">
              <CheckCircle2 className="h-8 w-8 text-brand-glow" />
            </div>
            <h4 className="mb-3 text-2xl font-bold text-white">Proposal Received!</h4>
            <p className="mx-auto mb-8 max-w-sm text-sm text-slate-400 leading-relaxed">
              Thank you, {formData.name}. We will review your project details and get back to you at{' '}
              {formData.email} within 24 hours.
            </p>
            <button onClick={handleReset} className="btn-secondary">
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
