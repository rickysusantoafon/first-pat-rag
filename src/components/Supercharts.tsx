import React, { useState, useRef, useMemo } from 'react';
import {
  Zap,
  ChevronDown,
  BarChart2,
  TrendingUp,
  Activity,
  Maximize2,
  Settings,
  MoreHorizontal,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  PenTool,
  Move,
  Type,
  Sliders,
  Minus,
} from 'lucide-react';
import { TickerData, Candle } from '../data/marketData';

interface SuperchartsProps {
  currentTicker: TickerData;
  allTickers: Record<string, TickerData>;
  onSelectTicker: (symbol: string) => void;
  onOpenOrder: (side: 'buy' | 'sell', price: number) => void;
  onOpenSearch: () => void;
}

type Timeframe = '1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W';
type ChartType = 'candles' | 'line' | 'area';
type DrawingTool = 'crosshair' | 'trendline' | 'horizontal' | 'brush' | 'text' | 'fibonacci';

export const Supercharts: React.FC<SuperchartsProps> = ({
  currentTicker,
  allTickers,
  onSelectTicker,
  onOpenOrder,
  onOpenSearch,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1H');
  const [chartType, setChartType] = useState<ChartType>('candles');
  const [activeTool, setActiveTool] = useState<DrawingTool>('crosshair');
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [showIndicatorsModal, setShowIndicatorsModal] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState({
    ema20: true,
    ema50: true,
    volume: true,
    rsi: false,
    bollinger: false,
  });

  // Custom user drawings placed on chart
  const [drawings, setDrawings] = useState<
    Array<{ type: string; x1: number; y1: number; x2?: number; y2?: number; text?: string }>
  >([
    { type: 'trendline', x1: 60, y1: 220, x2: 720, y2: 90 },
    { type: 'trendline', x1: 80, y1: 170, x2: 720, y2: 60 },
  ]);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Candlestick calculation & geometry
  const candles = currentTicker.candles;
  const candleCount = candles.length;

  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    candles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    });
    // Add 4% padding to top and bottom
    const pad = (max - min) * 0.08 || 1;
    return {
      minPrice: min - pad,
      maxPrice: max + pad,
      priceRange: max - min + pad * 2,
    };
  }, [candles]);

  const chartWidth = 760;
  const chartHeight = 320;
  const volumeHeight = 70;

  // Calculate coordinates for candles
  const candleSpacing = chartWidth / (candleCount + 1);

  const getPriceY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  // EMA Line calculation (Simple Exponential Moving Average curve)
  const ema20Path = useMemo(() => {
    const points: string[] = [];
    let prev = candles[0].close;
    const k = 2 / (14 + 1);

    candles.forEach((c, i) => {
      prev = c.close * k + prev * (1 - k);
      const x = (i + 1) * candleSpacing;
      const y = getPriceY(prev);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });
    return points.join(' ');
  }, [candles, candleSpacing, minPrice, priceRange]);

  const ema50Path = useMemo(() => {
    const points: string[] = [];
    let prev = candles[0].close * 0.995;
    const k = 2 / (28 + 1);

    candles.forEach((c, i) => {
      prev = c.close * k + prev * (1 - k);
      const x = (i + 1) * candleSpacing;
      const y = getPriceY(prev);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });
    return points.join(' ');
  }, [candles, candleSpacing, minPrice, priceRange]);

  // Area / Line Path
  const linePath = useMemo(() => {
    const points: string[] = [];
    candles.forEach((c, i) => {
      const x = (i + 1) * candleSpacing;
      const y = getPriceY(c.close);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });
    return points.join(' ');
  }, [candles, candleSpacing, minPrice, priceRange]);

  // Max volume for scaling
  const maxVolume = useMemo(() => {
    return Math.max(...candles.map((c) => c.volume), 1);
  }, [candles]);

  // Handle Chart Click for interactive drawings
  const handleChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'crosshair') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * chartWidth;
    const y = ((e.clientY - rect.top) / rect.height) * chartHeight;

    if (activeTool === 'horizontal') {
      setDrawings((prev) => [...prev, { type: 'horizontal', x1: 0, y1: y, x2: chartWidth, y2: y }]);
    } else if (activeTool === 'trendline') {
      setDrawings((prev) => [
        ...prev,
        { type: 'trendline', x1: Math.max(0, x - 120), y1: y + 30, x2: x + 80, y2: y - 25 },
      ]);
    } else if (activeTool === 'text') {
      const label = prompt('Enter chart note / price target:', 'Breakout target');
      if (label) {
        setDrawings((prev) => [...prev, { type: 'text', x1: x, y1: y, text: label }]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setMousePos({ x: relX, y: relY });

    // Find closest candle based on X
    const svgRelX = (relX / rect.width) * chartWidth;
    const index = Math.round(svgRelX / candleSpacing) - 1;
    if (index >= 0 && index < candles.length) {
      setHoveredCandle(candles[index]);
    } else {
      setHoveredCandle(null);
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredCandle(null);
  };

  // Active or hovered values for header OHLC
  const displayCandle = hoveredCandle || candles[candles.length - 1];
  const isCandleBull = displayCandle.close >= displayCandle.open;
  const candleDelta = displayCandle.close - displayCandle.open;
  const candleDeltaPercent = ((candleDelta / displayCandle.open) * 100).toFixed(2);

  // Quick Watchlist list
  const watchlistKeys = ['BTCUSD', 'NVDA', 'AAPL', 'TSLA', 'XAUUSD', 'MSTR'];

  return (
    <section id="supercharts" className="py-12 md:py-16 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2962ff]/10 border border-[#2962ff]/20 text-[#b6c4ff] text-[11px] font-semibold mb-3">
          <Zap className="w-3.5 h-3.5 text-[#2962ff]" />
          <span>Supercharged</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f3fa] tracking-tight">
          Supercharts
        </h2>
        <p className="mt-2 text-[#787b86] text-xs sm:text-sm">
          Explore all features for every level of analysis. Seamless execution with institutional chart ergonomics.
        </p>
      </div>

      {/* Terminal Workstation Container */}
      <div className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl overflow-hidden shadow-2xl flex flex-col ring-1 ring-[#2a2e39]/50">
        {/* Workstation Top Bar */}
        <div className="h-11 bg-[#1e222d] border-b border-[#2a2e39] px-3 flex items-center justify-between text-xs gap-2 overflow-x-auto no-scrollbar">
          {/* Left Controls: Symbol, Timeframes, Chart Type, Indicators */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Symbol Switcher Pill */}
            <div
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-[#2a2e39] hover:bg-[#363a45] px-2.5 py-1 rounded border border-[#2a2e39] cursor-pointer font-bold text-[#f0f3fa] transition-colors group"
              title="Click to search symbol (Ctrl+K)"
            >
              <span>{currentTicker.symbol}</span>
              <span className="text-[#787b86] text-[10px] font-normal uppercase">
                {currentTicker.exchange}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#787b86] group-hover:text-[#f0f3fa]" />
            </div>

            {/* Timeframe Buttons */}
            <div className="flex items-center gap-0.5 text-[#787b86] font-mono-data text-[11px]">
              {(['1m', '5m', '15m', '1H', '4H', '1D', '1W'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded transition-colors ${
                    timeframe === tf
                      ? 'bg-[#2a2e39] text-[#2962ff] font-bold'
                      : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-[#2a2e39] hidden sm:block" />

            {/* Chart Style Toggle */}
            <div className="flex items-center gap-1 text-[#787b86]">
              <button
                onClick={() => setChartType('candles')}
                className={`p-1 rounded transition-colors ${
                  chartType === 'candles' ? 'bg-[#2a2e39] text-[#f0f3fa]' : 'hover:bg-[#2a2e39]'
                }`}
                title="Candlesticks"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-1 rounded transition-colors ${
                  chartType === 'line' ? 'bg-[#2a2e39] text-[#f0f3fa]' : 'hover:bg-[#2a2e39]'
                }`}
                title="Line chart"
              >
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>

            <div className="h-4 w-px bg-[#2a2e39] hidden md:block" />

            {/* Indicators Button */}
            <div className="relative">
              <button
                onClick={() => setShowIndicatorsModal((prev) => !prev)}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  showIndicatorsModal
                    ? 'bg-[#2a2e39] text-[#2962ff]'
                    : 'text-[#787b86] hover:text-[#f0f3fa] hover:bg-[#2a2e39]'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-[#2962ff]" />
                <span className="font-semibold text-[11px]">Indicators</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#089981]"></span>
              </button>

              {/* Indicators Dropdown */}
              {showIndicatorsModal && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1e222d] border border-[#2a2e39] rounded-xl shadow-2xl p-2.5 z-50 divide-y divide-[#2a2e39]/50">
                  <div className="pb-2">
                    <div className="text-[11px] font-bold text-[#787b86] uppercase mb-1.5">
                      Technical Overlays
                    </div>
                    <label className="flex items-center justify-between py-1 text-xs text-[#f0f3fa] cursor-pointer hover:bg-[#2a2e39]/60 px-1.5 rounded">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2962ff]" />
                        EMA 20 Trend
                      </span>
                      <input
                        type="checkbox"
                        checked={activeIndicators.ema20}
                        onChange={(e) =>
                          setActiveIndicators((prev) => ({ ...prev, ema20: e.target.checked }))
                        }
                        className="rounded border-[#434651] bg-[#131722] text-[#2962ff] focus:ring-0"
                      />
                    </label>
                    <label className="flex items-center justify-between py-1 text-xs text-[#f0f3fa] cursor-pointer hover:bg-[#2a2e39]/60 px-1.5 rounded">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#9c27b0]" />
                        EMA 50 Major
                      </span>
                      <input
                        type="checkbox"
                        checked={activeIndicators.ema50}
                        onChange={(e) =>
                          setActiveIndicators((prev) => ({ ...prev, ema50: e.target.checked }))
                        }
                        className="rounded border-[#434651] bg-[#131722] text-[#2962ff] focus:ring-0"
                      />
                    </label>
                  </div>
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-[#787b86] uppercase mb-1.5">
                      Volume & Oscillators
                    </div>
                    <label className="flex items-center justify-between py-1 text-xs text-[#f0f3fa] cursor-pointer hover:bg-[#2a2e39]/60 px-1.5 rounded">
                      <span>Volume Histogram</span>
                      <input
                        type="checkbox"
                        checked={activeIndicators.volume}
                        onChange={(e) =>
                          setActiveIndicators((prev) => ({ ...prev, volume: e.target.checked }))
                        }
                        className="rounded border-[#434651] bg-[#131722] text-[#2962ff] focus:ring-0"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Controls: Live Quote, Quick Buy & Sell Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1 font-mono-data text-[12px]">
              <span className="text-[#22ab94] font-bold">
                {currentTicker.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: currentTicker.digits || 2,
                })}
              </span>
              <span className="text-[#50535e] text-[10px]">USD</span>
            </div>

            {/* Quick Buy Button */}
            <button
              onClick={() => onOpenOrder('buy', currentTicker.price)}
              className="px-3 py-1 bg-[#089981] hover:brightness-110 active:scale-95 text-white font-semibold rounded text-xs transition-all whitespace-nowrap cursor-pointer shadow-sm"
              title="Execute Market Buy Order"
            >
              Buy{' '}
              {currentTicker.price > 1000
                ? Math.round(currentTicker.price).toLocaleString()
                : currentTicker.price.toFixed(1)}
            </button>

            {/* Quick Sell Button */}
            <button
              onClick={() => onOpenOrder('sell', currentTicker.price - 2)}
              className="px-3 py-1 bg-[#f23645] hover:brightness-110 active:scale-95 text-white font-semibold rounded text-xs transition-all whitespace-nowrap cursor-pointer shadow-sm"
              title="Execute Market Sell Order"
            >
              Sell{' '}
              {currentTicker.price > 1000
                ? Math.round(currentTicker.price - 2).toLocaleString()
                : (currentTicker.price - 0.2).toFixed(1)}
            </button>
          </div>
        </div>

        {/* Main Workstation Body: [Toolbar] [Chart Canvas] [Watchlist] */}
        <div className="grid grid-cols-[38px_1fr] lg:grid-cols-[40px_1fr_240px] h-[500px] bg-[#0c0d10] relative">
          {/* Left Drawing Tools Column */}
          <div className="border-r border-[#2a2e39] bg-[#1e222d] flex flex-col items-center py-2 gap-1.5 text-[#787b86] select-none z-10">
            <button
              onClick={() => setActiveTool('crosshair')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'crosshair'
                  ? 'bg-[#2a2e39] text-[#2962ff]'
                  : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
              }`}
              title="Crosshair mode"
            >
              <Move className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTool('trendline')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'trendline'
                  ? 'bg-[#2a2e39] text-[#2962ff]'
                  : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
              }`}
              title="Trendline (click chart to place)"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTool('horizontal')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'horizontal'
                  ? 'bg-[#2a2e39] text-[#2962ff]'
                  : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
              }`}
              title="Horizontal Support/Resistance Line"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTool('brush')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'brush'
                  ? 'bg-[#2a2e39] text-[#2962ff]'
                  : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
              }`}
              title="Brush Annotations"
            >
              <PenTool className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTool('text')}
              className={`p-1.5 rounded transition-colors ${
                activeTool === 'text'
                  ? 'bg-[#2a2e39] text-[#2962ff]'
                  : 'hover:bg-[#2a2e39] hover:text-[#f0f3fa]'
              }`}
              title="Text Note Marker"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Clear Drawings Button */}
            {drawings.length > 0 && (
              <button
                onClick={() => setDrawings([])}
                className="p-1.5 rounded hover:bg-[#2a2e39] text-[#787b86] hover:text-[#ff5252] transition-colors"
                title="Clear all drawings"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="mt-auto flex flex-col gap-1.5">
              <button
                onClick={() => setDrawings([])}
                className="p-1.5 rounded hover:bg-[#2a2e39] hover:text-[#f0f3fa]"
                title="Reset Chart Layout"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Chart Canvas */}
          <div
            ref={chartContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative chart-grid overflow-hidden flex flex-col justify-between p-3 select-none"
          >
            {/* Top Watermark & OHLC Legend Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono-data z-10 bg-[#0c0d10]/40 backdrop-blur-xs px-2 py-1 rounded w-fit">
              <span className="font-bold text-[#f0f3fa]">
                {currentTicker.symbol}, {timeframe}, {currentTicker.exchange}
              </span>
              <span className="text-[#787b86]">
                O <span className={isCandleBull ? 'text-[#22ab94]' : 'text-[#ff5252]'}>{displayCandle.open}</span>
              </span>
              <span className="text-[#787b86]">
                H <span className={isCandleBull ? 'text-[#22ab94]' : 'text-[#ff5252]'}>{displayCandle.high}</span>
              </span>
              <span className="text-[#787b86]">
                L <span className={isCandleBull ? 'text-[#22ab94]' : 'text-[#ff5252]'}>{displayCandle.low}</span>
              </span>
              <span className="text-[#787b86]">
                C <span className={isCandleBull ? 'text-[#22ab94]' : 'text-[#ff5252]'}>{displayCandle.close}</span>
              </span>
              <span
                className={`font-semibold ${
                  isCandleBull ? 'text-[#22ab94]' : 'text-[#ff5252]'
                }`}
              >
                {isCandleBull ? '+' : ''}
                {candleDelta.toFixed(2)} ({isCandleBull ? '+' : ''}
                {candleDeltaPercent}%)
              </span>
            </div>

            {/* SVG Candlestick & Indicator Layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full px-2"
                preserveAspectRatio="none"
                onClick={handleChartClick}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2962ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Price Grid Lines */}
                <line x1="0" y1="60" x2={chartWidth} y2="60" stroke="#2a2e39" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="130" x2={chartWidth} y2="130" stroke="#2a2e39" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="200" x2={chartWidth} y2="200" stroke="#2a2e39" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="270" x2={chartWidth} y2="270" stroke="#2a2e39" strokeDasharray="4 4" strokeWidth="1" />

                {/* Technical Overlays: EMA 20 */}
                {activeIndicators.ema20 && (
                  <path
                    d={ema20Path}
                    fill="none"
                    stroke="#2962FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                )}

                {/* Technical Overlays: EMA 50 */}
                {activeIndicators.ema50 && (
                  <path
                    d={ema50Path}
                    fill="none"
                    stroke="#9C27B0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                )}

                {/* Line / Area View */}
                {chartType === 'line' && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#22ab94"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}

                {/* Candlesticks Layer */}
                {chartType === 'candles' &&
                  candles.map((candle, idx) => {
                    const x = (idx + 1) * candleSpacing;
                    const isBull = candle.close >= candle.open;
                    const candleColor = isBull ? '#089981' : '#f23645';

                    const highY = getPriceY(candle.high);
                    const lowY = getPriceY(candle.low);
                    const openY = getPriceY(candle.open);
                    const closeY = getPriceY(candle.close);

                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(Math.abs(closeY - openY), 2.5);
                    const bodyWidth = Math.max(candleSpacing * 0.65, 5);

                    return (
                      <g key={idx} className="cursor-pointer">
                        {/* Upper & Lower Wick */}
                        <line
                          x1={x}
                          y1={highY}
                          x2={x}
                          y2={lowY}
                          stroke={candleColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        {/* Candle Body */}
                        <rect
                          x={x - bodyWidth / 2}
                          y={bodyTop}
                          width={bodyWidth}
                          height={bodyHeight}
                          fill={candleColor}
                          rx={0.5}
                        />
                      </g>
                    );
                  })}

                {/* Active Live Price Level Line & Right Badge */}
                {candles.length > 0 && (
                  <g>
                    <line
                      x1="0"
                      y1={getPriceY(currentTicker.price)}
                      x2={chartWidth}
                      y2={getPriceY(currentTicker.price)}
                      stroke="#089981"
                      strokeDasharray="3 3"
                      strokeWidth="1.2"
                      opacity="0.9"
                    />
                    <rect
                      x={chartWidth - 70}
                      y={getPriceY(currentTicker.price) - 10}
                      width="68"
                      height="20"
                      fill="#089981"
                      rx="3"
                    />
                    <text
                      x={chartWidth - 64}
                      y={getPriceY(currentTicker.price) + 4}
                      fill="#ffffff"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {currentTicker.price > 1000
                        ? currentTicker.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
                        : currentTicker.price.toFixed(1)}
                    </text>
                  </g>
                )}

                {/* User Drawings (Trendlines, Horizontal Rays, Markers) */}
                {drawings.map((draw, i) => {
                  if (draw.type === 'trendline' && draw.x2 !== undefined && draw.y2 !== undefined) {
                    return (
                      <line
                        key={i}
                        x1={draw.x1}
                        y1={draw.y1}
                        x2={draw.x2}
                        y2={draw.y2}
                        stroke="#2962FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    );
                  }
                  if (draw.type === 'horizontal') {
                    return (
                      <line
                        key={i}
                        x1={0}
                        y1={draw.y1}
                        x2={chartWidth}
                        y2={draw.y1}
                        stroke="#b6c4ff"
                        strokeDasharray="4 2"
                        strokeWidth="1.5"
                        opacity="0.75"
                      />
                    );
                  }
                  if (draw.type === 'text' && draw.text) {
                    return (
                      <text
                        key={i}
                        x={draw.x1}
                        y={draw.y1}
                        fill="#2962FF"
                        fontSize="11"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        className="bg-[#1e222d] px-1"
                      >
                        {draw.text}
                      </text>
                    );
                  }
                  return null;
                })}
              </svg>
            </div>

            {/* Crosshair Overlay following cursor */}
            {mousePos && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Vertical Hairline */}
                <div
                  className="absolute top-0 bottom-0 border-l border-dashed border-[#787b86]/60"
                  style={{ left: `${mousePos.x}px` }}
                />
                {/* Horizontal Hairline */}
                <div
                  className="absolute left-0 right-0 border-t border-dashed border-[#787b86]/60"
                  style={{ top: `${mousePos.y}px` }}
                />
              </div>
            )}

            {/* Bottom Volume Sub-Panel */}
            {activeIndicators.volume && (
              <div className="h-16 w-full border-t border-[#2a2e39]/60 pt-1 flex items-end gap-1 px-4 z-10 pointer-events-none">
                {candles.map((c, idx) => {
                  const isBull = c.close >= c.open;
                  const barHeight = Math.max(4, Math.round((c.volume / maxVolume) * 48));
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t-xs transition-all ${
                        isBull ? 'bg-[#089981]/50' : 'bg-[#f23645]/50'
                      }`}
                      style={{ height: `${barHeight}px` }}
                      title={`Vol: ${c.volume.toLocaleString()}`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Watchlist Sidebar */}
          <div className="border-l border-[#2a2e39] bg-[#1e222d] hidden lg:flex flex-col text-xs">
            {/* Watchlist Header */}
            <div className="h-8 border-b border-[#2a2e39] px-3 flex items-center justify-between text-[#787b86] font-semibold uppercase tracking-wider bg-[#131722]">
              <span>Watchlist</span>
              <button
                onClick={onOpenSearch}
                className="hover:text-[#f0f3fa] p-1 rounded"
                title="Add symbol"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Watchlist Items */}
            <div className="divide-y divide-[#2a2e39]/50 overflow-y-auto no-scrollbar flex-1">
              {watchlistKeys.map((key) => {
                const item = allTickers[key];
                if (!item) return null;
                const isBull = item.changePercent >= 0;
                const isActive = currentTicker.symbol === item.symbol;

                return (
                  <div
                    key={item.symbol}
                    onClick={() => onSelectTicker(item.symbol)}
                    className={`p-2.5 flex items-center justify-between hover:bg-[#363a45] cursor-pointer transition-colors ${
                      isActive ? 'bg-[#2a2e39] border-l-2 border-[#2962ff]' : ''
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#f0f3fa]">{item.symbol}</div>
                      <div className="text-[10px] text-[#787b86] truncate max-w-[90px]">
                        {item.name}
                      </div>
                    </div>
                    <div className="text-right font-mono-data">
                      <div className="text-[#f0f3fa] font-semibold">
                        {item.price > 1000
                          ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                          : item.price.toFixed(2)}
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
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
