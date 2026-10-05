import React from 'react';
import { X, ExternalLink, Rocket } from 'lucide-react';
import { SPACE_STORY_DATA } from '../data/marketData';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#787b86] hover:text-[#f0f3fa] p-1 rounded-lg z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-48 bg-gradient-to-b from-[#0a0e19] to-[#1e222d] flex items-center justify-center overflow-hidden border-b border-[#2a2e39]">
          <div className="absolute inset-0 bg-[#2962ff]/10 blur-3xl pointer-events-none" />
          <img
            src={SPACE_STORY_DATA.avatarUrl}
            alt="Astronaut Scott Kidd Poteet"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#2962ff] shadow-2xl relative z-10"
          />
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2962ff]/10 text-[#b6c4ff] text-[11px] font-semibold mb-2">
              <Rocket className="w-3.5 h-3.5 text-[#2962ff]" />
              <span>Polaris Dawn Mission</span>
            </div>
            <h3 className="text-lg font-bold text-[#f0f3fa]">
              TradingView in Orbit: {SPACE_STORY_DATA.astronaut}
            </h3>
          </div>

          <blockquote className="italic text-[#f0f3fa] bg-[#131722] p-4 rounded-xl border border-[#2a2e39] text-center leading-relaxed">
            &ldquo;{SPACE_STORY_DATA.quote}&rdquo;
          </blockquote>

          <p className="text-[#787b86] leading-relaxed">
            {SPACE_STORY_DATA.story}
          </p>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#2962ff] hover:bg-[#2962ff]/90 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Back to Supercharts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
