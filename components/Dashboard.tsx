import React from 'react';
import { Habit, UserProfile } from '../types';
import { Flame, CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  habits: Habit[];
  onToggleHabit: (id: string) => void;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  return (
    <div className={`p-5 rounded-2xl mb-4 transition-all duration-300 border ${
      habit.completedToday 
        ? 'bg-indigo-50 border-indigo-100' 
        : 'bg-white border-stone-100 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              habit.completedToday 
                ? 'bg-indigo-500 text-white' 
                : 'bg-stone-100 text-stone-300 hover:bg-stone-200'
            }`}
          >
            {habit.completedToday ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          </button>
          <div>
            <h3 className={`font-medium text-lg ${habit.completedToday ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
              {habit.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                habit.category === 'Health' ? 'bg-green-100 text-green-700' :
                habit.category === 'Work' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {habit.category}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Flame size={12} className={habit.streak > 0 ? 'text-orange-400' : 'text-stone-300'} />
                {habit.streak} day streak
              </span>
            </div>
          </div>
        </div>
        <button className="text-stone-300 hover:text-stone-500">
            <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}

export const Dashboard: React.FC<DashboardProps> = ({ user, habits, onToggleHabit }) => {
  const completedCount = habits.filter(h => h.completedToday).length;
  const progress = Math.round((completedCount / habits.length) * 100) || 0;

  const morningHabits = habits.filter(h => h.timeOfDay === 'Morning');
  const afternoonHabits = habits.filter(h => h.timeOfDay === 'Afternoon');
  const eveningHabits = habits.filter(h => h.timeOfDay === 'Evening');

  return (
    <div className="p-6 pt-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-stone-800">Good Morning, {user.name.split(' ')[0]}</h1>
        <p className="text-stone-500 mt-1">Ready to close your loops today?</p>
      </header>

      {/* Progress Card */}
      <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle2 size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-stone-400 text-sm font-medium uppercase tracking-wider">Daily Goal</span>
              <div className="text-4xl font-bold mt-1">{progress}%</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-medium">{completedCount}/{habits.length}</div>
              <div className="text-stone-400 text-sm">Habits done</div>
            </div>
          </div>
          <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-400 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        {morningHabits.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4 ml-1">Morning Routine</h2>
            {morningHabits.map(h => <HabitCard key={h.id} habit={h} onToggle={() => onToggleHabit(h.id)} />)}
          </section>
        )}

        {afternoonHabits.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4 ml-1">Afternoon Flow</h2>
            {afternoonHabits.map(h => <HabitCard key={h.id} habit={h} onToggle={() => onToggleHabit(h.id)} />)}
          </section>
        )}

        {eveningHabits.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4 ml-1">Evening Wind-down</h2>
            {eveningHabits.map(h => <HabitCard key={h.id} habit={h} onToggle={() => onToggleHabit(h.id)} />)}
          </section>
        )}
      </div>
    </div>
  );
};