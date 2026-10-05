import React, { useState } from 'react';
import { X, CheckCircle, Mail, Lock } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (username: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
}) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSuccess(true);
    setTimeout(() => {
      onRegistered(email.split('@')[0] || 'ProTrader');
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#1e222d] border border-[#2a2e39] rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#787b86] hover:text-[#f0f3fa] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto rounded-lg bg-[#f0f3fa] text-[#0c0d10] flex items-center justify-center font-black tracking-tighter mb-3 shadow-md">
            <svg className="w-6 h-6 fill-[#0c0d10]" viewBox="0 0 36 28">
              <path d="M0 0h8.5v28H0V0zm13.7 0H22v28h-8.3V0zM27.4 0H36v28h-8.6V0z" fill="currentColor" />
              <circle cx="27.4" cy="7" fill="#2962FF" r="5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#f0f3fa]">Get started with TradingView</h3>
          <p className="text-xs text-[#787b86] mt-1">$0 forever, no credit card needed</p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-[#f0f3fa]">Welcome to TradingView!</h4>
            <p className="text-xs text-[#787b86]">
              Your pro workstation profile and paper trading account ($100,000 USD) are ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#787b86] mb-1 font-medium">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#787b86] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl pl-9 pr-3 py-2 text-[#f0f3fa] focus:border-[#2962ff] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#787b86] mb-1 font-medium">Choose a password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#787b86] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl pl-9 pr-3 py-2 text-[#f0f3fa] focus:border-[#2962ff] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:brightness-110 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Create free account
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2e39]" />
              </div>
              <span className="relative bg-[#1e222d] px-2 text-[11px] text-[#50535e]">
                or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(true);
                setTimeout(() => {
                  onRegistered('GoogleTrader');
                  setIsSuccess(false);
                  onClose();
                }, 1000);
              }}
              className="w-full py-2.5 bg-[#131722] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#f0f3fa] font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue with Google</span>
            </button>

            <p className="text-[11px] text-[#50535e] text-center pt-2 leading-relaxed">
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
