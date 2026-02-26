import React, { useState, useMemo } from 'react';
import { Lab } from '../types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface Props {
  lab: Lab;
  onComplete: (selections: { independent: string; dependent: string; controlled: string[] }) => void;
}

export default function VariableIdentification({ lab, onComplete }: Props) {
  const [independent, setIndependent] = useState('');
  const [dependent, setDependent] = useState('');
  const [controlled, setControlled] = useState<string[]>([]);
  const [error, setError] = useState('');

  const potentialControlledVariables = useMemo(() => {
    const otherIVs = lab.independentVariables
      .filter(v => v.id !== independent)
      .map(v => v.name);
    return [...otherIVs, ...lab.controlledVariables];
  }, [lab, independent]);

  const handleSubmit = () => {
    if (!independent || !dependent || controlled.length === 0) {
      setError('Please identify all variables before proceeding.');
      return;
    }
    // Check if they selected all potential controlled variables
    if (controlled.length < potentialControlledVariables.length) {
      setError(`In a valid scientific investigation, you must control ALL other variables. Please select all ${potentialControlledVariables.length} controlled variables.`);
      return;
    }
    onComplete({ independent, dependent, controlled });
  };

  const toggleControlled = (v: string) => {
    setControlled(prev => 
      prev.includes(v) ? prev.filter(i => i !== v) : [...prev, v]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Pre-Lab: Variable Identification</h2>
      </div>

      <p className="text-slate-600 mb-8">
        Before starting the experiment, you must correctly identify the variables involved in this investigation.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Independent Variable (What you change)
          </label>
          <select 
            value={independent}
            onChange={(e) => {
              setIndependent(e.target.value);
              setControlled([]); // Reset controlled when IV changes
            }}
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select variable...</option>
            {lab.independentVariables.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Dependent Variable (What you measure)
          </label>
          <select 
            value={dependent}
            onChange={(e) => setDependent(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select variable...</option>
            <option value={lab.dependentVariable.name}>{lab.dependentVariable.label}</option>
          </select>
        </div>

        {independent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Controlled Variables (What you keep the same)
            </label>
            <p className="text-xs text-slate-500 mb-3 italic">Select all variables that must remain constant to ensure a fair test.</p>
            <div className="grid grid-cols-1 gap-2">
              {potentialControlledVariables.map(v => (
                <button
                  key={v}
                  onClick={() => toggleControlled(v)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                    controlled.includes(v) 
                      ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm" 
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  <span className="text-sm font-medium">{v}</span>
                  {controlled.includes(v) ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 active:translate-y-0"
      >
        Begin Simulation
      </button>
    </motion.div>
  );
}
