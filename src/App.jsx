import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Shield, Settings, Wrench, 
  Truck, CheckCircle, MapPin, Phone, Mail, Zap, ChevronRight,
  Factory, Building2, Server, Power, Linkedin, Twitter, Facebook
} from 'lucide-react';

// --- Custom CSS Injection for Animations ---
const customStyles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
  @keyframes spin-slow {
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
  .architectural-grid {
    background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .architectural-grid-dark {
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #171717 !important;
  }
`;

// --- Shared Data ---
const productsData = [
  { name: 'LT Auto Change-Over Panels', image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=800&q=80' },
  { name: 'Power Control Center (PCC)', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Motor Control Centre (MCC)', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80' },
  { name: 'LT Distribution Panels', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
  { name: 'DG Synchronization', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { name: 'APFC Panels', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80' },
];

const servicesData = [
  { num: '01', icon: <Settings className="w-8 h-8" />, title: 'Design & Engineering', desc: 'Custom schematics tailored to precise power requirements and spatial constraints. Precision engineering from the ground up.' },
  { num: '02', icon: <Truck className="w-8 h-8" />, title: 'Manufacturing', desc: 'In-house assembly of high-grade, turnkey electrical panels strictly adhering to international safety protocols.' },
  { num: '03', icon: <Wrench className="w-8 h-8" />, title: 'Site Installation', desc: 'Professional on-site integration executed by certified electrical engineers ensuring zero operational friction.' },
  { num: '04', icon: <CheckCircle className="w-8 h-8" />, title: 'Commissioning', desc: 'Rigorous systemic validation, load testing, and final handover ensuring complete operational safety and efficiency.' },
];

const testimonialsData = [
  {
    name: 'Ashok Pawar',
    role: 'Chief Engineer, Paranjape Schemes',
    quote: "Ashvee Electricals has consistently provided top-tier panels for our largest projects. Their commitment to engineering excellence is absolutely unmatched."
  },
  {
    name: 'Vyas Deshpande',
    role: 'General Manager, United Envirotech',
    quote: "Their turnkey solutions streamlined our entire setup. The robustness of their panels speaks volumes about their 25+ years of expertise."
  }
];

const industriesData = [
  { name: 'Heavy Manufacturing', icon: <Factory className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { name: 'Commercial Real Estate', icon: <Building2 className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { name: 'Data Centers', icon: <Server className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
  { name: 'Public Infrastructure', icon: <Power className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1541888086925-ebbc311d95ee?auto=format&fit=crop&w=800&q=80' },
];

const processData = [
  { step: '01', title: 'Consultation', desc: 'Detailed analysis of load requirements and site constraints.' },
  { step: '02', title: 'Schematics', desc: 'Precision drafting of panel layouts and circuitry blueprints.' },
  { step: '03', title: 'Assembly', desc: 'In-house construction using top-tier, certified components.' },
  { step: '04', title: 'Deployment', desc: 'Rigorous testing followed by seamless site integration.' },
];

// --- Enhanced Animation Wrapper ---
const Reveal = ({ children, delay = 0, className = "", direction = "up", type = "fade" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getBaseClasses = () => {
    if (isVisible) return "translate-y-0 translate-x-0 opacity-100 blur-none scale-100";
    let classes = "opacity-0 ";
    if (type === "scale") classes += "scale-95 ";
    else classes += "scale-100 ";
    if (direction === "up") classes += "translate-y-12";
    else if (direction === "down") classes += "-translate-y-12";
    else if (direction === "left") classes += "translate-x-12";
    else if (direction === "right") classes += "-translate-x-12";
    return classes;
  };

  return (
    <div ref={ref} className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${getBaseClasses()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- Animated Number Counter ---
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Subpage Header Component ---
const SubPageHeader = ({ title, subtitle }) => (
  <section className="pt-40 pb-24 bg-neutral-950 text-white architectural-grid-dark border-b border-white/10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-[#A41313]/20 to-transparent mix-blend-overlay"></div>
    <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
          <p className="text-[#F2EFC2] text-xs font-bold tracking-[0.4em] uppercase">{subtitle}</p>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">
          {title}
        </h1>
      </Reveal>
    </div>
  </section>
);

// --- Page Components ---
const HomeView = ({ navigate, scrollY }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[700px] flex flex-col bg-neutral-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
          <video autoPlay loop muted playsInline className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${heroLoaded ? 'scale-105' : 'scale-110 opacity-0'} opacity-30`}>
            <source src="https://video.wixstatic.com/video/2e83dc_b6dfd557fa6741a88800e8e2f434aa15/1080p/mp4/file.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
          <div className="absolute top-0 right-0 w-[50vw] h-screen bg-gradient-to-l from-[#A41313]/30 to-transparent mix-blend-overlay animate-pulse duration-10000"></div>
          <div className="absolute inset-0 architectural-grid-dark opacity-40 pointer-events-none" style={{ transform: `translateY(${scrollY * -0.1}px)` }}></div>
        </div>
        
        <div className={`absolute top-28 right-12 lg:right-32 z-20 transition-all duration-[1500ms] ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative w-32 h-32 flex items-center justify-center animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[10.5px] font-bold uppercase tracking-[0.2em]" fill="#F2EFC2">
                <textPath href="#circlePath" startOffset="0%">• ISO CERTIFIED • EST 1999 • ENGINEERING</textPath>
              </text>
            </svg>
            <Zap className="w-6 h-6 text-[#A41313] absolute" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex-grow flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-12 items-end justify-between w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 overflow-hidden">
                <span className={`w-12 h-[2px] bg-[#A41313] rounded-[9px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></span>
                <p className={`text-[#F2EFC2] text-xs font-bold tracking-[0.4em] uppercase transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                  Industrial Power Solutions
                </p>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-2 flex flex-col">
                <div className="overflow-hidden pb-1">
                  <span className={`block transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${heroLoaded ? 'translate-y-0' : 'translate-y-[110%] rotate-3'}`}>
                    Precision
                  </span>
                </div>
                <div className="overflow-hidden pb-0">
                  <span className={`block text-transparent w-[webkit-text-stroke:1px_white] md:w-[webkit-text-stroke:2px_white] text-[#A41313] drop-shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-700 ${heroLoaded ? 'translate-y-0' : 'translate-y-[110%] rotate-3'}`}>
                    Engineered.
                  </span>
                </div>
              </h1>
              
              <div className="overflow-hidden mt-6">
                <p className={`text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-light max-w-2xl border-l-2 border-[#A41313] pl-5 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${heroLoaded ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-12 opacity-0 blur-sm'}`}>
                  Building robust electrical control panels to safely manage, protect, and distribute the power driving modern industries.
                </p>
              </div>
            </div>
            
            <div className={`hidden lg:flex flex-col items-end transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1200ms] ${heroLoaded ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'}`}>
              <button onClick={() => navigate('about')} className="w-28 h-28 md:w-32 md:h-32 border border-white/20 flex items-center justify-center group hover:bg-[#A41313] hover:border-[#A41313] transition-all duration-500 relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-[9px]">
                <div className="absolute inset-0 bg-[#A41313] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[9px]"></div>
                <ArrowRight className="w-8 h-8 text-white -rotate-45 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
              </button>
            </div>
          </div>
        </div>

        <div className={`relative z-20 w-full border-t border-white/10 bg-neutral-950/80 backdrop-blur-md transition-all duration-[1200ms] ease-out delay-[1000ms] ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { num: 25, suffix: '+', label: 'Years Active' },
                { num: 100, suffix: '+', label: 'Industrial Clients' },
                { text: 'ISO/CPRI', suffix: '', label: 'Certified Assemblies' }
              ].map((stat, idx) => (
                <div key={idx} className="py-4 md:py-6 px-4 md:px-8 flex items-center gap-4 group">
                  <span className="text-3xl md:text-4xl font-black text-[#A41313] tracking-tighter group-hover:scale-110 transition-transform origin-left whitespace-nowrap">
                    {stat.text ? stat.text : <AnimatedCounter end={stat.num} suffix={stat.suffix} />}
                  </span>
                  <span className="text-[10px] md:text-[11px] text-neutral-300 font-bold uppercase tracking-[0.2em] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ticker Tape */}
      <div className="bg-[#A41313] py-4 overflow-hidden flex whitespace-nowrap border-y border-[#850f0f] relative z-20">
        <div className="animate-marquee flex gap-12 text-white items-center">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Type Tested Assemblies</span>
              <Shield className="w-4 h-4 text-[#F2EFC2]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">ISO 9001:2015</span>
              <Shield className="w-4 h-4 text-[#F2EFC2]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">CPRI Certified</span>
              <Shield className="w-4 h-4 text-[#F2EFC2]" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. About Teaser */}
      <section className="py-24 bg-white relative architectural-grid border-b border-neutral-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <Reveal>
             <h3 className="text-3xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tighter uppercase max-w-4xl mx-auto leading-tight">
               Built to outlast. Designed to protect. Over 25 years of electrical engineering excellence.
             </h3>
             <button onClick={() => navigate('about')} className="text-xs font-bold uppercase tracking-[0.3em] text-[#A41313] border-b-2 border-[#A41313] pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-colors">
               Read Our Story
             </button>
          </Reveal>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="py-32 bg-neutral-50 relative border-b border-neutral-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Reveal className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
                Flagship Systems
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase">Engineered <br/> for Scale.</h3>
            </div>
            <button onClick={() => navigate('products')} className="group flex items-center gap-4">
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-900 border-b-2 border-[#A41313] pb-1">View Portfolio</span>
               <ArrowRight className="w-5 h-5 text-[#A41313] group-hover:translate-x-2 transition-transform" />
            </button>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200 bg-white shadow-2xl rounded-[9px] overflow-hidden">
            {productsData.slice(0, 3).map((product, idx) => (
              <Reveal key={idx} delay={idx * 100} type="fade" direction="up" className={`group bg-white hover:bg-neutral-950 hover:text-white transition-colors p-8 relative flex flex-col justify-between aspect-square ${idx !== 2 ? 'border-r border-neutral-200 md:border-b-0 border-b' : ''}`}>
                <div className="flex items-start justify-between gap-4 z-10 relative">
                  <h4 className="text-xl font-black uppercase tracking-tighter leading-none group-hover:text-white transition-colors pr-8">
                    {product.name}
                  </h4>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-30 mix-blend-screen" />
                </div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest z-10 relative mt-auto pt-8 border-t border-neutral-200 group-hover:border-white/20 transition-colors flex justify-between items-center">
                  <span>0{idx + 1} // Spec</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#A41313]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Capabilities */}
      <section className="py-32 bg-neutral-950 text-white relative border-b border-neutral-900 architectural-grid-dark">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <Reveal className="mb-16">
            <h2 className="text-[#F2EFC2] text-xs font-bold uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Turnkey<br/>Execution.</h3>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800 rounded-[9px] overflow-hidden">
            {servicesData.map((service, idx) => (
              <Reveal key={idx} delay={idx * 100} className="bg-neutral-950 p-10 md:p-16 hover:bg-[#A41313] transition-colors duration-500 group relative">
                <div className="absolute -bottom-4 -right-4 text-[10rem] font-black text-white/5 group-hover:text-black/10 transition-colors pointer-events-none leading-none select-none">
                  {service.num}
                </div>
                <div className="relative z-10">
                  <div className="text-[#A41313] group-hover:text-white mb-8 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-white">{service.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light group-hover:text-white/90 max-w-sm">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The Process */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <Reveal className="text-center mb-24">
            <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4">Workflow</h2>
            <h3 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase">The Engineering Process.</h3>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-neutral-200 z-0"></div>
            {processData.map((p, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up" className="relative z-10 group">
                <div className="w-16 h-16 bg-white border-2 border-neutral-200 rounded-[9px] flex items-center justify-center mb-8 group-hover:border-[#A41313] group-hover:bg-[#A41313] group-hover:text-white transition-colors duration-300">
                  <span className="font-black text-xl text-neutral-300 group-hover:text-white">{p.step}</span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-neutral-900 mb-4">{p.title}</h4>
                <p className="text-sm font-light text-neutral-500 leading-relaxed">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries Served */}
      <section className="py-32 bg-neutral-100 relative architectural-grid border-y border-neutral-200">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Reveal className="mb-16">
            <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4">Sectors</h2>
            <h3 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase">Industries<br/>We Power.</h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300 border border-neutral-300 rounded-[9px] overflow-hidden">
            {industriesData.map((ind, idx) => (
              <Reveal key={idx} delay={idx * 100} type="scale" className="relative aspect-[4/5] bg-white group overflow-hidden">
                <img src={ind.image} alt={ind.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-neutral-950/70 group-hover:bg-neutral-950/40 transition-all duration-700"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="text-[#F2EFC2] opacity-50 group-hover:opacity-100 transition-opacity">
                    {ind.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A41313] block mb-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">View Sector</span>
                    <h4 className="text-white text-xl font-bold uppercase tracking-tight leading-snug">{ind.name}</h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Quality Standards */}
      <section className="py-32 bg-neutral-950 text-white border-b border-neutral-900">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-6">Standards</h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8">
                Zero Margin <br/> For Error.
              </h3>
              <p className="text-neutral-400 font-light text-lg leading-relaxed mb-8 max-w-md">
                Our panels are the nerve center of multi-million dollar facilities. Failure is not an option. We build strictly to international safety and quality benchmarks.
              </p>
              <button onClick={() => navigate('about')} className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2EFC2] border-b-2 border-[#F2EFC2] pb-1 hover:text-white hover:border-white transition-colors">
                Learn About QA
              </button>
            </Reveal>
            <div className="space-y-6">
              {[
                { title: 'ISO 9001:2015', desc: 'Certified quality management systems ensuring consistent high-grade output.' },
                { title: 'CPRI Tested', desc: 'Assemblies tested by the Central Power Research Institute for short-circuit and temperature rise.' },
                { title: 'TTA Compliant', desc: 'Type Tested Assemblies guaranteeing maximum safety and operational reliability.' }
              ].map((cert, idx) => (
                <Reveal key={idx} delay={idx * 150} direction="left" className="border-l-4 border-[#A41313] pl-8 py-2">
                  <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{cert.title}</h4>
                  <p className="text-neutral-400 font-light text-sm">{cert.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-32 bg-[#A41313] text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Reveal>
            <h2 className="text-[#F2EFC2] text-xs font-bold uppercase tracking-[0.3em] mb-16 text-center">Industry Voices</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {testimonialsData.map((test, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up" className="flex flex-col justify-between">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-10 text-[#F2EFC2]">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-xl font-black text-white rounded-[9px]">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{test.name}</h4>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{test.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Massive Final CTA */}
      <section className="py-40 bg-neutral-950 text-white text-center relative overflow-hidden architectural-grid-dark">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A41313] rounded-[9px] blur-[120px] opacity-20"></div>
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              Ready to <br/> <span className="text-[#A41313]">Build?</span>
            </h2>
            <button onClick={() => navigate('contact')} className="group relative overflow-hidden px-12 py-5 border-2 border-white text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-[9px]">
              <span className="relative z-10 group-hover:text-neutral-900 transition-colors duration-300">Start a Project</span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
};

const AboutView = ({ navigate }) => (
  <>
    <SubPageHeader title="About Us" subtitle="The Ashvee Edge" />
    <section className="py-32 bg-white relative architectural-grid">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 pt-8">
            <Reveal delay={0}>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-8 leading-[1.1] tracking-tighter uppercase">
                Engineering Trust Since 1999.
              </h3>
            </Reveal>
            <Reveal delay={200}>
              <div className="w-full h-px bg-neutral-200 mb-8"></div>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6 font-light">
                Founded in 1999, Ashvee Electricals specializes in designing robust electrical panels that manage and protect complex industrial setups. We don't just build panels; we engineer reliable infrastructure that minimizes downtime and maximizes safety.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8 font-light">
                With a commitment to strict international standards and a dedicated team of experts, our solutions guarantee reliability, safety, and operational excellence for clients across the globe.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <button onClick={() => navigate('contact')} className="group inline-flex items-center gap-4 mt-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-900 group-hover:text-[#A41313] transition-colors">Start a Conversation</span>
                <div className="w-10 h-10 border border-neutral-300 flex items-center justify-center group-hover:bg-[#A41313] group-hover:border-[#A41313] transition-all rounded-[9px]">
                  <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:text-white transition-colors" />
                </div>
              </button>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 relative">
            <div className="absolute top-8 -left-8 w-full h-full bg-[#A41313] hidden md:block rounded-[9px]"></div>
            <Reveal delay={200} direction="left" className="aspect-[4/5] md:aspect-[4/3] overflow-hidden relative bg-neutral-100 border border-neutral-200 rounded-[9px]">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80" 
                alt="Engineering Facility" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              />
              <div className="absolute bottom-0 right-0 bg-white p-8 md:p-10 max-w-xs border-t border-l border-neutral-200 rounded-tl-[9px]">
                <Shield className="w-10 h-10 mb-4 text-[#A41313]" />
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-900 leading-snug">Strict adherence to international standards.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ProductsView = () => (
  <>
    <SubPageHeader title="Products" subtitle="Our Systems" />
    <section className="py-32 bg-neutral-50 relative architectural-grid">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <Reveal className="mb-16">
          <p className="text-neutral-600 font-light max-w-2xl text-xl leading-relaxed">
            Explore our comprehensive range of high-performance electrical control panels built for absolute precision and maximum durability.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-200 bg-white shadow-xl rounded-[9px] overflow-hidden">
          {productsData.map((product, idx) => (
            <Reveal key={idx} delay={idx * 50} type="fade" direction="up" className={`group bg-white hover:bg-neutral-50 transition-colors p-8 md:p-10 relative flex flex-col justify-between aspect-square border-neutral-200 ${idx % 3 !== 2 ? 'md:border-r border-b md:border-b-0' : 'border-b md:border-b-0'} ${idx < productsData.length - 3 ? 'border-b' : ''}`}>
              <div className="flex items-start justify-between gap-4 z-10 relative">
                <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none group-hover:text-[#A41313] transition-colors pr-8">
                  {product.name}
                </h4>
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40 mix-blend-multiply" />
              </div>
              
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest z-10 relative mt-auto pt-8 border-t border-neutral-200/50 group-hover:border-[#A41313]/30 transition-colors flex justify-between items-center">
                <span>0{idx + 1} // Spec</span>
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-[#A41313] transition-colors -rotate-45 group-hover:rotate-0" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ServicesView = () => (
  <>
    <SubPageHeader title="Services" subtitle="Turnkey Execution" />
    <section className="py-24 bg-neutral-950 text-white relative border-b border-neutral-900 architectural-grid-dark">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="border-t border-neutral-800">
          {servicesData.map((service, idx) => (
            <Reveal key={idx} delay={idx * 100} direction="up" className="group border-b border-neutral-800 hover:bg-[#A41313] transition-colors duration-500 cursor-default">
              <div className="grid md:grid-cols-12 gap-6 items-center py-12 md:py-16 px-4 md:px-8">
                <div className="md:col-span-2 text-4xl md:text-6xl font-black text-white/20 group-hover:text-[#F2EFC2] transition-colors tracking-tighter">
                  {service.num}
                </div>
                <div className="md:col-span-4">
                  <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">{service.title}</h4>
                </div>
                <div className="md:col-span-6">
                  <p className="text-neutral-400 group-hover:text-white/90 text-base md:text-lg leading-relaxed font-light transition-colors">
                    {service.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ContactView = () => (
  <>
    <SubPageHeader title="Contact" subtitle="Get in touch" />
    <section className="bg-white border-b border-neutral-200">
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="lg:w-1/2 bg-neutral-950 text-white p-12 md:p-24 flex flex-col justify-center relative overflow-hidden architectural-grid-dark border-r border-white/10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 relative z-10 leading-none">Start a <br/>Project.</h2>
            <p className="text-neutral-400 font-light text-lg mb-16 max-w-md relative z-10 leading-relaxed">
              For quotations or engineering consultations, our technical team is ready to assist.
            </p>
          </Reveal>
          
          <div className="space-y-10 text-sm font-bold uppercase tracking-[0.15em] relative z-10 border-t border-white/10 pt-12">
            <Reveal delay={100} className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#A41313]" />
              </div>
              <p className="leading-loose text-neutral-300 mt-2">Sr. No. 36/2/1, Sai Hospital Lane, <br/>Zeal Collage Road, Narhe, <br/>Pune - 411041, Maharashtra</p>
            </Reveal>
            <Reveal delay={200} className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#A41313]" />
              </div>
              <p className="text-neutral-300">+91 8669663848</p>
            </Reveal>
            <Reveal delay={300} className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#A41313]" />
              </div>
              <p className="text-[#F2EFC2]">ashvee.electricals@gmail.com</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white p-12 md:p-24 flex flex-col justify-center">
          <Reveal delay={200}>
            <form className="space-y-6 max-w-xl w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="fname" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                  <input type="text" id="fname" className="w-full bg-white border border-neutral-300 py-3 px-4 text-neutral-900 outline-none text-sm focus:border-[#A41313] transition-colors rounded-[9px]" placeholder="John" />
                </div>
                <div className="relative">
                  <label htmlFor="lname" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Last Name</label>
                  <input type="text" id="lname" className="w-full bg-white border border-neutral-300 py-3 px-4 text-neutral-900 outline-none text-sm focus:border-[#A41313] transition-colors rounded-[9px]" placeholder="Doe" />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                <input type="email" id="email" className="w-full bg-white border border-neutral-300 py-3 px-4 text-neutral-900 outline-none text-sm focus:border-[#A41313] transition-colors rounded-[9px]" placeholder="john@company.com" />
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">How can we help?</label>
                <textarea id="message" rows="4" className="w-full bg-white border border-neutral-300 py-3 px-4 text-neutral-900 outline-none resize-none text-sm focus:border-[#A41313] transition-colors rounded-[9px]" placeholder="Tell us about your project..."></textarea>
              </div>
              <button className="relative overflow-hidden bg-neutral-900 text-white px-10 py-5 mt-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors w-full group rounded-[9px]">
                <span className="relative z-10">Submit Inquiry</span>
                <div className="absolute inset-0 bg-[#A41313] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  </>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomeView navigate={navigate} scrollY={scrollY} />;
      case 'about': return <AboutView navigate={navigate} />;
      case 'products': return <ProductsView />;
      case 'services': return <ServicesView />;
      case 'contact': return <ContactView />;
      default: return <HomeView navigate={navigate} scrollY={scrollY} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-[#A41313] selection:text-white overflow-x-hidden" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <style>{customStyles}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3' : 'bg-transparent py-6 border-b border-white/10'}`}>
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="cursor-pointer group flex items-center gap-3" onClick={() => navigate('home')}>
            <img 
              src="https://static.wixstatic.com/media/2e83dc_da608dcc963842759e59f701ee7c9b18~mv2.png" 
              alt="Ashvee Electricals" 
              className={`h-12 md:h-16 object-contain transition-all duration-500 ${isScrolled || currentPage !== 'home' ? '' : 'brightness-0 invert'}`}
            />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['About', 'Products', 'Services'].map((item) => (
              <button 
                key={item}
                onClick={() => navigate(item.toLowerCase())}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 hover:text-[#A41313] ${isScrolled || currentPage !== 'home' ? 'text-neutral-900' : 'text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => navigate('contact')}
              className={`px-8 py-3 rounded-[9px] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${isScrolled || currentPage !== 'home' ? 'bg-[#A41313] text-white border-[#A41313] hover:bg-neutral-900 hover:border-neutral-900' : 'bg-transparent text-white border-white hover:bg-white hover:text-neutral-900'}`}
            >
              Contact Us
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={`w-8 h-8 ${isScrolled || currentPage !== 'home' ? 'text-neutral-900' : 'text-white'}`} /> : <Menu className={`w-8 h-8 ${isScrolled || currentPage !== 'home' ? 'text-neutral-900' : 'text-white'}`} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 w-full bg-neutral-950 border-t border-neutral-800 flex flex-col md:hidden transition-all duration-500 origin-top rounded-b-[9px] overflow-hidden ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          {['Home', 'About', 'Products', 'Services', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => navigate(item.toLowerCase())}
              className="px-8 py-6 text-left text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-[#A41313] transition-colors border-b border-neutral-900 flex justify-between items-center"
            >
              {item}
              <ArrowRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      </nav>

      {/* Render Current Page */}
      {renderPage()}

      {/* Shared Footer */}
      <footer className="bg-neutral-950 text-neutral-400 pt-24 pb-12 border-t border-neutral-900">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Brand Col */}
            <div className="lg:col-span-4">
              <img 
                src="https://static.wixstatic.com/media/2e83dc_da608dcc963842759e59f701ee7c9b18~mv2.png" 
                alt="Ashvee Electricals" 
                className="h-10 md:h-14 mb-6 brightness-0 invert opacity-80 cursor-pointer"
                onClick={() => navigate('home')}
              />
              <p className="text-sm leading-relaxed font-light mb-8 max-w-sm">
                Building robust electrical control panels to safely manage, protect, and distribute the power driving modern industries. Precision engineered since 1999.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-[9px] bg-white/5 flex items-center justify-center hover:bg-[#A41313] hover:text-white transition-colors border border-white/5">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-[9px] bg-white/5 flex items-center justify-center hover:bg-[#A41313] hover:text-white transition-colors border border-white/5">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-[9px] bg-white/5 flex items-center justify-center hover:bg-[#A41313] hover:text-white transition-colors border border-white/5">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><button onClick={() => navigate('home')} className="hover:text-[#A41313] transition-colors">Home</button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-[#A41313] transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('products')} className="hover:text-[#A41313] transition-colors">Portfolio</button></li>
                <li><button onClick={() => navigate('services')} className="hover:text-[#A41313] transition-colors">Services</button></li>
              </ul>
            </div>

            {/* Solutions Links */}
            <div className="lg:col-span-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Solutions</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><button onClick={() => navigate('products')} className="hover:text-[#A41313] transition-colors">PCC Panels</button></li>
                <li><button onClick={() => navigate('products')} className="hover:text-[#A41313] transition-colors">MCC Panels</button></li>
                <li><button onClick={() => navigate('products')} className="hover:text-[#A41313] transition-colors">APFC Panels</button></li>
                <li><button onClick={() => navigate('products')} className="hover:text-[#A41313] transition-colors">Synchronization</button></li>
              </ul>
            </div>

            {/* Contact Col */}
            <div className="lg:col-span-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Contact Info</h4>
              <ul className="space-y-5 text-sm font-light">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#A41313]" />
                  <span className="leading-relaxed">Sr. No. 36/2/1, Sai Hospital Lane, Zeal Collage Road, Narhe, Pune - 411041</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-[#A41313]" />
                  <span>+91 8669663848</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-[#A41313]" />
                  <span className="text-[#F2EFC2]">ashvee.electricals@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Ashvee Electricals. All Rights Reserved.</p>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
