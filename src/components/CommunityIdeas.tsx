import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Star, ArrowRight } from 'lucide-react';
import { COMMUNITY_IDEAS, CommunityIdea } from '../data/marketData';

interface CommunityIdeasProps {
  onSelectIdea: (idea: CommunityIdea) => void;
  onAnalyzeSymbol: (symbol: string) => void;
}

export const CommunityIdeas: React.FC<CommunityIdeasProps> = ({
  onSelectIdea,
  onAnalyzeSymbol,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Editors' picks");
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [hasLikedMap, setHasLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (e: React.MouseEvent, ideaId: string, initialLikes: number) => {
    e.stopPropagation();
    const isLiked = hasLikedMap[ideaId];
    setHasLikedMap((prev) => ({ ...prev, [ideaId]: !isLiked }));
    setLikesMap((prev) => {
      const current = prev[ideaId] !== undefined ? prev[ideaId] : initialLikes;
      return {
        ...prev,
        [ideaId]: isLiked ? current - 1 : current + 1,
      };
    });
  };

  const tabs = ["Editors' picks", 'Popular', 'Streams'];

  return (
    <section id="ideas" className="py-12 md:py-16 px-4 lg:px-6 max-w-7xl mx-auto w-full">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0f3fa] tracking-tight">
            Community ideas
          </h2>
          <p className="text-[#787b86] text-xs sm:text-sm mt-1">
            Market analysis, setups, and forecasts shared by the world&apos;s most active traders.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2962ff] text-white shadow-sm'
                    : 'bg-[#1e222d] hover:bg-[#2a2e39] text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 6 Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMUNITY_IDEAS.map((idea) => {
          const currentLikes =
            likesMap[idea.id] !== undefined ? likesMap[idea.id] : idea.likes;
          const isLiked = !!hasLikedMap[idea.id];

          return (
            <div
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] rounded-xl overflow-hidden transition-all duration-200 flex flex-col group cursor-pointer shadow-sm hover:shadow-xl"
            >
              {/* Card Image Banner */}
              <div className="h-44 bg-[#131722] relative overflow-hidden">
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges on top of chart preview */}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="bg-[#131722]/85 backdrop-blur text-[#f0f3fa] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#2a2e39]">
                    {idea.exchange}:{idea.symbol}
                  </span>

                  {idea.type === 'Short' && (
                    <span className="bg-[#f23645]/20 text-[#ff5252] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#f23645]/30">
                      Short
                    </span>
                  )}
                  {idea.type === 'Long' && (
                    <span className="bg-[#089981]/20 text-[#22ab94] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#089981]/30">
                      Long
                    </span>
                  )}
                  {idea.type === 'Pine Script®' && (
                    <span className="bg-[#4720ca]/30 text-[#baaeff] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#7b61ff]/30">
                      Indicator
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#f0f3fa] group-hover:text-[#b6c4ff] transition-colors line-clamp-1">
                    {idea.title}
                  </h3>
                  <p className="text-[#787b86] text-xs line-clamp-3 mt-2 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                {/* Author & Stats Footer */}
                <div className="pt-4 mt-4 border-t border-[#2a2e39]/60 flex items-center justify-between text-xs text-[#50535e]">
                  <span className="text-[#787b86] hover:text-[#f0f3fa] font-medium transition-colors">
                    by {idea.author}
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Upvote button */}
                    <button
                      onClick={(e) => handleLike(e, idea.id, idea.likes)}
                      className={`flex items-center gap-1 transition-colors ${
                        isLiked ? 'text-[#2962ff] font-bold' : 'text-[#787b86] hover:text-[#f0f3fa]'
                      }`}
                      title="Like this idea"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#2962ff]' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>

                    {/* Comment count or rating */}
                    {idea.rating ? (
                      <span className="flex items-center gap-1 text-[#22ab94]">
                        <Star className="w-3.5 h-3.5 fill-[#22ab94]" />
                        <span>{idea.rating}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#787b86]">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{idea.comments}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Link */}
      <div className="mt-8 text-center">
        <a
          href="#ideas"
          className="inline-flex items-center gap-1 text-[#b6c4ff] hover:underline font-semibold text-xs sm:text-sm"
        >
          <span>See all editors&apos; picks ideas</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
