import React from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Beaker, Atom, Microscope, ArrowRight, GraduationCap } from 'lucide-react';
import { Subject } from '../types';
import { cn } from '../utils';

interface Props {
  onSelectSubject: (subject: Subject) => void;
}

const SUBJECTS: { id: Subject; title: string; description: string; icon: any; color: string; bgColor: string; textColor: string }[] = [
  {
    id: 'Biology',
    title: 'Biology',
    description: 'Explore the living world, from cellular processes to complex ecosystems and genetics.',
    icon: Microscope,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600'
  },
  {
    id: 'Chemistry',
    title: 'Chemistry',
    description: 'Investigate matter, reactions, and the chemical foundations of our universe.',
    icon: Beaker,
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    id: 'Physics',
    title: 'Physics',
    description: 'Discover the laws of nature, energy, forces, and the fundamental principles of the physical world.',
    icon: Atom,
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  }
];

export default function HomePage({ onSelectSubject }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-6"
          >
            <FlaskConical className="w-5 h-5" />
            Digital Laboratory Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-slate-900 tracking-tight mb-8"
          >
            SKM Digital <span className="text-blue-600">Science Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            A high-fidelity virtual laboratory designed for IBMYP, IGCSE, IBDP, and A-Level excellence. 
            Select a subject to begin your scientific exploration.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                20+
              </div>
              <div className="text-sm font-bold text-slate-700">Active Simulations</div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-700">Exam Board Ready</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subject Selection */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBJECTS.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => onSelectSubject(subject.id)}
              className={cn(
                "group relative bg-white rounded-3xl p-8 border border-slate-200 transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 overflow-hidden"
              )}
            >
              {/* Decorative Background Icon */}
              <subject.icon className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
              
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", subject.bgColor)}>
                <subject.icon className={cn("w-8 h-8", subject.textColor)} />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                {subject.title}
              </h2>
              
              <p className="text-slate-500 leading-relaxed mb-8 text-lg">
                {subject.description}
              </p>
              
              <div className="flex items-center gap-2 font-bold text-blue-600 group-hover:gap-4 transition-all">
                Enter Laboratory
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-medium">
          <p>© 2024 SKM Digital Science Hub. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Biology</span>
            <span>Chemistry</span>
            <span>Physics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
