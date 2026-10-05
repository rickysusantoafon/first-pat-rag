import React, { useState } from 'react';
import { MARKET_CATEGORIES, TickerData } from '../data/marketData';

interface MarketBarProps {
  tickers: Record<string, TickerData>;
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  onOpenSearch: () => void;
}

export const MarketBar: React.FC<MarketBarProps> = ({
  tickers,
  selectedSymbol,
  onSelectSymbol,
  onOpenSearch,
}) => {
  const [activeCategory, setActiveCategory] = useState('indices');

  const currentCategory =
    MARKET_CATEGORIES.find((cat) => cat.id === activeCategory) || MARKET_CATEGORIES[0];
  const activeTickerKeys = currentCategory.tickerKeys;

  // Render mini SVG sparkline
  const renderSparkline = (points: number[], isBull: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 22;

    const pathData = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isBull ? '#22ab94' : '#f23645';

    return (
      <svg className="w-full h-5 mt-2 fill-none" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <section id="markets" className="border-y border-[#2a2e39] bg-[#131722]/80 backdrop-blur">
      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-3 pb-2 flex items-center justify-between overflow-x-auto no-scrollbar border-b border-[#2a2e39]/50">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {MARKET_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2a2e39] text-[#f0f3fa]'
                    : 'text-[#787b86] hover:text-[#f0f3fa]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={onOpenSearch}
          className="text-xs text-[#b6c4ff] hover:underline whitespace-nowrap pl-4 cursor-pointer"
        >
          See all markets →
        </button>
      </div>

      {/* Ticker Cards Grid / Carousel */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {activeTickerKeys.map((key) => {
          const item = tickers[key];
          if (!item) return null;
          const isBull = item.changePercent >= 0;
          const isSelected = selectedSymbol === item.symbol;

          // Format price nicely
          const formattedPrice =
            item.price > 1000
              ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : item.price.toFixed(item.digits || 2);

          const prefix = item.symbol.includes('USD') || item.category === 'stocks' ? '$' : '';

          return (
            <div
              key={item.symbol}
              onClick={() => onSelectSymbol(item.symbol)}
              className={`p-3 rounded-lg border transition-all cursor-pointer select-none group ${
                isSelected
                  ? 'bg-[#2a2e39] border-[#2962ff] shadow-md ring-1 ring-[#2962ff]/40'
                  : 'bg-[#1e222d] border-[#2a2e39] hover:border-[#434651] hover:bg-[#262a35]'
              }`}
            >
              <div className="flex justify-between items-start gap-1">
                <div className="truncate">
                  <div className="font-bold text-[#f0f3fa] text-xs truncate group-hover:text-[#b6c4ff] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#50535e] font-mono-data uppercase">
                    {item.symbol}
                  </div>
                </div>
                <span
                  className={`font-mono-data text-[11px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap ${
                    isBull
                      ? 'text-[#22ab94] bg-[#089981]/15'
                      : 'text-[#ff5252] bg-[#f23645]/15'
                  }`}
                >
                  {isBull ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between font-mono-data">
                <div className="text-sm font-semibold text-[#f0f3fa] tracking-tight">
                  {prefix}
                  {formattedPrice}
                </div>
              </div>

              {/* Sparkline mini chart */}
              {renderSparkline(item.sparkline, isBull)}
            </div>
          );
        })}
      </div>
    </section>
  );
};
