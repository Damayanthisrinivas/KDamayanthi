export enum View {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  FOCUS = 'FOCUS',
  FINANCE = 'FINANCE',
  JOURNAL = 'JOURNAL',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS'
}

export interface UserProfile {
  name: string;
  isExperienced: boolean; // false = student/early pro
  wakeTime: string;
  sleepTime: string;
}

export interface Habit {
  id: string;
  title: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  durationMinutes: number;
  streak: number;
  completedToday: boolean;
  category: 'Health' | 'Work' | 'Mindfulness' | 'Other';
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string; // ISO date
  category: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'Great' | 'Good' | 'Neutral' | 'Stressed' | 'Tired';
  text: string;
}

export interface AppState {
  hasOnboarded: boolean;
  profile: UserProfile;
  habits: Habit[];
  expenses: Expense[];
  journal: JournalEntry[];
  currency: string;
}
