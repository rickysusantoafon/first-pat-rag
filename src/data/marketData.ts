export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerData {
  symbol: string;
  name: string;
  exchange: string;
  category: 'crypto' | 'stocks' | 'forex' | 'indices' | 'futures' | 'bonds';
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  volume: string;
  marketCap?: string;
  currency: string;
  digits: number;
  candles: Candle[];
}

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  symbol: string;
  exchange: string;
  type: 'Long' | 'Short' | 'Pine Script®' | 'Neutral';
  author: string;
  likes: number;
  comments: number;
  rating?: number;
  imageUrl: string;
  timeAgo: string;
  category: "Editors' picks" | "Popular" | "Streams";
  analysisText?: string;
}

export interface BrokerInfo {
  name: string;
  rating: number;
  assetClass: string;
  status: 'Verified' | 'Partner' | 'Integrated';
  minDeposit: string;
  spread: string;
}

// Sparkline generator helper
export function generateCandles(basePrice: number, volatility = 0.015, count = 28): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice * 0.94;
  const now = Date.now();
  const stepMs = 3600 * 1000; // 1 hour steps

  for (let i = 0; i < count; i++) {
    const isBull = Math.random() > 0.42;
    const delta = currentPrice * volatility * (Math.random() * 1.5);
    const open = currentPrice;
    const close = isBull ? open + delta : open - delta;
    const high = Math.max(open, close) + currentPrice * (volatility * 0.4 * Math.random());
    const low = Math.min(open, close) - currentPrice * (volatility * 0.4 * Math.random());
    const volume = Math.floor(Math.random() * 45000 + 8000);
    const time = new Date(now - (count - i) * stepMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    candles.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    currentPrice = close;
  }
  return candles;
}

