import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Lab, DataPoint } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter
} from 'recharts';
import { 
  Play, RotateCcw, Download, Trash2, Settings2, Info, Activity, BarChart3, ChevronLeft, Timer, Plus, Check, Maximize2, Minimize2, ShieldCheck, AlertTriangle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, exportToCSV, getLabColorClasses } from '../utils';

interface Props {
  lab: Lab;
  onBack: () => void;
  renderSimulation: (variables: Record<string, number>, isPaused: boolean) => React.ReactNode;
  calculateResult: (variables: Record<string, number>) => number;
}

export default function SimulationLayout({ lab, onBack, renderSimulation, calculateResult }: Props) {
  const colors = getLabColorClasses(lab.color);
  const [variables, setVariables] = useState<Record<string, number>>(
    lab.independentVariables.reduce((acc, v) => ({ ...acc, [v.id]: v.defaultValue }), {})
  );
  const [data, setData] = useState<DataPoint[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'method'>('theory');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Manual Entry State
  const [manualValue, setManualValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

  // Safety State
  const [selectedSafety, setSelectedSafety] = useState<string[]>([]);
  const [showSafetyPanel, setShowSafetyPanel] = useState(false);

  const toggleSafety = (id: string) => {
    setSelectedSafety(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const correctSafetyCount = useMemo(() => {
    return selectedSafety.filter(id => lab.safetyOptions.find(o => o.id === id)?.isCorrect).length;
  }, [selectedSafety, lab.safetyOptions]);

  const totalCorrectNeeded = useMemo(() => {
    return lab.safetyOptions.filter(o => o.isCorrect).length;
  }, [lab.safetyOptions]);

  const hasErrors = useMemo(() => {
    return selectedSafety.some(id => !lab.safetyOptions.find(o => o.id === id)?.isCorrect);
  }, [selectedSafety, lab.safetyOptions]);

  useEffect(() => {
    if (isTimerRunning) setShowStartOverlay(false);
  }, [isTimerRunning]);

  useEffect(() => {
    if (timeLeft === timerDuration) setShowStartOverlay(true);
  }, [timeLeft, timerDuration]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerDuration);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  const handleVariableChange = (id: string, value: number) => {
    setVariables(prev => ({ ...prev, [id]: value }));
  };

  const handleRecord = () => {
    const result = calculateResult(variables);
    addPoint(result, 'auto');
  };

  const handleManualRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(manualValue);
    if (!isNaN(val)) {
      addPoint(val, 'manual');
      setManualValue('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const addPoint = (y: number, type: 'manual' | 'auto') => {
    const xVar = lab.independentVariables[0].id;
    const newDataPoint: DataPoint = {
      x: variables[xVar],
      y: y,
      timestamp: Date.now(),
      type
    };
    setData(prev => [...prev, newDataPoint].sort((a, b) => a.x - b.x));
  };

  const handleClear = () => setData([]);
  const handleExport = () => {
    const exportData = data.map(d => ({
      [lab.independentVariables[0].name]: d.x,
      [lab.dependentVariable.label]: d.y
    }));
    exportToCSV(exportData, `${lab.id}-results.csv`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{lab.title}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{lab.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear Data
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto w-full">
        {/* Left Column: Guide */}
        <section className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-120px)] sticky top-[88px]">
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('theory')}
              className={cn(
                "flex-1 py-3 text-sm font-bold transition-all border-b-2",
                activeTab === 'theory' ? cn("border-b-2", colors.border, colors.text) : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              Theory
            </button>
            <button 
              onClick={() => setActiveTab('method')}
              className={cn(
                "flex-1 py-3 text-sm font-bold transition-all",
                activeTab === 'method' ? cn("border-b-2", colors.border, colors.text) : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              Method
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 prose prose-slate prose-base max-w-none">
            <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
              {activeTab === 'theory' ? lab.theory : lab.method}
            </ReactMarkdown>
          </div>
        </section>

        {/* Right Column: Simulation, Variables, and Analysis */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Panel 3: Simulation */}
          <section className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-inner relative overflow-hidden flex items-center justify-center min-h-[500px]">
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 z-10">
              <Activity className={cn("w-4 h-4 text-emerald-400", isTimerRunning && "animate-pulse")} />
              <span className="text-xs font-mono text-white/80 uppercase tracking-widest">
                {isTimerRunning ? 'Experiment in Progress' : 'Simulation Paused'}
              </span>
            </div>

            {/* Fullscreen Toggle */}
            <button 
              onClick={() => setIsFullscreen(true)}
              className="absolute bottom-6 right-6 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white/60 hover:text-white transition-all z-10"
              title="Full Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Safety Check Trigger */}
            <button 
              onClick={() => setShowSafetyPanel(true)}
              className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/80 hover:text-white transition-all z-10"
            >
              <ShieldCheck className={cn("w-4 h-4", correctSafetyCount === totalCorrectNeeded && !hasErrors ? "text-emerald-400" : "text-amber-400")} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Safety Check</span>
              {selectedSafety.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/10 rounded text-[8px]">
                  {correctSafetyCount}/{totalCorrectNeeded}
                </span>
              )}
            </button>

            {/* Safety Panel Overlay */}
            <AnimatePresence>
              {showSafetyPanel && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute left-6 top-20 bottom-20 w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl z-30 flex flex-col shadow-2xl"
                >
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={cn("w-5 h-5", colors.text)} />
                      <h3 className="text-sm font-bold text-white">Safety Precautions</h3>
                    </div>
                    <button onClick={() => setShowSafetyPanel(false)} className="p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Select all correct precautions for this lab:</p>
                    {lab.safetyOptions.map(option => {
                      const isSelected = selectedSafety.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleSafety(option.id)}
                          className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all flex gap-3 items-start group",
                            isSelected 
                              ? cn(colors.bg.replace('bg-', 'bg-').replace('600', '600/20'), colors.border.replace('border-', 'border-').replace('600', '500/50')) 
                              : "bg-white/5 border-white/5 hover:border-white/10"
                          )}
                        >
                          <div className={cn(
                            "mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all",
                            isSelected ? cn(colors.bg.replace('600', '500'), colors.border.replace('600', '400')) : "border-white/20 group-hover:border-white/40"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className={cn(
                            "text-xs font-medium leading-relaxed",
                            isSelected ? "text-white" : "text-white/60"
                          )}>
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-6 border-t border-white/10 bg-black/20">
                    {hasErrors ? (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Incorrect selection included</span>
                      </div>
                    ) : correctSafetyCount === totalCorrectNeeded ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">All safety measures identified!</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {totalCorrectNeeded - correctSafetyCount} more to identify
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timer Overlay */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10">
              <div className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-md transition-all",
                isTimerRunning ? cn(colors.bg.replace('600', '600/20'), colors.border.replace('600', '500/50'), colors.ring) : "bg-black/40 border-white/10"
              )}>
                <Timer className={cn("w-4 h-4", isTimerRunning ? colors.text.replace('600', '400') + " animate-spin-slow" : "text-white/40")} />
                <span className="text-xl font-mono font-bold text-white">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
                {!isTimerRunning && timeLeft > 0 ? (
                  <button 
                    onClick={startTimer}
                    className="p-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors shadow-lg shadow-emerald-900/20"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                ) : isTimerRunning ? (
                  <button 
                    onClick={resetTimer}
                    className="p-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                ) : (
                  <button 
                    onClick={startTimer}
                    className={cn("p-1.5 rounded-lg text-white transition-colors", colors.bg, colors.hover)}
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                )}
              </div>
              {!isTimerRunning && (
                <div className="flex gap-1">
                  {[30, 60, 120].map(d => (
                    <button
                      key={d}
                      onClick={() => { setTimerDuration(d); setTimeLeft(d); }}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold transition-all",
                        timerDuration === d ? cn(colors.bg, "text-white") : "bg-black/40 text-white/40 hover:text-white/60"
                      )}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              )}
            </div>

            {renderSimulation(variables, !isTimerRunning)}

            {/* Start Overlay */}
            <AnimatePresence>
              {!isTimerRunning && (timeLeft === timerDuration || timeLeft === 0) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-20 p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm border border-slate-100"
                  >
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", colors.light)}>
                      <Play className={cn("w-8 h-8 fill-current", colors.text)} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Ready to Start?</h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium px-4">Adjust your variables below, then click start to begin the {timerDuration}s experiment.</p>
                    
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={startTimer}
                        className={cn("w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2", colors.bg, colors.hover, colors.shadow.replace('500/5', '200'))}
                      >
                        <Play className="w-5 h-5 fill-current" />
                        Start Experiment
                      </button>
                      
                      <button 
                        onClick={() => setIsFullscreen(true)}
                        className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                      >
                        <Maximize2 className="w-5 h-5" />
                        Enter Full Screen
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Panel 2: Variables */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Settings2 className={cn("w-6 h-6", colors.text)} />
                <h2 className="text-lg font-bold text-slate-800">Variable Controls</h2>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 1: Adjust</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {lab.independentVariables.map(v => (
                <div key={v.id} className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">{v.name}</label>
                    <span className={cn("px-3 py-1 rounded-lg text-sm font-mono font-bold border", colors.light, colors.text, colors.border.replace('600', '100'))}>
                      {variables[v.id]} {v.unit}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min={v.min}
                    max={v.max}
                    step={v.step}
                    value={variables[v.id]}
                    onChange={(e) => handleVariableChange(v.id, parseFloat(e.target.value))}
                    className={cn("w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer", colors.accent)}
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span>{v.min}{v.unit}</span>
                    <span>{v.max}{v.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 2: Manual Record</span>
                  <div className={cn("flex items-center gap-1 text-[10px] font-bold", colors.text)}>
                    <Info className="w-3.5 h-3.5" />
                    Count & Enter
                  </div>
                </div>
                <form onSubmit={handleManualRecord} className="flex gap-3">
                  <div className="relative flex-1">
                    <input 
                      type="number"
                      step="any"
                      placeholder={`Enter ${lab.dependentVariable.unit}...`}
                      value={manualValue}
                      onChange={(e) => setManualValue(e.target.value)}
                      className={cn("w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base focus:ring-2 outline-none transition-all font-medium", colors.ring.replace('500/20', '500'))}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                      {lab.dependentVariable.unit}
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!manualValue}
                    className={cn(
                      "px-6 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg",
                      showSuccess 
                        ? "bg-emerald-500 text-white shadow-emerald-200" 
                        : "bg-slate-800 hover:bg-slate-900 text-white disabled:opacity-50 shadow-slate-200"
                    )}
                  >
                    {showSuccess ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {showSuccess ? 'Added' : 'Add'}
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alternative: Auto Record</span>
                <button 
                  onClick={handleRecord}
                  className={cn("w-full flex items-center justify-center gap-3 py-4 text-white font-bold rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0", colors.bg, colors.hover, colors.shadow.replace('500/5', '100'))}
                >
                  <Play className="w-5 h-5 fill-current" />
                  Auto-Calculate Result
                </button>
              </div>
            </div>
          </section>

          {/* Panel 4: Analysis (Moved Below) */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className={cn("w-6 h-6", colors.text)} />
                <h2 className="text-lg font-bold text-slate-800">Experimental Results & Data Analysis</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full border", colors.light, colors.border.replace('600', '100'))}>
                  <div className={cn("w-2 h-2 rounded-full", colors.bg)} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-tighter", colors.text.replace('600', '700'))}>Auto</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter">Manual</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 h-[450px] bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                      label={{ 
                        value: `${lab.independentVariables[0].name} (${lab.independentVariables[0].unit})`, 
                        position: 'bottom', 
                        offset: 20, 
                        fontSize: 14, 
                        fontWeight: 700,
                        fill: '#1e293b'
                      }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                      label={{ 
                        value: `${lab.dependentVariable.label} (${lab.dependentVariable.unit})`, 
                        angle: -90, 
                        position: 'left', 
                        offset: 0, 
                        fontSize: 14, 
                        fontWeight: 700,
                        fill: '#1e293b'
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ fontWeight: 700, fontSize: '14px' }}
                      labelStyle={{ fontWeight: 800, color: '#64748b', marginBottom: '4px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="y" 
                      stroke={colors.chart} 
                      strokeWidth={4} 
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        const isManual = payload.type === 'manual';
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={isManual ? 7 : 6} 
                            fill={isManual ? '#f59e0b' : colors.chart} 
                            stroke="#fff" 
                            strokeWidth={3} 
                          />
                        );
                      }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                      name={lab.dependentVariable.label}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Data Log</div>
                <div className="flex-1 overflow-y-auto max-h-[400px] border border-slate-100 rounded-2xl bg-white shadow-inner">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                        <th className="p-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">{lab.independentVariables[0].name}</th>
                        <th className="p-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">{lab.dependentVariable.unit}</th>
                        <th className="p-4 font-bold text-slate-500 uppercase text-[10px] tracking-wider">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-12 text-center text-slate-400 italic">
                            <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            No data recorded yet
                          </td>
                        </tr>
                      ) : (
                        data.map((d, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-mono font-bold text-slate-700">{d.x}</td>
                            <td className={cn("p-4 font-mono font-bold", colors.text)}>{d.y.toFixed(2)}</td>
                            <td className="p-4">
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider",
                                d.type === 'manual' ? "bg-amber-100 text-amber-700" : cn(colors.light, colors.text.replace('600', '700'))
                              )}>
                                {d.type}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col"
          >
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.bg)}>
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold leading-none">{lab.title}</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Immersive Simulation Mode</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Timer in Fullscreen */}
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-md transition-all",
                    isTimerRunning ? cn(colors.bg.replace('600', '600/20'), colors.border.replace('600', '500/50'), colors.ring) : "bg-black/40 border-white/10"
                  )}>
                    <Timer className={cn("w-4 h-4", isTimerRunning ? colors.text.replace('600', '400') + " animate-spin-slow" : "text-white/40")} />
                    <span className="text-xl font-mono font-bold text-white">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                    {!isTimerRunning ? (
                      <button 
                        onClick={startTimer}
                        className="p-2 hover:bg-white/10 text-emerald-400 rounded-lg transition-colors"
                        title="Start Timer"
                      >
                        <Play className="w-5 h-5 fill-current" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsTimerRunning(false)}
                        className="p-2 hover:bg-white/10 text-amber-400 rounded-lg transition-colors"
                        title="Pause Timer"
                      >
                        <div className="w-5 h-5 flex gap-1 items-center justify-center">
                          <div className="w-1.5 h-4 bg-current rounded-full" />
                          <div className="w-1.5 h-4 bg-current rounded-full" />
                        </div>
                      </button>
                    )}
                    <button 
                      onClick={resetTimer}
                      className="p-2 hover:bg-white/10 text-white/60 rounded-lg transition-colors"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all"
                >
                  <Minimize2 className="w-4 h-4" />
                  <span className="text-sm font-bold">Exit Full Screen</span>
                </button>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
              <div className="w-full h-full max-w-6xl max-h-[80vh]">
                {renderSimulation(variables, !isTimerRunning)}
              </div>

              {/* Safety Check Trigger in Fullscreen */}
              <button 
                onClick={() => setShowSafetyPanel(true)}
                className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/80 hover:text-white transition-all z-10"
              >
                <ShieldCheck className={cn("w-4 h-4", correctSafetyCount === totalCorrectNeeded && !hasErrors ? "text-emerald-400" : "text-amber-400")} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Safety Check</span>
              </button>

              {/* Safety Panel Overlay in Fullscreen */}
              <AnimatePresence>
                {showSafetyPanel && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute left-6 top-20 bottom-20 w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl z-30 flex flex-col shadow-2xl"
                  >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                        <h3 className="text-sm font-bold text-white">Safety Precautions</h3>
                      </div>
                      <button onClick={() => setShowSafetyPanel(false)} className="p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Select all correct precautions for this lab:</p>
                      {lab.safetyOptions.map(option => {
                        const isSelected = selectedSafety.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleSafety(option.id)}
                            className={cn(
                              "w-full text-left p-4 rounded-2xl border transition-all flex gap-3 items-start group",
                              isSelected 
                                ? "bg-blue-600/20 border-blue-500/50" 
                                : "bg-white/5 border-white/5 hover:border-white/10"
                            )}
                          >
                            <div className={cn(
                              "mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all",
                              isSelected ? "bg-blue-500 border-blue-400" : "border-white/20 group-hover:border-white/40"
                            )}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className={cn(
                              "text-xs font-medium leading-relaxed",
                              isSelected ? "text-white" : "text-white/60"
                            )}>
                              {option.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-6 border-t border-white/10 bg-black/20">
                      {hasErrors ? (
                        <div className="flex items-center gap-2 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase">Incorrect selection included</span>
                        </div>
                      ) : correctSafetyCount === totalCorrectNeeded ? (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Check className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase">All safety measures identified!</span>
                        </div>
                      ) : (
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                          {totalCorrectNeeded - correctSafetyCount} more to identify
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Start Overlay in Fullscreen */}
              <AnimatePresence>
                {showStartOverlay && !isTimerRunning && (timeLeft === timerDuration || timeLeft === 0) && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm border border-slate-100 relative"
                    >
                      <button 
                        onClick={() => setShowStartOverlay(false)}
                        className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <Plus className="w-5 h-5 text-slate-400 rotate-45" />
                      </button>
                      <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6", colors.light)}>
                        <Play className={cn("w-10 h-10 fill-current", colors.text)} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">Begin Experiment</h3>
                      <p className="text-base text-slate-500 mb-8 font-medium">Ready to observe the {lab.title} process for {timerDuration} seconds?</p>
                      <button 
                        onClick={startTimer}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:scale-105 active:scale-95"
                      >
                        Start Now
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fullscreen Footer Controls (Simplified) */}
            <div className="px-8 py-6 bg-slate-900/50 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-12">
                {lab.independentVariables.map(v => (
                  <div key={v.id} className="w-64 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{v.name}</label>
                      <span className="text-sm font-mono font-bold text-blue-400">
                        {variables[v.id]} {v.unit}
                      </span>
                    </div>
                    <input 
                      type="range"
                      min={v.min}
                      max={v.max}
                      step={v.step}
                      value={variables[v.id]}
                      onChange={(e) => handleVariableChange(v.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                ))}
              </div>

              {/* Manual Record in Fullscreen */}
              <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Record Result</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      placeholder="Enter % change"
                      value={manualValue}
                      onChange={(e) => setManualValue(e.target.value)}
                      className="w-32 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleManualRecord}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-2"
                    >
                      {showSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
