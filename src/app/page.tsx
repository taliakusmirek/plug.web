"use client";
import { useState, useEffect } from "react";

// SVG avatars for corners (placeholders)
const Avatar1 = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#7B3AED" /><ellipse cx="28" cy="24" rx="14" ry="16" fill="#A259D9" /><ellipse cx="28" cy="38" rx="12" ry="7" fill="#FFD86B" /></svg>
);
const Avatar2 = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#FFD86B" /><ellipse cx="28" cy="24" rx="14" ry="16" fill="#7B3AED" /><ellipse cx="28" cy="38" rx="12" ry="7" fill="#A259D9" /></svg>
);
const Avatar3 = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#A259D9" /><ellipse cx="28" cy="24" rx="14" ry="16" fill="#FFD86B" /><ellipse cx="28" cy="38" rx="12" ry="7" fill="#7B3AED" /></svg>
);
const Avatar4 = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="#7B3AED" /><ellipse cx="28" cy="24" rx="14" ry="16" fill="#FFD86B" /><ellipse cx="28" cy="38" rx="12" ry="7" fill="#A259D9" /></svg>
);

// Example Open Peeps SVG avatar with colored background
const PeepAvatar = ({ bg = '#FFD86B', hair = '#7B3AED', skin = '#F3E8FF', accent = '#A259D9', style = {} }) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={style}>
    <circle cx="32" cy="32" r="32" fill={bg} />
    <ellipse cx="32" cy="36" rx="18" ry="20" fill={skin} />
    <ellipse cx="32" cy="24" rx="12" ry="10" fill={hair} />
    <ellipse cx="32" cy="48" rx="10" ry="4" fill={accent} />
  </svg>
);

