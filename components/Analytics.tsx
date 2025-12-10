import React, { useState } from 'react';
import { AppState } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateWeeklyRefection } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface AnalyticsProps {
  state: AppState;
}

export const Analytics: React.FC<AnalyticsProps> = ({ state }) => {
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for the chart based on current state (simplification for demo)
  const data = [
    { name: 'Mon', completion: 60 },
    { name: 'Tue', completion: 45 },
    { name: 'Wed', completion: 80 },
    { name: 'Thu', completion: 90 },
    { name: 'Fri', completion: 55 },
    { name: 'Sat', completion: 30 },
    { name: 'Sun', completion: 70 },
  ];

  const handleGetCoaching = async () => {
    setLoading(true);
    const advice = await generateWeeklyRefection(state);
    setAiAdvice(advice);
    setLoading(false);
  };

  const averageCompletion = Math.round(data.reduce((a, b) => a + b.completion, 0) / 7);

  return (
    <div className="p-6 pt-12 pb-24">
       <header className="mb-8">
        <h1 className="text-3xl font-semibold text-stone-800">Insights</h1>
        <p className="text-stone-500 mt-1">Review your weekly performance.</p>
      </header>

      {/* Completion Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 mb-8 h-64">
        <h3 className="font-medium text-stone-800 mb-4">Weekly Consistency</h3>
        <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="completion" radius={[4, 4, 4, 4]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.completion > 70 ? '#6366f1' : '#e7e5e4'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-50 p-5 rounded-2xl">
              <div className="text-indigo-900 text-3xl font-bold">{averageCompletion}%</div>
              <div className="text-indigo-600 text-xs font-medium uppercase mt-1">Avg Completion</div>
          </div>
          <div className="bg-orange-50 p-5 rounded-2xl">
              <div className="text-orange-900 text-3xl font-bold">{state.habits.reduce((acc, h) => acc + (h.streak > 0 ? 1 : 0), 0)}</div>
              <div className="text-orange-600 text-xs font-medium uppercase mt-1">Active Streaks</div>
          </div>
      </div>

      {/* AI Coach Section */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-white p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-amber-400" size={20} />
              <h3 className="font-semibold text-lg">AI Coach</h3>
          </div>
          
          {aiAdvice ? (
              <div className="animate-fade-in">
                  <p className="text-stone-300 leading-relaxed text-sm">{aiAdvice}</p>
                  <button 
                    onClick={() => setAiAdvice(null)}
                    className="mt-4 text-xs text-stone-500 hover:text-white transition-colors"
                  >
                      Refresh
                  </button>
              </div>
          ) : (
              <div className="text-center py-4">
                  <p className="text-stone-400 text-sm mb-4">Get personalized advice based on your habit streaks and journal moods.</p>
                  <button 
                    onClick={handleGetCoaching}
                    disabled={loading}
                    className="w-full bg-white text-stone-900 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors"
                  >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Generate Insights"}
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};
