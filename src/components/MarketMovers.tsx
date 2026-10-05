import React, { useState } from 'react';
import { MARKET_MOVERS } from '../data/marketData';
import { ArrowUpDown } from 'lucide-react';

interface MarketMoversProps {
  onSelectStock: (symbol: string) => void;
}

type SortField = 'symbol' | 'price' | 'changePercent' | 'volume' | 'marketCap';

export const MarketMovers: React.FC<MarketMoversProps> = ({ onSelectStock }) => {
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedList = [...MARKET_MOVERS].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'symbol') {
      comparison = a.symbol.localeCompare(b.symbol);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'changePercent') {
      comparison = a.changePercent - b.changePercent;
    } else if (sortField === 'volume') {
      const getVal = (v: string) => parseFloat(v) * (v.includes('M') ? 1e6 : 1e9);
      comparison = getVal(a.volume) - getVal(b.volume);
    } else if (sortField === 'marketCap') {
      const getVal = (v: string) => parseFloat(v) * (v.includes('T') ? 1e12 : 1e9);
      comparison = getVal(a.marketCap) - getVal(b.marketCap);
    }
    return sortAsc ? comparison : -comparison;
  });

  return (
    <section id="stocks" className="py-12 px-4 lg:px-6 max-w-7xl mx-auto w-full border-t border-[#2a2e39]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f0f3fa] tracking-tight">
            US stocks — Market movers
          </h2>
          <p className="text-[#787b86] text-xs sm:text-sm">
            Highest volume and most actively traded equities right now.
          </p>
        </div>
        <button
          onClick={() => {}}
          className="text-xs text-[#b6c4ff] hover:underline cursor-pointer"
        >
          See all most actively traded stocks →
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="h-9 bg-[#131722] border-b border-[#2a2e39] text-[#787b86] font-semibold uppercase tracking-wider select-none text-[11px]">
              <th
                onClick={() => handleSort('symbol')}
                className="py-2 px-4 cursor-pointer hover:text-[#f0f3fa]"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol</span>
                  <ArrowUpDown className="w-3 h-3 text-[#50535e]" />
                </div>
              </th>
              <th className="py-2 px-4 font-semibold">Name</th>
              <th
                onClick={() => handleSort('price')}
                className="py-2 px-4 text-right cursor-pointer hover:text-[#f0f3fa]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Price (USD)</span>
                  <ArrowUpDown className="w-3 h-3 text-[#50535e]" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="py-2 px-4 text-right cursor-pointer hover:text-[#f0f3fa]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Change %</span>
                  <ArrowUpDown className="w-3 h-3 text-[#50535e]" />
                </div>
              </th>
              <th
                onClick={() => handleSort('volume')}
                className="py-2 px-4 text-right cursor-pointer hover:text-[#f0f3fa]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3 text-[#50535e]" />
                </div>
              </th>
              <th
                onClick={() => handleSort('marketCap')}
                className="py-2 px-4 text-right cursor-pointer hover:text-[#f0f3fa]"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Market Cap</span>
                  <ArrowUpDown className="w-3 h-3 text-[#50535e]" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2e39] font-mono-data">
            {sortedList.map((stock) => {
              const isBull = stock.changePercent >= 0;

              return (
                <tr
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock.symbol)}
                  className="hover:bg-[#363a45]/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-[#f0f3fa] flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#2a2e39] flex items-center justify-center text-[10px] text-[#2962ff] font-bold group-hover:bg-[#2962ff] group-hover:text-white transition-colors">
                      {stock.avatar}
                    </span>
                    <span className="group-hover:text-[#b6c4ff] transition-colors">{stock.symbol}</span>
                  </td>
                  <td className="py-3 px-4 font-sans text-xs text-[#787b86] group-hover:text-[#f0f3fa] transition-colors">
                    {stock.name}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-[#f0f3fa]">
                    {stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-semibold ${
                      isBull ? 'text-[#22ab94]' : 'text-[#ff5252]'
                    }`}
                  >
                    {isBull ? '+' : ''}
                    {stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right text-[#787b86]">{stock.volume}</td>
                  <td className="py-3 px-4 text-right text-[#787b86]">{stock.marketCap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