// DotsBackground component for client-side random dots
function DotsBackground() {
  const [dots, setDots] = useState<{cx: string, cy: string}[]>([]);
  useEffect(() => {
    setDots(
      Array.from({ length: 80 }).map((_, i) => ({
        cx: Math.random() * 100 + "%",
        cy: Math.random() * 100 + "%",
      }))
    );
  }, []);
  return (
    <svg width="100%" height="100%" className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r="1.5" fill="#fff" fillOpacity="0.5" />
      ))}
    </svg>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    city: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send to your API endpoint
      // For now, we'll simulate the API call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', email: '', city: '', role: '' });
        setTimeout(() => {
          setShowModal(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWaitlistModal = () => {
    setShowModal(true);
    setSubmitStatus('idle');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{background:'#0B1220'}}>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/80 backdrop-blur-md border-b border-white/10 h-24" style={{minHeight:'96px'}}>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
          <div className="flex justify-between items-center h-24" style={{minHeight:'96px'}}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="Plug logo" className="h-48 w-48 -mt-2" style={{height:'96px', width:'96px'}} />
            </div>
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-10">
                <a href="#about" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">About</a>
                <a href="#features" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">Features</a>
                <a href="/pricing" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">Pricing</a>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex items-center">
              <button onClick={openWaitlistModal} className="bg-[#1b7dff] hover:bg-[#005be8] text-white px-8 py-3 rounded-xl font-semibold text-lg transition border-2 border-[#1b7dff] hover:border-[#005be8] shadow-lg" style={{minWidth:'140px'}}>Join Plug</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with SVG scalloped border */}
      <section id="hero" className="relative w-full min-h-[700px] flex flex-row items-center justify-between bg-transparent px-8 pt-24 pb-12 overflow-hidden">
        <div className="flex-1 flex flex-col justify-center z-10 max-w-xl">
          <h1 className="text-[64px] leading-[1.05] font-normal text-white mb-6" style={{fontFamily:'Inter', letterSpacing: '-0.03em', textAlign: 'left'}}>Plug into the<br/>rooms that<br/>change everything.</h1>
          <p className="text-lg text-[#B6B9C6] mb-10 max-w-lg" style={{textAlign:'left', fontWeight: 400}}>A social resume, curated events, XP missions, and collab tools to level up your network — built for ambitious Gen Z builders.</p>
          <div className="flex gap-4 mb-10" style={{justifyContent:'flex-start'}}>
            <button onClick={openWaitlistModal} className="bg-[#1b7dff] text-white px-8 py-3 rounded-[10px] font-bold text-lg shadow transition border-2 border-[#1b7dff] hover:bg-[#005be8] hover:border-[#005be8]" style={{minWidth:'260px', height:'56px', display:'flex', alignItems:'center', justifyContent:'center'}}>Create Your Plug Profile</button>
            <a href="#how" className="bg-transparent text-white px-8 py-3 rounded-[10px] font-semibold text-lg border border-white/30 hover:bg-white/10 transition" style={{minWidth:'260px', height:'56px', display:'flex', alignItems:'center', justifyContent:'center'}}>Watch How it Works</a>
          </div>
        </div>
        {/* Card Collage - pixel-perfect, glassmorphism, real demo data */}
        <div className="flex-1 flex items-center justify-center relative min-h-[520px] w-full md:w-auto mt-0">
          {/* Top card: Events in New York City */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 rotate-[-10deg]" style={{zIndex:3, filter:'drop-shadow(0 12px 64px rgba(16,24,32,0.28))'}}>
            <div className="rounded-[40px] bg-white/40 backdrop-blur-2xl w-[410px] h-[230px] flex flex-col overflow-hidden relative" style={{boxShadow:'0 24px 80px 0 rgba(16,24,32,0.22)'}}>
              {/* Browser bar */}
              <div className="flex items-center gap-1 px-4 py-2 bg-[#F5F6FA]/80">
                <span className="w-2 h-2 rounded-full bg-[#D1D5DB]"></span>
                <span className="w-2 h-2 rounded-full bg-[#D1D5DB]"></span>
                <span className="w-2 h-2 rounded-full bg-[#D1D5DB]"></span>
              </div>
              {/* Event image */}
              <div className="w-full h-[90px] flex items-center justify-center relative">
                <img src="/event-mock.jpg" alt="Event" className="object-cover w-full h-full rounded-t-[32px]" style={{objectPosition:'center'}} />
                {/* Testimonial chip overlays image */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8 flex items-center gap-3 bg-white/30 backdrop-blur-2xl text-white text-base px-5 py-3 rounded-full shadow-xl border-2 border-white/70" style={{zIndex:10, fontFamily:'Inter', fontWeight:600, minWidth:'290px', boxShadow:'0 8px 32px 0 rgba(16,24,32,0.22)'}}>
                  <img src="/avatar1.png" alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white/80" />
                  <span className="whitespace-nowrap text-white text-lg font-semibold" style={{textShadow:'0 1px 8px #0008'}}>The mission hebad mv'10 ardmilo Contre carlan</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col px-6 pt-3 pb-4">
                <div className="text-[#10182A] font-black text-xl mb-1" style={{fontFamily:'Inter', textAlign:'left', letterSpacing:'-0.01em'}}>Events in New York City</div>
                <div className="text-[#10182A] text-lg font-semibold" style={{fontFamily:'Inter', textAlign:'left'}}>Startup Pirce Night</div>
              </div>
            </div>
          </div>
          {/* Middle card: Attend a Demo mission */}
          <div className="absolute left-1/2 -translate-x-1/2 top-36 rotate-[-4deg]" style={{zIndex:4, filter:'drop-shadow(0 12px 64px rgba(16,24,32,0.28))'}}>
            <div className="rounded-[40px] bg-white/40 backdrop-blur-2xl w-[370px] h-[130px] flex flex-col overflow-hidden relative" style={{boxShadow:'0 24px 80px 0 rgba(16,24,32,0.22)'}}>
              <div className="flex items-center gap-3 px-7 pt-6">
                <span className="w-12 h-12 rounded-full bg-[#FFD86B] flex items-center justify-center text-3xl">🧑‍💻</span>
                <span className="text-[#B6B9C6] text-lg font-semibold" style={{fontFamily:'Inter'}}>YooT var nøyagd</span>
              </div>
              <div className="flex-1 flex flex-col px-7 pb-5">
                <div className="text-[#10182A] font-black text-2xl leading-tight mb-1" style={{fontFamily:'Inter', textAlign:'left', letterSpacing:'-0.01em'}}>DOOor #vigmon</div>
                <div className="text-[#10182A] text-base font-medium mb-2" style={{fontFamily:'Inter', textAlign:'left'}}>Attend a Demo mission</div>
                <span className="absolute left-7 bottom-4 bg-white/60 text-[#1b7dff] font-black text-base px-5 py-2 rounded-full shadow border-2 border-[#1b7dff]/20" style={{backdropFilter:'blur(6px)'}}>800 KP</span>
              </div>
            </div>
          </div>
          {/* Bottom card: Coleab frooms */}
          <div className="absolute left-1/2 -translate-x-1/2 top-72 rotate-[8deg]" style={{zIndex:2, filter:'drop-shadow(0 12px 64px rgba(16,24,32,0.28))'}}>
            <div className="rounded-[40px] bg-white/40 backdrop-blur-2xl w-[340px] h-[120px] flex flex-col overflow-hidden relative" style={{boxShadow:'0 24px 80px 0 rgba(16,24,32,0.22)'}}>
              <div className="flex-1 flex flex-col px-7 pt-6 pb-4">
                <div className="text-[#10182A] font-black text-lg mb-1 flex items-center gap-2" style={{fontFamily:'Inter', textAlign:'left'}}>Coleab frooms <span className="ml-1"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M9 1.5a7.5 7.5 0 1 1 0 15a7.5 7.5 0 0 1 0-15z" stroke="#10182A" strokeWidth="1.5"/></svg></span></div>
                <div className="text-[#10182A] text-base font-medium mb-2" style={{fontFamily:'Inter', textAlign:'left'}}>S.eeking co-founders for health app</div>
                <div className="flex items-center gap-3 mt-1">
                  <button className="bg-white/60 text-[#1b7dff] font-black text-base px-4 py-2 rounded-full flex items-center gap-2 shadow border-2 border-[#1b7dff]/20" style={{backdropFilter:'blur(6px)'}}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#1b7dff"/><text x="9" y="13" textAnchor="middle" fontSize="12" fill="#fff">•</text></svg>Dot In
                  </button>
                  <button className="bg-white/60 text-[#10182A] font-black text-base px-4 py-2 rounded-full flex items-center gap-2 shadow border-2 border-[#10182A]/20" style={{backdropFilter:'blur(6px)'}}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="3" fill="#10182A"/><text x="9" y="13" textAnchor="middle" fontSize="12" fill="#fff">R</text></svg>Resgram
                  </button>
                  <button className="bg-white/60 text-[#229ED9] font-black text-base px-4 py-2 rounded-full flex items-center gap-2 shadow border-2 border-[#229ED9]/20" style={{backdropFilter:'blur(6px)'}}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="3" fill="#229ED9"/><text x="9" y="13" textAnchor="middle" fontSize="12" fill="#fff">T</text></svg>Teleggram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE DEEP-DIVE / INTERACTIVE DEMO SECTION */}
      <section className="w-full py-24 flex flex-col items-center bg-transparent">
        <h2 className="text-[48px] font-normal text-white text-center mb-4" style={{fontFamily:'Inter', lineHeight:'1.1'}}>Build your Plug Score.<br/>Unlock new rooms. Get noticed.</h2>
        <p className="text-[#B6B9C6] text-center max-w-2xl mb-48 text-xl font-normal" style={{fontFamily:'Inter', lineHeight:'1.4'}}>Your XP grows with every action – from RSVPing to events, to helping someone cold DM a VC. Earn badges, access exclusive chats, and fise on your school's leaderboard.</p>
        
        {/* Step-by-step walkthrough */}
        <div className="flex flex-col gap-16 w-full max-w-6xl">
          {/* Step 1: Set your vibe */}
          <div className="flex flex-row items-center gap-12">
            <div className="flex-1">
              <div className="text-[#1b7dff] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Step 1</div>
              <h3 className="text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Set your vibe</h3>
              <p className="text-[#B6B9C6] text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Tell us what cities, industries, and roles you're into. We'll curate your experience around your goals.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Choose your target cities (NYC, LA, SF, Austin)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Select industries (Tech, Design, Finance, Healthcare)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Define your role (Founder, Designer, Engineer, Student)</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-[24px] shadow-xl p-8 w-[320px] border-0" style={{boxShadow:'0 16px 64px 0 rgba(16,24,32,0.15)'}}>
                <div className="text-[#10182A] font-bold text-xl mb-6 text-center" style={{fontFamily:'Inter'}}>Profile Setup</div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD86B] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#10182A"/><path d="M10 6l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" fill="#FFD86B"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#10182A] font-semibold text-sm" style={{fontFamily:'Inter'}}>Target Cities</div>
                      <div className="text-[#B6B9C6] text-xs" style={{fontFamily:'Inter'}}>NYC, LA, SF</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7B3AED] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="3" fill="#10182A"/><path d="M6 8h8M6 12h6" stroke="#7B3AED" strokeWidth="2"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#10182A] font-semibold text-sm" style={{fontFamily:'Inter'}}>Industries</div>
                      <div className="text-[#B6B9C6] text-xs" style={{fontFamily:'Inter'}}>Tech, Design, Finance</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#A259D9] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" fill="#10182A"/><path d="M3 17c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#A259D9"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#10182A] font-semibold text-sm" style={{fontFamily:'Inter'}}>Role</div>
                      <div className="text-[#B6B9C6] text-xs" style={{fontFamily:'Inter'}}>Founder, Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Get missions */}
          <div className="flex flex-row items-center gap-12">
            <div className="flex-1 flex justify-center order-2">
              <div className="bg-[#181F2B] rounded-[24px] shadow-xl p-8 w-[360px] border-0" style={{boxShadow:'0 16px 64px 0 rgba(16,24,32,0.15)'}}>
                <div className="text-white font-bold text-xl mb-6 text-center" style={{fontFamily:'Inter'}}>Weekly Missions</div>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-[16px] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#FFD86B] flex items-center justify-center text-sm">🧑‍💻</span>
                      <span className="text-[#B6B9C6] text-sm font-normal" style={{fontFamily:'Inter'}}>Ava (NYU '26)</span>
                    </div>
                    <div className="text-[#10182A] font-bold text-base mb-1" style={{fontFamily:'Inter'}}>Apply to Y Combinator</div>
                    <div className="text-[#10182A] text-sm mb-3" style={{fontFamily:'Inter'}}>Submit your startup application</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-3 py-1 rounded-full">1200 XP</span>
                      <span className="text-[#1b7dff] text-sm font-semibold">Due in 3 days</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[16px] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#7B3AED] flex items-center justify-center text-sm">💬</span>
                      <span className="text-[#B6B9C6] text-sm font-normal" style={{fontFamily:'Inter'}}>Marcus (Stanford '25)</span>
                    </div>
                    <div className="text-[#10182A] font-bold text-base mb-1" style={{fontFamily:'Inter'}}>Cold DM a VC</div>
                    <div className="text-[#10182A] text-sm mb-3" style={{fontFamily:'Inter'}}>Reach out to 3 investors</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-3 py-1 rounded-full">800 XP</span>
                      <span className="text-[#1b7dff] text-sm font-semibold">Due in 5 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1">
              <div className="text-[#1b7dff] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Step 2</div>
              <h3 className="text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Get missions</h3>
              <p className="text-[#B6B9C6] text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Weekly XP-driven tasks that push you forward. From applying to fellowships to networking with founders.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Personalized missions based on your goals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Earn XP for completing tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Unlock exclusive access as you level up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Attend events / Collab */}
          <div className="flex flex-row items-center gap-12">
            <div className="flex-1">
              <div className="text-[#1b7dff] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Step 3</div>
              <h3 className="text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Attend events & collab</h3>
              <p className="text-[#B6B9C6] text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Curated events from Partiful, Eventbrite, and exclusive Plug meetups. Plus collab rooms for finding co-founders.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Curated events from multiple platforms</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Collab rooms for project matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Direct RSVP and networking tools</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col gap-4 w-[360px]">
                {/* Event card */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
                  <img src="/event-mock.jpg" alt="Event" className="w-full h-24 object-cover" />
                  <div className="p-4">
                    <div className="text-[#10182A] font-bold text-lg mb-1" style={{fontFamily:'Inter'}}>Gen Z Founders Mixer</div>
                    <div className="text-[#B6B9C6] text-sm mb-3" style={{fontFamily:'Inter'}}>NYC • Tomorrow • 7:00 PM</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#1b7dff] text-white font-bold text-xs px-3 py-1 rounded-full">RSVP</span>
                      <span className="text-[#1b7dff] text-sm font-semibold">+150 XP</span>
                    </div>
                  </div>
                </div>
                {/* Collab room card */}
                <div className="bg-white rounded-[20px] shadow-lg p-4">
                  <div className="text-[#10182A] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Collab Room: AI Startup</div>
                  <div className="text-[#B6B9C6] text-sm mb-3" style={{fontFamily:'Inter'}}>Looking for technical co-founder</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-2 py-1 rounded-full">Tech</span>
                    <span className="bg-[#F5F6FA] text-[#10182A] font-bold text-xs px-2 py-1 rounded-full">AI/ML</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#1b7dff] text-white font-bold text-xs px-3 py-1 rounded-full">Join Room</span>
                    <span className="text-[#1b7dff] text-sm font-semibold">+200 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Earn XP → Unlock access */}
          <div className="flex flex-row items-center gap-12">
            <div className="flex-1 flex justify-center order-2">
              <div className="bg-gradient-to-br from-[#1b7dff] to-[#005be8] rounded-[24px] shadow-xl p-8 w-[360px] border-0" style={{boxShadow:'0 16px 64px 0 rgba(27,125,255,0.3)'}}>
                <div className="text-white font-bold text-xl mb-6 text-center" style={{fontFamily:'Inter'}}>Level Up</div>
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="bg-white/20 rounded-full h-3">
                    <div className="bg-white rounded-full h-3 w-3/4"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-3xl font-bold mb-1" style={{fontFamily:'Inter'}}>2,450 XP</div>
                    <div className="text-white/80 text-sm" style={{fontFamily:'Inter'}}>Next level: 3,000 XP</div>
                  </div>
                  {/* Unlocked features */}
                  <div className="bg-white/10 rounded-[16px] p-4">
                    <div className="text-white font-semibold text-base mb-3" style={{fontFamily:'Inter'}}>Unlocked Features:</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff"/><path d="M6 8l2 2 4-4" stroke="#1b7dff" strokeWidth="2"/></svg>
                        <span className="text-white text-sm" style={{fontFamily:'Inter'}}>Exclusive founder chats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff"/><path d="M6 8l2 2 4-4" stroke="#1b7dff" strokeWidth="2"/></svg>
                        <span className="text-white text-sm" style={{fontFamily:'Inter'}}>VC office hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff"/><path d="M6 8l2 2 4-4" stroke="#1b7dff" strokeWidth="2"/></svg>
                        <span className="text-white text-sm" style={{fontFamily:'Inter'}}>Premium event access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1">
              <div className="text-[#1b7dff] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Step 4</div>
              <h3 className="text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Earn XP → Unlock access</h3>
              <p className="text-[#B6B9C6] text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Your XP grows with every action. Level up to unlock exclusive rooms, founder chats, and premium events.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Earn XP for RSVPs, missions, and collabs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Unlock exclusive founder and VC access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-base" style={{fontFamily:'Inter'}}>Rise on your school's leaderboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* WHY PLUG WORKS SECTION (pixel-perfect) */}
      <section className="w-full py-24 flex flex-col items-center bg-transparent">
        <h2 className="text-[56px] font-normal text-white text-center mb-4" style={{fontFamily:'Inter', lineHeight:'1.1'}}>Why Plug Works</h2>
        <p className="text-[#E6E8F0] text-center max-w-2xl mb-16 text-2xl font-normal" style={{fontFamily:'Inter', lineHeight:'1.3'}}>The engine that turns learning into access, and connections into action.</p>
        <div className="flex flex-row gap-8 items-stretch justify-center w-full max-w-6xl">
          {/* Mission Engine */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-8 py-10 w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Cycle arrows SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><path d="M16 8a16 16 0 1 1-4.7 31.2M16 8v8m0-8h8" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 40a16 16 0 0 1 4.7-31.2M8 40v-8m0 8h8" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-[#10182A] font-bold text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Mission Engine</div>
            <div className="text-[#222] text-base text-center" style={{fontFamily:'Inter'}}>Weekly XP-driven tesks that posh you for ward</div>
          </div>
          {/* Event Radar */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-8 py-10 w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Ticket/star SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="12" width="32" height="24" rx="6" fill="#FFD86B"/><path d="M24 18l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L24 18z" fill="#A259D9"/></svg>
            <div className="text-[#10182A] font-bold text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Event Radar</div>
            <div className="text-[#222] text-base text-center" style={{fontFamily:'Inter'}}>Curated events from-uuma, Partiful Evenbrite – sotted by vibe</div>
          </div>
          {/* Outreach Stack */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-8 py-10 w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Checklist SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="12" width="32" height="24" rx="6" fill="#7B3AED"/><path d="M16 24l6 6 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-[#10182A] font-bold text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Outreach Stack</div>
            <div className="text-[#222] text-base text-center" style={{fontFamily:'Inter'}}>Scriptsandtools that get. you replies</div>
          </div>
          {/* Collab Rooms */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-8 py-10 w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Chat bubbles SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><ellipse cx="24" cy="24" rx="16" ry="12" fill="#7B3AED"/><ellipse cx="32" cy="32" rx="10" ry="7" fill="#A259D9"/><ellipse cx="16" cy="32" rx="10" ry="7" fill="#FFD86B"/></svg>
            <div className="text-[#10182A] font-bold text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Collab Rooms</div>
            <div className="text-[#222] text-base text-center" style={{fontFamily:'Inter'}}>Metc h with other builders by project, vibe, or goal</div>
          </div>
        </div>
      </section>

      {/* Waitlist Section (also in modal) */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[#FFD59E] overflow-hidden">
        {/* Dots background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DotsBackground />
        </div>
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#3B2063] text-center mb-2">
            Get <span className="italic text-[#A259D9]">Plugged</span> In
          </h2>
          <p className="mb-8 text-[#7B3AED] text-center max-w-xl">
            Join the waitlist to get early access to Plug.
          </p>
          {/* Scalloped Card */}
          <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-xl border-4 border-[#F3E8FF] px-6 py-10 flex flex-col items-center">
            <div className="text-lg font-bold text-[#3B2063] mb-6 text-center">Fill up the form. We will get back to you soon</div>
            <form className="flex flex-col gap-5 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="border-2 border-[#A259D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A259D9] text-base"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-[#A259D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A259D9] text-base"
                required
              />
              <input
                type="text"
                placeholder="City"
                className="border-2 border-[#A259D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A259D9] text-base"
              />
              <input
                type="text"
                placeholder="Role or What You're Working On"
                className="border-2 border-[#A259D9] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A259D9] text-base"
              />
              <button
                type="submit"
                className="bg-[#A259D9] hover:bg-[#7B3AED] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition border-2 border-[#A259D9] mt-2"
              >
                Get connected
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal for Waitlist Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 w-full max-w-md relative animate-fadeIn mx-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-[#10182A]" style={{fontFamily:'Inter'}}>Join the Waitlist</h3>
              <p className="text-[#B6B9C6] text-base" style={{fontFamily:'Inter'}}>Get early access to Plug and be the first to know when we launch.</p>
            </div>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#10182A] mb-2" style={{fontFamily:'Inter'}}>You're on the list!</h4>
                <p className="text-[#B6B9C6] text-sm" style={{fontFamily:'Inter'}}>We'll notify you as soon as Plug is ready.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#E6E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1b7dff] focus:border-[#1b7dff] text-base transition text-black"
                    style={{fontFamily:'Inter'}}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#E6E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1b7dff] focus:border-[#1b7dff] text-base transition text-black"
                    style={{fontFamily:'Inter'}}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#E6E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1b7dff] focus:border-[#1b7dff] text-base transition text-black"
                    style={{fontFamily:'Inter'}}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role or What You're Working On"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#E6E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1b7dff] focus:border-[#1b7dff] text-base transition text-black"
                    style={{fontFamily:'Inter'}}
                  />
                </div>
                
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm" style={{fontFamily:'Inter'}}>
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#1b7dff] hover:bg-[#005be8] disabled:bg-[#B6B9C6] text-white px-6 py-3 rounded-xl font-semibold text-lg mt-2 transition disabled:cursor-not-allowed"
                  style={{fontFamily:'Inter'}}
                >
                  {isSubmitting ? 'Joining...' : '🔌 Join the Waitlist'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* YOUR SOCIAL RESUME, REINVENTED SECTION (pixel-perfect) */}
      <section className="w-full py-24 flex flex-col items-center bg-transparent">
        <h2 className="text-[56px] font-normal text-white text-center mb-4" style={{fontFamily:'Inter', lineHeight:'1.1'}}>Your social resume,<br/>reinvented</h2>
        <p className="text-[#E6E8F0] text-center max-w-2xl mb-12 text-2xl font-normal" style={{fontFamily:'Inter', lineHeight:'1.3'}}>Show off your networking momentum, <br/>not just a GPA.</p>
        <div className="flex flex-col items-center justify-center">
          {/* Profile Card */}
          <div className="bg-[#101622] rounded-[24px] px-12 py-10 shadow-lg flex flex-col items-start border border-[#3A4252] relative mb-10" style={{boxShadow:'0 8px 32px 0 rgba(16,24,32,0.10)', width:'480px', maxWidth:'90vw'}}>
            {/* Browser dots */}
            <div className="flex gap-2 absolute left-6 top-6">
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
            </div>
            <div className="flex flex-row items-center mt-8 mb-6 w-full">
              <div className="flex-1">
                <div className="text-white text-3xl font-bold mb-2" style={{fontFamily:'Inter'}}>Talia U.</div>
                <div className="flex items-center gap-4">
                  <img src="/profile-photo.jpg" alt="Talia U." className="w-20 h-20 rounded-full object-cover border-2 border-[#222]" />
                  <div className="flex flex-col gap-1 ml-2">
                    <div className="text-white text-lg font-normal" style={{fontFamily:'Inter'}}>8 Collabs</div>
                    <div className="text-white text-lg font-normal" style={{fontFamily:'Inter'}}>17 Events Attended</div>
                    <div className="text-white text-lg font-normal" style={{fontFamily:'Inter'}}>1 Fellowship Accepted</div>
                  </div>
                </div>
              </div>
              {/* Event Launchpad badge */}
              <div className="absolute right-10 top-10 flex flex-col items-end">
                <span className="bg-[#1b7dff] text-white font-semibold text-base rounded-lg px-4 py-2 flex items-center gap-2 mb-2" style={{fontFamily:'Inter'}}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="6" fill="#fff"/><path d="M6 10l4-4v3h4v2h-4v3l-4-4z" fill="#1b7dff"/></svg>
                  Event<br className="sm:hidden"/> Launchpad
                </span>
                {/* XP popup */}
                <span className="bg-[#222] text-white font-semibold text-base rounded-full px-4 py-2 shadow mt-2" style={{fontFamily:'Inter'}}>+150 XP</span>
              </div>
            </div>
          </div>
          {/* CTA Button */}
          <button onClick={openWaitlistModal} className="bg-[#1b7dff] hover:bg-[#005be8] text-white px-10 py-5 rounded-[12px] font-bold text-2xl shadow transition border-2 border-[#1b7dff] mt-2" style={{minWidth:'340px', textAlign:'center', fontFamily:'Inter'}}>Claim your Plug handle</button>
        </div>
      </section>

      {/* FOOTER (pixel-perfect) */}
      <footer className="w-full bg-transparent pt-16 pb-8 px-4 text-white" style={{fontFamily:'Inter'}}>
        <div className="max-w-5xl mx-auto flex flex-row justify-between items-start mb-8 gap-8">
          {/* Plug logo/text on left */}
          <div className="flex flex-col min-w-[120px] -ml-8 mr-12 -mt-8">
            <img src="/logo.png" alt="Plug logo" className="h-40 w-40 -mb-8" />
          </div>
          {/* Columns */}
          <div className="flex flex-1 flex-row justify-between gap-8">
            <div className="flex flex-col min-w-[120px]">
              <span className="font-semibold mb-2">Product</span>
              <a href="#how" className="mb-1 hover:underline">How it Works</a>
              <a href="#faq" className="hover:underline">FAQ</a>
              <a href="/pricing" className="hover:underline">Pricing</a>
            </div>
            <div className="flex flex-col min-w-[120px]">
              <span className="font-semibold mb-2">Company</span>
              <a href="#about" className="mb-1 hover:underline">About</a>
              <a href="#blog" className="hover:underline">Blog</a>
            </div>
            <div className="flex flex-col min-w-[120px]">
              <span className="font-semibold mb-2">Support</span>
              <a href="#help" className="mb-1 hover:underline">Help Center</a>
              <a href="#contact" className="hover:underline">Contact Us</a>
            </div>
            <div className="flex flex-col min-w-[120px] items-end">
              <span className="font-semibold mb-2">Follow Us</span>
              <div className="flex flex-row gap-4 mt-1">
                {/* Twitter SVG */}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6.99A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3.1 4.6a4.07 4.07 0 0 0-.56 2.07c0 1.43.73 2.69 1.85 3.43a4.07 4.07 0 0 1-1.86-.51v.05c0 2 1.42 3.66 3.3 4.04a4.1 4.1 0 0 1-1.85.07c.52 1.62 2.03 2.8 3.82 2.83A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22 5.92z" fill="#fff"/></svg>
                </a>
                {/* LinkedIn SVG */}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#fff"/><path d="M7.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-1.25 2.25h2.5v7.25h-2.5v-7.25zm4.25 0h2.4v1.01h.03c.33-.63 1.13-1.3 2.33-1.3 2.5 0 2.96 1.64 2.96 3.77v4.77h-2.5v-4.23c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.23v4.31h-2.5v-7.25z" fill="#0A66C2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <div className="text-center text-[#E6E8F0] text-base mt-8" style={{fontFamily:'Inter'}}>
          © 2025 Plug &nbsp;·&nbsp; <a href="#privacy" className="hover:underline">Privacy Policy</a> &nbsp;·&nbsp; <a href="#terms" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
