import React, { useState } from 'react';
import { LABS } from '../constants';
import { Search, FlaskConical, GraduationCap, ArrowRight, Beaker, Droplets, Sun, Wind, Leaf, Layers, Microscope, Dna, Zap, Activity, Palette, Globe, Syringe, Droplet, Cloud, CircleDot, Maximize, TestTube, Milk } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, getLabColorClasses } from '../utils';

const ICON_MAP: Record<string, any> = {
  Beaker, Droplets, Sun, Wind, Leaf, Layers, Microscope, Dna, Zap, Activity, Palette, Globe, Syringe, Droplet, Cloud, CircleDot, Maximize, TestTube, Milk
};

interface Props {
  onSelectLab: (id: string) => void;
}

export default function Dashboard({ onSelectLab }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Biochemistry', 'Cell Biology', 'Physiology', 'Genetics', 'Ecology'];

  const filteredLabs = LABS.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(search.toLowerCase()) || 
                         lab.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || lab.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
                <FlaskConical className="w-5 h-5" />
                Digital Laboratory Hub
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
                SKM Bio <span className="text-blue-600">Simulations</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Interactive, high-fidelity biological simulations designed for IGCSE, IBDP, and A-Level excellence. 
                Explore complex concepts through real-time data analysis and virtual experimentation.
              </p>
            </div>
            <div className="flex flex-col gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {LABS.length}
                </div>
                <div className="text-sm font-bold text-slate-700">Active Simulations</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-700">Exam Board Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search experiments (e.g., 'Enzyme', 'Osmosis')..."
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
