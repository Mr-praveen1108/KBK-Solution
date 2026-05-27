import React from 'react';
import { ArrowRight, Instagram, Linkedin, Twitter, Facebook, Sparkles, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const HIGHLIGHTS = [
  'End-to-end digital strategy',
  'Award-winning UI/UX design',
  'ROI-focused marketing campaigns',
  'Scalable web & mobile apps',
];

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="reveal relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-brand-violet/5 blur-[100px] pointer-events-none" />

      <div className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <span className="section-badge">
            <Sparkles className="h-3.5 w-3.5" />
            About KBK
          </span>

          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            KBK Business Solutions —{' '}
            <span className="gradient-accent">Complete IT & Digital Growth</span> Partner
          </h2>

          <p className="text-sm font-semibold tracking-wide text-brand-teal">
            Web Development · UI/UX Design · Digital Marketing · Graphic Design
          </p>

          <p className="max-w-xl text-base leading-relaxed text-slate-400">
            KBK Business Solutions helps businesses grow with smart IT services and result-driven digital marketing. We design and develop websites, mobile apps, user-friendly interfaces, and powerful online marketing strategies to improve brand visibility and business performance.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="btn-primary group">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="border-t border-white/10 pt-8">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Connect with us
            </span>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Facebook, href: 'https://facebook.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-brand-green/40 hover:bg-brand-green/10 hover:text-brand-glow hover:shadow-glow-sm"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[480px] items-center justify-center lg:col-span-5">
          <div className="absolute h-[380px] w-[380px] animate-spin-slow rounded-full border border-dashed border-brand-green/20" />
          <div className="absolute h-[340px] w-[340px] rounded-full border border-brand-teal/10 shadow-[inset_0_0_60px_rgba(16,185,129,0.06)]" />
          <div className="absolute h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-brand-green/15 via-brand-teal/10 to-transparent blur-2xl" />

          <div className="relative z-10 flex h-[380px] w-[340px] items-end justify-center">
            <img
              src="/cofounder.png"
              alt="Dr. Bharath Kumar"
              className="h-[115%] w-full select-none object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="absolute -bottom-2 left-0 right-0 z-20 text-center">
            <span
              className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl"
              style={{
                WebkitTextStroke: '1px rgba(52, 211, 153, 0.25)',
                color: 'transparent',
              }}
            >
              Dr. Bharath Kumar
            </span>
          </div>

          <div className="absolute -right-2 top-8 z-20 glass-card px-4 py-3 animate-float">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Founder</p>
            <p className="text-sm font-bold text-white">Visionary Leader</p>
          </div>
        </div>
      </div>
    </div>
  );
}
