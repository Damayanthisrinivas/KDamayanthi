import React, { useState } from 'react';
import { UserProfile, View } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepTime, setSleepTime] = useState('23:00');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        name,
        isExperienced: false,
        wakeTime,
        sleepTime
      });
    }
  };

  return (
    <div className="h-full flex flex-col p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-semibold text-stone-800 mb-2">Welcome to LifeLoop.</h1>
            <p className="text-stone-500 mb-8">Let's build your daily accountability system. First, what should we call you?</p>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full text-2xl bg-transparent border-b-2 border-stone-300 focus:border-indigo-500 outline-none pb-2 text-stone-800 placeholder-stone-300 transition-colors"
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-semibold text-stone-800 mb-2">Daily Rhythm.</h1>
            <p className="text-stone-500 mb-8">Setting boundaries helps reduce decision fatigue.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-500 mb-1">I want to wake up by</label>
                <input 
                  type="time" 
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full bg-white p-4 rounded-xl shadow-sm text-lg text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-500 mb-1">I want to sleep by</label>
                <input 
                  type="time" 
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full bg-white p-4 rounded-xl shadow-sm text-lg text-center"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-semibold text-stone-800 mb-2">You're Set.</h1>
            <p className="text-stone-500 mb-8">We've generated a starter routine based on successful habits. You can customize it later.</p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={16} /></div>
                <span className="text-stone-700">Morning Meditation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Check size={16} /></div>
                <span className="text-stone-700">Deep Work Session</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600"><Check size={16} /></div>
                <span className="text-stone-700">Evening Reflection</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleNext}
        disabled={step === 1 && !name}
        className="w-full bg-stone-900 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98]"
      >
        {step === 3 ? "Start Journey" : "Next"}
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
