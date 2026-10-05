import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Shield, Check } from 'lucide-react';
import { TickerData } from '../data/marketData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticker: TickerData;
  initialSide: 'buy' | 'sell';
  currentBalance: number;
  onOrderExecuted: (cost: number, symbol: string, side: 'buy' | 'sell', units: number) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  ticker,
  initialSide,
  currentBalance,
  onOrderExecuted,
}) => {
  const [side, setSide] = useState<'buy' | 'sell'>(initialSide);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [units, setUnits] = useState<number>(ticker.price > 1000 ? 0.25 : 10);
  const [takeProfit, setTakeProfit] = useState<boolean>(true);
  const [stopLoss, setStopLoss] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalCost = units * ticker.price;
  const isBuy = side === 'buy';

  const defaultTp = isBuy ? ticker.price * 1.08 : ticker.price * 0.92;
  const defaultSl = isBuy ? ticker.price * 0.96 : ticker.price * 1.04;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCost > currentBalance && isBuy) {
      alert('Insufficient paper trading balance for this order.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onOrderExecuted(totalCost, ticker.symbol, side, units);
      setIsSuccess(false);
      onClose();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="h-12 bg-[#131722] border-b border-[#2a2e39] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#f0f3fa]">{ticker.symbol}</span>
            <span className="text-xs text-[#787b86]">Order Ticket</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#787b86] hover:text-[#f0f3fa] p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleExecute} className="p-5 space-y-4 text-xs">
          {/* Side Toggle: Buy vs Sell */}
          <div className="grid grid-cols-2 gap-2 bg-[#131722] p-1 rounded-xl border border-[#2a2e39]">
            <button
              type="button"
              onClick={() => setSide('buy')}
              className={`py-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
                side === 'buy'
                  ? 'bg-[#089981] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-[#f0f3fa]'
              }`}
            >
              Buy / Long
            </button>
            <button
              type="button"
              onClick={() => setSide('sell')}
              className={`py-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
                side === 'sell'
                  ? 'bg-[#f23645] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-[#f0f3fa]'
              }`}
            >
              Sell / Short
            </button>
          </div>

          {/* Execution Price display */}
          <div className="flex items-center justify-between p-3 bg-[#131722] rounded-xl border border-[#2a2e39]">
            <span className="text-[#787b86]">Current Market Price:</span>
            <span className="font-mono-data font-bold text-sm text-[#f0f3fa]">
              ${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Units Input */}
          <div>
            <div className="flex justify-between text-[#787b86] mb-1">
              <span>Order Quantity (Units):</span>
              <span className="font-mono-data">
                ≈ ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <input
              type="number"
              step={ticker.price > 1000 ? '0.05' : '1'}
              min={ticker.price > 1000 ? '0.01' : '1'}
              value={units}
              onChange={(e) => setUnits(Math.max(0.01, parseFloat(e.target.value) || 0))}
              className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl px-3 py-2 text-[#f0f3fa] font-mono-data text-sm focus:border-[#2962ff] focus:outline-none"
            />
          </div>

          {/* Take Profit & Stop Loss */}
          <div className="space-y-2 pt-2 border-t border-[#2a2e39]/50">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-[#787b86]">
                <input
                  type="checkbox"
                  checked={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.checked)}
                  className="rounded border-[#434651] bg-[#131722] text-[#089981]"
                />
                <span>Take Profit (TP)</span>
              </label>
              <span className="font-mono-data text-[#089981]">
                ${defaultTp.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-[#787b86]">
                <input
                  type="checkbox"
                  checked={stopLoss}
                  onChange={(e) => setStopLoss(e.target.checked)}
                  className="rounded border-[#434651] bg-[#131722] text-[#f23645]"
                />
                <span>Stop Loss (SL)</span>
              </label>
              <span className="font-mono-data text-[#f23645]">
                ${defaultSl.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Account Balance Summary */}
          <div className="text-[11px] text-[#787b86] flex justify-between pt-2">
            <span>Available Paper Trading Balance:</span>
            <span className="font-mono-data text-[#f0f3fa]">
              ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSuccess}
            className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
              isSuccess
                ? 'bg-[#089981]'
                : isBuy
                ? 'bg-[#089981] hover:brightness-110 active:scale-[0.99]'
                : 'bg-[#f23645] hover:brightness-110 active:scale-[0.99]'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Order Executed!</span>
              </>
            ) : (
              <span>
                {isBuy ? 'Place Buy Order' : 'Place Sell Order'} (${totalCost.toFixed(2)})
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
