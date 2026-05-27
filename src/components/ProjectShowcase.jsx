import React, { useState } from 'react';
import { ChevronRight, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SERVICES = [
  {
    id: 'branding',
    title: 'Branding',
    description:
      'I create distinctive brand identities through strategy and visual design, helping businesses stand out, connect with audiences, and leave a lasting impression.',
    image: '/team_meeting.jpg',
    nextImage: '/dev_office.jpg',
    points: [
      'Brand Strategy',
      'Visual Identity Design',
      'Logo & Typography',
      'Color Palette Creation',
      'Brand Guidelines',
    ],
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'We develop scalable websites and mobile applications tailored to meet diverse business needs. Our web development services in Hyderabad focus on delivering high performance, strong security, and seamless functionality across all devices and platforms.',
    image: '/dev_office.jpg',
    nextImage: '/team_meeting.jpg',
    points: [
      'Business Website Development',
      'WordPress',
      'API Development',
      'Front End Development',
      'JavaScript',
      'Mobile App Development',
    ],
  },
];

export default function ProjectShowcase({ onStartProject }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const currentService = SERVICES[currentIndex];
  const revealRef = useScrollReveal();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SERVICES.length);
  };

  return (
    <div ref={revealRef} className="reveal mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="section-badge">
            <Sparkles className="h-3.5 w-3.5" />
            What we offer
          </span>
          <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Premium <span className="gradient-accent">Services</span>
          </h2>
        </div>
        <div className="flex gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                currentIndex === i
                  ? 'bg-brand-green/20 text-brand-glow border border-brand-green/30'
                  : 'border border-white/10 text-slate-500 hover:text-white hover:border-white/20'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative min-h-[280px] overflow-hidden lg:col-span-5 lg:min-h-[520px]">
            <img
              key={currentService.id}
              src={currentService.image}
              alt={currentService.title}
              className="h-full w-full object-cover transition-all duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-space-mid/95 lg:to-space-mid" />
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-glow">
                Featured Service
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 lg:col-span-5 lg:p-10 xl:p-12">
            <div>
              <h3 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                {currentService.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-400 md:text-base">
                {currentService.description}
              </p>
              <div className="mb-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs text-slate-500">5.0 client rating</span>
              </div>
              <div className="mb-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
              <div className="flex flex-col gap-3">
                {currentService.points.map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-green/10 text-[10px] font-bold text-brand-glow">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <button onClick={onStartProject} className="btn-primary group">
                Start A Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 border-t border-white/10 bg-white/[0.02] p-8 lg:col-span-2 lg:border-l lg:border-t-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Next Service
            </span>
            <div
              onClick={handleNext}
              className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 lg:aspect-square"
            >
              <img
                src={currentService.nextImage}
                alt="Next Service Preview"
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all group-hover:bg-black/30">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  Preview
                </span>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-green to-brand-teal text-space-dark shadow-glow-sm transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
