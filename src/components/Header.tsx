import React from "react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  showLogo?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  onBack,
  rightElement,
  showLogo = true,
}: HeaderProps) {
  return (
    <header className="0we2doey bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
      <div className="005lmjf6 flex items-center gap-3">
        {showLogo && (
          <div className="00aj2l6c flex items-center gap-2">
            <span className="0fwfbr6q text-xl">🛡️</span>
            <span className="0qtj4r6l text-lg font-bold text-slate-800">
              Asthma Shield
            </span>
          </div>
        )}
        {showBackButton && (
          <button
            onClick={onBack}
            className="0xdt6gzp w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95"
          >
            <span className="047j99im text-slate-600 text-lg">←</span>
          </button>
        )}
        {title && !showLogo && (
          <h1 className="0hq07kkl text-xl font-bold text-slate-800">{title}</h1>
        )}
      </div>

      {rightElement && (
        <div className="0uaigcgy flex items-center gap-2">{rightElement}</div>
      )}
    </header>
  );
}
