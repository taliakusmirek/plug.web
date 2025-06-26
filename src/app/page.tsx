"use client";
import { useState } from "react";

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

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3B2063]">
      {/* Hero Section with SVG scalloped border */}
      <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center" style={{minHeight:'600px'}}>
        {/* Avatars in corners */}
        <PeepAvatar bg="#FFD86B" hair="#7B3AED" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',top:'-32px',left:'-32px',zIndex:20}} />
        <PeepAvatar bg="#A259D9" hair="#FFD86B" skin="#F3E8FF" accent="#7B3AED" style={{position:'absolute',top:'-32px',right:'-32px',zIndex:20}} />
        <PeepAvatar bg="#F3E8FF" hair="#A259D9" skin="#FFD86B" accent="#7B3AED" style={{position:'absolute',bottom:'-32px',left:'-32px',zIndex:20}} />
        <PeepAvatar bg="#7B3AED" hair="#FFD86B" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',bottom:'-32px',right:'-32px',zIndex:20}} />
        {/* Scalloped Card using SVG mask */}
        <div className="relative z-10 w-full">
          <div className="overflow-hidden" style={{borderRadius:'48px', boxShadow:'0 8px 32px 0 rgba(59,32,99,0.10)'}}>
            <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full z-0">
              <rect x="0" y="0" width="1200" height="600" fill="#FDF6ED" />
              <path d="M0,40 Q60,0 120,40 T240,40 T360,40 T480,40 T600,40 T720,40 T840,40 T960,40 T1080,40 T1200,40 V600 H0 Z" fill="#FDF6ED" />
              <path d="M0,560 Q60,600 120,560 T240,560 T360,560 T480,560 T600,560 T720,560 T840,560 T960,560 T1080,560 T1200,560 V0 H0 Z" fill="#FDF6ED" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center px-12 py-20" style={{minHeight:'600px'}}>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#3B2063] text-center mb-4 leading-tight" style={{fontFamily:'var(--font-inter)'}}>
                You have a gym plan.<br />
                <span className="block mt-2">
                  <span className="italic text-[#A259D9]" style={{ fontFamily: 'var(--font-mynerve)' }}>Why not a networking plan?</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#6B4A9C] max-w-2xl mx-auto mb-8 text-center italic">
                This is the app that makes networking a system, not a scramble.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center mb-4">
                <button
                  className="bg-[#A259D9] hover:bg-[#7B3AED] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition border-2 border-[#A259D9] min-w-[180px]"
                  onClick={() => setShowModal(true)}
                >
                  Join the Waitlist
                </button>
                
              </div>
              {/* Visual: Phone mockup + overlay stats */}
              <div className="relative flex justify-center mt-6">
                <div className="w-[220px] h-[440px] bg-[#E9D8FD] rounded-3xl shadow-xl flex items-center justify-center">
                  <span className="text-[#BFA2E6]">[Phone Mockup]</span>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full px-4 py-2 shadow text-sm flex gap-2 border border-[#E9D8FD]">
                  <span>12 cold DMs sent</span>·<span>3 collabs landed</span>·<span>2 events this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Plug Exists */}
      <section className="max-w-2xl mx-auto py-6 px-2">
        <h2 className="text-xl font-bold mb-2 text-[#3B2063]">Why Plug Exists</h2>
       
        <div className="mb-2 text-[#3B2063]">
          <span className="font-semibold">The problem:</span> You know you should be meeting people, pitching yourself, showing up — but you don't have a plan, a system, or the right crew.
        </div>
        <div className="text-[#3B2063]">
          <span className="font-semibold">The Plug solution:</span> An all-in-one app for:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Weekly missions</li>
            <li>Curated events + fellowships</li>
            <li>Templates and collab rooms</li>
            <li>Growth you can actually <em>track</em></li>
          </ul>
        </div>
      </section>

      {/* How it Works Section - Horizontal Pillar Carousel */}
      <section className="w-full bg-[#FDF6ED] py-20 flex flex-col items-center">
        <h2 className="text-5xl font-extrabold text-[#3B2063] text-center mb-2" style={{fontFamily:'var(--font-inter)'}}>
          What you get when you <span className="italic text-[#A259D9]">Plug</span>
        </h2>
        <p className="text-[#6B4A9C] text-center max-w-2xl mb-16 mt-4 text-lg">
          Plug makes networking a system, not a scramble. Here's how you get momentum and meaning:
        </p>
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-6xl px-4">
            <div className="flex gap-8 overflow-x-auto scrollbar-thin scrollbar-thumb-[#A259D9]/40 scrollbar-track-[#FDF6ED] snap-x snap-mandatory pb-8" style={{scrollSnapType:'x mandatory'}}>
              {[
                {icon:'📍',title:'Plug Missions',desc:'Weekly prompts to reach out, show up, and level up',color:'#FFD86B'},
                {icon:'🎟️',title:'Events Feed',desc:'Curated from Luma, Partiful, and more — based on your vibe + city',color:'#F3E8FF'},
                {icon:'🗣️',title:'The Social Resume',desc:'A live dashboard of your networking wins',color:'#A259D9'},
                {icon:'🔓',title:'Collab Rooms',desc:"Private chats with people building what you\'re building",color:'#FFD86B'},
                {icon:'🧠',title:'Opportunity Vault',desc:'Fellowships, accelerators, and things you should\u2019ve known about',color:'#F3E8FF'},
                {icon:'✍️',title:'Templates & Scripts',desc:'Cold DMs, intros, follow-ups, and brag blurbs — pre-written',color:'#A259D9'},
              ].map((f, i) => {
                const isSocialResume = f.title === 'The Social Resume';
                return (
                  <div
                    key={f.title}
                    className="flex flex-col items-center snap-center transition-transform duration-300"
                    style={{
                      minWidth: '340px',
                      maxWidth: '340px',
                      transform: (!isSocialResume && i === 2) ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: isSocialResume ? 'none' : 'none',
                      zIndex: i === 2 ? 10 : 1,
                    }}
                  >
                    <div className={`relative z-10 bg-white rounded-2xl px-8 py-6 w-[320px] text-center border border-[#E9D8FD] mb-0 ${(!isSocialResume && i===2) ? 'scale-105 border-[#A259D9]' : ''}`}
                      style={isSocialResume ? {boxShadow:'none'} : {}}>
                      <div className="text-2xl font-bold text-[#3B2063] mb-1">{f.title}</div>
                      <div className="text-[#A259D9] text-lg mb-2">{f.icon}</div>
                      <div className="text-[#6B4A9C] text-base">{f.desc}</div>
                    </div>
                    <div className="-mt-4 mb-2">
                      <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
                        <ellipse cx="110" cy="24" rx="110" ry="24" fill={f.color} />
                        <ellipse cx="110" cy="32" rx="70" ry="12" fill="#3B2063" fillOpacity="0.18" />
                      </svg>
                    </div>
                    <div>
                      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <ellipse cx="60" cy="115" rx="55" ry="5" fill="#3B2063" fillOpacity="0.12" />
                        <rect x="30" y="40" width="60" height="60" rx="16" fill="#fff" stroke="#3B2063" strokeWidth="3" />
                        <rect x="20" y="20" width="80" height="24" rx="12" fill="#fff" stroke="#3B2063" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Your Networking Progress, Visualized (avatars around text) */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[#FFD59E] overflow-hidden">
        {/* Dots background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" className="w-full h-full" style={{position:'absolute',top:0,left:0}}>
            {Array.from({length: 80}).map((_,i) => (
              <circle key={i} cx={Math.random()*100+"%"} cy={Math.random()*100+"%"} r="1.5" fill="#fff" fillOpacity="0.5" />
            ))}
          </svg>
        </div>
        {/* Avatars floating around text */}
        <PeepAvatar bg="#FFD86B" hair="#7B3AED" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',top:'-32px',left:'-32px',zIndex:20}} />
        <PeepAvatar bg="#A259D9" hair="#FFD86B" skin="#F3E8FF" accent="#7B3AED" style={{position:'absolute',top:'-32px',right:'-32px',zIndex:20}} />
        <PeepAvatar bg="#F3E8FF" hair="#A259D9" skin="#FFD86B" accent="#7B3AED" style={{position:'absolute',bottom:'-32px',left:'-32px',zIndex:20}} />
        <PeepAvatar bg="#7B3AED" hair="#FFD86B" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',bottom:'-32px',right:'-32px',zIndex:20}} />
        <PeepAvatar bg="#FFD86B" hair="#7B3AED" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',left:'-32px',top:'-32px',zIndex:20}} />
        <PeepAvatar bg="#A259D9" hair="#FFD86B" skin="#F3E8FF" accent="#7B3AED" style={{position:'absolute',right:'-32px',top:'-32px',zIndex:20}} />
        <PeepAvatar bg="#F3E8FF" hair="#A259D9" skin="#FFD86B" accent="#7B3AED" style={{position:'absolute',left:'-32px',bottom:'-32px',zIndex:20}} />
        <PeepAvatar bg="#7B3AED" hair="#FFD86B" skin="#F3E8FF" accent="#A259D9" style={{position:'absolute',right:'-32px',bottom:'-32px',zIndex:20}} />
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#3B2063] text-center mb-2">
            Your Networking <span className="italic text-[#A259D9]">Progress</span>, Visualized
          </h2>
          <p className="italic text-[#7B3AED] mb-6 text-center text-lg">
            "If you can track gym reps, why not mentor calls and founder intros?"
          </p>
          <ul className="flex flex-col items-center gap-2 text-[#3B2063] mb-4 text-lg font-medium">
            <li>Cold DMs sent</li>
            <li>Responses received</li>
            <li>Events RSVP'd to</li>
            <li>Collabs completed</li>
            <li>Opportunities applied to</li>
          </ul>
          <div className="text-[#A259D9] text-center mt-4 text-base font-semibold">You don't have to guess if you're moving. Plug shows you.</div>
        </div>
      </section>

      {/* Waitlist Section (also in modal) */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[#FFD59E] overflow-hidden">
        {/* Dots background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" className="w-full h-full" style={{position:'absolute',top:0,left:0}}>
            {Array.from({length: 80}).map((_,i) => (
              <circle key={i} cx={Math.random()*100+"%"} cy={Math.random()*100+"%"} r="1.5" fill="#fff" fillOpacity="0.5" />
            ))}
          </svg>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2 text-[#3B2063]">Join the Waitlist</h3>
            <form className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A259D9]"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A259D9]"
                required
              />
              <input
                type="text"
                placeholder="City"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A259D9]"
              />
              <input
                type="text"
                placeholder="Role or What You're Working On"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A259D9]"
              />
              <button
                type="submit"
                className="bg-[#A259D9] text-white px-6 py-2 rounded-full font-semibold mt-2 hover:bg-[#7B3AED] transition"
              >
                🔌 Join the Waitlist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#FDF6ED] pt-12 pb-4 px-4 mt-0 text-[#3B2063]">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Logo/Name */}
          <div className="text-3xl font-extrabold mb-2">Plug</div>
          {/* Subtext */}
          <div className="text-center text-base mb-6 max-w-2xl">
            Made by people tired of fake networking.<br />
            Real momentum starts here.
          </div>
          {/* Social Icons */}
          <div className="flex gap-6 mb-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#A259D9] text-white text-xl"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#A259D9] text-white text-xl"><svg width="20" height="20" fill="currentColor"><rect width="20" height="20" rx="5" /></svg></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#A259D9] text-white text-xl"><svg width="20" height="20" fill="currentColor"><polygon points="10,2 18,18 2,18" /></svg></a>
          </div>
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 text-sm">
            <div className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#A259D9" strokeWidth="2"><circle cx="9" cy="9" r="8" /><circle cx="9" cy="9" r="2" /></svg> 123 Backstreet NY 25/A, USA</div>
            <div className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#A259D9" strokeWidth="2"><circle cx="9" cy="9" r="8" /><path d="M6 9l2 2 4-4" /></svg> +1 923 394 494</div>
            <div className="flex items-center gap-2"><svg width="18" height="18" fill="none" stroke="#A259D9" strokeWidth="2"><rect x="2" y="4" width="14" height="10" rx="2" /><path d="M2 4l7 5 7-5" /></svg> hello@plug.com</div>
          </div>
        </div>
        <div className="flex justify-between items-center max-w-5xl mx-auto pt-4 border-t border-[#E9D8FD] text-xs text-[#6B4A9C]">
          <div>© Copyright 2024 Plug. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policies</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
