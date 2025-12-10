import React, { useState } from 'react';
import { Expense } from '../types';
import { Plus, Download, DollarSign, TrendingUp } from 'lucide-react';

interface FinanceProps {
  expenses: Expense[];
  onAddExpense: (amount: number, description: string, category: string) => void;
}

export const Finance: React.FC<FinanceProps> = ({ expenses, onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    onAddExpense(parseFloat(amount), description, category);
    setAmount('');
    setDescription('');
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Date,Description,Category,Amount\n"
        + expenses.map(e => `${e.date},${e.description},${e.category},${e.amount}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lifeloop_expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 pt-12 pb-24">
      <header className="mb-8 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-semibold text-stone-800">Finance</h1>
            <p className="text-stone-500 mt-1">Track your daily spend.</p>
        </div>
        <button onClick={handleExport} className="p-2 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors">
            <Download size={20} className="text-stone-700" />
        </button>
      </header>

      {/* Summary Card */}
      <div className="bg-emerald-50 p-6 rounded-3xl mb-8 border border-emerald-100">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                <TrendingUp size={20} />
            </div>
            <span className="text-emerald-800 font-medium text-sm uppercase tracking-wide">Weekly Total</span>
        </div>
        <div className="text-4xl font-bold text-emerald-900 flex items-start">
            <span className="text-2xl mt-1 font-medium mr-1">$</span>
            {totalSpent.toFixed(2)}
        </div>
        <div className="mt-4 w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-[45%]" />
        </div>
        <p className="text-xs text-emerald-600 mt-2 text-right">45% of weekly budget</p>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 mb-8">
        <h3 className="font-medium text-stone-800 mb-4">Quick Add</h3>
        <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
                <span className="absolute left-3 top-3 text-stone-400">$</span>
                <input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-stone-50 p-3 pl-7 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="bg-stone-50 p-3 rounded-xl outline-none text-sm text-stone-600"
            >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Education">Edu</option>
                <option value="Entertainment">Fun</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="flex gap-3">
            <input 
                type="text" 
                placeholder="Description (e.g. Coffee)" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 bg-stone-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button type="submit" className="bg-stone-900 text-white p-3 rounded-xl hover:bg-black transition-colors">
                <Plus size={24} />
            </button>
        </div>
      </form>

      {/* History List */}
      <div>
        <h3 className="font-medium text-stone-400 text-sm uppercase tracking-wide mb-4 ml-1">Recent Transactions</h3>
        <div className="space-y-3">
            {expenses.map(exp => (
                <div key={exp.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-stone-100">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                            <DollarSign size={18} />
                        </div>
                        <div>
                            <div className="font-medium text-stone-800">{exp.description}</div>
                            <div className="text-xs text-stone-400">{exp.date} • {exp.category}</div>
                        </div>
                    </div>
                    <div className="font-semibold text-stone-700">-${exp.amount.toFixed(2)}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
