import React, { useState } from 'react';
import { LABS } from '../constants';
import { Search, FlaskConical, GraduationCap, ArrowRight, Beaker, Droplets, Sun, Wind, Leaf, Layers, Microscope, Dna, Zap, Activity, Palette, Globe, Syringe, Droplet, Cloud, CircleDot, Maximize, TestTube, Milk, Timer, Scale, Atom } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, getLabColorClasses } from '../utils';
import { Subject } from '../types';

const ICON_MAP: Record<string, any> = {
  Beaker, Droplets, Sun, Wind, Leaf, Layers, Microscope, Dna, Zap, Activity, Palette, Globe, Syringe, Droplet, Cloud, CircleDot, Maximize, TestTube, Milk, FlaskConical, Timer, Scale, Atom
};

interface Props {
  onSelectLab: (id: string) => void;
  selectedSubject: Subject;
  onBack: () => void;
}

export default function Dashboard({ onSelectLab, selectedSubject, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const categoriesMap: Record<Subject, string[]> = {
    'Biology': ['All', 'Biochemistry', 'Cell Biology', 'Physiology', 'Genetics', 'Ecology'],
    'Chemistry': ['All', 'Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'],
    'Physics': ['All', 'Mechanics', 'Electricity', 'Thermal Physics', 'Waves']
  };

  const categories = categoriesMap[selectedSubject];

  const filteredLabs = LABS.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(search.toLowerCase()) || 
                         lab.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = lab.subject === selectedSubject;
    const matchesFilter = filter === 'All' || lab.category === filter;
    return matchesSearch && matchesSubject && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {selectedSubject} <span className="text-blue-600">Simulations</span>
              </h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <FlaskConical className="w-4 h-4" />
            SKM Digital Science Hub
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder={`Search ${selectedSubject.toLowerCase()} experiments...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-6 py-4 rounded-xl font-bold text-sm whitespace-nowrap transition-all",
                    filter === cat 
                      ? "bg-slate-900 text-white shadow-lg" 
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLabs.map((lab, index) => {
            const colors = getLabColorClasses(lab.color);
            const Icon = ICON_MAP[lab.icon] || FlaskConical;
            
            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectLab(lab.id)}
                className={cn(
                  "group rounded-2xl border p-6 transition-all cursor-pointer flex flex-col h-full hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5",
                  colors.light,
                  colors.border
                )}
              >
                <div className="mb-4 flex justify-between items-start">
                  <div className="p-3 bg-white/80 rounded-xl group-hover:bg-blue-50 transition-colors">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/80 text-slate-500 rounded border border-slate-100">
                    {lab.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {lab.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                  {lab.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                  <span className="text-xs font-bold text-slate-400">Interactive Lab</span>
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No simulations found</h3>
            <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </main>
    </div>
  );
}
