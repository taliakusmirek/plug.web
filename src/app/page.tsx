"use client";
import { useState, useEffect, useRef } from "react";

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsIntersecting(true);
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isIntersecting] as [React.RefObject<HTMLElement>, boolean];
};

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

  // Intersection observer hooks for animations
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [featuresRef, featuresVisible] = useIntersectionObserver();
  const [whyWorksRef, whyWorksVisible] = useIntersectionObserver();
  const [resumeRef, resumeVisible] = useIntersectionObserver();

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
        // Handle specific error cases
        if (response.status === 409) {
          // Duplicate email
          setSubmitStatus('error');
          // You could add a specific error message here if needed
        } else {
          setSubmitStatus('error');
        }
      }
    } catch {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/80 backdrop-blur-md border-b border-white/10 h-16 sm:h-24" style={{minHeight:'64px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
          <div className="flex justify-between items-center h-16 sm:h-24" style={{minHeight:'64px'}}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center -ml-2 sm:-ml-14">
              <img src="/logo.png" alt="Plug logo" className="h-12 w-12 sm:h-72 sm:w-72 -mt-2" style={{height:'108px', width:'108px'}} />
            </div>
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-10">
                <a href="#about" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">About</a>
                <a href="#why-plug" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">Features</a>
                <a href="/pricing" className="text-white hover:text-[#1b7dff] px-4 py-2 text-lg font-medium transition">Pricing</a>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex items-center">
              <button onClick={openWaitlistModal} className="bg-[#1b7dff] hover:bg-[#005be8] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-lg transition border-2 border-[#1b7dff] hover:border-[#005be8] shadow-lg min-w-[80px] sm:min-w-[140px]">Join Plug</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with SVG scalloped border */}
      <section 
        ref={heroRef}
        className={`relative w-full min-h-[500px] sm:min-h-[700px] flex flex-col sm:flex-row items-center justify-between bg-transparent px-4 sm:px-8 pt-32 sm:pt-24 pb-12 overflow-hidden transition-all duration-800 ease-out ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center z-10 max-w-xl mx-auto sm:mx-0 sm:ml-32 sm:mt-20 text-center sm:text-left">
          <h1 className={`text-[40px] sm:text-[64px] leading-[1.05] font-normal text-white mb-6 transition-all duration-800 delay-200 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{fontFamily:'Inter', letterSpacing: '-0.03em'}}>Plug into the<br/>rooms that<br/>change everything.</h1>
          <p className={`text-base sm:text-lg text-[#B6B9C6] mb-10 max-w-lg mx-auto sm:mx-0 transition-all duration-800 delay-400 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{fontWeight: 400}}>Build your founder momentum, meet your first cofounder, and log your journey — all in one playground.</p>
          <div className={`flex flex-col sm:flex-row gap-4 mb-10 transition-all duration-800 delay-600 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{justifyContent:'flex-start'}}>
            <button onClick={openWaitlistModal} className="bg-[#1b7dff] text-white px-6 sm:px-8 py-3 rounded-[10px] font-bold text-base sm:text-lg shadow transition border-2 border-[#1b7dff] hover:bg-[#005be8] hover:border-[#005be8]" style={{minWidth:'260px', height:'56px', display:'flex', alignItems:'center', justifyContent:'center'}}>Join the Waitlist</button>
            <a href="#how" className="bg-transparent text-white px-6 sm:px-8 py-3 rounded-[10px] font-semibold text-base sm:text-lg border border-white/30 hover:bg-white/10 transition" style={{minWidth:'260px', height:'56px', display:'flex', alignItems:'center', justifyContent:'center'}}>Watch How it Works</a>
          </div>
        </div>
        {/* REPLACE THIS AREA WITH NEW COLLAGE */}
        <div className={`flex-1 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] w-full mt-8 sm:mt-0 transition-all duration-800 delay-300 ${
          heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Holographic, rotated, floating cards collage with small cards on top and all cards using a subtle gray gradient border */}
          <div className="relative w-full h-[300px] sm:h-[420px] flex items-center justify-center scale-75 sm:scale-100">
            {/* NYC card (bottom layer) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-16 rotate-[-7deg] w-[280px] sm:w-[340px]" style={{zIndex:1}}>
              <div className="rounded-[28px] p-[5px] bg-gradient-to-br from-[#22272a22] via-[#bfc4cc11] to-transparent shadow-2xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-lg p-0 w-full">
                  <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
                    <div className="text-lg sm:text-xl font-bold text-[#10182A] mb-2" style={{fontFamily:'Inter'}}>Events in New York City</div>
                    {/* Inner card for Startup Pitch Night */}
                    <div className="rounded-2xl p-[4px] bg-gradient-to-br from-[#aeafaf99] via-[#f7f8fbcf] to-transparent">
                      <div className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center">
                        <div className="rounded-xl overflow-hidden w-full mb-3">
                          <img src="/pitch.jpg" alt="Event" className="object-cover w-full h-[100px] sm:h-[120px]" style={{objectPosition:'center'}} />
                        </div>
                        <div className="text-base sm:text-lg text-[#10182A] mb-3" style={{fontFamily:'Inter'}}>Startup Pitch Night</div>
                        <button className="bg-[#1b7dff] hover:bg-[#005be8] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full flex items-center gap-2 border border-[#1b7dff] shadow transition" style={{fontFamily:'Inter'}}>
                          RSVP Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mission card (top right, above NYC card) */}
            <div className="absolute left-[55%] sm:left-[60%] top-6 rotate-[-2deg] w-[220px] sm:w-[260px]" style={{zIndex:2}}>
              <div className="rounded-[28px] p-[5px] bg-gradient-to-br from-[#22272a22] via-[#bfc4cc11] to-transparent shadow-2xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-lg p-0 w-full">
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1b7dff] flex items-center justify-center"><svg width="20" height="20" fill="none" viewBox="0 0 28 28"><polygon points="14,4 17,12 26,12 18.5,17 21,25 14,20 7,25 9.5,17 2,12 11,12" fill="#fff"/></svg></span>
                    </div>
                    <div className="text-[#10182A] font-bold text-sm sm:text-base mb-1" style={{fontFamily:'Inter'}}>It&apos;s time to get your XP</div>
                    <div className="text-[#10182A] text-xs sm:text-sm font-medium mb-1" style={{fontFamily:'Inter'}}>Build your first landing page</div>
                    <div className="flex items-center mt-1">
                      <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 border border-[#E6E8F0]" style={{fontFamily:'Inter'}}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 18 18"><circle cx="8" cy="8" r="8" fill="#1b7dff"/><text x="8" y="12" textAnchor="middle" fontSize="8" fill="#fff">✓</text></svg>
                        800 XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Collab Rooms card (below mission, right side) */}
            <div className="absolute left-[65%] sm:left-[68%] top-36 sm:top-44 rotate-[6deg] w-[200px] sm:w-[250px]" style={{zIndex:2}}>
              <div className="rounded-[28px] p-[5px] bg-gradient-to-br from-[#22272a22] via-[#bfc4cc11] to-transparent shadow-2xl">
                <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-lg p-0 w-full">
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-4">
                    <div className="text-[#10182A] font-bold text-sm sm:text-base mb-1" style={{fontFamily:'Inter'}}>Join this Build Room?</div>
                    <div className="text-[#10182A] text-xs sm:text-sm font-medium mb-2" style={{fontFamily:'Inter'}}>Seeking co-founders for health app</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 border border-[#E6E8F0]" style={{fontFamily:'Inter'}}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 18 18"><circle cx="8" cy="8" r="8" fill="#1b7dff"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5"/></svg>
                        250 XP
                      </button>
                      <button className="bg-[#F5F6FA] text-[#10182A] font-bold text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 border border-[#E6E8F0]" style={{fontFamily:'Inter'}}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 18 18"><rect width="12" height="12" rx="2" fill="#e6e8f0" x="2" y="2"/><text x="8" y="12" textAnchor="middle" fontSize="8" fill="#222">?</text></svg>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE DEEP-DIVE / INTERACTIVE DEMO SECTION */}
      <section 
        ref={featuresRef}
        className={`w-full py-32 sm:py-40 flex flex-col items-center bg-transparent px-4 sm:px-0 transition-all duration-800 ease-out ${
          featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className={`text-[32px] sm:text-[48px] font-normal text-white text-center mb-4 transition-all duration-800 delay-200 ${
          featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{fontFamily:'Inter', lineHeight:'1.1'}}>Forget resumes. Show your build log.</h2>
        <p className={`text-[#B6B9C6] text-center max-w-2xl mb-24 sm:mb-48 text-lg sm:text-xl font-normal px-4 transition-all duration-800 delay-400 ${
          featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{fontFamily:'Inter', lineHeight:'1.4'}}>Your XP grows with every action – from completing build missions to joining build rooms. Earn badges, unlock exclusive access, and track your founder journey.</p>
        
        {/* Step-by-step walkthrough */}
        <div className="flex flex-col gap-20 sm:gap-32 w-full max-w-6xl">
          {/* Step 1: Set your vibe */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 order-2 sm:order-1">
              <div className="text-[#1b7dff] font-bold text-base sm:text-lg mb-2" style={{fontFamily:'Inter'}}>Step 1</div>
              <h3 className="text-[24px] sm:text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Find your circle</h3>
              <p className="text-[#B6B9C6] text-base sm:text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Choose your cities, interests, and vibes. We&apos;ll help you find other builders who share your mission — even if you&apos;re still figuring it out.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Choose your target cities (NYC, LA, SF, Austin)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Select industries (Tech, Design, Finance, Healthcare)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Define your role (Founder, Designer, Engineer, Student)</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center order-1 sm:order-2">
              <div className="bg-white rounded-[24px] shadow-xl p-6 sm:p-8 w-[280px] sm:w-[320px] border-0" style={{boxShadow:'0 16px 64px 0 rgba(16,24,32,0.15)'}}>
                <div className="text-[#10182A] font-bold text-xl mb-6 text-center" style={{fontFamily:'Inter'}}>Profile Setup</div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1b7dff] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#10182A"/><path d="M10 6l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" fill="#1b7dff"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#10182A] font-semibold text-sm" style={{fontFamily:'Inter'}}>Target Cities</div>
                      <div className="text-[#B6B9C6] text-xs" style={{fontFamily:'Inter'}}>NYC, LA, SF</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c2f04e] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="3" fill="#10182A"/><path d="M6 8h8M6 12h6" stroke="#c2f04e" strokeWidth="2"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#10182A] font-semibold text-sm" style={{fontFamily:'Inter'}}>Industries</div>
                      <div className="text-[#B6B9C6] text-xs" style={{fontFamily:'Inter'}}>Tech, Design, Finance</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c2f04e] flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" fill="#10182A"/><path d="M3 17c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="#c2f04e"/></svg>
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
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 flex justify-center order-2 sm:order-1">
              <div className="bg-[#181F2B] rounded-[24px] shadow-xl p-8 w-[360px] border-0" style={{boxShadow:'0 16px 64px 0 rgba(16,24,32,0.15)'}}>
                <div className="text-white font-bold text-xl mb-6 text-center" style={{fontFamily:'Inter'}}>Weekly Missions</div>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-[16px] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#1b7dff] flex items-center justify-center text-sm">🧑‍💻</span>
                      <span className="text-[#B6B9C6] text-sm font-normal" style={{fontFamily:'Inter'}}>Ava (NYU &apos;26)</span>
                    </div>
                    <div className="text-[#10182A] font-bold text-base mb-1" style={{fontFamily:'Inter'}}>Launch your first MVP</div>
                    <div className="text-[#10182A] text-sm mb-3" style={{fontFamily:'Inter'}}>Build and deploy a simple landing page</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-3 py-1 rounded-full">1200 XP</span>
                      <span className="text-[#1b7dff] text-sm font-semibold">Due in 3 days</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[16px] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#c2f04e] flex items-center justify-center text-sm">💬</span>
                      <span className="text-[#B6B9C6] text-sm font-normal" style={{fontFamily:'Inter'}}>Marcus (Stanford &apos;25)</span>
                    </div>
                    <div className="text-[#10182A] font-bold text-base mb-1" style={{fontFamily:'Inter'}}>Get your first user</div>
                    <div className="text-[#10182A] text-sm mb-3" style={{fontFamily:'Inter'}}>Find and interview 3 potential customers</div>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#F5F6FA] text-[#1b7dff] font-bold text-xs px-3 py-1 rounded-full">800 XP</span>
                      <span className="text-[#1b7dff] text-sm font-semibold">Due in 5 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 sm:order-2">
              <div className="text-[#1b7dff] font-bold text-base sm:text-lg mb-2" style={{fontFamily:'Inter'}}>Step 2</div>
              <h3 className="text-[24px] sm:text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Start building right now</h3>
              <p className="text-[#B6B9C6] text-base sm:text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Get &quot;Build Missions&quot; to push your ideas forward: test your concept, create a landing page, find your first user, or pitch your first investor.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Personalized missions based on your goals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Earn XP for completing tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Unlock exclusive access as you level up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Attend events / Collab */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1">
              <div className="text-[#1b7dff] font-bold text-base sm:text-lg mb-2" style={{fontFamily:'Inter'}}>Step 3</div>
              <h3 className="text-[24px] sm:text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Join a build room</h3>
              <p className="text-[#B6B9C6] text-base sm:text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Hop into a small, focused build room where you collaborate, share progress, and jam with your first circle.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Curated events from multiple platforms</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Build rooms for project matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Direct RSVP and networking tools</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col gap-4 w-[360px]">
                {/* Event card */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
                  <img src="/networking.jpeg" alt="Event" className="w-full h-24 object-cover" />
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
                  <div className="text-[#10182A] font-bold text-lg mb-2" style={{fontFamily:'Inter'}}>Build Room: AI Startup</div>
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
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 flex justify-center order-2 sm:order-1">
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
            <div className="flex-1 order-1 sm:order-2">
              <div className="text-[#1b7dff] font-bold text-base sm:text-lg mb-2" style={{fontFamily:'Inter'}}>Step 4</div>
              <h3 className="text-[24px] sm:text-[32px] font-normal text-white mb-4" style={{fontFamily:'Inter', lineHeight:'1.2'}}>Level up & show your journey</h3>
              <p className="text-[#B6B9C6] text-base sm:text-lg mb-6" style={{fontFamily:'Inter', lineHeight:'1.5'}}>Earn XP as you complete missions and collabs. Your Plug Profile becomes your live &quot;build log&quot; — not just a static resume.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Earn XP for RSVPs, missions, and collabs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Unlock exclusive founder and VC access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1b7dff]"></div>
                  <span className="text-white text-sm sm:text-base" style={{fontFamily:'Inter'}}>Rise on your school&apos;s leaderboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* WHY PLUG WORKS SECTION (pixel-perfect) */}
      <section 
        id="why-plug"
        ref={whyWorksRef}
        className={`w-full py-32 sm:py-40 flex flex-col items-center bg-transparent px-4 sm:px-0 transition-all duration-800 ease-out ${
          whyWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className={`text-[40px] sm:text-[56px] font-normal text-white text-center mb-4 transition-all duration-800 delay-200 ${
          whyWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{fontFamily:'Inter', lineHeight:'1.1'}}>Why Plug?</h2>
        <p className={`text-[#E6E8F0] text-center max-w-2xl mb-12 sm:mb-16 text-lg sm:text-2xl font-normal px-4 transition-all duration-800 delay-400 ${
          whyWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{fontFamily:'Inter', lineHeight:'1.3'}}>Your first circle changes everything.</p>
        <div className={`flex flex-col sm:flex-row gap-6 sm:gap-8 items-stretch justify-center w-full max-w-6xl transition-all duration-800 delay-600 ${
          whyWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Mission Engine */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-6 sm:px-8 py-8 sm:py-10 w-full sm:w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Purple Lightning Bolt SVG (small, white bolt) */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4">
              <rect width="48" height="48" rx="24" fill="#c2f04e"/>
              <path d="M28.5 9L15 30h7.5l-1.5 9L33 18h-7.5l1.5-9z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div className="text-[#10182A] font-bold text-lg sm:text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Build Missions</div>
            <div className="text-[#222] text-sm sm:text-base text-center" style={{fontFamily:'Inter'}}>Weekly XP-driven tasks that push you forward</div>
          </div>
          {/* Event Radar */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-6 sm:px-8 py-8 sm:py-10 w-full sm:w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Ticket/star SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="12" width="32" height="24" rx="6" fill="#1b7dff"/><path d="M24 18l2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L24 18z" fill="#c2f04e"/></svg>
            <div className="text-[#10182A] font-bold text-lg sm:text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Event Radar</div>
            <div className="text-[#222] text-sm sm:text-base text-center" style={{fontFamily:'Inter'}}>Curated events from multiple platforms, sorted by vibe</div>
          </div>
          {/* Outreach Stack */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-6 sm:px-8 py-8 sm:py-10 w-full sm:w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Checklist SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><rect x="8" y="12" width="32" height="24" rx="6" fill="#c2f04e"/><path d="M16 24l6 6 10-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-[#10182A] font-bold text-lg sm:text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Outreach Stack</div>
            <div className="text-[#222] text-sm sm:text-base text-center" style={{fontFamily:'Inter'}}>Scripts and tools that get you replies</div>
          </div>
          {/* Collab Rooms */}
          <div className="flex flex-col items-center bg-[#F8F4E8] rounded-[18px] px-6 sm:px-8 py-8 sm:py-10 w-full sm:w-[240px] shadow" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.08)'}}>
            {/* Chat bubbles SVG */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4"><ellipse cx="24" cy="24" rx="16" ry="12" fill="#c2f04e"/><ellipse cx="32" cy="32" rx="10" ry="7" fill="#c2f04e"/><ellipse cx="16" cy="32" rx="10" ry="7" fill="#1b7dff"/></svg>
            <div className="text-[#10182A] font-bold text-lg sm:text-xl mb-2 text-center" style={{fontFamily:'Inter'}}>Build Rooms</div>
            <div className="text-[#222] text-sm sm:text-base text-center" style={{fontFamily:'Inter'}}>Match with other builders by project, vibe, or goal</div>
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
                <h4 className="text-xl font-bold text-[#10182A] mb-2" style={{fontFamily:'Inter'}}>You&apos;re on the list!</h4>
                <p className="text-[#B6B9C6] text-sm" style={{fontFamily:'Inter'}}>We&apos;ll notify you as soon as Plug is ready.</p>
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
                    placeholder="Role or What You&apos;re Working On"
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
      <section 
        ref={resumeRef}
        className={`w-full py-32 sm:py-40 pt-12 sm:pt-24 flex flex-col items-center bg-transparent px-4 sm:px-0 transition-all duration-800 ease-out ${
          resumeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className={`text-[40px] sm:text-[56px] font-normal text-white text-center mb-12 sm:mb-16 transition-all duration-800 delay-200 ${
          resumeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{fontFamily:'Inter', lineHeight:'1.1'}}>Your build log,<br/>not your resume.</h2>
        <div className={`flex flex-col items-center justify-center transition-all duration-800 delay-600 ${
          resumeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Profile Card */}
          <div className="bg-[#101622] rounded-[24px] px-6 sm:px-12 py-8 sm:py-10 shadow-lg flex flex-col items-start border border-[#3A4252] relative mb-8 sm:mb-10" style={{boxShadow:'0 8px 32px 0 rgba(16,24,32,0.10)', width:'90vw', maxWidth:'480px'}}>
            {/* Browser dots */}
            <div className="flex gap-2 absolute left-4 sm:left-6 top-4 sm:top-6">
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-[#444] inline-block"></span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-8 mb-6 w-full">
              <div className="flex-1">
                <div className="text-white text-2xl sm:text-3xl font-bold mb-2" style={{fontFamily:'Inter'}}>Talia K.</div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img src="/talia.png" alt="Talia K." className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#222]" />
                  <div className="flex flex-col gap-1 ml-0 sm:ml-2 mt-2 sm:mt-0">
                    <div className="text-white text-base sm:text-lg font-normal" style={{fontFamily:'Inter'}}>8 Collabs</div>
                    <div className="text-white text-base sm:text-lg font-normal" style={{fontFamily:'Inter'}}>17 Events Attended</div>
                    <div className="text-white text-base sm:text-lg font-normal" style={{fontFamily:'Inter'}}>1 Fellowship Accepted</div>
                  </div>
                </div>
              </div>
              {/* Event Launchpad badge */}
              <div className="absolute right-4 sm:right-10 top-4 sm:top-10 flex flex-col items-end">
                <span className="bg-[#1b7dff] text-white font-semibold text-sm sm:text-base rounded-lg px-3 sm:px-4 py-1 sm:py-2 flex items-center gap-2 mb-2" style={{fontFamily:'Inter'}}>
                5 | Event<br className="sm:hidden"/> Launchpad
                </span>
                {/* XP popup */}
                <span className="bg-[#222] text-white font-semibold text-sm sm:text-base rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow mt-2" style={{fontFamily:'Inter'}}>1500 XP</span>
              </div>
            </div>
          </div>
          {/* CTA Button */}
          <button onClick={openWaitlistModal} className="bg-[#1b7dff] hover:bg-[#005be8] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-[12px] font-bold text-lg sm:text-2xl shadow transition mt-6 sm:mt-10 mb-12 sm:mb-20 border-2 border-[#1b7dff] w-full sm:w-auto min-w-[280px] sm:min-w-[340px]" style={{textAlign:'center', fontFamily:'Inter'}}>Start your build log</button>
        </div>
      </section>

      {/* FOOTER (pixel-perfect) */}
      <footer className="w-full bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 text-white" style={{fontFamily:'Inter'}}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-6 sm:gap-8">
          {/* Plug logo/text on left */}
          <div className="flex flex-col min-w-[120px] -ml-4 sm:-ml-8 mr-0 sm:mr-12 -mt-4 sm:-mt-8">
            <img src="/logo.png" alt="Plug logo" className="h-24 w-24 sm:h-40 sm:w-40 -mb-4 sm:-mb-8" />
          </div>
          {/* Columns */}
          <div className="flex flex-1 flex-col sm:flex-row justify-between gap-6 sm:gap-8">
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
            <div className="flex flex-col min-w-[120px] items-start sm:items-end">
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
        <div className="text-center text-[#E6E8F0] text-sm sm:text-base mt-6 sm:mt-8" style={{fontFamily:'Inter'}}>
          © 2025 Plug &nbsp;·&nbsp; <a href="#privacy" className="hover:underline">Privacy Policy</a> &nbsp;·&nbsp; <a href="#terms" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
