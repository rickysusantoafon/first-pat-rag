import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Share2, BarChart2, Star } from 'lucide-react';
import { CommunityIdea } from '../data/marketData';

interface IdeaModalProps {
  idea: CommunityIdea | null;
  onClose: () => void;
  onAnalyzeSymbol: (symbol: string) => void;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
  idea,
  onClose,
  onAnalyzeSymbol,
}) => {
  const [likes, setLikes] = useState<number>(idea ? idea.likes : 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<string[]>([
    'Clean multi-timeframe structural confluence here. Watching the 4H close closely!',
    'Great risk to reward ratio setup. Stop loss placement is very disciplined.',
  ]);

  if (!idea) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, commentText.trim()]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Top Header */}
        <div className="h-12 bg-[#131722] border-b border-[#2a2e39] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#2a2e39] text-[#f0f3fa] px-2 py-0.5 rounded font-mono-data">
              {idea.exchange}:{idea.symbol}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-semibold ${
                idea.type === 'Long'
                  ? 'bg-[#089981]/20 text-[#22ab94]'
                  : idea.type === 'Short'
                  ? 'bg-[#f23645]/20 text-[#ff5252]'
                  : 'bg-[#4720ca]/30 text-[#baaeff]'
              }`}
            >
              {idea.type}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onAnalyzeSymbol(idea.symbol);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#2962ff] hover:bg-[#2962ff]/90 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Chart in Supercharts</span>
            </button>
            <button
              onClick={onClose}
              className="text-[#787b86] hover:text-[#f0f3fa] p-1.5 rounded-lg hover:bg-[#2a2e39]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
          {/* Main Chart Image Preview */}
          <div className="rounded-xl overflow-hidden border border-[#2a2e39] bg-[#131722] shadow-inner">
            <img
              src={idea.imageUrl}
              alt={idea.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[380px] object-contain mx-auto"
            />
          </div>

          {/* Title & Meta */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#f0f3fa] leading-snug">
              {idea.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#787b86] mt-2">
              <span className="text-[#f0f3fa] font-medium">by {idea.author}</span>
              <span>·</span>
              <span>Published {idea.timeAgo}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#22ab94]">
                <Star className="w-3 h-3 fill-[#22ab94]" /> Verified Trader
              </span>
            </div>
          </div>

          {/* Detailed Analysis Content */}
          <div className="text-xs sm:text-sm text-[#787b86] leading-relaxed space-y-3 bg-[#131722] p-4 rounded-xl border border-[#2a2e39]">
            <p>{idea.description}</p>
            {idea.analysisText && <p>{idea.analysisText}</p>}
          </div>

          {/* Like / Share Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2a2e39]/60">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-[#2962ff] text-white'
                    : 'bg-[#2a2e39] text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-white' : ''}`} />
                <span>{likes} Helpful</span>
              </button>
              <span className="text-xs text-[#787b86] flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{comments.length} Comments</span>
              </span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Idea link copied to clipboard!');
              }}
              className="text-[#787b86] hover:text-[#f0f3fa] p-1.5 rounded hover:bg-[#2a2e39]"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Comments Discussion Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#f0f3fa] uppercase tracking-wider">
              Discussion ({comments.length})
            </h3>

            <div className="space-y-2">
              {comments.map((cmt, idx) => (
                <div
                  key={idx}
                  className="bg-[#131722] p-3 rounded-lg border border-[#2a2e39]/60 text-xs"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#f0f3fa]">Trader #{idx + 104}</span>
                    <span className="text-[10px] text-[#50535e]">Community Member</span>
                  </div>
                  <p className="text-[#787b86]">{cmt}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your perspective or ask a question..."
                className="flex-1 bg-[#131722] border border-[#2a2e39] rounded-xl px-3 py-2 text-xs text-[#f0f3fa] placeholder-[#50535e] focus:border-[#2962ff] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2a2e39] hover:bg-[#363a45] text-[#f0f3fa] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
