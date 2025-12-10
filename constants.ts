import { AppState, Habit, Expense, JournalEntry } from './types';

export const SEED_HABITS: Habit[] = [
  {
    id: 'h1',
    title: 'Meditate',
    timeOfDay: 'Morning',
    durationMinutes: 10,
    streak: 12,
    completedToday: false,
    category: 'Mindfulness'
  },
  {
    id: 'h2',
    title: 'Deep Work / Study',
    timeOfDay: 'Morning',
    durationMinutes: 20,
    streak: 4,
    completedToday: true,
    category: 'Work'
  },
  {
    id: 'h3',
    title: 'Morning Workout',
    timeOfDay: 'Morning',
    durationMinutes: 30,
    streak: 8,
    completedToday: false,
    category: 'Health'
  },
  {
    id: 'h4',
    title: 'Reflect & Journal',
    timeOfDay: 'Evening',
    durationMinutes: 5,
    streak: 21,
    completedToday: false,
    category: 'Mindfulness'
  },
  {
    id: 'h5',
    title: 'Sleep by 11 PM',
    timeOfDay: 'Evening',
    durationMinutes: 480,
    streak: 3,
    completedToday: false,
    category: 'Health'
  }
];

export const SEED_EXPENSES: Expense[] = [
  { id: 'e1', amount: 4.50, description: 'Coffee', date: '2023-10-26', category: 'Food' },
  { id: 'e2', amount: 12.00, description: 'Lunch', date: '2023-10-26', category: 'Food' },
  { id: 'e3', amount: 25.00, description: 'Books', date: '2023-10-25', category: 'Education' },
  { id: 'e4', amount: 8.99, description: 'Netflix', date: '2023-10-24', category: 'Entertainment' },
  { id: 'e5', amount: 3.50, description: 'Snack', date: '2023-10-24', category: 'Food' },
  { id: 'e6', amount: 50.00, description: 'Transport Card', date: '2023-10-23', category: 'Transport' },
  { id: 'e7', amount: 15.00, description: 'Stationery', date: '2023-10-22', category: 'Education' },
];

export const SEED_JOURNAL: JournalEntry[] = [
  { id: 'j1', date: '2023-10-26', mood: 'Good', text: 'Felt productive today, managed to stick to the schedule.' },
  { id: 'j2', date: '2023-10-25', mood: 'Stressed', text: 'Hard to focus in the afternoon. Need to sleep earlier.' },
  { id: 'j3', date: '2023-10-24', mood: 'Great', text: 'Crushed the workout! Feeling energetic.' },
];

export const INITIAL_STATE: AppState = {
  hasOnboarded: false,
  profile: {
    name: '',
    isExperienced: false,
    wakeTime: '07:00',
    sleepTime: '23:00'
  },
  habits: SEED_HABITS,
  expenses: SEED_EXPENSES,
  journal: SEED_JOURNAL,
  currency: '$'
};
