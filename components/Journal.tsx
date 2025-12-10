import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { Save, Calendar, Smile, Meh, Frown } from 'lucide-react';

interface JournalProps {
  entries: JournalEntry[];
  onSave: (entry: JournalEntry) => void;
}

export const Journal: React.FC<JournalProps> = ({ entries, onSave }) => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState<'Great' | 'Good' | 'Neutral' | 'Stressed' | 'Tired'>('Good');

  const handleSave = () => {
    if (!text.trim()) return;
    const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        mood,
        text
    };
    onSave(newEntry);
    setText('');
  };

  const moods = [
    { label: 'Great', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Good', icon: Smile, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Neutral', icon: Meh, color: 'text-stone-500', bg: 'bg-stone-100' },
    { label: 'Stressed', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  return (
    <div className="p-6 pt-12 pb-24 h-full flex flex-col">
       <header className="mb-6">
        <h1 className="text-3xl font-semibold text-stone-800">Reflect</h1>
        <p className="text-stone-500 mt-1">Capture your daily wins and blocks.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 mb-6 flex-shrink-0">
         <label className="block text-sm font-medium text-stone-500 mb-3">How are you feeling?</label>
         <div className="flex justify-between">
            {moods.map((m) => (
                <button 
                    key={m.label} 
                    onClick={() => setMood(m.label as any)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                        mood === m.label ? 'bg-stone-50 scale-110 ring-2 ring-indigo-100' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                    }`}
                >
                    <div className={`p-2 rounded-full ${m.bg} ${m.color}`}>
                        <m.icon size={24} />
                    </div>
                    <span className="text-[10px] font-medium text-stone-600">{m.label}</span>
                </button>
            ))}
         </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-stone-100 p-5 flex flex-col mb-4">
        <textarea
            className="w-full flex-1 outline-none text-stone-700 resize-none placeholder-stone-300 leading-relaxed"
            placeholder="What went well today? What distracted you? (2 min brain dump)"
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-4">
            <span className="text-xs text-stone-400">{new Date().toLocaleDateString()}</span>
            <button 
                onClick={handleSave}
                disabled={!text}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors"
            >
                <Save size={16} /> Save Entry
            </button>
        </div>
      </div>

      <div className="space-y-4">
          <h3 className="font-medium text-stone-400 text-sm uppercase tracking-wide ml-1">Recent Entries</h3>
          {entries.slice(0, 3).map(entry => (
              <div key={entry.id} className="bg-white p-4 rounded-xl border border-stone-100">
                  <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-stone-500">{entry.date}</span>
                      <span className="text-xs px-2 py-0.5 bg-stone-100 rounded-md text-stone-600">{entry.mood}</span>
                  </div>
                  <p className="text-stone-700 text-sm line-clamp-2">{entry.text}</p>
              </div>
          ))}
      </div>
    </div>
  );
};
