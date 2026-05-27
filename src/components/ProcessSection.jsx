import React from 'react';
import { Target, Eye, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Mission',
    subtitle: 'Supporting Business Success with Excellence',
    description:
      'KBK Business Solutions is committed to helping businesses succeed through creative marketing strategies, advanced technology, and effective digital solutions tailored to their needs.',
    image: '/chrome2.png',
    icon: Target,
    accent: 'from-blue-500/20 to-cyan-500/10',
    border: 'group-hover:border-blue-500/30',
  },
  {
    step: '02',
    title: 'Vision',
    subtitle: 'Building Strong Digital Foundations for Businesses',
    description:
      'Our vision is to empower brands with innovative digital tools and strategies that improve visibility, strengthen brand identity, and drive long-term growth.',
    image: '/chrome1.png',
    icon: Eye,
    accent: 'from-brand-green/20 to-brand-teal/10',
    border: 'group-hover:border-brand-green/30',
  },
  {
    step: '03',
    title: 'Goals',
    subtitle: 'Delivering High-Performance Digital Experiences',
    description:
      'We design and develop websites and digital solutions that focus on speed, user experience, and scalability, ensuring your business stays competitive in the digital marketplace.',
    image: '/wireframe_sphere.png',
    icon: Rocket,
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'group-hover:border-violet-500/30',
  },
];

export default function ProcessSection() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="reveal mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="section-badge">Our Process</span>
          <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            How we <span className="gradient-accent">deliver excellence</span>
          </h2>
        </div>
        <p className="max-w-md text-slate-400 leading-relaxed">
          A proven framework that transforms ideas into high-impact digital experiences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.step}
            className={`group relative glass-card-hover cursor-pointer overflow-hidden p-8 ${step.border}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-brand-green/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-full object-cover brightness-110"
                    />
                  </div>
                </div>
                <span className="font-display text-5xl font-black text-white/[0.06] transition-colors group-hover:text-brand-glow/15">
                  {step.step}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <step.icon className="h-4 w-4 text-brand-green" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-glow">
                  {step.title}
                </span>
              </div>

              <h4 className="mb-4 text-xl font-bold leading-snug text-white">{step.subtitle}</h4>
              <div className="mb-5 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
