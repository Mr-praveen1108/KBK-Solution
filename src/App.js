import React, { useState, useEffect } from 'react';
import InteractiveSphere from './components/InteractiveSphere';
import ProjectShowcase from './components/ProjectShowcase';
import ProjectModal from './components/ProjectModal';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import StatCounter from './components/StatCounter';
import {
  Menu,
  X,
  ArrowUp,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Quote,
  ChevronDown,
  Send,
  CheckCircle2,
} from 'lucide-react';

const TEAM_MEMBERS = [
  { name: 'Mrs. Jaya Vyshnavi', title: 'HR Director', company: 'KBK Group' },
  { name: 'Mr. Sandeep Reddy', title: 'Director', company: 'KBK Group' },
  { name: 'Mr. Srikanth Reddy', title: 'General Manager', company: 'KBK Group' },
  { name: 'Mr. G. Nikeelu', title: 'Marketing Chief', company: 'KBK Group' },
  { name: 'Mr. Upender', title: 'Operations Manager', company: 'KBK Group' },
  { name: 'Mr. Arun Kumar', title: 'HR & Immigration Manager', company: 'KBK Group' },
  { name: 'Mr. Shiva Shankar', title: 'Director', company: 'KBK Broadcasting Pvt. Ltd' },
  { name: 'Mr. Saif Mohammad', title: 'Business Development Manager', company: 'KBK Business Solutions Pvt Ltd' },
  { name: 'Mr. Gaddam Harish', title: 'HR Manager', company: 'KBK Group' },
  { name: 'Mr. Upender', title: 'Operations Manager', company: 'KBK Group' },
];

const FAQ_ITEMS = [
  {
    id: 'faq1',
    question: 'What makes a company the best digital marketing agency in Hyderabad?',
    answer:
      'A leading digital marketing agency blends local market expertise, measurable strategy, fast execution, and consistent ROI for clients across industries.',
  },
  {
    id: 'faq2',
    question: 'What types of digital marketing services are available in Hyderabad?',
    answer:
      'Our services include SEO, social media marketing, PPC advertising, content marketing, web development, brand strategy, and conversion optimization.',
  },
  {
    id: 'faq3',
    question: 'How does a ROI-focused digital marketing agency benefit businesses?',
    answer:
      'We sharpen campaigns around value, tracking, and efficiency so every marketing dollar contributes to revenue growth and stronger customer acquisition.',
  },
  {
    id: 'faq4',
    question: 'Can a digital marketing agency manage campaigns remotely?',
    answer:
      'Yes — remote campaign management is standard, and we use collaboration, reporting, and agile processes to deliver world-class performance from anywhere.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'KBK transformed our digital presence completely. Our leads increased by 180% within six months.',
    author: 'Rajesh K.',
    role: 'CEO, Tech Startup',
    rating: 5,
  },
  {
    quote: 'Exceptional design quality and flawless execution. They truly understand premium brand experiences.',
    author: 'Priya M.',
    role: 'Marketing Director',
    rating: 5,
  },
  {
    quote: 'The team delivered our entire platform ahead of schedule with outstanding attention to detail.',
    author: 'Arjun S.',
    role: 'Founder, E-commerce Brand',
    rating: 5,
  },
];

