import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SPACE_STORY_DATA } from '../data/marketData';

interface HeroProps {
  onOpenGetStarted: () => void;
  onOpenSpaceStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGetStarted, onOpenSpaceStory }) => {
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Subtle Background Glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2962ff]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-extrabold tracking-tight text-[#f0f3fa] leading-[1.08]">
          Where the world does markets
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#787b86] max-w-2xl mx-auto font-normal">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* CTA Button Block */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={onOpenGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 md:py-4 bg-[#f0f3fa] text-[#0c0d10] hover:bg-white font-semibold text-base md:text-lg rounded-xl md:rounded-full transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-2xl cursor-pointer"
          >
            <span>Get started for free</span>
          </button>
          <span className="text-xs text-[#50535e] tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>
      </div>

      {/* Floating Space Story Pill Chip */}
      <div className="mt-16 md:mt-20">
        <button
          onClick={onOpenSpaceStory}
          className="inline-flex items-center gap-3 bg-[#1e222d]/90 border border-[#2a2e39] hover:border-[#434651] px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#2a2e39] group cursor-pointer text-left shadow-lg"
        >
          <img
            src={SPACE_STORY_DATA.avatarUrl}
            alt="Astronaut Scott Kidd Poteet"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-[#2a2e39]"
          />
          <div className="text-left">
            <div className="text-xs font-semibold text-[#f0f3fa] flex items-center gap-1 group-hover:text-[#b6c4ff] transition-colors">
              See our space story
              <ChevronRight className="w-3.5 h-3.5 text-[#787b86] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-[#787b86]">
              With astronaut Scott &quot;Kidd&quot; Poteet
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};
