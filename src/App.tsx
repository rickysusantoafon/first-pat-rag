import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketBar } from './components/MarketBar';
import { Supercharts } from './components/Supercharts';
import { CommunityIdeas } from './components/CommunityIdeas';
import { MarketMovers } from './components/MarketMovers';
import { BrokersRibbon } from './components/BrokersRibbon';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { OrderModal } from './components/OrderModal';
import { IdeaModal } from './components/IdeaModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { GetStartedModal } from './components/GetStartedModal';
import { INITIAL_TICKERS, TickerData, CommunityIdea } from './data/marketData';

export default function App() {
  const [tickers, setTickers] = useState<Record<string, TickerData>>(INITIAL_TICKERS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCUSD');
  const [paperBalance, setPaperBalance] = useState<number>(100000.0);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [selectedIdea, setSelectedIdea] = useState<CommunityIdea | null>(null);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live market price ticking engine (simulates realistic exchange pulses)
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => {
        const keys = Object.keys(prev);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const current = prev[randomKey];
        if (!current) return prev;

        const isPositive = Math.random() > 0.48;
        const deltaPct = (Math.random() * 0.003 + 0.0005) * (isPositive ? 1 : -1);
        const newPrice = Number((current.price * (1 + deltaPct)).toFixed(current.digits || 2));
        const newChange = Number((current.change + (newPrice - current.price)).toFixed(current.digits || 2));
        const newChangePercent = Number(
          (((newPrice - (current.price - current.change)) / (current.price - current.change)) * 100).toFixed(2)
        );

        // Update latest candle close & high/low if applicable
        const updatedCandles = [...current.candles];
        if (updatedCandles.length > 0) {
          const lastIndex = updatedCandles.length - 1;
          const lastCandle = { ...updatedCandles[lastIndex] };
          lastCandle.close = newPrice;
          if (newPrice > lastCandle.high) lastCandle.high = newPrice;
          if (newPrice < lastCandle.low) lastCandle.low = newPrice;
          lastCandle.volume += Math.floor(Math.random() * 150 + 20);
          updatedCandles[lastIndex] = lastCandle;
        }

        return {
          ...prev,
          [randomKey]: {
            ...current,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            candles: updatedCandles,
          },
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleSelectSymbol = (symbol: string) => {
    if (tickers[symbol]) {
      setSelectedSymbol(symbol);
      // Smoothly scroll to Supercharts workstation if not already visible
      const chartElem = document.getElementById('supercharts');
      if (chartElem) {
        chartElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleOpenOrder = (side: 'buy' | 'sell', _price: number) => {
    setOrderSide(side);
    setIsOrderOpen(true);
  };

  const handleOrderExecuted = (cost: number, symbol: string, side: 'buy' | 'sell', units: number) => {
    if (side === 'buy') {
      setPaperBalance((prev) => Math.max(0, prev - cost));
      showToast(`Filled Buy order: ${units} ${symbol} for $${cost.toFixed(2)}`);
    } else {
      setPaperBalance((prev) => prev + cost);
      showToast(`Filled Sell order: ${units} ${symbol} for $${cost.toFixed(2)}`);
    }
  };

  const activeTicker = tickers[selectedSymbol] || tickers['BTCUSD'];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f0f3fa] flex flex-col font-sans selection:bg-[#2962ff] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e222d] border border-[#089981] text-[#f0f3fa] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        paperBalance={paperBalance}
      />

      {/* Main Page Flow matching user brief & screenshots */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
        />

        {/* Live Market Summary Strip */}
        <MarketBar
          tickers={tickers}
          selectedSymbol={selectedSymbol}
          onSelectSymbol={handleSelectSymbol}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Supercharts Terminal Workstation */}
        <Supercharts
          currentTicker={activeTicker}
          allTickers={tickers}
          onSelectTicker={handleSelectSymbol}
          onOpenOrder={handleOpenOrder}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Community Ideas Bento Grid */}
        <CommunityIdeas
          onSelectIdea={(idea) => setSelectedIdea(idea)}
          onAnalyzeSymbol={handleSelectSymbol}
        />

        {/* US Stocks — Market Movers Table */}
        <MarketMovers onSelectStock={handleSelectSymbol} />

        {/* Supported Brokers Ribbon */}
        <BrokersRibbon
          onConnectPaperTrading={() => {
            showToast('Connected to Supercharts Paper Trading ($100,000 USD)');
          }}
        />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tickers={tickers}
        onSelectTicker={handleSelectSymbol}
      />

      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        ticker={activeTicker}
        initialSide={orderSide}
        currentBalance={paperBalance}
        onOrderExecuted={handleOrderExecuted}
      />

      <IdeaModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onAnalyzeSymbol={handleSelectSymbol}
      />

      <SpaceStoryModal
        isOpen={isSpaceStoryOpen}
        onClose={() => setIsSpaceStoryOpen(false)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onRegistered={(name) => {
          showToast(`Welcome ${name}! Your free TradingView profile is ready.`);
        }}
      />
    </div>
  );
}
