import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, DollarSign, Globe, Layers, ArrowRight } from 'lucide-react';
import { TickerData } from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: Record<string, TickerData>;
  onSelectTicker: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
  ];

  const tickerList = Object.values(tickers);

  const filtered = tickerList.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2a2e39] gap-3 bg-[#131722]">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, currency, company (e.g. BTC, NVDA, AAPL)..."
            className="flex-1 bg-transparent border-none text-[#f0f3fa] placeholder-[#50535e] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787b86] hover:text-[#f0f3fa] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-[#787b86] hover:text-[#f0f3fa] bg-[#2a2e39] px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#2a2e39]/60 bg-[#1e222d] overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#2a2e39]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="divide-y divide-[#2a2e39]/40 overflow-y-auto flex-1 max-h-[420px]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#787b86] text-xs">
              No instruments matching &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const isBull = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectTicker(item.symbol);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 sm:px-4 hover:bg-[#2a2e39] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#131722] border border-[#2a2e39] flex items-center justify-center font-bold text-xs text-[#2962ff]">
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f0f3fa] text-xs group-hover:text-[#b6c4ff]">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] text-[#50535e] uppercase">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-[#787b86] line-clamp-1">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono-data">
                    <div className="text-xs font-semibold text-[#f0f3fa]">
                      {item.price > 1000
                        ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                        : item.price.toFixed(item.digits || 2)}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        isBull ? 'text-[#22ab94]' : 'text-[#ff5252]'
                      }`}
                    >
                      {isBull ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
