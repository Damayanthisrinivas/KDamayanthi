import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, X } from 'lucide-react';

export const FocusMode: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [sessionType, setSessionType] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Simple switch logic
      if (sessionType === 'FOCUS') {
        setSessionType('BREAK');
        setTimeLeft(5 * 60);
      } else {
        setSessionType('FOCUS');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, sessionType]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = sessionType === 'FOCUS' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="h-full bg-stone-900 text-white flex flex-col items-center justify-center p-8 relative">
       <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
            <h2 className="text-lg font-medium tracking-wide">Focus Mode</h2>
       </div>

      <div className="mb-12 text-center">
        <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 ${
            sessionType === 'FOCUS' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-green-500/20 text-green-300'
        }`}>
            {sessionType === 'FOCUS' ? 'DEEP WORK' : 'REST & RECOVER'}
        </span>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* SVG Circle for Progress */}
        <svg className="w-full h-full transform -rotate-90">
            <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-stone-800"
            />
            <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                className={`${sessionType === 'FOCUS' ? 'text-indigo-500' : 'text-green-500'} transition-all duration-1000`}
                strokeLinecap="round"
            />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-6xl font-light font-mono tabular-nums tracking-tighter">
                {formatTime(timeLeft)}
             </div>
        </div>
      </div>

      <div className="flex gap-6">
        <button 
            onClick={resetTimer}
            className="w-14 h-14 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors"
        >
            <RefreshCw size={20} />
        </button>
        <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isActive ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
            }`}
        >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      <p className="mt-12 text-stone-500 text-sm max-w-xs text-center">
        {isActive ? "Stay focused. Ignore distractions." : "Ready to start your next session?"}
      </p>
    </div>
  );
};