// Initial Tickers Database matching reference screenshot and user data
export const INITIAL_TICKERS: Record<string, TickerData> = {
  BTCUSD: {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    exchange: 'BITSTAMP',
    category: 'crypto',
    price: 84920.0,
    change: 1542.0,
    changePercent: 1.85,
    sparkline: [82400, 82900, 83100, 82700, 83600, 84200, 83900, 84500, 84920],
    volume: '34.2B',
    marketCap: '1.67T',
    currency: 'USD',
    digits: 2,
    candles: [
      { time: '09:00', open: 83450, high: 83900, low: 83200, close: 83800, volume: 18200 },
      { time: '10:00', open: 83800, high: 84150, low: 83650, close: 84050, volume: 19400 },
      { time: '11:00', open: 84050, high: 84300, low: 83900, close: 83950, volume: 14200 },
      { time: '12:00', open: 83950, high: 84400, low: 83850, close: 84350, volume: 22100 },
      { time: '13:00', open: 84350, high: 84600, low: 84200, close: 84550, volume: 16800 },
      { time: '14:00', open: 84550, high: 84700, low: 84300, close: 84400, volume: 12500 },
      { time: '15:00', open: 84400, high: 84900, low: 84250, close: 84780, volume: 28900 },
      { time: '16:00', open: 84780, high: 85200, low: 84600, close: 85050, volume: 34100 },
      { time: '17:00', open: 85050, high: 85150, low: 84700, close: 84850, volume: 17400 },
      { time: '18:00', open: 84850, high: 85000, low: 84500, close: 84650, volume: 15300 },
      { time: '19:00', open: 84650, high: 84950, low: 84550, close: 84900, volume: 21000 },
      { time: '20:00', open: 84900, high: 85240, low: 84720, close: 85150, volume: 38400 },
      { time: '21:00', open: 85150, high: 85300, low: 84800, close: 84920, volume: 26500 },
    ],
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 233.95,
    change: 7.74,
    changePercent: 3.42,
    sparkline: [224, 226, 225, 228, 230, 229, 232, 233.95],
    volume: '62.8M',
    marketCap: '3.41T',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(233.95, 0.012, 14),
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 228.45,
    change: 2.0,
    changePercent: 0.88,
    sparkline: [225, 226, 225.8, 227, 227.4, 228, 228.45],
    volume: '44.1M',
    marketCap: '3.48T',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(228.45, 0.009, 14),
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 248.1,
    change: -3.12,
    changePercent: -1.24,
    sparkline: [254, 252, 253, 250, 249, 251, 248.1],
    volume: '48.2M',
    marketCap: '792.4B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(248.1, 0.018, 14),
  },
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Gold Spot',
    exchange: 'OANDA',
    category: 'forex',
    price: 2658.4,
    change: -8.55,
    changePercent: -0.32,
    sparkline: [2668, 2665, 2667, 2662, 2660, 2657, 2658.4],
    volume: '112K',
    marketCap: '17.2T',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(2658.4, 0.004, 14),
  },
  MSTR: {
    symbol: 'MSTR',
    name: 'MicroStrategy Inc',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 214.5,
    change: 11.58,
    changePercent: 5.71,
    sparkline: [198, 202, 201, 206, 210, 208, 214.5],
    volume: '31.4M',
    marketCap: '42.8B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(214.5, 0.025, 14),
  },
  SPX: {
    symbol: 'SPX',
    name: 'S&P 500',
    exchange: 'CBOE',
    category: 'indices',
    price: 5864.67,
    change: 23.95,
    changePercent: 0.41,
    sparkline: [5830, 5842, 5839, 5851, 5858, 5864.67],
    volume: '3.8B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(5864.67, 0.005, 14),
  },
  NDX: {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    exchange: 'NASDAQ',
    category: 'indices',
    price: 20439.12,
    change: 128.02,
    changePercent: 0.63,
    sparkline: [20280, 20310, 20350, 20390, 20439.12],
    volume: '5.2B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(20439.12, 0.007, 14),
  },
  ETHUSD: {
    symbol: 'ETHUSD',
    name: 'Ethereum',
    exchange: 'BITSTAMP',
    category: 'crypto',
    price: 2640.5,
    change: 54.3,
    changePercent: 2.1,
    sparkline: [2570, 2595, 2580, 2610, 2630, 2640.5],
    volume: '16.8B',
    marketCap: '318.2B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(2640.5, 0.016, 14),
  },
  GC1: {
    symbol: 'GC1!',
    name: 'Gold Futures',
    exchange: 'COMEX',
    category: 'futures',
    price: 2658.4,
    change: -8.55,
    changePercent: -0.32,
    sparkline: [2670, 2668, 2664, 2662, 2658.4],
    volume: '240K',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(2658.4, 0.004, 14),
  },
  CL1: {
    symbol: 'CL1!',
    name: 'Crude oil',
    exchange: 'NYMEX',
    category: 'futures',
    price: 70.82,
    change: 0.81,
    changePercent: 1.15,
    sparkline: [69.4, 69.8, 70.1, 70.4, 70.82],
    volume: '680K',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(70.82, 0.012, 14),
  },
  AMD: {
    symbol: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 156.24,
    change: 2.97,
    changePercent: 1.94,
    sparkline: [151, 153, 152, 155, 154, 156.24],
    volume: '27.6M',
    marketCap: '253.1B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(156.24, 0.015, 14),
  },
  MU: {
    symbol: 'MU',
    name: 'Micron Technology, Inc.',
    exchange: 'NASDAQ',
    category: 'stocks',
    price: 102.8,
    change: -0.75,
    changePercent: -0.72,
    sparkline: [104, 103.5, 103.8, 102.5, 102.8],
    volume: '18.9M',
    marketCap: '114.7B',
    currency: 'USD',
    digits: 2,
    candles: generateCandles(102.8, 0.014, 14),
  },
};

// Market Category Tabs
export const MARKET_CATEGORIES = [
  { id: 'indices', label: 'Major indices', tickerKeys: ['SPX', 'NDX', 'BTCUSD', 'ETHUSD', 'GC1', 'CL1'] },
  { id: 'crypto', label: 'Crypto market cap', tickerKeys: ['BTCUSD', 'ETHUSD', 'MSTR', 'NVDA'] },
  { id: 'btc-dom', label: 'Bitcoin dominance', tickerKeys: ['BTCUSD', 'ETHUSD', 'SPX'] },
  { id: 'dxy', label: 'US Dollar index', tickerKeys: ['GC1', 'CL1', 'XAUUSD', 'SPX'] },
  { id: 'futures', label: 'Futures', tickerKeys: ['GC1', 'CL1', 'SPX', 'NDX'] },
  { id: 'bonds', label: 'US 10Y yield', tickerKeys: ['SPX', 'NDX', 'XAUUSD'] },
];

