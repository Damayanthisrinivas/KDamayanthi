import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { FocusMode } from './components/FocusMode';
import { Finance } from './components/Finance';
import { Journal } from './components/Journal';
import { Analytics } from './components/Analytics';
import { AppState, View, UserProfile, JournalEntry } from './types';
import { INITIAL_STATE } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [currentView, setCurrentView] = useState<View>(View.ONBOARDING);

  // Initialize view based on onboarding status (simulated persistence)
  useEffect(() => {
    // In a real app, check localStorage or DB here
    if (state.hasOnboarded) {
      setCurrentView(View.DASHBOARD);
    }
  }, [state.hasOnboarded]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setState(prev => ({
      ...prev,
      hasOnboarded: true,
      profile
    }));
    setCurrentView(View.DASHBOARD);
  };

  const handleToggleHabit = (id: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h => {
        if (h.id === id) {
          const isCompleting = !h.completedToday;
          return {
            ...h,
            completedToday: isCompleting,
            streak: isCompleting ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      })
    }));
  };

  const handleAddExpense = (amount: number, description: string, category: string) => {
    const newExpense = {
      id: Date.now().toString(),
      amount,
      description,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    setState(prev => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses]
    }));
  };

  const handleSaveJournal = (entry: JournalEntry) => {
      setState(prev => ({
          ...prev,
          journal: [entry, ...prev.journal]
      }));
  };

  const renderView = () => {
    switch (currentView) {
      case View.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case View.DASHBOARD:
        return <Dashboard user={state.profile} habits={state.habits} onToggleHabit={handleToggleHabit} />;
      case View.FOCUS:
        return <FocusMode />;
      case View.FINANCE:
        return <Finance expenses={state.expenses} onAddExpense={handleAddExpense} />;
      case View.JOURNAL:
        return <Journal entries={state.journal} onSave={handleSaveJournal} />;
      case View.ANALYTICS:
        return <Analytics state={state} />;
      default:
        return <Dashboard user={state.profile} habits={state.habits} onToggleHabit={handleToggleHabit} />;
    }
  };

  return (
    <AppLayout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </AppLayout>
  );
};

export default App;
