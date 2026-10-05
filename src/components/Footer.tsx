import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="border-t border-[#2a2e39] bg-[#0c0d10] mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col gap-12">
        {/* Top Row: Monogram + Tagline + Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#2a2e39]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] text-[#0c0d10] flex items-center justify-center font-black tracking-tighter select-none">
              <svg className="w-5 h-5 fill-[#0c0d10]" viewBox="0 0 36 28">
                <path d="M0 0h8.5v28H0V0zm13.7 0H22v28h-8.3V0zM27.4 0H36v28h-8.6V0z" fill="currentColor" />
                <circle cx="27.4" cy="7" fill="#2962FF" r="5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#f0f3fa] tracking-tight">
              TradingView
            </span>
            <span className="text-xs text-[#50535e] border-l border-[#2a2e39] pl-3">
              Made by humans
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#787b86]">
            {/* X */}
            <a
              href="https://x.com/tradingview/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="hover:text-[#f0f3fa] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@TradingView"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-[#f0f3fa] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tradingview/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[#f0f3fa] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Reddit */}
            <a
              href="https://www.reddit.com/r/TradingView/"
              target="_blank"
              rel="noreferrer"
              aria-label="Reddit"
              className="hover:text-[#f0f3fa] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.56 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.096.35.35 0 0 0 0 .49c.84.84 2.215 1.092 3.197 1.092.982 0 2.357-.252 3.197-1.092a.35.35 0 0 0 0-.49.327.327 0 0 0-.462 0c-.63.63-1.802.846-2.735.846-.933 0-2.105-.216-2.735-.846a.326.326 0 0 0-.231-.096z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/tradingview/"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="hover:text-[#f0f3fa] transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-xs">
          {/* Products */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Products
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#supercharts" className="hover:text-[#f0f3fa] hover:underline">Supercharts</a></li>
              <li><a href="#stocks" className="hover:text-[#f0f3fa] hover:underline">Stocks Screener</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Crypto Screener</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Heatmaps</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Economic Calendar</a></li>
              <li><a href="#mobile" className="hover:text-[#f0f3fa] hover:underline">Mobile Apps</a></li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Community
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#ideas" className="hover:text-[#f0f3fa] hover:underline">Social network</a></li>
              <li><a href="#community" className="hover:text-[#f0f3fa] hover:underline">Wall of Love</a></li>
              <li><a href="#community" className="hover:text-[#f0f3fa] hover:underline">Refer a friend</a></li>
              <li><a href="#community" className="hover:text-[#f0f3fa] hover:underline">Creator program</a></li>
              <li><a href="#community" className="hover:text-[#f0f3fa] hover:underline">House Rules</a></li>
              <li><a href="#community" className="hover:text-[#f0f3fa] hover:underline">Moderators</a></li>
            </ul>
          </div>

          {/* Ideas & Pine */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Ideas &amp; Pine
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#ideas" className="hover:text-[#f0f3fa] hover:underline">Trading Ideas</a></li>
              <li><a href="#education" className="hover:text-[#f0f3fa] hover:underline">Education</a></li>
              <li><a href="#ideas" className="hover:text-[#f0f3fa] hover:underline">Editors&apos; picks</a></li>
              <li><a href="#ideas" className="hover:text-[#f0f3fa] hover:underline">Pine Script®</a></li>
              <li><a href="#ideas" className="hover:text-[#f0f3fa] hover:underline">Indicators &amp; strategies</a></li>
              <li><a href="#marketplace" className="hover:text-[#f0f3fa] hover:underline">Marketplace</a></li>
            </ul>
          </div>

          {/* Markets */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Markets
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Indices</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Futures</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Forex</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Crypto</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">Bonds &amp; Yields</a></li>
              <li><a href="#markets" className="hover:text-[#f0f3fa] hover:underline">World Economy</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Company
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#company" className="hover:text-[#f0f3fa] hover:underline">Who we are</a></li>
              <li><a href="#space-mission" className="hover:text-[#f0f3fa] hover:underline">Space mission</a></li>
              <li><a href="#company" className="hover:text-[#f0f3fa] hover:underline">Blog</a></li>
              <li><a href="#company" className="hover:text-[#f0f3fa] hover:underline">Careers</a></li>
              <li><a href="#company" className="hover:text-[#f0f3fa] hover:underline">Media kit</a></li>
              <li><a href="#company" className="hover:text-[#f0f3fa] hover:underline">TradingView store</a></li>
            </ul>
          </div>

          {/* Business Solutions */}
          <div className="space-y-3">
            <div className="font-semibold text-[#f0f3fa] uppercase tracking-wider text-[11px]">
              Business Solutions
            </div>
            <ul className="space-y-2 text-[#787b86]">
              <li><a href="#business" className="hover:text-[#f0f3fa] hover:underline">Widgets</a></li>
              <li><a href="#business" className="hover:text-[#f0f3fa] hover:underline">Charting libraries</a></li>
              <li><a href="#business" className="hover:text-[#f0f3fa] hover:underline">Lightweight Charts™</a></li>
              <li><a href="#brokers" className="hover:text-[#f0f3fa] hover:underline">Brokerage integration</a></li>
              <li><a href="#business" className="hover:text-[#f0f3fa] hover:underline">Partner program</a></li>
              <li><a href="#business" className="hover:text-[#f0f3fa] hover:underline">Security tips</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 border-t border-[#2a2e39] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-[#50535e]">
          <p className="max-w-3xl leading-relaxed">
            Select market data provided by{' '}
            <a
              href="https://www.ice.com/fixed-income-data-services"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[#787b86]"
            >
              ICE Data Services
            </a>
            . Select reference data provided by FactSet. Copyright © 2026 FactSet Research Systems Inc.
            Copyright © 2026, American Bankers Association. CUSIP Database provided by FactSet Research
            Systems Inc. All rights reserved. SEC filings and other documents provided by Quartr.
          </p>
          <div className="whitespace-nowrap font-medium text-[#787b86]">
            © 2026 TradingView, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