// Community Ideas using EXACT hotlinks provided by user in prompt
export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-1',
    title: 'Bitcoin: Wave 2 Could Target $75,000',
    description:
      'Bitcoin appears to have completed a five-wave advance in wave 1. The current pullback is likely developing as wave 2, taking the form of a downward double zigzag, with a possible extension into a triple zigzag.',
    symbol: 'BTCUSD',
    exchange: 'CRYPTO',
    type: 'Short',
    author: 'Roman_Pavelko_EWA',
    likes: 142,
    comments: 29,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCW3X9ZaTiwcfAIPf0JqOreT6GjBoNF2oZ6b4KGoyqBejJsbV64iGS1184-Mp6pYLUxtE5_uxSYu9qAKxgrNQVyZOCDbWty3OE8Jsh5CkC1nxvDe_LtJdEW8t73Y3e2Swd5MxceHgr2x9KEhwRe23umt2uiStdkMoh5BDdM5U303qSFKkQCk2nHgZ-EJQL8UD3jA2VhiKtzpz4yQJ0ptkfOdTD6CPFRgshEmtbU8UKVOtP6p-HY_xHr',
    timeAgo: '4 hours ago',
    category: "Editors' picks",
    analysisText:
      'Looking at the daily and 4-hour cycle, wave (1) ended at the local peak with an extended 5th sub-wave. Wave (2) retracement historically hits the 0.5 or 0.618 Fibonacci level between $74,800 and $76,200 before the resumption of wave (3) into price discovery.',
  },
  {
    id: 'idea-2',
    title: 'AAPL | Flexible Time Frames, Clearer Entries.',
    description:
      "Today's AAPL review focused on being flexible when your edge doesn't appear on your preferred higher time frame, using multiple charts together, and understanding retracements before deciding on an entry.",
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    type: 'Long',
    author: 'davekclinton76',
    likes: 88,
    comments: 14,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAy-UwVxkQuJFLGJHW2qMNsNzaCTx-mKjvkWvnTdbvAk6XfrsKfALXYFjPhZrHnKmfHIqj2IV_ZiBGfHMhJJQ9rttRA2A3bqLmEVCDLPO8I3qnSAbmcVOyGz_m5jAbdmdwwID6RXwqUe64nFq2yTMjq9RkNjaSUgk0wwWb2mGVusoDsxrNBvkvTteLxHOZnnPd3PmU06S-umRvQnh6XYsLGT1w9tJavupDdhUEZu5aCrBNbCGy_fE0',
    timeAgo: '7 hours ago',
    category: "Editors' picks",
    analysisText:
      'When reviewing the 15m vs 1H liquidity sweeps, the key demand zone between $225.50 and $226.20 held firmly with high relative volume. Targeting equal highs at $234.00 with stop loss tucked under $224.20.',
  },
  {
    id: 'idea-3',
    title: 'Nike 1M: the line untouched since the 1980s',
    description:
      'For almost forty years, Nike has traded above one line on its monthly chart. Today it sits about twenty percent above it - the narrowest gap this chart has shown since the 1980s.',
    symbol: 'NKE',
    exchange: 'NYSE',
    type: 'Long',
    author: 'StructuraMarkets',
    likes: 304,
    comments: 62,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBB6fDegEZLhqpF8xqsGpPEzcurPvyckBpExyE1A5w1CkPHk1aJM-6RC8hhNRKrUk44YPyDXs12H8MJdcb43oWsnRw33UvFKMsY0j0-RDxxdSoGZyrtMqqatNkxY0ClpRJuzBRSgsPL6nLlFfWVkvPuV9PW_UvORoFHLCdwaC4BCichk0kdrKTQA_8_MI1kEHpVG84_1L9Wl12k0bnFBBpVGsGPJLC0IiMNmvKrGatkjGQ4Q9C5q3yz',
    timeAgo: '12 hours ago',
    category: "Editors' picks",
    analysisText:
      'A multi-decade logarithmic regression channel boundary dating back to the late 1980s IPO era. Every touch has initiated a minimum 3x multi-year bull run. Asymmetrical risk-to-reward ratio here for long-term compounders.',
  },
  {
    id: 'idea-4',
    title: 'XAUUSD: Corrective Decline Nearing Completion',
    description:
      'Major structure: The advance from the July low appears to have completed a larger 5-wave impulse. The decline is being interpreted as a deep retest before the next impulse wave.',
    symbol: 'XAUUSD',
    exchange: 'OANDA',
    type: 'Long',
    author: 'Samuel124',
    likes: 196,
    comments: 31,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWRx_1az4lMv5R5izQDdx58R4aWyvqYg5ENKZiV5Ad6jPORUXp-aWETRhudNy1WzRr1f3CMuBHVrTItdZHJNffNWsdfD_bDdFdEFvoZoGmuJE_5p7pomHoAS_ueP-tKCa66Roceu8lBDpJkEldmXphs4d9kN-HCGocSw3vMLRFuw4SSn2n8Nyj6Jf6frWQXxz0eqi6fxv4QQzelKuBhDT42RpHw54ploqIDPyaiCcF2GpEJv6yRISl',
    timeAgo: '1 day ago',
    category: "Editors' picks",
    analysisText:
      'Gold spot is touching confluence between the daily 50 EMA and the 0.382 retracement at $2,648. Bullish divergence forming on the 4-hour MACD histogram signals that sellers are exhausted.',
  },
  {
    id: 'idea-5',
    title: 'AMD | The FVG Is The Entry, Not The Chase',
    description:
      'By analyzing the #AMD chart on the 4H timeframe, we can see a market that broke structure upward in September, has been expanding inside a clean ascending channel ever since.',
    symbol: 'AMD',
    exchange: 'NASDAQ',
    type: 'Long',
    author: 'BigBeluga',
    likes: 412,
    comments: 54,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMnJtdHQAEiNtpsU1XWjJFdyk_ZMaTZfL3UYh_bpPdAjNKimM4p71wdI-SXzUgR-JV-sMUO01sdD6XJa48Px_mmCevAPRBWHpugFGbKXIveOOEKY2V1zbDmz51wOPJPOaySc9widWb7E4rlmKISY10mY-bpU1PchDkj3O3PycswglmjT3B6LGyYfZkOLiLE2VcqOUYG7ApJ80hFbB1fqqAkJqPuL26_uXsuWSMYHJa1KhinBhWp7_f',
    timeAgo: '1 day ago',
    category: "Editors' picks",
    analysisText:
      'Institutional order block filled at $152.10. Retest of Fair Value Gap (FVG) created on earnings day has provided a high-probability springboard for an extension to the top channel boundary at $174.',
  },
  {
    id: 'idea-6',
    title: 'Buyers & Sellers Profile + Dynamic S/R',
    description:
      'Volume-profile and market-structure indicator designed to combine a large rolling Buyers/Sellers Volume Profile with dynamically generated support and resistance levels.',
    symbol: 'PINE',
    exchange: 'SCRIPTS',
    type: 'Pine Script®',
    author: 'Zeiierman',
    likes: 530,
    comments: 48,
    rating: 4.9,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRqakPpm6qqBJ1gf3KAKmEmQrAKXUimvSX_q9d2_NhYwqFqgRxZQNn8uUPGBFXy_Fzhu5JiGk1vlNqaYL39hgtaBb0e9Ae9JeepqquJeiWLkNjqM1L9TtVtCmhWSSKtbyp3K0xod1ra9vvkM-yKUFmE64F76aYrmwonXwk5fLaxGuU4PI_8FAGy_zrg_FVgTdA-58vaT6H6PYXTf0dW378DeyYKdDbwHlM_hwn6pIvt7s4Af4ifAdW',
    timeAgo: '2 days ago',
    category: "Editors' picks",
    analysisText:
      'This open-source Pine Script calculates buyer/seller delta at each price tick across rolling lookback windows. It identifies institutional absorption clusters and plots predictive pivot bands automatically.',
  },
];

