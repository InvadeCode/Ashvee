import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Shield, Settings, Wrench, 
  Truck, CheckCircle, MapPin, Phone, Mail, Zap, ChevronRight,
  Factory, Building2, Server, Power, Linkedin, Twitter, Facebook, Target, Eye, Activity, Award
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
  { 
    id: 'lt-auto-change-over',
    name: 'LT Auto Change-Over Panels', 
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=1600&q=80',
    desc: 'Seamlessly switch between primary and backup power sources with zero manual intervention. Built for mission-critical infrastructure where power continuity is non-negotiable. Our panels detect mains failure instantly and trigger the emergency start protocol.',
    features: ['Automated Mains Failure (AMF) Logic', 'Dual-redundant mechanical interlocks', 'Programmable transition delays', 'Real-time source monitoring'],
    specs: { 'Voltage': '415V AC', 'Current Rating': 'Up to 4000A', 'Enclosure': 'IP54 / IP55', 'Standards': 'IS/IEC 61439' }
  },
  { 
    id: 'pcc-panels',
    name: 'Power Control Center (PCC)', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    desc: 'The absolute heart of your electrical distribution system. Our PCC panels are engineered to handle massive power incoming loads, distributing energy safely and efficiently to subordinate circuits and motor control centers.',
    features: ['High-capacity electrolytic busbar systems', 'Intelligent air circuit breakers (ACBs)', 'Comprehensive short-circuit fault protection', 'Modular, expandable architecture'],
    specs: { 'Voltage': '440V / 690V AC', 'Current Rating': 'Up to 6300A', 'Short Circuit': 'Up to 100kA', 'Material': 'CRCA Steel' }
  },
  { 
    id: 'mcc-panels',
    name: 'Motor Control Centre (MCC)', 
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
    desc: 'Centralized control for heavy industrial motor operations. Designed to protect critical machinery from overloads, phase failures, and short circuits while providing intuitive localized control and monitoring.',
    features: ['Draw-out and fixed type compartments', 'VFD and Soft Starter integration', 'Comprehensive motor protection relays', 'SCADA/PLC compatible communication'],
    specs: { 'Voltage': '415V AC', 'Configuration': 'Single / Double Front', 'Enclosure': 'IP52 to IP55', 'Comms': 'Modbus / Profibus' }
  },
  { 
    id: 'lt-distribution',
    name: 'LT Distribution Panels', 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    desc: 'Reliable sub-distribution of power to secondary circuits. Built with absolute precision to ensure balanced loads and protect end-point equipment across massive commercial and industrial footprints.',
    features: ['Customized feeder configurations', 'Compact footprint for tight spatial constraints', 'High-grade MCCB/MCB integration', 'Thermal mapping compliant layout'],
    specs: { 'Voltage': '415V AC', 'Current Rating': 'Up to 1600A', 'Busbar': 'Aluminum / Copper', 'Mounting': 'Floor / Wall Mounted' }
  },
  { 
    id: 'dg-sync',
    name: 'DG Synchronization', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    desc: 'Intelligent panels designed to parallel multiple diesel generators. Optimizes fuel consumption and ensures continuous load sharing across your backup power grid without frequency drops.',
    features: ['Auto-synchronization & load sharing', 'Active/Reactive power control', 'Dead-bus closure capability', 'Advanced generator protection suite'],
    specs: { 'Compatibility': 'All alternator brands', 'Controllers': 'Woodward / Deep Sea', 'Voltage': '415V / 11kV', 'Operation': 'Auto / Manual' }
  },
  { 
    id: 'apfc-panels',
    name: 'APFC Panels', 
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1600&q=80',
    desc: 'Automatic Power Factor Correction panels designed to eliminate utility penalties, reduce apparent power demand, and drastically optimize your industrial energy costs through reactive power management.',
    features: ['Microprocessor based reactive relays', 'Detuned reactors for harmonic suppression', 'Heavy-duty capacitor banks', 'Multi-step intelligent switching'],
    specs: { 'Voltage': '415V / 440V AC', 'Rating': 'Up to 2000 kVAr', 'Switching': 'Contactor / Thyristor', 'Harmonic Filter': '7% / 14%' }
  },
];

