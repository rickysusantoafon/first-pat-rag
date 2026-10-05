import React, { useState } from 'react';
import { Search, Globe, User, ChevronDown, Sparkles, TrendingUp, BarChart2, ShieldCheck, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  paperBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  paperBalance,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const languages = ['EN', 'ES', 'DE', 'JA', 'FR', 'ZH'];

  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b border-[#2a2e39] bg-[#0c0d10]/95 backdrop-blur px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Monogram Logo & Search & Nav Links */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Monogram Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group focus:outline-none"
          title="TradingView — Where the world does markets"
        >
          <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] text-[#0c0d10] flex items-center justify-center font-black tracking-tighter select-none shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-5 h-5 fill-[#0c0d10]" viewBox="0 0 36 28">
              <path d="M0 0h8.5v28H0V0zm13.7 0H22v28h-8.3V0zM27.4 0H36v28h-8.6V0z" fill="currentColor" />
              <circle cx="27.4" cy="7" fill="#2962FF" r="5" />
            </svg>
          </div>
          <span className="hidden xl:inline text-sm font-bold tracking-tight text-[#f0f3fa]">
            TradingView
          </span>
        </a>

        {/* Quick Command Search Bar */}
        <button
          onClick={onOpenSearch}
          className="flex items-center bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] rounded-full px-3 py-1.5 w-48 sm:w-64 lg:w-72 text-[#787b86] transition-colors cursor-pointer group text-left"
        >
          <Search className="w-4 h-4 text-[#787b86] mr-2 group-hover:text-[#f0f3fa] transition-colors" />
          <span className="text-xs text-[#787b86] group-hover:text-[#f0f3fa] select-none truncate">
            Search (Ctrl+K)
          </span>
          <kbd className="ml-auto font-mono text-[10px] bg-[#2a2e39] text-[#787b86] px-1.5 py-0.5 rounded border border-[#2a2e39]">
            Ctrl+K
          </kbd>
        </button>

        {/* Navigation Dropdown Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Products */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeDropdown === 'products'
                  ? 'bg-[#2a2e39] text-[#f0f3fa]'
                  : 'text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#1e222d]'
              }`}
            >
              Products
              <ChevronDown className="w-3.5 h-3.5 text-[#50535e]" />
            </button>
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e222d] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50 divide-y divide-[#2a2e39]/50">
                <div className="py-1">
                  <a
                    href="#supercharts"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#2a2e39] transition-colors"
                  >
                    <BarChart2 className="w-4 h-4 text-[#2962ff] mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#f0f3fa]">Supercharts</div>
                      <div className="text-[11px] text-[#787b86]">Institutional financial charting</div>
                    </div>
                  </a>
                  <a
                    href="#screener"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#2a2e39] transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-[#089981] mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-[#f0f3fa]">Screeners & Heatmaps</div>
                      <div className="text-[11px] text-[#787b86]">Scan 100,000+ global assets</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Community */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('community')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeDropdown === 'community'
                  ? 'bg-[#2a2e39] text-[#f0f3fa]'
                  : 'text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#1e222d]'
              }`}
            >
              Community
              <ChevronDown className="w-3.5 h-3.5 text-[#50535e]" />
            </button>
            {activeDropdown === 'community' && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-[#1e222d] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                <a
                  href="#ideas"
                  onClick={() => setActiveDropdown(null)}
                  className="block p-2 rounded-lg hover:bg-[#2a2e39] text-xs text-[#f0f3fa]"
                >
                  <div className="font-semibold">Trading Ideas</div>
                  <div className="text-[11px] text-[#787b86]">Top community technical setups</div>
                </a>
                <a
                  href="#scripts"
                  onClick={() => setActiveDropdown(null)}
                  className="block p-2 rounded-lg hover:bg-[#2a2e39] text-xs text-[#f0f3fa]"
                >
                  <div className="font-semibold">Pine Script® Indicators</div>
                  <div className="text-[11px] text-[#787b86]">Custom scripts and algorithms</div>
                </a>
              </div>
            )}
          </div>

          {/* Markets */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('markets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeDropdown === 'markets'
                  ? 'bg-[#2a2e39] text-[#f0f3fa]'
                  : 'text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#1e222d]'
              }`}
            >
              Markets
              <ChevronDown className="w-3.5 h-3.5 text-[#50535e]" />
            </button>
            {activeDropdown === 'markets' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#1e222d] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                <a href="#markets" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-lg hover:bg-[#2a2e39] text-xs text-[#f0f3fa]">
                  Crypto & Bitcoin
                </a>
                <a href="#stocks" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-lg hover:bg-[#2a2e39] text-xs text-[#f0f3fa]">
                  US Equities & Movers
                </a>
                <a href="#markets" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-lg hover:bg-[#2a2e39] text-xs text-[#f0f3fa]">
                  Forex, Gold & Commodities
                </a>
              </div>
            )}
          </div>

          {/* Brokers */}
          <a
            href="#brokers"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#1e222d] transition-colors"
          >
            Brokers
          </a>

          {/* More */}
          <a
            href="#footer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#1e222d] transition-colors flex items-center gap-1"
          >
            More
            <ChevronDown className="w-3.5 h-3.5 text-[#50535e]" />
          </a>
        </nav>
      </div>

      {/* Right: Language, Profile, CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Paper balance badge (subtle trader identity) */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-[#1e222d] border border-[#2a2e39] rounded-full text-[11px] font-mono-data text-[#787b86]">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>Paper:</span>
          <span className="text-[#f0f3fa] font-semibold">
            ${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu((prev) => !prev)}
            className="flex items-center gap-1 text-[#787b86] hover:text-[#f0f3fa] px-2.5 py-1.5 rounded-lg hover:bg-[#1e222d] transition-colors text-xs font-medium"
            title="Change language"
          >
            <Globe className="w-4 h-4 text-[#787b86]" />
            <span>{currentLang}</span>
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-28 bg-[#1e222d] border border-[#2a2e39] rounded-xl shadow-xl py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#2a2e39] transition-colors ${
                    currentLang === lang ? 'text-[#2962ff] font-bold' : 'text-[#f0f3fa]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Account Button */}
        <button
          onClick={onOpenGetStarted}
          aria-label="User Account"
          className="p-2 text-[#787b86] hover:text-[#f0f3fa] rounded-full hover:bg-[#1e222d] transition-colors"
          title="Account / Sign In"
        >
          <User className="w-4 h-4" />
        </button>

        {/* Get Started CTA */}
        <button
          onClick={onOpenGetStarted}
          className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:brightness-110 rounded-full active:scale-[0.98] transition-all shadow-sm whitespace-nowrap cursor-pointer"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