// Market Movers table
export const MARKET_MOVERS = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    avatar: 'N',
    price: 233.95,
    changePercent: 3.42,
    volume: '62.8M',
    marketCap: '3.41T',
    high: 235.1,
    low: 228.4,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    avatar: 'T',
    price: 248.1,
    changePercent: -1.24,
    volume: '48.2M',
    marketCap: '792.4B',
    high: 253.4,
    low: 246.8,
  },
  {
    symbol: 'MSTR',
    name: 'MicroStrategy Inc',
    avatar: 'M',
    price: 214.5,
    changePercent: 5.71,
    volume: '31.4M',
    marketCap: '42.8B',
    high: 218.0,
    low: 204.2,
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    avatar: 'A',
    price: 156.24,
    changePercent: 1.94,
    volume: '27.6M',
    marketCap: '253.1B',
    high: 158.3,
    low: 153.1,
  },
  {
    symbol: 'MU',
    name: 'Micron Technology, Inc.',
    avatar: 'M',
    price: 102.8,
    changePercent: -0.72,
    volume: '18.9M',
    marketCap: '114.7B',
    high: 104.2,
    low: 101.9,
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    avatar: 'A',
    price: 228.45,
    changePercent: 0.88,
    volume: '44.1M',
    marketCap: '3.48T',
    high: 229.8,
    low: 226.5,
  },
  {
    symbol: 'COIN',
    name: 'Coinbase Global, Inc.',
    avatar: 'C',
    price: 278.6,
    changePercent: 4.15,
    volume: '14.2M',
    marketCap: '68.9B',
    high: 284.0,
    low: 269.4,
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    avatar: 'P',
    price: 43.18,
    changePercent: 2.38,
    volume: '56.3M',
    marketCap: '95.4B',
    high: 44.05,
    low: 42.1,
  },
];