const TECH_STACK = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS',
  'Figma', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Docker', 'GraphQL',
];

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#works', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [stars, setStars] = useState([]);
  const [openFaq, setOpenFaq] = useState('faq1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const starList = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 6,
    }));
    setStars(starList);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > 40);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-space-dark text-white">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5">
        <div
          className="scroll-progress h-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-violet"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 mesh-bg" />
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-40" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="pointer-events-none fixed twinkle-star bg-brand-glow/40"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Header */}
      <header
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-space-dark/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green to-brand-teal shadow-glow-sm">
              <span className="relative z-10 text-xs font-black tracking-widest text-space-dark">KBK</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-white">KBK Solutions</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Digital Excellence</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary hidden !py-2.5 !px-6 text-xs md:inline-flex"
            >
              Start Project
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-space-mid/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setModalOpen(true); closeMobileMenu(); }}
              className="btn-primary mt-2 w-full justify-center"
            >
              Start Project
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <span className="section-badge animate-fade-up">
                <Sparkles className="h-3.5 w-3.5" />
                Premium digital growth
              </span>

              <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4rem]">
                <span className="gradient-heading">Build a stunning</span>
                <br />
                <span className="gradient-accent">digital presence</span>
                <br />
                <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl font-bold">
                  with speed & clarity.
                </span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                KBK Business Solutions blends product-led design, high-performance engineering, and growth marketing to create memorable experiences that scale.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Zap, title: 'Strategy & Planning', desc: 'Smart strategy, messaging, and growth-focused design for your brand.' },
                  { icon: Shield, title: 'Design & Launch', desc: 'Elegant UI, fast experiences, and marketing systems that convert.' },
                ].map((card) => (
                  <div key={card.title} className="glass-card-hover p-5">
                    <card.icon className="mb-3 h-5 w-5 text-brand-green" />
                    <p className="text-sm font-bold text-white">{card.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => setModalOpen(true)} className="btn-primary group">
                  Start a Project
                  <TrendingUp className="h-4 w-4" />
                </button>
                <a href="#works" className="btn-secondary">
                  View Services
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: '400+', label: 'Projects' },
                  { value: '99%', label: 'Satisfaction' },
                  { value: '15+', label: 'Years' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-4 text-center sm:p-5">
                    <p className="font-display text-2xl font-black text-white sm:text-3xl">
                      <StatCounter value={stat.value} />
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-20 w-full">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-green/25 via-brand-teal/15 to-brand-violet/20 blur-2xl" />
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#12161f] shadow-glow-lg sm:min-h-[480px] lg:min-h-[520px]">
                <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-2 border-b border-white/10 bg-[#12161f]/90 px-4 py-3 backdrop-blur-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-brand-green/80" />
                  </div>
                  <span className="ml-2 text-[10px] font-mono text-slate-400">tech-stack.sphere</span>
                </div>
                <div className="relative z-10 h-full min-h-[420px] bg-gradient-to-b from-[#161b26] via-[#12161f] to-[#0d1018] px-2 pb-4 pt-14 sm:min-h-[480px] lg:min-h-[520px]">
                  <InteractiveSphere />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <a href="#about" className="flex flex-col items-center gap-2 text-slate-500 transition hover:text-brand-glow">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </section>

        {/* Tech marquee */}
        <section className="border-y border-white/5 bg-white/[0.02] py-6 overflow-hidden">
          <div className="relative flex">
            <div className="marquee-track gap-12 px-6">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span
                  key={i}
                  className="flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-widest text-slate-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative border-t border-white/5">
          <AboutSection />
        </section>

        <section id="works" className="border-t border-white/5">
          <ProjectShowcase onStartProject={() => setModalOpen(true)} />
        </section>

        <section id="process" className="border-t border-white/5 bg-white/[0.01]">
          <ProcessSection />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-14 text-center">
              <span className="section-badge">Client Stories</span>
              <h2 className="mt-6 font-display text-4xl font-extrabold text-white md:text-5xl">
                Trusted by <span className="gradient-accent">ambitious brands</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="glass-card-hover flex flex-col p-8">
                  <Quote className="mb-4 h-8 w-8 text-brand-green/40" />
                  <p className="flex-1 text-sm leading-relaxed text-slate-300 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="font-bold text-white">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                    <div className="mt-3 flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <span key={j} className="text-brand-gold text-sm">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center">
              <span className="section-badge">Our Team</span>
              <h2 className="mt-6 font-display text-4xl font-extrabold text-white md:text-5xl">
                Leadership shaping the <span className="gradient-accent">KBK experience</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400 leading-relaxed">
                Our senior team combines marketing, product, operations, and creative leadership to deliver premium digital work.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={index}
                  className="group glass-card-hover p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-teal/10 text-lg font-bold text-brand-glow transition group-hover:shadow-glow-sm">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm text-brand-teal">{member.title}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    {member.company}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why-us" className="border-t border-white/5 bg-white/[0.01] py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="space-y-8">
                <span className="section-badge">Why Choose Us</span>
                <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                  Turning creativity into{' '}
                  <span className="gradient-accent">measurable success</span>
                </h2>
                <p className="text-lg leading-relaxed text-slate-400">
                  We blend design, technology, and strategy to build modern brand experiences that perform on every platform.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { n: '01', title: 'Smart & Flexible Planning', desc: 'We understand your goals and build a strategic roadmap for success.' },
                    { n: '02', title: 'Collaboration & Innovation', desc: 'Our teams transform ideas into effective, engaging digital experiences.' },
                  ].map((item) => (
                    <div key={item.n} className="glass-card-hover p-6">
                      <span className="font-display text-3xl font-black text-brand-green/30">{item.n}</span>
                      <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-violet/20 to-brand-teal/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-3">
                  <img
                    src="/wireframe_sphere.png"
                    alt="Digital success illustration"
                    className="w-full rounded-[1.5rem] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insights + FAQ */}
        <section id="insights" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="glass-card overflow-hidden p-8 md:p-12">
              <div className="grid gap-12 xl:grid-cols-2 xl:items-start">
                <div className="space-y-8">
                  <span className="section-badge">Performance Highlights</span>
                  <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                    Designed for growth,{' '}
                    <span className="gradient-accent">powered by trust</span>
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    Explore the performance metrics and client confidence that define our digital work.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { value: '400+', label: 'Projects', sub: 'Creative work that drives results.' },
                      { value: '99%', label: 'Satisfaction', sub: 'Exceeding expectations.' },
                      { value: '15+', label: 'Experience', sub: 'Years of industry expertise.' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                        <p className="font-display text-3xl font-black text-white">
                          <StatCounter value={s.value} />
                        </p>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-brand-glow">{s.label}</p>
                        <p className="mt-2 text-xs text-slate-500">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-glow">FAQ</span>
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">Answers that help you move faster</h3>
                  </div>
                  <div className="space-y-3">
                    {FAQ_ITEMS.map((item, idx) => {
                      const isOpen = openFaq === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? '' : item.id)}
                          className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                            isOpen
                              ? 'border-brand-green/30 bg-brand-green/5 shadow-glow-sm'
                              : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-xs font-bold text-brand-glow">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1">
                              <p className="font-semibold text-white pr-6">{item.question}</p>
                              {isOpen && (
                                <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.answer}</p>
                              )}
                            </div>
                            <span className={`text-xl font-light transition-transform ${isOpen ? 'rotate-45 text-brand-glow' : 'text-slate-500'}`}>
                              +
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 xl:grid-cols-2 xl:items-start">
              <div className="space-y-8">
                <span className="section-badge">Get in touch</span>
                <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                  Let&apos;s start{' '}
                  <span className="gradient-accent">creating together</span>
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                  Share your idea and budget with us, and we&apos;ll help you build a high-impact digital experience that grows your brand.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="glass-card p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-glow">Say hello</p>
                    <p className="mt-3 text-lg font-bold text-white">hello@kbkbusinesssolutions.com</p>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-glow">Working globally</p>
                    <p className="mt-3 text-lg font-bold text-white">Remote delivery, local impact.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 md:p-10">
                {contactSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="mb-4 h-12 w-12 text-brand-glow" />
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="mt-2 text-sm text-slate-400">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Name
                        <input type="text" required placeholder="Your name" className="input-field" />
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email
                        <input type="email" required placeholder="you@example.com" className="input-field" />
                      </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        You are interested in
                        <select className="input-field cursor-pointer">
                          <option>Development</option>
                          <option>Marketing</option>
                          <option>Branding</option>
                        </select>
                      </label>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Budget in USD
                        <select className="input-field cursor-pointer">
                          <option>$5k - $15k</option>
                          <option>$15k - $30k</option>
                          <option>$30k+</option>
                        </select>
                      </label>
                    </div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Project details
                      <textarea rows="5" placeholder="Describe your project" className="input-field resize-none" />
                    </label>
                    <button type="submit" className="btn-primary group w-full justify-center sm:w-auto">
                      Submit Message
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-space-mid">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="space-y-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green to-brand-teal">
                <span className="text-xs font-black text-space-dark">KBK</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                Working globally to deliver beautifully engineered digital products, marketing campaigns, and growth strategies.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Sitemap</span>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-slate-300 transition hover:text-brand-glow">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Socials</span>
              {[
                { label: 'Twitter (X)', href: 'https://twitter.com' },
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-slate-300 transition hover:text-brand-glow"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 py-6 text-center">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} KBK Business Solutions. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-space-mid/90 text-brand-glow shadow-glow-sm backdrop-blur-xl transition-all duration-300 hover:border-brand-green/30 hover:shadow-glow-md ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