const servicesData = [
  { 
    id: 'design-engineering',
    num: '01', 
    icon: <Settings className="w-8 h-8" />, 
    title: 'Design & Engineering', 
    shortDesc: 'Custom schematics tailored to precise power requirements and spatial constraints. Precision engineering from the ground up.',
    desc: 'Our engineering team translates complex power requirements into highly efficient, safe, and scalable panel designs. We utilize advanced CAD modeling and adhere strictly to IS/IEC standards, ensuring every layout is optimized for thermal dynamics, short-circuit withstand capacity, and future expansion.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80',
    features: ['Advanced 3D CAD Modeling & Prototyping', 'Thermal Mapping & Heat Dissipation Analysis', 'Fault Level & Load Flow Calculations', 'Custom Busbar Sizing & Routing Strategies']
  },
  { 
    id: 'manufacturing',
    num: '02', 
    icon: <Truck className="w-8 h-8" />, 
    title: 'Manufacturing', 
    shortDesc: 'In-house assembly of high-grade, turnkey electrical panels strictly adhering to international safety protocols.',
    desc: 'Built in our state-of-the-art facility, every panel undergoes rigorous quality checks during the assembly process. From cutting and bending CRCA sheets to the meticulous wiring of intricate control circuits, our manufacturing pipeline leaves absolute zero margin for error.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=80',
    features: ['CNC Laser Cutting & Precision Bending', '7-Tank Pre-treatment & Powder Coating', 'High-Conductivity Electrolytic Copper Busbars', 'Strict In-Process Quality Assurance Audits']
  },
  { 
    id: 'site-installation',
    num: '03', 
    icon: <Wrench className="w-8 h-8" />, 
    title: 'Site Installation', 
    shortDesc: 'Professional on-site integration executed by certified electrical engineers ensuring zero operational friction.',
    desc: 'A panel is only as effective as its integration. Our certified field installation teams ensure that heavy systems are mounted, cabled, and terminated with absolute precision, mitigating any risk of localized faults, grounding issues, or spatial interference.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
    features: ['Certified Field Engineering Deployment Teams', 'Heavy-Lift Positioning & Structural Anchoring', 'Precision Glanding & Power Termination', 'Seamless Integration with Existing Grids']
  },
  { 
    id: 'commissioning',
    num: '04', 
    icon: <CheckCircle className="w-8 h-8" />, 
    title: 'Commissioning', 
    shortDesc: 'Rigorous systemic validation, load testing, and final handover ensuring complete operational safety and efficiency.',
    desc: 'Before we hand over any system, it undergoes a battery of stress tests. We simulate extreme load scenarios, verify relay coordinations, and ensure that every breaker trips exactly when it should. We do not just deliver a panel; we deliver guaranteed uptime.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80',
    features: ['Primary & Secondary Injection Testing', 'Insulation Resistance (Megger) Verification', 'Relay Parameterization & Network Coordination', 'Comprehensive Operator Training & Handover']
  },
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
  },
  {
    name: 'Sandeep Kulkarni',
    role: 'Operations Head, MegaCorp Heavy Industries',
    quote: "The precision in their DG Synchronization panels saved us millions in downtime. They understand industrial power like no one else."
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

const timelineData = [
  { year: '1999', title: 'Inception', desc: 'Ashvee Electricals established with a small, dedicated workshop in Pune, taking on localized industrial projects.' },
  { year: '2008', title: 'Facility Expansion', desc: 'Moved to a state-of-the-art manufacturing unit in Narhe to scale production and meet growing industrial demand.' },
  { year: '2015', title: 'ISO & CPRI Certification', desc: 'Achieved stringent international recognition for quality management, safety standards, and short-circuit withstand capabilities.' },
  { year: '2023', title: 'Smart Integration', desc: 'Pioneered IoT-enabled intelligent control panels, allowing for predictive maintenance and remote power monitoring.' },
];

const valuesData = [
  { icon: <Target className="w-6 h-6" />, title: "Absolute Precision", desc: "Every wire, every connection, and every busbar is meticulously calculated, mapped, and tested before deployment." },
  { icon: <Shield className="w-6 h-6" />, title: "Uncompromising Safety", desc: "We adhere strictly to global safety standards. Our panels are designed to protect both critical infrastructure and human life." },
  { icon: <Activity className="w-6 h-6" />, title: "Continuous Innovation", desc: "Adapting to the latest advancements in smart grid technology, automation, and energy efficiency." },
  { icon: <Award className="w-6 h-6" />, title: "Enduring Durability", desc: "We build industrial infrastructure meant to last for decades, not just years, operating flawlessly in harsh environments." }
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
  <section className="pt-32 pb-16 bg-neutral-950 text-white architectural-grid-dark border-b border-white/10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-[#A41313]/20 to-transparent mix-blend-overlay"></div>
    <div className="w-full px-[3%] relative z-10">
      <Reveal>
        <div className="flex items-center gap-4 mb-4">
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
        
        <div className={`absolute top-28 right-[3%] z-20 transition-all duration-[1500ms] ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[10.5px] font-bold uppercase tracking-[0.2em]" fill="#F2EFC2">
                <textPath href="#circlePath" startOffset="0%">• ISO CERTIFIED • EST 1999 • ENGINEERING</textPath>
              </text>
            </svg>
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#A41313] absolute" />
          </div>
        </div>

        <div className="relative z-10 w-full px-[3%] flex-grow flex flex-col justify-end pb-12 lg:pb-20 pt-32">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-end justify-between w-full">
            <div className="max-w-5xl">
              <div className="flex items-center gap-4 mb-4 overflow-hidden">
                <span className={`w-12 h-[2px] bg-[#A41313] rounded-[9px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${heroLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></span>
                <p className={`text-[#F2EFC2] text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                  Industrial Power Solutions
                </p>
              </div>
              
              <h1 className="text-[3.5rem] sm:text-6xl md:text-[6rem] lg:text-[8rem] xl:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase flex flex-col">
                <div className="overflow-hidden pb-1">
                  <span className={`block transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${heroLoaded ? 'translate-y-0' : 'translate-y-[110%] rotate-3'}`}>
                    Precision
                  </span>
                </div>
              </h1>
              
              <div className="overflow-hidden mt-4">
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed font-light max-w-2xl border-l-2 border-[#A41313] pl-5 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${heroLoaded ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-12 opacity-0 blur-sm'}`}>
                  Building robust electrical control panels to safely manage, protect, and distribute the power driving modern industries.
                </p>
              </div>
            </div>
            
            <div className={`hidden lg:flex flex-col items-end transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[1200ms] ${heroLoaded ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'}`}>
              <button onClick={() => navigate('about')} className="w-24 h-24 md:w-28 md:h-28 border border-white/20 flex items-center justify-center group hover:bg-[#A41313] hover:border-[#A41313] transition-all duration-500 relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-[9px]">
                <div className="absolute inset-0 bg-[#A41313] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[9px]"></div>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white -rotate-45 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
              </button>
            </div>
          </div>
        </div>

        <div className={`relative z-20 w-full border-t border-white/10 bg-neutral-950/80 backdrop-blur-md transition-all duration-[1200ms] ease-out delay-[1000ms] ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="w-full px-[3%]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { num: 25, suffix: '+', label: 'Years Active' },
                { num: 100, suffix: '+', label: 'Industrial Clients' },
                { text: 'ISO/CPRI', suffix: '', label: 'Certified Assemblies' }
              ].map((stat, idx) => (
                <div key={idx} className={`py-5 md:py-8 flex items-center gap-4 md:gap-6 group ${idx === 0 ? 'pr-6 md:pr-12' : 'md:pl-12 md:pr-8'}`}>
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
      <section className="py-16 md:py-20 bg-white relative architectural-grid border-b border-neutral-200">
        <div className="w-full px-[3%] relative z-10 flex flex-col items-start">
          <Reveal className="w-full max-w-4xl">
             <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6 tracking-tighter uppercase leading-tight">
               Built to outlast. Designed to protect. Over 25 years of electrical engineering excellence.
             </h3>
             <button onClick={() => navigate('about')} className="text-xs font-bold uppercase tracking-[0.3em] text-[#A41313] border-b-2 border-[#A41313] pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-colors">
               Read Our Story
             </button>
          </Reveal>
        </div>
      </section>

      {/* 4. Featured Products */}
      <section className="py-20 md:py-24 bg-neutral-50 relative border-b border-neutral-200">
        <div className="w-full px-[3%]">
          <Reveal className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
                Flagship Systems
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase">Engineered <br/> for Scale.</h3>
            </div>
            <button onClick={() => navigate('products')} className="group flex items-center gap-4">
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-900 border-b-2 border-[#A41313] pb-1">View Portfolio</span>
               <ArrowRight className="w-5 h-5 text-[#A41313] group-hover:translate-x-2 transition-transform" />
            </button>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-neutral-200 bg-white shadow-2xl rounded-[9px] overflow-hidden cursor-pointer">
            {productsData.slice(0, 3).map((product, idx) => (
              <Reveal key={idx} delay={idx * 100} type="fade" direction="up" className={`group bg-white hover:bg-neutral-950 hover:text-white transition-colors p-6 md:p-8 relative flex flex-col justify-between aspect-square ${idx !== 2 ? 'border-r border-neutral-200 md:border-b-0 border-b' : ''}`}>
                <div onClick={() => navigate('product-detail', product.id)} className="absolute inset-0 z-20"></div>
                <div className="flex items-start justify-between gap-4 z-10 relative pointer-events-none">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none group-hover:text-white transition-colors pr-4">
                    {product.name}
                  </h4>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-30 mix-blend-screen" />
                </div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest z-10 relative mt-auto pt-6 border-t border-neutral-200 group-hover:border-white/20 transition-colors flex justify-between items-center pointer-events-none">
                  <span>0{idx + 1} // Spec</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#A41313]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Capabilities */}
      <section className="py-20 md:py-24 bg-neutral-950 text-white relative border-b border-neutral-900 architectural-grid-dark">
        <div className="w-full px-[3%] relative z-10">
          <Reveal className="mb-12">
            <h2 className="text-[#F2EFC2] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#F2EFC2] rounded-[9px]"></span>
              Core Capabilities
            </h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Turnkey<br/>Execution.</h3>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800 rounded-[9px] overflow-hidden">
            {servicesData.map((service, idx) => (
              <Reveal key={idx} delay={idx * 100} className="bg-neutral-950 p-8 md:p-12 hover:bg-[#A41313] transition-colors duration-500 group relative">
                <div onClick={() => navigate('service-detail', service.id)} className="absolute inset-0 z-20 cursor-pointer"></div>
                <div className="absolute -bottom-4 -right-4 text-[8rem] md:text-[10rem] font-black text-white/5 group-hover:text-black/10 transition-colors pointer-events-none leading-none select-none">
                  {service.num}
                </div>
                <div className="relative z-10 pointer-events-none">
                  <div className="text-[#A41313] group-hover:text-white mb-6 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight group-hover:text-white">{service.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light group-hover:text-white/90 max-w-sm">
                    {service.shortDesc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The Process */}
      <section className="py-20 md:py-24 bg-white relative">
        <div className="w-full px-[3%] relative z-10">
          <Reveal className="mb-16 md:mb-20">
            <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
              Workflow
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase">The Engineering Process.</h3>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-neutral-200 z-0"></div>
            {processData.map((p, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up" className="relative z-10 group">
                <div className="w-16 h-16 bg-white border-2 border-neutral-200 rounded-[9px] flex items-center justify-center mb-6 group-hover:border-[#A41313] group-hover:bg-[#A41313] group-hover:text-white transition-colors duration-300">
                  <span className="font-black text-xl text-neutral-300 group-hover:text-white">{p.step}</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-900 mb-3">{p.title}</h4>
                <p className="text-sm font-light text-neutral-500 leading-relaxed">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries Served */}
      <section className="py-20 md:py-24 bg-neutral-100 relative architectural-grid border-y border-neutral-200">
        <div className="w-full px-[3%]">
          <Reveal className="mb-12">
            <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
              Sectors
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase">Industries<br/>We Power.</h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300 border border-neutral-300 rounded-[9px] overflow-hidden">
            {industriesData.map((ind, idx) => (
              <Reveal key={idx} delay={idx * 100} type="scale" className="relative aspect-[4/5] bg-white group overflow-hidden">
                <img src={ind.image} alt={ind.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-neutral-950/70 group-hover:bg-neutral-950/40 transition-all duration-700"></div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div className="text-[#F2EFC2] opacity-50 group-hover:opacity-100 transition-opacity">
                    {ind.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A41313] block mb-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">View Sector</span>
                    <h4 className="text-white text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">{ind.name}</h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Quality Standards */}
      <section className="py-20 md:py-24 bg-neutral-950 text-white border-b border-neutral-900">
        <div className="w-full px-[3%]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
                Standards
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                Zero Margin <br/> For Error.
              </h3>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed mb-8 max-w-md">
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
                <Reveal key={idx} delay={idx * 150} direction="left" className="border-l-4 border-[#A41313] pl-6 md:pl-8 py-2">
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2">{cert.title}</h4>
                  <p className="text-neutral-400 font-light text-sm">{cert.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-20 md:py-24 bg-[#A41313] text-white">
        <div className="w-full px-[3%]">
          <Reveal>
            <h2 className="text-[#F2EFC2] text-xs font-bold uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#F2EFC2] rounded-[9px]"></span>
              Industry Voices
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {testimonialsData.slice(0, 2).map((test, idx) => (
              <Reveal key={idx} delay={idx * 150} direction="up" className="flex flex-col justify-between">
                <p className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-snug mb-8 text-[#F2EFC2]">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 flex items-center justify-center text-lg md:text-xl font-black text-white rounded-[9px]">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white">{test.name}</h4>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{test.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Massive Final CTA */}
      <section className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden architectural-grid-dark text-left">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#A41313] rounded-[9px] blur-[120px] opacity-20"></div>
        <div className="w-full px-[3%] relative z-10 flex flex-col items-start">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-10">
              Ready to <br/> <span className="text-[#A41313]">Build?</span>
            </h2>
            <button onClick={() => navigate('contact')} className="group relative overflow-hidden px-10 md:px-12 py-4 md:py-5 border-2 border-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-[9px]">
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
    <SubPageHeader title="About Us" subtitle="The Ashvee Story" />
    
    {/* 1. Introduction / Story */}
    <section className="py-20 md:py-24 bg-white relative architectural-grid">
      <div className="w-full px-[3%] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 pt-4 md:pt-8">
            <Reveal delay={0}>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6 md:mb-8 leading-[1.1] tracking-tighter uppercase">
                Engineering Trust Since 1999.
              </h3>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-full h-px bg-neutral-200 mb-6 md:mb-8"></div>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-6 font-light">
                Founded over two decades ago, Ashvee Electricals specializes in designing robust electrical panels that safely manage, protect, and distribute power for complex industrial setups. We don't just build panels; we engineer reliable infrastructure that minimizes downtime.
              </p>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                With a strict adherence to international standards and a dedicated team of experts, our turnkey solutions guarantee reliability, safety, and operational excellence for heavy manufacturing, data centers, and infrastructure projects.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="flex items-center gap-8 mt-4 pt-8 border-t border-neutral-200">
                <div>
                  <span className="block text-3xl font-black text-[#A41313] tracking-tighter mb-1">100+</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Global Clients</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#A41313] tracking-tighter mb-1">25+</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Years Active</span>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 relative mt-8 lg:mt-0">
            <div className="absolute top-6 -left-6 md:top-8 md:-left-8 w-full h-full bg-[#A41313] hidden sm:block rounded-[9px]"></div>
            <Reveal delay={200} direction="left" className="aspect-[4/5] md:aspect-[4/3] overflow-hidden relative bg-neutral-100 border border-neutral-200 rounded-[9px]">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80" 
                alt="Engineering Facility" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              />
              <div className="absolute bottom-0 right-0 bg-white p-6 md:p-10 max-w-[280px] md:max-w-xs border-t border-l border-neutral-200 rounded-tl-[9px]">
                <Shield className="w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 text-[#A41313]" />
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-900 leading-snug">Strict adherence to international standards.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* 2. Mission & Vision */}
    <section className="py-20 md:py-24 bg-neutral-950 text-white architectural-grid-dark border-y border-neutral-900 relative">
      <div className="w-full px-[3%]">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
              <p className="text-[#A41313] text-xs font-bold tracking-[0.4em] uppercase">Our Mission</p>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
              Empowering industry <br className="hidden md:block" /> through safe, resilient <br className="hidden md:block"/> power control.
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              To deliver meticulously engineered electrical control systems that act as the unbreakable backbone for modern infrastructure, ensuring zero operational downtime and maximum human safety.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[#F2EFC2] rounded-[9px]"></span>
              <p className="text-[#F2EFC2] text-xs font-bold tracking-[0.4em] uppercase">Our Vision</p>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
              Setting the global <br className="hidden md:block"/> standard for industrial <br className="hidden md:block"/> electrification.
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              To be the world's most trusted partner in high-stakes electrical engineering, continuously innovating with smart grid technologies to build the factories and cities of tomorrow.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* 3. Core Values Grid */}
    <section className="py-20 md:py-24 bg-neutral-100 relative border-b border-neutral-200">
      <div className="w-full px-[3%]">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
            Core Principles
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase">The Pillars of <br/> Our Engineering.</h3>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-300 border border-neutral-300 rounded-[9px] overflow-hidden">
          {valuesData.map((val, idx) => (
            <Reveal key={idx} delay={idx * 100} className="bg-white p-8 md:p-10 group relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 p-6 text-neutral-100 group-hover:text-[#A41313]/10 transition-colors duration-500">
                {val.icon}
              </div>
              <div className="w-12 h-12 bg-neutral-100 rounded-[9px] flex items-center justify-center text-[#A41313] mb-8 group-hover:bg-[#A41313] group-hover:text-white transition-colors duration-300 relative z-10">
                {val.icon}
              </div>
              <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-900 mb-4 relative z-10">{val.title}</h4>
              <p className="text-sm font-light text-neutral-600 leading-relaxed relative z-10">
                {val.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* 4. History Timeline */}
    <section className="py-20 md:py-32 bg-white relative">
      <div className="w-full px-[3%]">
        <Reveal className="mb-16">
          <h2 className="text-xs font-bold text-[#A41313] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
            Legacy
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase">Our History.</h3>
        </Reveal>

        <div className="max-w-4xl border-l-2 border-neutral-200 ml-4 md:ml-6 pl-8 md:pl-12 space-y-16">
          {timelineData.map((item, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="left" className="relative">
              <div className="absolute w-4 h-4 rounded-full bg-[#A41313] -left-[41px] md:-left-[57px] top-1 border-4 border-white shadow-sm"></div>
              <span className="text-4xl md:text-6xl font-black text-neutral-200 tracking-tighter block mb-4 leading-none">{item.year}</span>
              <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-neutral-900 mb-3">{item.title}</h4>
              <p className="text-base font-light text-neutral-600 leading-relaxed max-w-2xl">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* 5. Massive Final CTA */}
    <section className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden architectural-grid-dark text-left border-t border-neutral-900">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#A41313] rounded-[9px] blur-[120px] opacity-20"></div>
      <div className="w-full px-[3%] relative z-10 flex flex-col items-start">
        <Reveal>
          <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-10">
            Ready to <br/> <span className="text-[#A41313]">Build?</span>
          </h2>
          <button onClick={() => navigate('contact')} className="group relative overflow-hidden px-10 md:px-12 py-4 md:py-5 border-2 border-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-[9px]">
            <span className="relative z-10 group-hover:text-neutral-900 transition-colors duration-300">Start a Project</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
          </button>
        </Reveal>
      </div>
    </section>
  </>
);

const ProductsView = ({ navigate }) => (
  <>
    <SubPageHeader title="Products" subtitle="Our Systems" />
    <section className="py-20 md:py-24 bg-neutral-50 relative architectural-grid">
      <div className="w-full px-[3%]">
        <Reveal className="mb-12 md:mb-16">
          <p className="text-neutral-600 font-light max-w-2xl text-lg md:text-xl leading-relaxed">
            Explore our comprehensive portfolio of high-performance electrical control panels. Built for absolute precision, engineered for scale. Select a system to view technical specifications.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-200 bg-white shadow-xl rounded-[9px] overflow-hidden cursor-pointer">
          {productsData.map((product, idx) => (
            <Reveal key={idx} delay={idx * 50} type="fade" direction="up" className={`group bg-white hover:bg-neutral-950 hover:text-white transition-colors p-6 md:p-10 relative flex flex-col justify-between aspect-square border-neutral-200 ${idx % 3 !== 2 ? 'md:border-r border-b md:border-b-0' : 'border-b md:border-b-0'} ${idx < productsData.length - 3 ? 'lg:border-b' : ''}`}>
              <div onClick={() => navigate('product-detail', product.id)} className="absolute inset-0 z-20"></div>
              <div className="flex items-start justify-between gap-4 z-10 relative pointer-events-none">
                <h4 className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none group-hover:text-[#A41313] transition-colors pr-6 md:pr-8">
                  {product.name}
                </h4>
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40 mix-blend-screen" />
              </div>
              
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest z-10 relative mt-auto pt-6 md:pt-8 border-t border-neutral-200/50 group-hover:border-[#A41313]/30 transition-colors flex justify-between items-center pointer-events-none">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#A41313] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

const ProductDetailView = ({ navigate, itemId }) => {
  const product = productsData.find(p => p.id === itemId) || productsData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [itemId]);

  return (
    <>
      {/* Product Hero */}
      <section className="pt-32 pb-0 bg-neutral-950 text-white architectural-grid-dark border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-[#A41313]/20 to-transparent mix-blend-overlay"></div>
        <div className="w-full px-[3%] relative z-10 pt-4 pb-16">
          <Reveal>
            <button onClick={() => navigate('products')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-12">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Portfolio
            </button>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
              <p className="text-[#F2EFC2] text-xs font-bold tracking-[0.4em] uppercase">System Specifications</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-lg max-w-6xl">
              {product.name}
            </h1>
          </Reveal>
        </div>
        
        {/* Massive Product Image Container */}
        <Reveal delay={200} type="scale" className="w-full px-[3%] pb-12 relative z-10">
          <div className="w-full aspect-[21/9] md:aspect-[21/7] rounded-[9px] overflow-hidden border border-white/10 relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
          </div>
        </Reveal>
      </section>

      {/* Product Information Split Grid */}
      <section className="py-20 md:py-24 bg-white relative architectural-grid border-b border-neutral-200">
        <div className="w-full px-[3%] relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Col: Overview & Specs */}
            <div className="lg:col-span-7">
              <Reveal>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-6 border-b border-neutral-200 pb-4">System Overview</h3>
                <p className="text-neutral-600 text-lg leading-relaxed mb-12 font-light">
                  {product.desc}
                </p>
              </Reveal>

              <Reveal delay={150}>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-6 border-b border-neutral-200 pb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{key}</span>
                      <span className="text-base font-bold text-neutral-900">{value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Col: Features & Action */}
            <div className="lg:col-span-5">
              <Reveal delay={200} className="bg-neutral-50 border border-neutral-200 rounded-[9px] p-8 md:p-12">
                <h3 className="text-xl font-black text-[#A41313] uppercase tracking-tighter mb-8">Key Engineering Features</h3>
                <ul className="space-y-6 mb-12">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#A41313]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-[#A41313]" />
                      </div>
                      <span className="text-sm text-neutral-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-8 border-t border-neutral-200">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Interested in this system?</p>
                  <button onClick={() => navigate('contact')} className="group relative overflow-hidden bg-neutral-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors w-full rounded-[9px]">
                    <span className="relative z-10">Request a Quote</span>
                    <div className="absolute inset-0 bg-[#A41313] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
                  </button>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const ServicesView = ({ navigate }) => (
  <>
    <SubPageHeader title="Services" subtitle="Turnkey Execution" />
    
    {/* Intro */}
    <section className="py-20 md:py-24 bg-white relative architectural-grid border-b border-neutral-200">
      <div className="w-full px-[3%] relative z-10 flex flex-col items-start">
        <Reveal className="w-full max-w-4xl">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6 tracking-tighter uppercase leading-tight">
              From blueprint to grid integration. We provide end-to-end electrical engineering services.
            </h3>
            <p className="text-neutral-600 text-lg leading-relaxed font-light">
              Our turnkey approach eliminates multi-vendor friction. By handling the entire lifecycle of an electrical control panel—from the initial consultation and CAD drafting to in-house manufacturing, rigorous testing, and final on-site commissioning—we guarantee absolute accountability and superior quality control at every stage.
            </p>
        </Reveal>
      </div>
    </section>

    {/* Services List */}
    <section className="py-20 md:py-24 bg-neutral-950 text-white relative architectural-grid-dark">
      <div className="w-full px-[3%] relative z-10">
        <div className="border-t border-neutral-800">
          {servicesData.map((service, idx) => (
            <Reveal key={idx} delay={idx * 100} direction="up" className="group border-b border-neutral-800 hover:bg-[#A41313] transition-colors duration-500 cursor-pointer relative overflow-hidden">
              <div onClick={() => navigate('service-detail', service.id)} className="absolute inset-0 z-20"></div>
              <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-center py-10 md:py-16 pr-4 md:pr-8 relative z-10 pointer-events-none">
                <div className="md:col-span-2 text-3xl md:text-5xl lg:text-6xl font-black text-white/20 group-hover:text-[#F2EFC2] transition-colors tracking-tighter">
                  {service.num}
                </div>
                <div className="md:col-span-4 flex items-center gap-6">
                  <h4 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">{service.title}</h4>
                </div>
                <div className="md:col-span-5">
                  <p className="text-neutral-400 group-hover:text-white/90 text-sm md:text-base lg:text-lg leading-relaxed font-light transition-colors">
                    {service.shortDesc}
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-[#A41313] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all group-hover:text-white" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Specific to Services */}
    <section className="py-20 md:py-24 bg-[#A41313] text-white">
      <div className="w-full px-[3%]">
        <Reveal className="mb-12">
          <h2 className="text-[#F2EFC2] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#F2EFC2] rounded-[9px]"></span>
            Execution Quality
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">What Our Clients Say.</h3>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonialsData.map((test, idx) => (
            <Reveal key={idx} delay={idx * 150} direction="up" className="flex flex-col justify-between border-l border-white/20 pl-6 md:pl-8">
              <p className="text-lg md:text-xl font-bold uppercase tracking-tight leading-snug mb-8 text-[#F2EFC2]">
                "{test.quote}"
              </p>
              <div className="mt-auto">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{test.name}</h4>
                <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{test.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Massive Final CTA */}
    <section className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden architectural-grid-dark text-left border-t border-neutral-900">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#A41313] rounded-[9px] blur-[120px] opacity-20"></div>
      <div className="w-full px-[3%] relative z-10 flex flex-col items-start">
        <Reveal>
          <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-10">
            Start Your <br/> <span className="text-[#A41313]">Project?</span>
          </h2>
          <button onClick={() => navigate('contact')} className="group relative overflow-hidden px-10 md:px-12 py-4 md:py-5 border-2 border-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-[9px]">
            <span className="relative z-10 group-hover:text-neutral-900 transition-colors duration-300">Consult Our Engineers</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
          </button>
        </Reveal>
      </div>
    </section>
  </>
);

const ServiceDetailView = ({ navigate, itemId }) => {
  const service = servicesData.find(s => s.id === itemId) || servicesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [itemId]);

  return (
    <>
      {/* Service Hero */}
      <section className="pt-32 pb-0 bg-neutral-950 text-white architectural-grid-dark border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-[#A41313]/20 to-transparent mix-blend-overlay"></div>
        <div className="w-full px-[3%] relative z-10 pt-4 pb-16">
          <Reveal>
            <button onClick={() => navigate('services')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-12">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Services
            </button>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-[#A41313] rounded-[9px]"></span>
              <p className="text-[#F2EFC2] text-xs font-bold tracking-[0.4em] uppercase">Service Profile {service.num}</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-lg max-w-6xl">
              {service.title}
            </h1>
          </Reveal>
        </div>
        
        {/* Massive Service Image Container */}
        <Reveal delay={200} type="scale" className="w-full px-[3%] pb-12 relative z-10">
          <div className="w-full aspect-[21/9] md:aspect-[21/7] rounded-[9px] overflow-hidden border border-white/10 relative group">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
          </div>
        </Reveal>
      </section>

      {/* Service Information Split Grid */}
      <section className="py-20 md:py-24 bg-white relative architectural-grid border-b border-neutral-200">
        <div className="w-full px-[3%] relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Col: Overview & Process */}
            <div className="lg:col-span-7">
              <Reveal>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-6 border-b border-neutral-200 pb-4">Methodology</h3>
                <p className="text-neutral-600 text-lg leading-relaxed mb-12 font-light">
                  {service.desc}
                </p>
              </Reveal>

              <Reveal delay={150}>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-6 border-b border-neutral-200 pb-4">Our Approach</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="text-[#A41313] font-black text-xl opacity-20">0{idx + 1}</div>
                      <span className="text-base font-bold text-neutral-900 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Col: Why Us & Action */}
            <div className="lg:col-span-5">
              <Reveal delay={200} className="bg-neutral-950 text-white rounded-[9px] p-8 md:p-12 architectural-grid-dark shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A41313] blur-[60px] opacity-20"></div>
                <h3 className="text-xl font-black text-[#F2EFC2] uppercase tracking-tighter mb-8">Why Trust Ashvee?</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                  We don't outsource critical execution. By keeping everything from design to deployment strictly in-house, we eliminate miscommunication, strictly control quality, and deliver exactly what we promised, exactly when we promised it.
                </p>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Require this service?</p>
                  <button onClick={() => navigate('contact')} className="group relative overflow-hidden bg-white text-neutral-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors w-full rounded-[9px]">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Consultation</span>
                    <div className="absolute inset-0 bg-[#A41313] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-[9px]"></div>
                  </button>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const ContactView = () => (
  <>
    <SubPageHeader title="Contact" subtitle="Get in touch" />
    <section className="bg-white border-b border-neutral-200">
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="lg:w-1/2 bg-neutral-950 text-white p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden architectural-grid-dark border-r border-white/10">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 md:mb-6 relative z-10 leading-none">Start a <br/>Project.</h2>
            <p className="text-neutral-400 font-light text-base md:text-lg mb-12 md:mb-16 max-w-md relative z-10 leading-relaxed">
              For quotations or engineering consultations, our technical team is ready to assist.
            </p>
          </Reveal>
          
          <div className="space-y-8 md:space-y-10 text-xs md:text-sm font-bold uppercase tracking-[0.15em] relative z-10 border-t border-white/10 pt-10 md:pt-12">
            <Reveal delay={100} className="flex items-start gap-4 md:gap-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#A41313]" />
              </div>
              <p className="leading-loose text-neutral-300 mt-1 md:mt-2">Sr. No. 36/2/1, Sai Hospital Lane, <br/>Zeal Collage Road, Narhe, <br/>Pune - 411041, Maharashtra</p>
            </Reveal>
            <Reveal delay={200} className="flex items-center gap-4 md:gap-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <Phone className="w-3 h-3 md:w-4 md:h-4 text-[#A41313]" />
              </div>
              <p className="text-neutral-300">+91 8669663848</p>
            </Reveal>
            <Reveal delay={300} className="flex items-center gap-4 md:gap-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-[9px] bg-[#A41313]/10 flex items-center justify-center shrink-0">
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-[#A41313]" />
              </div>
              <p className="text-[#F2EFC2]">ashvee.electricals@gmail.com</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center">
          <Reveal delay={200}>
            <form className="space-y-8 md:space-y-12 max-w-xl w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative border-b border-neutral-300 group focus-within:border-[#A41313] transition-colors">
                  <input type="text" id="fname" className="peer w-full bg-transparent py-2 text-neutral-900 outline-none text-sm md:text-base" placeholder=" " />
                  <label htmlFor="fname" className="absolute left-0 top-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#A41313] peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#A41313]">First Name</label>
                </div>
                <div className="relative border-b border-neutral-300 group focus-within:border-[#A41313] transition-colors">
                  <input type="text" id="lname" className="peer w-full bg-transparent py-2 text-neutral-900 outline-none text-sm md:text-base" placeholder=" " />
                  <label htmlFor="lname" className="absolute left-0 top-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#A41313] peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#A41313]">Last Name</label>
                </div>
              </div>
              <div className="relative border-b border-neutral-300 group focus-within:border-[#A41313] transition-colors">
                <input type="email" id="email" className="peer w-full bg-transparent py-2 text-neutral-900 outline-none text-sm md:text-base" placeholder=" " />
                <label htmlFor="email" className="absolute left-0 top-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#A41313] peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#A41313]">Email Address</label>
              </div>
              <div className="relative border-b border-neutral-300 group focus-within:border-[#A41313] transition-colors pt-4">
                <textarea id="message" rows="3" className="peer w-full bg-transparent py-2 text-neutral-900 outline-none resize-none text-sm md:text-base" placeholder=" "></textarea>
                <label htmlFor="message" className="absolute left-0 top-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#A41313] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#A41313]">How can we help?</label>
              </div>
              <button className="relative overflow-hidden bg-neutral-900 text-white px-8 py-4 md:px-10 md:py-5 mt-6 md:mt-8 text-xs font-bold uppercase tracking-[0.2em] transition-colors w-full group rounded-[9px]">
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
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page, id = null) => {
    setCurrentPage(page);
    if (id) setSelectedItemId(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomeView navigate={navigate} scrollY={scrollY} />;
      case 'about': return <AboutView navigate={navigate} />;
      case 'products': return <ProductsView navigate={navigate} />;
      case 'product-detail': return <ProductDetailView navigate={navigate} itemId={selectedItemId} />;
      case 'services': return <ServicesView navigate={navigate} />;
      case 'service-detail': return <ServiceDetailView navigate={navigate} itemId={selectedItemId} />;
      case 'contact': return <ContactView />;
      default: return <HomeView navigate={navigate} scrollY={scrollY} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-[#A41313] selection:text-white overflow-x-hidden" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <style>{customStyles}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3' : 'bg-transparent py-6 border-b border-white/10'}`}>
        <div className="w-full px-[3%] flex justify-between items-center">
          <div className="cursor-pointer group flex items-center gap-3" onClick={() => navigate('home')}>
            <img 
              src="https://static.wixstatic.com/media/2e83dc_da608dcc963842759e59f701ee7c9b18~mv2.png" 
              alt="Ashvee Electricals" 
              className={`h-12 md:h-16 object-contain transition-all duration-500 hover:scale-105`}
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
      <footer className="bg-neutral-950 text-neutral-400 pt-20 pb-10 border-t border-neutral-900">
        <div className="w-full px-[3%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Brand Col */}
            <div className="lg:col-span-4">
              <img 
                src="https://static.wixstatic.com/media/2e83dc_da608dcc963842759e59f701ee7c9b18~mv2.png" 
                alt="Ashvee Electricals" 
                className="h-10 md:h-14 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
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
                <li><button onClick={() => navigate('product-detail', 'pcc-panels')} className="hover:text-[#A41313] transition-colors">PCC Panels</button></li>
                <li><button onClick={() => navigate('product-detail', 'mcc-panels')} className="hover:text-[#A41313] transition-colors">MCC Panels</button></li>
                <li><button onClick={() => navigate('product-detail', 'apfc-panels')} className="hover:text-[#A41313] transition-colors">APFC Panels</button></li>
                <li><button onClick={() => navigate('product-detail', 'dg-sync')} className="hover:text-[#A41313] transition-colors">Synchronization</button></li>
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

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
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