// Supported Brokers
export const SUPPORTED_BROKERS: BrokerInfo[] = [
  { name: 'NinjaTrader', rating: 4.5, assetClass: 'Futures', status: 'Verified', minDeposit: '$400', spread: '0.1 ticks' },
  { name: 'OANDA', rating: 4.5, assetClass: 'Forex', status: 'Verified', minDeposit: '$0', spread: '0.8 pips' },
  { name: 'FOREX.com', rating: 4.5, assetClass: 'Forex', status: 'Verified', minDeposit: '$100', spread: '1.0 pips' },
  { name: 'OKX', rating: 4.4, assetClass: 'Crypto', status: 'Integrated', minDeposit: '$10', spread: '0.02%' },
  { name: 'Interactive Brokers', rating: 4.6, assetClass: 'Multi-Asset', status: 'Partner', minDeposit: '$0', spread: '0.1 bps' },
  { name: 'TradeStation', rating: 4.5, assetClass: 'Equities', status: 'Partner', minDeposit: '$500', spread: '$0.005/share' },
];

export const SPACE_STORY_DATA = {
  astronaut: 'Scott "Kidd" Poteet',
  mission: 'Polaris Dawn',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxj4lVeGIBCvnZ1IBY4yG44Z_N4P5ba_GQmZ0RDlA-eoTvK-tJE-7xcpxbR250ZORlcszFW4R_Sc-qYzhvHqzo9mcKZSWJzl394sS8pQTOD3aQa8fHnyicWcQto5XKOYVQa_pXTQTxKwm3bpX-tdYAKEn5fU3139RNEK-9qem0DFwmog_NZrUQZoGHKbeYgU2IEPcYx_RPpGdtBWsIpndkfmdVPO0jGAlJ3FTnDgA3rhtZ1M2IKsg',
  quote:
    'From low Earth orbit to charting the frontiers of market discovery, precision preparation and real-time clarity make all the difference.',
  story:
    'During the historic Polaris Dawn private astronaut mission which reached an apogee of 1,400.7 kilometers—the highest humans have flown into space since Apollo 17 in 1972—mission pilot Scott "Kidd" Poteet carried TradingView tools into orbit to demonstrate institutional telemetry and seamless real-time analysis even in microgravity environments.',
};
