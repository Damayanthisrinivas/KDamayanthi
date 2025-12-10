import React from 'react';
import { Layout, CheckCircle, Timer, DollarSign, BookOpen, BarChart2 } from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onChangeView: (view: View) => void;
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${
      isActive ? 'text-indigo-600' : 'text-stone-400 hover:text-stone-600'
    }`}
  >
    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);

export const AppLayout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  // Mobile-first container constraint
  return (
    <div className="min-h-screen bg-stone-100 flex justify-center">
      <div className="w-full max-w-md bg-stone-50 h-screen shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        {currentView !== View.ONBOARDING && (
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-2 pb-safe pt-1 flex justify-between items-center z-50 h-[80px]">
            <NavItem 
              icon={Layout} 
              label="Today" 
              isActive={currentView === View.DASHBOARD} 
              onClick={() => onChangeView(View.DASHBOARD)} 
            />
            <NavItem 
              icon={Timer} 
              label="Focus" 
              isActive={currentView === View.FOCUS} 
              onClick={() => onChangeView(View.FOCUS)} 
            />
             {/* Center Action Button (Placeholder for Quick Add if needed, or just visual center) */}
            <div className="relative -top-5">
                <button 
                    onClick={() => onChangeView(View.JOURNAL)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
                >
                    <BookOpen size={24} />
                </button>
            </div>

            <NavItem 
              icon={DollarSign} 
              label="Finance" 
              isActive={currentView === View.FINANCE} 
              onClick={() => onChangeView(View.FINANCE)} 
            />
            <NavItem 
              icon={BarChart2} 
              label="Stats" 
              isActive={currentView === View.ANALYTICS} 
              onClick={() => onChangeView(View.ANALYTICS)} 
            />
          </nav>
        )}
      </div>
    </div>
  );
};
