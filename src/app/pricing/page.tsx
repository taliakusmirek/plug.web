import React from 'react';

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-start pt-32 pb-24 px-4" style={{fontFamily:'Inter'}}>
      <h1 className="text-[56px] font-normal text-white text-center mb-4">Pricing</h1>
      <p className="text-[#E6E8F0] text-center max-w-2xl mb-16 text-2xl font-normal">Choose a Plug plan that levels up your network, your way.</p>
      <div className="flex flex-row gap-8 items-stretch justify-center w-full max-w-5xl">
        {/* Starter Plug */}
        <div className="flex flex-col items-center bg-[#181F2B] rounded-[18px] px-8 py-10 w-[300px] shadow relative" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.12)'}}>
          <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#222] text-[#fff] text-xs font-semibold rounded-full px-4 py-1 mb-4" style={{fontFamily:'Inter'}}>FREE</span>
          <div className="text-white font-bold text-2xl mb-2 mt-8 text-center">Starter Plug</div>
          <div className="text-[#E6E8F0] text-base mb-6 text-center">Perfect for students just getting started with networking and looking to explore.</div>
          <ul className="text-[#E6E8F0] text-base flex flex-col gap-2 w-full mb-2">
            <li>✅ Plug Profile (social resume)</li>
            <li>✅ Weekly XP Missions</li>
            <li>✅ Basic Events Feed (curated by city/interests)</li>
            <li>✅ Join Public Collab Rooms</li>
            <li>✅ Access Outreach Templates (limited set)</li>
            <li>✅ XP + Level tracking</li>
          </ul>
        </div>
        {/* Power Mode */}
        <div className="flex flex-col items-center bg-[#181F2B] rounded-[18px] px-8 py-10 w-[300px] shadow relative border-2 border-[#1b7dff]" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.18)'}}>
          <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1b7dff] text-white text-xs font-semibold rounded-full px-4 py-1 mb-4" style={{fontFamily:'Inter'}}>$9/mo</span>
          <div className="text-white font-bold text-2xl mb-2 mt-8 text-center">Power Mode</div>
          <div className="text-[#E6E8F0] text-base mb-6 text-center">For ambitious builders who want exclusive access, better intros, and growth support.</div>
          <ul className="text-[#E6E8F0] text-base flex flex-col gap-2 w-full mb-2">
            <li>🚀 Access to Invite-Only Rooms (Level-gated)</li>
            <li>🛠 Advanced Outreach Templates (e.g., follow-ups, warm intros)</li>
            <li>🧠 Mission Streak Boosts (+XP multipliers)</li>
            <li>📈 Leaderboard eligibility + School Rankings</li>
            <li>📁 Bookmark Opportunities in the Vault</li>
            <li>🧰 Bonus missions with expert tips</li>
            <li>🎓 Fellowship tracker tools (Notion export / deadline pings)</li>
            <li className="mt-2 text-[#1b7dff] font-semibold">Get 17% off: $90/year</li>
          </ul>
        </div>
        {/* Team Mode */}
        <div className="flex flex-col items-center bg-[#181F2B] rounded-[18px] px-8 py-10 w-[300px] shadow relative opacity-70" style={{boxShadow:'0 4px 24px 0 rgba(16,24,32,0.12)'}}>
          <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#444] text-white text-xs font-semibold rounded-full px-4 py-1 mb-4" style={{fontFamily:'Inter'}}>coming soon</span>
          <div className="text-white font-bold text-2xl mb-2 mt-8 text-center">Team Mode</div>
          <div className="text-[#E6E8F0] text-base mb-6 text-center">For startup teams, campus clubs, or accelerators.</div>
          <ul className="text-[#E6E8F0] text-base flex flex-col gap-2 w-full mb-2">
            <li>Bulk onboarding</li>
            <li>Private team rooms</li>
            <li>Admin dashboard to track group XP/streaks</li>
            <li>Pricing TBD (e.g., $49/month for up to 10 members)</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 