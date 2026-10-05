import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { SUPPORTED_BROKERS, BrokerInfo } from '../data/marketData';

interface BrokersRibbonProps {
  onConnectPaperTrading: () => void;
}

export const BrokersRibbon: React.FC<BrokersRibbonProps> = ({ onConnectPaperTrading }) => {
  const [selectedBroker, setSelectedBroker] = useState<BrokerInfo | null>(null);
  const [connectedBrokers, setConnectedBrokers] = useState<string[]>(['Paper Trading']);

  const handleConnect = (broker: BrokerInfo) => {
    setSelectedBroker(broker);
  };

  const confirmConnect = (name: string) => {
    if (!connectedBrokers.includes(name)) {
      setConnectedBrokers((prev) => [...prev, name]);
    }
    setSelectedBroker(null);
  };

  return (
    <section id="brokers" className="py-12 border-t border-[#2a2e39] bg-[#131722]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f0f3fa]">
              Trade directly on Supercharts
            </h3>
            <p className="text-[#787b86] text-xs sm:text-sm mt-0.5">
              Through our supported, fully-verified, and user-reviewed brokers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {SUPPORTED_BROKERS.slice(0, 4).map((broker) => {
              const isConnected = connectedBrokers.includes(broker.name);

              return (
                <button
                  key={broker.name}
                  onClick={() => handleConnect(broker)}
                  className="flex items-center gap-2 bg-[#1e222d] border border-[#2a2e39] hover:border-[#434651] px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer group text-left"
                >
                  <span className="font-bold text-[#f0f3fa] group-hover:text-[#b6c4ff]">
                    {broker.name}
                  </span>
                  <span className="text-[#22ab94] flex items-center font-semibold text-[11px]">
                    ★ {broker.rating}
                  </span>
                  <span className="text-[#50535e] text-[10px] uppercase font-mono-data">
                    {broker.assetClass}
                  </span>
                  {isConnected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#089981]" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setSelectedBroker(SUPPORTED_BROKERS[0])}
              className="text-xs text-[#b6c4ff] font-semibold hover:underline ml-1 cursor-pointer whitespace-nowrap"
            >
              See all brokers →
            </button>
          </div>
        </div>
      </div>

      {/* Broker Details / Integration Modal */}
      {selectedBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedBroker(null)}
              className="absolute top-4 right-4 text-[#787b86] hover:text-[#f0f3fa] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2962ff]/20 text-[#2962ff] flex items-center justify-center font-bold text-lg">
                {selectedBroker.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-[#f0f3fa] flex items-center gap-2">
                  {selectedBroker.name}
                  <span className="text-[10px] bg-[#089981]/20 text-[#22ab94] px-1.5 py-0.5 rounded font-medium">
                    {selectedBroker.status}
                  </span>
                </h4>
                <div className="text-xs text-[#787b86]">
                  Asset Class: {selectedBroker.assetClass} · User Rating: ★ {selectedBroker.rating}
                </div>
              </div>
            </div>

            <div className="bg-[#131722] border border-[#2a2e39] rounded-xl p-3 text-xs space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-[#787b86]">Minimum Deposit:</span>
                <span className="text-[#f0f3fa] font-mono-data">{selectedBroker.minDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787b86]">Typical Spreads:</span>
                <span className="text-[#f0f3fa] font-mono-data">{selectedBroker.spread}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787b86]">Direct Execution API:</span>
                <span className="text-[#22ab94] font-semibold">Sub-10ms Latency</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => confirmConnect(selectedBroker.name)}
                className="w-full py-2.5 bg-[#2962ff] hover:bg-[#2962ff]/90 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Connect {selectedBroker.name} Account
              </button>
              <button
                onClick={() => {
                  onConnectPaperTrading();
                  setSelectedBroker(null);
                }}
                className="w-full py-2 bg-[#2a2e39] hover:bg-[#363a45] text-[#f0f3fa] rounded-xl text-xs transition-colors cursor-pointer"
              >
                Or Continue with Supercharts Paper Trading ($100k)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
