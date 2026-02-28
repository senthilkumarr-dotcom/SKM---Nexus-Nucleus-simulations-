import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { Plus, Scale, Weight, Waves, Thermometer, Lightbulb, FlaskConical, Timer, Check, RotateCcw, Play, Activity, Settings2, Flame } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const EnzymeSimulation = ({ variables, isPaused = false, setVariables, isFullscreen }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }) => {
  const { temp, ph } = variables;
  
  const tempEffect = Math.exp(-0.5 * Math.pow((temp - 37) / 15, 2));
  const phEffect = Math.exp(-0.5 * Math.pow((ph - 7) / 2, 2));
  const rate = tempEffect * phEffect;
  
  const isDenatured = temp > 45;
  const denaturationFactor = Math.max(0, (temp - 45) / 55);
  
  // Bubbles per minute (max 60 bpm for easy counting)
  const bpm = Math.floor(rate * 60);
  const collisionSpeed = 1 + (temp / 20);

  // Gas Syringe State
  const [volume, setVolume] = React.useState(0);
  const lastUpdate = React.useRef(Date.now());

  React.useEffect(() => {
    if (isPaused) {
      lastUpdate.current = Date.now();
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastUpdate.current) / 1000; // seconds
      lastUpdate.current = now;
      
      // rate is cm3/min, so rate/60 is cm3/sec
      // Let's make it so at rate=1, we get ~80cm3 in 60s
      const increment = (rate * 1.33 * delta); 
      setVolume(prev => Math.min(100, prev + increment)); 
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, rate]);

  // Tally State
  const [tally, setTally] = React.useState(0);

  // Reset tally when variables change or experiment resets
  React.useEffect(() => {
    setTally(0);
    setVolume(0);
  }, [temp, ph, isPaused && volume > 0]);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      {/* Status Labels */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <AnimatePresence>
          {isDenatured && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-[10px] font-bold text-red-400 uppercase tracking-widest backdrop-blur-sm"
            >
              Enzyme Denatured
            </motion.div>
          )}
          {temp >= 30 && temp <= 40 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest backdrop-blur-sm"
            >
              Optimum Temperature
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 w-full">
        {/* Left Side: Reaction Setup */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-48 h-48 flex items-center justify-center bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
            {/* Enzyme */}
            <motion.div 
              animate={{ 
                scale: 1 + (denaturationFactor * 0.1),
                rotate: isPaused ? 0 : denaturationFactor * 5
              }}
              className="relative w-24 h-24 bg-indigo-500/40 border-4 border-indigo-400/60 rounded-full flex items-center justify-center"
            >
              <motion.div 
                animate={{ 
                  width: isDenatured ? 45 : 30,
                  height: isDenatured ? 15 : 30,
                  borderRadius: isDenatured ? "20%" : "50% 50% 0 0",
                  y: isDenatured ? -8 : -15
                }}
                className="absolute top-0 bg-slate-900 border-2 border-indigo-400/30"
                style={{ width: 30, height: 30 }}
              />
              <span className="text-[8px] font-black text-indigo-200/50 uppercase">Enzyme</span>
            </motion.div>

            {/* Substrates */}
            {!isPaused && Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: [
                    Math.cos(i) * 100, // Start far
                    0,                 // Enter active site
                    0,                 // Stay in active site (Complex)
                    Math.cos(i + 2) * 100 // Leave as product
                  ],
                  y: [
                    Math.sin(i) * 100, 
                    isDenatured ? -35 : -45, 
                    isDenatured ? -35 : -45,
                    Math.sin(i + 2) * 100
                  ],
                  scale: [1, 1.1, 1.1, 1],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 0, 0, 180],
                  backgroundColor: [
                    "rgba(251, 191, 36, 0.8)", // Amber (Substrate)
                    "rgba(251, 191, 36, 0.8)", // Amber
                    "rgba(96, 165, 250, 0.8)", // Blue (Product)
                    "rgba(96, 165, 250, 0.8)"  // Blue
                  ]
                }}
                transition={{ 
                  duration: 4 / collisionSpeed, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  times: [0, 0.4, 0.6, 1], // Control timing for the "Complex" phase
                  ease: "easeInOut"
                }}
                className="absolute w-6 h-6 border-2 border-amber-200/50 rounded-t-full shadow-lg flex items-center justify-center"
              >
                <span className="text-[6px] font-bold text-amber-900">S</span>
              </motion.div>
            ))}
          </div>

          {/* Reaction Vessel */}
          <div className="relative w-24 h-32 bg-white/5 border-2 border-white/10 rounded-b-2xl overflow-hidden shadow-xl">
            <div className="absolute bottom-0 w-full h-3/4 bg-blue-400/20" />
            <div className="absolute inset-0 pointer-events-none">
              {!isPaused && bpm > 0 && Array.from({ length: Math.min(bpm, 15) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, x: 10 + Math.random() * 60, opacity: 0 }}
                  animate={{ 
                    y: [100, 10], 
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.5, 1.2]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: (i * (60 / bpm)),
                    ease: "easeOut"
                  }}
                  className="absolute w-3 h-3 bg-white/40 rounded-full border border-white/30 backdrop-blur-[1px]"
                />
              ))}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white/20 uppercase tracking-tighter">H₂O₂ Solution</div>
          </div>
        </div>

        {/* Connector Tube */}
        <div className="w-16 h-2 bg-white/10 border-y border-white/20 relative">
          {!isPaused && bpm > 0 && (
            <motion.div 
              animate={{ x: [0, 64] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-full w-2 bg-white/30 blur-[1px]"
            />
          )}
        </div>

        {/* Right Side: Gas Syringe (The Measurement Tool) */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Gas Syringe (O₂ Collection)</div>
          <div className="relative w-64 h-16 bg-white/5 border-2 border-white/20 rounded-r-lg flex items-center">
            {/* Syringe Barrel Markings */}
            <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full pb-1">
                  <div className={cn("w-px bg-white/20", i % 5 === 0 ? "h-4" : "h-2")} />
                  {i % 5 === 0 && <span className="text-[8px] text-white/30 mt-1 font-mono">{i * 10}</span>}
                </div>
              ))}
            </div>

            {/* Gas Volume (The Plunger movement) */}
            <motion.div 
              animate={{ width: `${volume}%` }}
              className="h-full bg-emerald-500/20 border-r-2 border-emerald-400/50 relative overflow-hidden"
            >
              {!isPaused && bpm > 0 && (
                <div className="absolute inset-0 opacity-30">
                   {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ x: [0, 200], opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute top-1/2 w-1 h-1 bg-white rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Plunger Handle */}
            <motion.div 
              animate={{ left: `${volume}%` }}
              className="absolute h-full w-4 bg-slate-700 border-x border-white/20 z-10 flex items-center justify-center"
            >
              <div className="w-1 h-8 bg-white/10 rounded-full" />
            </motion.div>
            <motion.div 
               animate={{ left: `calc(${volume}% + 4px)` }}
               className="absolute h-4 w-32 bg-slate-800 border-y border-r border-white/20 rounded-r-full"
            />
          </div>

          {/* Digital Readout */}
          <div className="flex gap-4">
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
               <div className="text-[8px] text-white/40 uppercase font-bold mb-1 text-center">Volume Collected</div>
               <div className="text-2xl font-mono font-bold text-emerald-400">
                 {volume.toFixed(1)} <span className="text-sm text-emerald-600">cm³</span>
               </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center justify-center min-w-[120px]">
               <div className="text-[8px] text-white/40 uppercase font-bold mb-1 text-center">Manual Tally</div>
               <div className="flex items-center gap-3">
                 <div className="text-2xl font-mono font-bold text-amber-400">{tally}</div>
                 <button 
                   disabled={isPaused}
                   onClick={() => setTally(prev => prev + 1)}
                   className="p-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 rounded-lg text-amber-950 transition-all active:scale-90"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-4">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-[8px] text-white/40 uppercase font-bold mb-1">Collision Frequency</div>
          <div className="text-sm font-mono text-white">{(collisionSpeed * 10).toFixed(1)} Hz</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-[8px] text-white/40 uppercase font-bold mb-1">Active Site Integrity</div>
          <div className={cn("text-sm font-mono", isDenatured ? "text-red-400" : "text-emerald-400")}>
            {(100 - (denaturationFactor * 100)).toFixed(0)}%
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="text-[8px] text-white/40 uppercase font-bold mb-1">Reaction Rate</div>
          <div className="text-sm font-mono text-blue-400">{(rate * 5).toFixed(2)} cm³/min</div>
        </div>
      </div>
    </div>
  );
};

export const OsmosisSimulation = ({ variables, isPaused = false, setVariables, isFullscreen }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }) => {
  const { molarity } = variables;
  const [initialMass, setInitialMass] = React.useState<number | null>(null);
  const [currentMass, setCurrentMass] = React.useState<number>(0);
  const [isSubmerged, setIsSubmerged] = React.useState(false);
  const [isDrying, setIsDrying] = React.useState(false);
  const [hasDried, setHasDried] = React.useState(false);
  const [isMeasuredFinal, setIsMeasuredFinal] = React.useState(false);

  // Potato water potential ~0.3M
  const isotonicPoint = 0.3;
  // Rate of change: at 1M (hypertonic), it loses mass. At 0M (hypotonic), it gains mass.
  // Let's make it more visible: ~15-20% change in 60s.
  const rateOfChange = (isotonicPoint - molarity) * 0.004; // mass change per second per gram

  // Reset simulation when variables change
  React.useEffect(() => {
    setInitialMass(null);
    setCurrentMass(0);
    setIsSubmerged(false);
    setIsDrying(false);
    setHasDried(false);
    setIsMeasuredFinal(false);
  }, [molarity]);

  React.useEffect(() => {
    if (isSubmerged && !isPaused) {
      const interval = setInterval(() => {
        setCurrentMass(prev => prev + (prev * rateOfChange));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSubmerged, isPaused, rateOfChange]);

  const handleMeasureInitial = () => {
    const mass = 5.00; // Controlled variable: consistent initial mass
    setInitialMass(mass);
    setCurrentMass(mass);
    setIsSubmerged(false);
    setIsDrying(false);
    setHasDried(false);
    setIsMeasuredFinal(false);
  };

  const handleSubmerge = () => {
    if (initialMass !== null) {
      setIsSubmerged(true);
      setIsDrying(false);
      setHasDried(false);
      setIsMeasuredFinal(false);
    }
  };

  const handleRemoveFromBeaker = () => {
    setIsSubmerged(false);
    setIsDrying(false);
    setHasDried(false);
  };

  const handleDry = () => {
    setIsDrying(true);
    setTimeout(() => {
      setIsDrying(false);
      setHasDried(true);
    }, 2000);
  };

  const handleMeasureFinal = () => {
    setIsSubmerged(false);
    setIsMeasuredFinal(true);
  };

  const percentageChange = initialMass ? ((currentMass - initialMass) / initialMass) * 100 : 0;
  const isBurst = (currentMass / (initialMass || 5)) > 1.4;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-8">
      {/* Status Guidance - Repositioned to top-right to avoid blocking balance */}
      <div className="absolute top-6 right-6 z-20">
        <AnimatePresence mode="wait">
          {initialMass === null && (
            <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-xl text-[10px] font-bold text-amber-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 1: Measure Initial Mass
            </motion.div>
          )}
          {initialMass !== null && !isSubmerged && !isMeasuredFinal && !hasDried && (
            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 2: Submerge Potato in Solution
            </motion.div>
          )}
          {isSubmerged && !isPaused && (
            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-[10px] font-bold text-emerald-400 uppercase tracking-widest backdrop-blur-md animate-pulse shadow-lg">
              Osmosis in Progress...
            </motion.div>
          )}
          {isSubmerged && isPaused && (
            <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-slate-500/20 border border-slate-500/50 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 3: Start Timer to Begin
            </motion.div>
          )}
          {!isSubmerged && initialMass !== null && !isMeasuredFinal && !hasDried && currentMass !== initialMass && (
            <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-xl text-[10px] font-bold text-amber-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 4: Dry Potato with Cloth
            </motion.div>
          )}
          {hasDried && !isMeasuredFinal && (
            <motion.div key="6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 5: Measure Final Mass
            </motion.div>
          )}
          {isMeasuredFinal && (
            <motion.div key="7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-xl text-[10px] font-bold text-purple-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
              Step 6: Calculate % Change & Record
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-center gap-12 w-full">
        {/* Cellular View (New) */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cellular View</div>
          <div className="relative w-64 h-56 bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-4 gap-4">
            {/* Plant Cell */}
            <div className="flex-1 relative flex flex-col items-center justify-center border-b border-white/5 pb-2">
              <span className="absolute top-0 left-0 text-[8px] text-white/20 uppercase font-bold">Plant Cell</span>
              <div className="relative w-24 h-16 border-2 border-emerald-500/50 rounded-md flex items-center justify-center">
                {/* Vacuole */}
                <motion.div 
                  animate={{ 
                    scale: 0.5 + (currentMass / (initialMass || 5)) * 0.5,
                    borderRadius: molarity > isotonicPoint ? "40%" : "10%"
                  }}
                  className="w-full h-full bg-blue-400/30 border border-blue-300/50"
                />
                {/* Cell Wall (Static) */}
                <div className="absolute inset-0 border-2 border-emerald-600/30 pointer-events-none" />
                
                {/* State Label */}
                <div className="absolute -bottom-6 text-[8px] font-bold uppercase tracking-tighter">
                  {molarity < isotonicPoint ? (
                    <span className="text-emerald-400">Turgid</span>
                  ) : molarity > isotonicPoint ? (
                    <span className="text-amber-400">Plasmolyzed</span>
                  ) : (
                    <span className="text-blue-400">Flaccid (Isotonic)</span>
                  )}
                </div>
              </div>
              
              {/* Water Arrows (Plant) */}
              {isSubmerged && !isPaused && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: molarity > isotonicPoint ? [0, 40] : [40, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-300 rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Animal Cell (Red Blood Cell) */}
            <div className="flex-1 relative flex flex-col items-center justify-center pt-2">
              <span className="absolute top-2 left-0 text-[8px] text-white/20 uppercase font-bold">Animal Cell</span>
              
              <div className="relative">
                <motion.div 
                  animate={{ 
                    scale: isBurst ? [0.3 + (currentMass / (initialMass || 5)) * 0.7, 1.5, 0] : 0.3 + (currentMass / (initialMass || 5)) * 0.7,
                    opacity: isBurst ? [1, 1, 0] : 1,
                  }}
                  transition={isBurst ? { duration: 0.3, times: [0, 0.5, 1] } : {}}
                  className="w-12 h-12 bg-red-500/60 border-2 border-red-400/50 rounded-full shadow-inner"
                />
                
                {/* Burst Particles */}
                {isBurst && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{ 
                          scale: [0, 1.5, 0],
                          x: (Math.random() - 0.5) * 80,
                          y: (Math.random() - 0.5) * 80,
                          opacity: [1, 0]
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="absolute w-2 h-2 bg-red-600 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* State Label */}
              <div className="absolute -bottom-2 text-[8px] font-bold uppercase tracking-tighter">
                {molarity < isotonicPoint ? (
                  <span className="text-emerald-400">{isBurst ? "Cytolysis (Burst)" : "Hemolysis"}</span>
                ) : molarity > isotonicPoint ? (
                  <span className="text-amber-400">Crenated (Shriveled)</span>
                ) : (
                  <span className="text-blue-400">Normal</span>
                )}
              </div>

              {/* Water Arrows (Animal) */}
              {isSubmerged && !isPaused && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        x: molarity > isotonicPoint ? [0, 40] : [40, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-300 rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Digital Scale */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Electronic Balance</div>
          <div className="relative w-48 h-32 bg-slate-800 rounded-t-xl border-x-4 border-t-4 border-slate-700 shadow-2xl flex flex-col items-center">
            {/* Scale Plate */}
            <div className="absolute -top-2 w-40 h-4 bg-slate-600 rounded-full border border-white/10" />
            
            {/* Digital Display */}
            <div className="mt-12 bg-black/60 px-4 py-2 rounded border border-emerald-500/30 w-32 text-center">
              <div className="text-xl font-mono font-bold text-emerald-400">
                {(!isSubmerged && (initialMass !== null || isMeasuredFinal)) ? currentMass.toFixed(2) : "0.00"}
                <span className="text-[10px] ml-1 text-emerald-600">g</span>
              </div>
            </div>

            {/* Potato on Scale */}
            {!isSubmerged && (initialMass !== null || isMeasuredFinal) && (
              <motion.div 
                layoutId="potato"
                className="absolute -top-10 w-20 h-10 bg-amber-100/90 rounded-2xl border-2 border-amber-200/50 shadow-lg flex items-center justify-center"
              >
                <span className="text-[8px] font-bold text-amber-900/40 uppercase">Potato</span>
                {hasDried && <div className="absolute -inset-1 border border-emerald-400/30 rounded-2xl animate-pulse" />}
              </motion.div>
            )}
          </div>
          
          <button 
            onClick={isMeasuredFinal ? handleMeasureInitial : (initialMass === null ? handleMeasureInitial : (hasDried ? handleMeasureFinal : handleDry))}
            disabled={!isMeasuredFinal && initialMass !== null && isSubmerged}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white text-xs font-bold rounded-lg border border-white/10 transition-all active:scale-95"
          >
            {isMeasuredFinal ? "New Sample" : (initialMass === null ? "Measure Initial Mass" : (hasDried ? "Measure Final Mass" : "Dry with Cloth"))}
          </button>
        </div>

        {/* Drying Station (New) */}
        <AnimatePresence>
          {isDrying && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 flex flex-col items-center gap-4 shadow-2xl"
            >
              <div className="relative w-32 h-20 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-40 h-40 bg-white/80 rotate-12 absolute -top-10"
                />
                <span className="text-[10px] font-bold text-slate-800 uppercase z-10">Drying...</span>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-widest">Removing Surface Water</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beaker */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Beaker ({molarity}M Sucrose)</div>
          <div className="relative w-48 h-56 bg-white/5 border-x-2 border-b-2 border-white/20 rounded-b-3xl overflow-hidden shadow-2xl">
            {/* Solution */}
            <div className="absolute bottom-0 w-full h-4/5 bg-blue-400/20 backdrop-blur-[2px]">
              <div className="absolute top-0 w-full h-2 bg-blue-300/30" />
              
              {/* Osmosis Particles */}
              {isSubmerged && !isPaused && Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: molarity > isotonicPoint ? [20, -20] : [-20, 20],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.5 
                  }}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                />
              ))}
            </div>

            {/* Potato in Beaker */}
            {isSubmerged && (
              <motion.div 
                layoutId="potato"
                animate={{ 
                  y: [0, 5, 0],
                  scale: 1 + ((currentMass - (initialMass || 5)) / (initialMass || 5)) * 2
                }}
                transition={{ 
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10 bg-amber-100/90 rounded-2xl border-2 border-amber-200/50 shadow-lg flex items-center justify-center z-10"
              >
                <span className="text-[8px] font-bold text-amber-900/40 uppercase">Potato</span>
              </motion.div>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
              <Waves className="w-8 h-8 text-blue-400" />
              <span className="text-[8px] font-bold text-white uppercase tracking-tighter">Sucrose Solution</span>
            </div>
          </div>

          <button 
            disabled={initialMass === null || isMeasuredFinal}
            onClick={isSubmerged ? handleRemoveFromBeaker : handleSubmerge}
            className={cn(
              "px-4 py-2 text-white text-xs font-bold rounded-lg shadow-lg transition-all active:scale-95",
              isSubmerged ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
            )}
          >
            {isSubmerged ? "Remove from Solution" : "Submerge in Solution"}
          </button>
        </div>
      </div>

      {/* Results & Formula Panel */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl mt-4">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Experimental Data</div>
            <div className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/50 rounded text-[8px] font-black text-blue-400 uppercase tracking-tighter">Controlled</div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>Initial Mass ($m_i$)</ReactMarkdown>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-bold text-white">{initialMass ? initialMass.toFixed(2) : "---"} g</span>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" title="Controlled Variable" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Initial Length ($l_i$)</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-bold text-white">3.00 cm</span>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" title="Controlled Variable" />
              </div>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>Final Mass ($m_f$)</ReactMarkdown>
              </span>
              <span className="text-lg font-mono font-bold text-blue-400">{isMeasuredFinal ? currentMass.toFixed(2) : "---"} g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-400 font-bold">Mass Change</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {isMeasuredFinal ? (currentMass - (initialMass || 0)).toFixed(2) : "---"} g
              </span>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-white/40 uppercase font-bold mb-2 tracking-widest">Formula</div>
            <div className="text-sm text-slate-300 font-serif italic mb-4">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {"$$\\% \\text{ Change} = \\frac{m_f - m_i}{m_i} \\times 100$$"}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-2xl">
            <div className="text-[8px] text-blue-400 uppercase font-bold mb-1">Calculated Result</div>
            <div className="text-2xl font-mono font-bold text-white">
              {isMeasuredFinal ? percentageChange.toFixed(1) : "0.0"}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PhotosynthesisSimulation = ({ variables, isPaused = false, setVariables, isFullscreen }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }) => {
  const { light, temp, co2 } = variables;
  
  // Sandbox State
  const [lampPos, setLampPos] = React.useState({ x: -480, y: 100 });
  const [beakerPos, setBeakerPos] = React.useState({ x: 280, y: 150 });
  
  // UI Panel Positions
  const [sensorsPos, setSensorsPos] = React.useState({ x: 0, y: 0 });
  const [counterPos, setCounterPos] = React.useState({ x: 0, y: 0 });
  const [tallyPos, setTallyPos] = React.useState({ x: 0, y: 0 });

  const [isDraggingLamp, setIsDraggingLamp] = React.useState(false);
  const [perspective, setPerspective] = React.useState<'aerial' | 'eye'>('aerial');

  // Calculate variables based on sandbox state
  React.useEffect(() => {
    if (!setVariables) return;

    const dist = Math.abs(lampPos.x - beakerPos.x);
    // Light intensity decreases with distance squared (inverse square law feel)
    const calculatedLight = Math.max(0, Math.min(100, 100 - ((dist - 100) / 400) * 100));
    
    setVariables(prev => ({
      ...prev,
      light: Math.round(calculatedLight),
    }));
  }, [lampPos, beakerPos, setVariables]);

  // Rate calculation
  const lightEffect = light / 100;
  // CO2 saturation curve (Michaelis-Menten style)
  // P = Pmax * [CO2] / ([CO2] + Km)
  // Using Km = 0.05 as a reasonable value for the 0-0.2 range
  const co2Effect = co2 > 0 ? (co2 / (co2 + 0.05)) * 1.25 : 0;
  const tempEffect = Math.exp(-0.5 * Math.pow((temp - 30) / 10, 2));
  const combinedRate = lightEffect * co2Effect * tempEffect;
  const bpm = Math.max(0, Math.floor(combinedRate * 80));

  const [tally, setTally] = React.useState(0);
  const [autoCount, setAutoCount] = React.useState(0);
  const [bubbles, setBubbles] = React.useState<{ id: number, x: number }[]>([]);
  const bubbleIdRef = React.useRef(0);

  React.useEffect(() => {
    if (isPaused) {
      setBubbles([]);
    }
  }, [isPaused]);

  React.useEffect(() => {
    if (!isPaused && bpm > 0) {
      const interval = setInterval(() => {
        const id = bubbleIdRef.current++;
        const x = (Math.random() - 0.5) * 12;
        
        // Sync bubble spawn with count increment
        setBubbles(prev => [...prev, { id, x }]);
        setAutoCount(prev => prev + 1);
        
        setTimeout(() => {
          setBubbles(prev => prev.filter(b => b.id !== id));
        }, 2500); // Longer life for bubbles to reach top
      }, (60 / bpm) * 1000);
      return () => clearInterval(interval);
    }
  }, [bpm, isPaused]);

  // Perspective transition on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setPerspective('eye'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const distance = Math.round(Math.abs(lampPos.x - beakerPos.x) / 5);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505] rounded-[3rem] overflow-hidden">
      {/* Immersive Background (Recipe 7) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      {/* 3D Table - Darker, more premium */}
      <motion.div 
        animate={{ 
          rotateX: perspective === 'aerial' ? 45 : 8,
          scale: perspective === 'aerial' ? 0.9 : 1,
          y: perspective === 'aerial' ? 50 : 0
        }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 w-full h-[38%] bg-[#0a0a0a] border-t border-white/5 shadow-[0_-20px_100px_rgba(0,0,0,0.8)]"
        style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Table Edge Glow */}
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </motion.div>

      <div className="relative w-full max-w-7xl h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
        
        {/* 1. Blue Articulated Lamp - Enhanced Visuals */}
        <motion.div 
          drag="x"
          dragMomentum={false}
          onDragStart={() => setIsDraggingLamp(true)}
          onDragEnd={() => setIsDraggingLamp(false)}
          onDrag={(e, info) => setLampPos(prev => ({ ...prev, x: prev.x + info.delta.x }))}
          animate={{ x: lampPos.x, y: lampPos.y }}
          className="absolute z-30 cursor-grab active:cursor-grabbing group"
        >
          <div className="relative flex flex-col items-center">
            {/* Light Rays - More Dramatic */}
            {!isPaused && light > 0 && (
              <div className="absolute left-[90px] top-[45px] pointer-events-none z-0">
                <motion.div 
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[700px] h-[500px] bg-gradient-to-r from-yellow-200/30 via-yellow-100/5 to-transparent blur-3xl"
                  style={{ clipPath: 'polygon(0 42%, 100% 0, 100% 100%, 0 58%)', transformOrigin: 'left center' }}
                />
                {/* Dynamic Ray Particles */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      x: [0, 500], 
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{ 
                      duration: 2 + Math.random(), 
                      repeat: Infinity, 
                      delay: i * 0.4,
                      ease: "linear"
                    }}
                    className="absolute top-1/2 w-1 h-1 bg-yellow-100/60 rounded-full blur-[1px]"
                    style={{ 
                      transform: `rotate(${(i - 2.5) * 12}deg) translateY(${(i - 2.5) * 25}px)`,
                      transformOrigin: 'left center'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Lamp Body - Premium Blue Metal */}
            <div className="relative w-40 h-40 flex flex-col items-center">
              {/* Base */}
              <div className="absolute bottom-0 w-28 h-8 bg-[#1a3a8a] rounded-full border-b-4 border-[#0f172a] shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
              {/* Arm Segment 1 */}
              <div className="absolute bottom-6 w-4 h-28 bg-[#2563eb] rounded-full origin-bottom -rotate-15 border-r-2 border-[#1e40af]" />
              {/* Joint 1 */}
              <div className="absolute bottom-32 -left-4 w-8 h-8 bg-[#334155] rounded-full border-2 border-[#475569] shadow-lg" />
              {/* Arm Segment 2 */}
              <div className="absolute bottom-32 left-0 w-4 h-28 bg-[#2563eb] rounded-full origin-bottom rotate-[65deg] border-r-2 border-[#1e40af]" />
              {/* Joint 2 */}
              <div className="absolute bottom-[145px] left-[115px] w-8 h-8 bg-[#334155] rounded-full border-2 border-[#475569] shadow-lg" />
              {/* Head - Larger, more technical */}
              <div className="absolute bottom-[110px] left-[130px] w-32 h-28 bg-[#1e40af] rounded-t-full rotate-[125deg] border-b-[12px] border-[#0f172a] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className={cn(
                  "w-24 h-24 rounded-full blur-2xl transition-all duration-700",
                  !isPaused && light > 0 ? "bg-yellow-100 shadow-[0_0_80px_rgba(255,255,255,0.6)]" : "bg-slate-900"
                )} />
                <div className={cn(
                  "absolute w-14 h-14 rounded-full border-4 border-white/10",
                  !isPaused && light > 0 ? "bg-yellow-200/80" : "bg-slate-800"
                )} />
                <Lightbulb className={cn("absolute w-10 h-10 transition-all duration-500", !isPaused && light > 0 ? "text-yellow-600 fill-yellow-400/20 scale-110" : "text-slate-600")} />
              </div>
            </div>
          </div>
          <div className="mt-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Distance: {distance}cm</span>
          </div>
        </motion.div>

        {/* 2. Experimental Setup (Flask + Plant) - More Realistic */}
        <motion.div 
          animate={{ x: beakerPos.x, y: beakerPos.y }}
          className="absolute z-20 flex flex-col items-center gap-6"
        >
          <div className="relative w-72 h-[450px] flex items-center justify-center">
            {/* Glass Chamber - Subtle reflections */}
            <div className="absolute inset-0 bg-blue-400/5 border border-white/10 rounded-3xl backdrop-blur-[2px] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Conical Flask - Better Glass Shader */}
            <div className="relative w-48 h-72 flex flex-col items-center justify-end">
              {/* Water - Animated surface */}
              <motion.div 
                animate={{ height: [160, 162, 160] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 w-44 bg-blue-500/10 rounded-b-[2.5rem] border-t border-white/20" 
              />
              {/* Flask Body */}
              <div className="absolute bottom-0 w-48 h-56 bg-white/5 border-x border-b border-white/20 rounded-b-[3rem] shadow-inner" 
                style={{ clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0 100%)' }}
              />
              {/* Flask Neck */}
              <div className="absolute top-0 w-14 h-20 bg-white/5 border-x border-t border-white/20 rounded-t-xl" />
              {/* Stopper - Dark Rubber */}
              <div className="absolute top-0 w-16 h-6 bg-[#1a1a1a] rounded shadow-2xl border-b border-white/10" />

              {/* Detailed Elodea Plant */}
              <div className="relative w-5 h-48 bg-[#064e3b] rounded-full mb-6 shadow-lg">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="absolute w-16 h-10 flex items-center justify-center"
                    style={{ 
                      top: i * 14 + 8, 
                      left: i % 2 === 0 ? -14 : 4, 
                      transform: `rotate(${i % 2 === 0 ? -25 : 25}deg)` 
                    }}
                  >
                    <div className="w-12 h-6 bg-[#059669]/90 rounded-full border border-emerald-400/20 shadow-sm" 
                      style={{ borderRadius: '100% 0% 100% 0% / 100% 0% 100% 0%' }}
                    >
                      <div className="w-full h-[1px] bg-emerald-400/20 mt-3" />
                    </div>
                  </div>
                ))}
                
                {/* Bubbles - Better Physics */}
                <AnimatePresence>
                  {bubbles.map((bubble) => (
                    <motion.div 
                      key={bubble.id} 
                      initial={{ y: 0, x: 0, opacity: 0, scale: 0 }} 
                      animate={{ 
                        y: -240, 
                        x: bubble.x + Math.sin(Date.now() / 200) * 5, 
                        opacity: [0, 1, 1, 0], 
                        scale: [0.5, 1.4, 1.2] 
                      }}
                      transition={{ duration: 2.5, ease: "easeOut" }} 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/40 rounded-full border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)] backdrop-blur-[1px]"
                    >
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Bio-Chamber Alpha</span>
          </div>
        </motion.div>

        {/* 3. Large CO2 Cylinder - Industrial Look */}
        <div className="absolute left-[120px] bottom-[60px] z-10">
          <div className="relative w-24 h-72 bg-[#262626] rounded-t-full border-x-4 border-t-4 border-[#404040] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center scale-90">
            {/* High-Contrast Band */}
            <div className="absolute top-28 w-full h-16 bg-[#2563eb] flex items-center justify-center border-y-2 border-white/10">
              <span className="text-white font-black text-2xl tracking-[0.2em] drop-shadow-lg">CO₂</span>
            </div>
            {/* Industrial Valve */}
            <div className="absolute -top-12 w-16 h-12 bg-[#404040] rounded-xl border-2 border-[#525252] flex flex-col items-center justify-center shadow-2xl">
              <div className="w-14 h-3 bg-[#171717] rounded-full mb-1" />
              <div className="w-8 h-8 bg-[#171717] rounded-full border-4 border-[#404040] flex items-center justify-center">
                <div className="w-1 h-4 bg-red-500 rounded-full rotate-45" />
              </div>
            </div>
            {/* Reinforced Tube */}
            <div className="absolute top-4 left-full w-[180px] h-5 bg-[#d97706] rounded-full origin-left rotate-[12deg] shadow-2xl border-b-4 border-[#92400e]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_12px)]" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Pressure: 4.2 Bar</span>
          </div>
        </div>

        {/* 4. Heater Control Unit - Technical Dashboard Style */}
        <div className="absolute right-[120px] bottom-[60px] z-10">
          <div className="w-40 h-48 bg-[#171717] rounded-2xl border-2 border-white/5 shadow-2xl p-4 flex flex-col items-center gap-4 scale-90">
            <div className="w-full flex justify-between items-center">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Thermal Unit</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            </div>
            {/* Large Digital Display */}
            <div className="w-full h-16 bg-black rounded-xl border border-white/5 flex items-center justify-center shadow-inner">
              <span className="text-3xl font-mono font-black text-red-500 tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">{temp}<span className="text-lg ml-1">°C</span></span>
            </div>
            {/* Precision Knob */}
            <div className="relative w-20 h-20 bg-[#262626] rounded-full border-4 border-[#404040] shadow-2xl flex items-center justify-center group cursor-pointer">
              <motion.div 
                animate={{ rotate: (temp - 10) * 6 }}
                className="w-1.5 h-10 bg-white/20 rounded-full origin-bottom -translate-y-5" 
              />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.05))]" />
            </div>
          </div>
        </div>

        {/* 5. Main Data Logger - Moved to top to avoid blocking path */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
          <div className="w-64 h-32 bg-[#111]/90 backdrop-blur-md rounded-[1.5rem] border-2 border-[#222] shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-4 flex flex-col items-center gap-2 scale-90">
            <div className="w-full flex justify-between items-center px-2">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">O₂ Flux Monitor</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="w-full h-16 bg-[#050505] rounded-xl border border-white/5 flex flex-col items-center justify-center shadow-inner">
              <div className="flex items-baseline gap-2">
                <motion.span 
                  key={combinedRate}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-mono font-black text-emerald-400 tracking-tighter"
                >
                  {(combinedRate * 100).toFixed(1)}
                </motion.span>
                <span className="text-[10px] font-black text-emerald-900 uppercase">Units/Sec</span>
              </div>
              <div className="w-24 h-1 bg-emerald-950 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  animate={{ width: `${combinedRate * 100}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating UI Panels - Refined */}
        
        {/* 1. Lab Sensors - Bento Style */}
        <motion.div 
          drag
          dragMomentum={false}
          onDrag={(e, info) => setSensorsPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
          animate={{ x: sensorsPos.x, y: sensorsPos.y }}
          className="absolute bottom-6 left-6 z-50 cursor-move"
        >
          <div className="bg-black/70 backdrop-blur-3xl p-3 rounded-[1.5rem] border border-white/10 shadow-2xl min-w-[150px]">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
              <div className="w-5 h-5 bg-blue-600/20 rounded flex items-center justify-center border border-blue-500/30">
                <Activity className="w-3 h-3 text-blue-400" />
              </div>
              <span className="text-[8px] text-white/80 uppercase font-black tracking-widest">Telemetry</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Light', val: `${light}%`, color: 'text-yellow-400' },
                { label: 'Temp', val: `${temp}°C`, color: 'text-red-400' },
                { label: 'CO₂', val: `${co2}%`, color: 'text-emerald-400' }
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-[8px] text-white/40 uppercase font-bold tracking-wider">{s.label}</span>
                  <span className={cn("text-[10px] font-mono font-black", s.color)}>{s.val}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] text-blue-400 uppercase font-black tracking-widest">Rate</span>
                <span className="text-sm font-mono font-black text-blue-400">{bpm} <span className="text-[7px] ml-0.5">BPM</span></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Bubble Counter - High Impact */}
        <motion.div 
          drag
          dragMomentum={false}
          onDrag={(e, info) => setCounterPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
          animate={{ x: counterPos.x, y: counterPos.y }}
          className="absolute top-6 left-6 z-50 cursor-move"
        >
          <div className="bg-blue-600 p-3 rounded-[2rem] shadow-[0_0_40px_rgba(37,99,235,0.4)] flex flex-col items-center gap-1 border-2 border-white/20">
            <span className="text-[8px] text-white/60 font-black uppercase tracking-[0.2em]">Bubbles</span>
            <motion.div 
              key={autoCount}
              initial={{ scale: 1.1, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-mono font-black text-white drop-shadow-xl leading-none"
            >
              {autoCount.toString().padStart(2, '0')}
            </motion.div>
            <button 
              onClick={() => { setTally(0); setAutoCount(0); }}
              className="mt-1 px-3 py-1 bg-white text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-full transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-lg"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* 3. Manual Tally - Floating Action */}
        <motion.div 
          drag
          dragMomentum={false}
          onDrag={(e, info) => setTallyPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
          animate={{ x: tallyPos.x, y: tallyPos.y }}
          className="absolute bottom-6 right-6 z-50 cursor-move"
        >
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTally(prev => prev + 1)}
            className="w-20 h-20 bg-white text-black rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center border-[3px] border-blue-600"
          >
            <div className="text-xl font-mono font-black leading-none">{tally}</div>
            <span className="text-[7px] font-black uppercase tracking-widest mt-1">Tally</span>
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export const LactoseBreakdownSimulation = ({ variables, isPaused = false, setVariables, isFullscreen }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }) => {
  const { temp, enzyme } = variables;
  
  // Model: Optimum temp around 37-40C, enzyme concentration increases rate
  const tempEffect = Math.exp(-0.5 * Math.pow((temp - 37) / 15, 2));
  const enzymeEffect = enzyme / 10;
  const rate = tempEffect * enzymeEffect;
  
  const [glucose, setGlucose] = React.useState(0);
  const lastUpdate = React.useRef(Date.now());

  React.useEffect(() => {
    if (isPaused) {
      lastUpdate.current = Date.now();
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastUpdate.current) / 1000;
      lastUpdate.current = now;
      
      // Max glucose around 50 mmol/L
      const increment = rate * 5 * delta;
      setGlucose(prev => Math.min(50, prev + increment));
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, rate]);

  React.useEffect(() => {
    setGlucose(0);
  }, [temp, enzyme, isPaused && glucose > 0]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-slate-950/20 rounded-[3rem] overflow-hidden">
      {/* Status Labels */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        <AnimatePresence>
          {temp > 45 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-[10px] font-bold text-red-400 uppercase tracking-widest backdrop-blur-sm">
              Lactase Denatured
            </motion.div>
          )}
          {temp >= 35 && temp <= 40 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest backdrop-blur-sm">
              Optimum Temperature
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-12 w-full max-w-5xl">
        {/* Left: Enzyme Supply */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lactase Supply</div>
          <div className="relative w-24 h-40 bg-slate-700 rounded-xl border-2 border-slate-600 shadow-2xl flex flex-col items-center pt-4">
            <div className="w-12 h-6 bg-slate-800 rounded-t-md border-x-2 border-t-2 border-slate-700" />
            <div className="mt-4 w-16 h-16 bg-blue-500/20 rounded-full border-2 border-blue-400/30 flex items-center justify-center">
              <FlaskConical className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-auto mb-4 text-[8px] font-bold text-white/20 uppercase tracking-tighter">Enzyme Stock</div>
            
            {/* Dropper */}
            <motion.div 
              animate={{ y: isPaused ? 0 : [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-12 w-4 h-16 bg-slate-400 rounded-full border border-white/20"
            >
              <div className="absolute bottom-0 w-full h-4 bg-blue-400/40 rounded-b-full" />
              {!isPaused && enzyme > 0 && (
                <motion.div 
                  animate={{ y: [0, 60], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Center: Reaction Beaker */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Milk Sample</div>
          <div className="relative w-64 h-72 bg-white/5 border-x-4 border-b-4 border-white/10 rounded-b-[3rem] overflow-hidden shadow-2xl">
            {/* Milk Level */}
            <div className="absolute bottom-0 w-full h-3/4 bg-white/80 backdrop-blur-sm">
              <div className="absolute top-0 w-full h-4 bg-white/90 border-b border-slate-200" />
              
              {/* Reaction Particles */}
              {!isPaused && rate > 0 && Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [Math.random() * 200, Math.random() * 200],
                    y: [Math.random() * 150, Math.random() * 150],
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full blur-[1px]"
                />
              ))}
            </div>

            {/* Glucose Meter Probe */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-48 bg-slate-600 border-x border-white/10 rounded-b-full z-10">
              <div className="absolute bottom-0 w-full h-8 bg-emerald-500/20 border-t border-emerald-400/30" />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Milk (Lactose)</div>
          </div>
        </div>

        {/* Right: Digital Glucose Meter */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Glucose Meter</div>
          <div className="bg-slate-800 p-6 rounded-[2rem] border-4 border-slate-700 shadow-2xl flex flex-col items-center gap-4 min-w-[200px]">
            <div className="bg-black/60 px-6 py-4 rounded-xl border-2 border-emerald-500/30 w-full text-center shadow-inner">
              <div className="text-[10px] text-emerald-500/50 uppercase font-bold mb-1">Glucose Concentration</div>
              <div className="text-4xl font-mono font-bold text-emerald-400">
                {glucose.toFixed(2)}
                <span className="text-sm ml-2 text-emerald-600">mmol/L</span>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${(glucose / 50) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
            <div className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Real-time Biosensor</div>
          </div>

          {/* Environmental Info */}
          <div className="w-full bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/40 uppercase font-bold">Temperature</span>
              <span className={cn("text-xs font-mono font-bold", temp > 40 ? "text-amber-400" : "text-emerald-400")}>{temp}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/40 uppercase font-bold">Enzyme Conc.</span>
              <span className="text-xs font-mono font-bold text-blue-400">{enzyme} mg/ml</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TranspirationSimulation = ({ variables, isPaused = false, setVariables, isFullscreen }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }) => {
  const { wind, humidity, temp, light } = variables;
  const [step, setStep] = useState<'IDLE' | 'SETUP' | 'RUNNING' | 'COMPLETE'>('IDLE');
  const [bubblePos, setBubblePos] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [readings, setReadings] = useState<{ time: number, pos: number }[]>([]);
  const lastUpdate = React.useRef(Date.now());
  const capillaryRef = useRef<HTMLDivElement>(null);
  const [capillaryWidth, setCapillaryWidth] = useState(450);

  useEffect(() => {
    if (!capillaryRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCapillaryWidth(entry.contentRect.width - 40); // Subtract padding
      }
    });
    observer.observe(capillaryRef.current);
    return () => observer.disconnect();
  }, []);

  // Rate calculation (mm/min)
  // Base rate + environmental effects
  const windEffect = 1 + (wind / 5);
  const humidityEffect = Math.max(0.05, (100 - humidity) / 50);
  const tempEffect = 1 + (temp - 20) / 30;
  const lightEffect = 1 + (light / 100);
  
  const rate = windEffect * humidityEffect * tempEffect * lightEffect * 2; 

  useEffect(() => {
    if (step === 'IDLE') {
      setBubblePos(0);
      setElapsedTime(0);
      setReadings([]);
    }
  }, [step]);

  useEffect(() => {
    if (isPaused || step !== 'RUNNING') {
      lastUpdate.current = Date.now();
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastUpdate.current) / 1000;
      lastUpdate.current = now;
      
      setElapsedTime(prev => prev + delta);

      // rate is mm/min, so rate/60 is mm/sec
      // Scale for UI: 1mm = 10px
      const increment = (rate / 60) * 10 * delta; 
      setBubblePos(prev => {
        const next = prev + increment;
        if (next >= 450) {
          setStep('COMPLETE');
          return 450;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, step, rate]);

  const handleResetBubble = () => {
    setBubblePos(0);
    if (step === 'COMPLETE') setStep('IDLE');
  };

  const handleRecordReading = () => {
    setReadings(prev => [...prev, { time: elapsedTime, pos: bubblePos / 10 }]);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] rounded-[3rem] overflow-hidden p-8">
      {/* Background Wall & Table */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        {/* Wooden Table */}
        <div className="absolute bottom-0 w-full h-[40%] bg-[#3d2b1f] border-t-4 border-[#2d1f16] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
          <div className="absolute top-0 w-full h-1 bg-white/5" />
        </div>
      </div>

      {/* Environmental Effects Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Wind Arrows (Matching Image) */}
        {wind > 0 && Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 100, y: 300 + i * 40, opacity: 0 }}
            animate={{ 
              x: [100, 350],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 1.5 / (1 + wind/5), 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeOut"
            }}
            className="absolute flex items-center gap-1"
          >
            <div className="w-16 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            <div className="w-2 h-2 border-t-2 border-r-2 border-blue-400 rotate-45" />
          </motion.div>
        ))}
        
        {/* Humidity Droplets (Matching Image) */}
        {humidity > 60 && Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: 450 + (Math.random() - 0.5) * 150, 
              y: 200 + (Math.random() - 0.5) * 100,
              opacity: 0 
            }}
            animate={{ 
              y: [null, 350],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
            className="absolute w-1.5 h-2 bg-blue-400 rounded-full blur-[0.5px]"
            style={{ borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%' }}
          />
        ))}
      </div>

      <div className={cn(
        "relative w-full h-full flex flex-col items-center justify-between z-20 transition-all duration-500",
        isFullscreen ? "py-16 px-12" : "py-12 px-8"
      )}>
        {/* Top Section: Main Apparatus */}
        <div className={cn(
          "flex items-end justify-between w-full h-[45%] min-h-[400px] transition-all duration-500",
          isFullscreen ? "max-w-none px-20" : "max-w-7xl"
        )}>
          
          {/* 1. Realistic Fan (Far Left) */}
          <div className="relative flex flex-col items-center scale-100 lg:scale-110 origin-bottom-left ml-8">
            <div className="w-48 h-48 lg:w-56 lg:h-56 bg-[#111] rounded-full border-4 border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden">
              {/* Fan Grille */}
              <div className="absolute inset-0 z-10 border-[14px] border-[#111] rounded-full opacity-60" />
              <div className="absolute inset-0 z-10 grid grid-cols-12 gap-0 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-white" />
                ))}
              </div>
              {/* Blades */}
              <motion.div 
                animate={{ rotate: wind * 360 }}
                transition={{ duration: wind > 0 ? 0.4 / (wind/2) : 0, repeat: Infinity, ease: "linear" }}
                className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center"
              >
                {[0, 1, 2].map(i => (
                  <div key={i} className="absolute w-12 h-40 lg:w-14 lg:h-48 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[50%_50%_10%_10%] opacity-95 shadow-inner" style={{ transform: `rotate(${i * 120}deg)` }} />
                ))}
              </motion.div>
              <div className="absolute w-10 h-10 lg:w-12 lg:h-12 bg-[#222] rounded-full border-2 border-[#333] z-20 shadow-lg" />
            </div>
            {/* Fan Base */}
            <div className="w-32 h-6 bg-[#111] rounded-t-2xl mt-[-4px]" />
            <div className="w-44 h-3 bg-[#0a0a0a] rounded-full shadow-xl" />
          </div>

          {/* 2. Potometer Apparatus (Center) */}
          <div className="relative flex flex-col items-center scale-110 lg:scale-125 origin-bottom">
            {/* Plant in Tube */}
            <div className="relative z-30 mb-[-10px]">
              <div className="w-2.5 h-40 lg:h-48 bg-gradient-to-r from-[#2d1f16] to-[#3d2b1f] rounded-full relative shadow-lg">
                {/* 3D Realistic Leaves */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: i % 2 === 0 ? [10, 13, 10] : [-10, -13, -10],
                      skewX: wind > 5 ? (i % 2 === 0 ? 8 : -8) : 0,
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 4 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className={cn(
                      "absolute w-24 h-14 lg:w-28 lg:h-18 origin-bottom rounded-[100%_10%_100%_10%] shadow-[4px_8px_15px_rgba(0,0,0,0.4)] overflow-hidden",
                      i % 2 === 0 ? "left-1.5 -rotate-[15deg]" : "right-1.5 rotate-[15deg] scale-x-[-1]"
                    )}
                    style={{ 
                      top: i * 22,
                      background: 'linear-gradient(135deg, #065f46 0%, #064e3b 50%, #022c22 100%)',
                      boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.5), inset 2px 2px 10px rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Leaf Veins & Texture */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] mix-blend-overlay" />
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400/20 blur-[0.5px]" />
                    {/* Leaf Highlight */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                  </motion.div>
                ))}
              </div>
              {/* Rubber Bung */}
              <div className="w-12 h-12 lg:h-14 bg-gradient-to-b from-[#1a1a1a] to-[#050505] rounded-b-xl border-x-2 border-b-2 border-[#222] relative z-40 flex items-center justify-center shadow-lg">
                <div className="w-10 h-2 bg-white/5 rounded-full" />
              </div>
            </div>

            {/* Glass T-Junction & Base */}
            <div className="relative w-64 lg:w-72 h-24 lg:h-28 flex items-center justify-center">
              {/* Heavy Metal Base */}
              <div className="absolute bottom-0 w-80 lg:w-96 h-12 lg:h-14 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl border-t border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]" />
              {/* Glass Connection */}
              <div className="w-48 lg:w-56 h-6 lg:h-8 bg-white/10 border border-white/20 rounded-full relative overflow-hidden backdrop-blur-md shadow-inner">
                <div className="absolute inset-0 bg-blue-500/30" />
                {/* T-Junction Block */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[-12px] w-12 lg:w-14 h-20 lg:h-24 bg-gradient-to-b from-[#111] to-[#050505] rounded-lg border border-white/10 z-10 shadow-xl" />
              </div>
            </div>
          </div>

          {/* 3. Desk Lamp (Far Right) */}
          <div className="relative flex flex-col items-center scale-100 lg:scale-110 origin-bottom-right mr-8">
            <div className="relative w-40 lg:w-48 h-64 lg:h-72 flex flex-col items-center">
              {/* Lamp Head */}
              <motion.div 
                animate={{ rotate: -25 }}
                className="w-28 h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[100%_0_0_100%] relative z-20 border-r-8 border-yellow-400/20 shadow-2xl"
              >
                {/* Light Bulb & Glow */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-18 lg:h-18 bg-white rounded-full blur-2xl opacity-90" />
                <motion.div 
                  animate={{ 
                    opacity: light / 100,
                    scale: 1 + (light / 100) * 0.6
                  }}
                  className="absolute left-[-120px] top-[-60px] w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] bg-yellow-400/25 rounded-full blur-[100px] pointer-events-none"
                />
              </motion.div>
              {/* Lamp Arm */}
              <div className="w-3 lg:w-4 h-40 lg:h-48 bg-gradient-to-r from-[#111] to-[#222] rotate-[25deg] origin-bottom mt-[-20px] border-x border-white/5 shadow-lg" />
              {/* Lamp Base */}
              <div className="w-32 lg:w-40 h-6 lg:h-8 bg-gradient-to-b from-[#111] to-[#050505] rounded-t-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]" />
            </div>
          </div>
        </div>

        {/* Middle Section: Measurement Apparatus */}
        <div className="relative w-full h-[20%] min-h-[180px] flex items-center justify-center gap-12 lg:gap-20">
          
          {/* Left: Syringe & Beaker */}
          <div className="flex items-end gap-6 scale-100 lg:scale-110">
            <div className="relative w-16 lg:w-20 h-20 lg:h-24 bg-white/5 border-x border-b border-white/20 rounded-b-2xl backdrop-blur-md shadow-2xl">
              <div className="absolute bottom-0 w-full h-14 lg:h-18 bg-blue-500/40 rounded-b-2xl" />
              {/* Syringe */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 lg:w-8 h-32 lg:h-40 bg-white/10 border border-white/30 rounded-t-xl flex flex-col items-center shadow-xl">
                <div className="w-1.5 h-20 lg:h-28 bg-white/20 mt-3 rounded-full" />
                <button 
                  onClick={handleResetBubble}
                  className="w-9 h-9 lg:w-11 lg:h-11 bg-slate-800 rounded-full border-2 border-white/20 mt-[-10px] flex items-center justify-center hover:bg-slate-700 hover:border-white/40 transition-all active:scale-90 group shadow-2xl"
                >
                  <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5 text-white/60 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Center: Capillary Tube & Ruler */}
          <div className="flex flex-col items-center gap-4 scale-100 lg:scale-110 flex-1 max-w-4xl">
            <div 
              ref={capillaryRef}
              className="relative w-full h-8 lg:h-10 bg-white/5 border-2 border-white/20 rounded-full flex items-center px-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-full" />
              {/* Bubble */}
              <motion.div 
                animate={{ x: (bubblePos / 450) * capillaryWidth }}
                transition={{ type: "tween", ease: "linear" }}
                className="w-10 h-5 lg:w-12 lg:h-6 bg-white/90 rounded-full border border-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10"
              />
            </div>
            {/* Wooden Ruler Aesthetic */}
            <div className="w-full h-10 lg:h-12 bg-[#c19a6b] border-2 border-[#5d2e0c] rounded-lg flex items-end px-6 pb-1.5 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
              {Array.from({ length: 51 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className={cn("w-[1.5px] bg-[#5d2e0c]", i % 10 === 0 ? "h-5 lg:h-6" : i % 5 === 0 ? "h-3 lg:h-4" : "h-1.5 lg:h-2")} />
                  {i % 10 === 0 && <span className="text-[8px] lg:text-[10px] font-black text-[#3d1f08] mt-1">{i}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Vertical Tube & Digital Thermometer */}
          <div className="flex items-end gap-8 lg:gap-12 scale-100 lg:scale-110">
            {/* Vertical Graduated Tube */}
            <div className="relative w-12 lg:w-14 h-44 lg:h-56 bg-white/5 border-x-2 border-white/20 rounded-t-2xl backdrop-blur-md flex flex-col justify-between py-6 shadow-2xl">
              <div className="absolute bottom-0 w-full h-28 lg:h-36 bg-blue-500/40 rounded-t-sm" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-2">
                  <div className="w-3 lg:w-4 h-px bg-white/40" />
                  <span className="text-[8px] lg:text-[10px] text-white/40 font-mono font-bold">{10 - i}</span>
                </div>
              ))}
            </div>

            {/* Digital Thermometer */}
            <div className="bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0] p-3 lg:p-4 rounded-2xl border-4 border-[#aaa] shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col items-center min-w-[130px] lg:min-w-[160px]">
              <div className="text-[8px] lg:text-[10px] text-slate-500 font-black uppercase mb-2 tracking-widest">Temperature</div>
              <div className="bg-[#b8c9b0] px-3 lg:px-5 py-2 lg:py-3 rounded-lg border-2 border-black/15 w-full text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
                <span className="text-2xl lg:text-4xl font-mono font-black text-slate-800 tracking-tighter">
                  {temp.toFixed(1)}<span className="text-lg lg:text-2xl ml-1">°C</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Control & Data Panels */}
        <div className={cn(
          "flex gap-8 lg:gap-12 w-full justify-center scale-100 lg:scale-110 mb-4 transition-all duration-500",
          isFullscreen ? "max-w-none px-20" : "max-w-6xl"
        )}>
          {/* Experiment Control */}
          <div className="bg-black/70 backdrop-blur-2xl p-6 lg:p-8 rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] min-w-[300px] lg:min-w-[340px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Timer className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="text-[10px] lg:text-[12px] text-white font-black uppercase tracking-[0.2em]">Lab Control</span>
              </div>
              <div className={cn(
                "px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest",
                step === 'RUNNING' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-slate-500/20 text-slate-400 border border-slate-500/50"
              )}>
                {step === 'RUNNING' ? 'Active' : 'Standby'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl lg:rounded-3xl border border-white/5 shadow-inner">
                <span className="text-[8px] lg:text-[10px] text-white/40 uppercase font-black block mb-2 tracking-widest">Time</span>
                <div className="text-xl lg:text-3xl font-mono font-black text-white tracking-tighter">
                  {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toFixed(0).padStart(2, '0')}
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl lg:rounded-3xl border border-white/5 shadow-inner">
                <span className="text-[8px] lg:text-[10px] text-white/40 uppercase font-black block mb-2 tracking-widest">Position</span>
                <div className="text-xl lg:text-3xl font-mono font-black text-blue-400 tracking-tighter">
                  {(bubblePos / 10).toFixed(1)}<span className="text-sm ml-1">mm</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <button 
                onClick={() => setStep(step === 'RUNNING' ? 'IDLE' : 'RUNNING')}
                className={cn(
                  "py-4 lg:py-5 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-[12px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl",
                  step === 'RUNNING' ? "bg-red-600 text-white shadow-red-900/40" : "bg-emerald-600 text-white shadow-emerald-900/40"
                )}
              >
                {step === 'RUNNING' ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                {step === 'RUNNING' ? 'Stop' : 'Start'}
              </button>
              <button 
                disabled={step !== 'RUNNING'}
                onClick={handleRecordReading}
                className="py-4 lg:py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-[12px] text-white uppercase tracking-[0.2em] transition-all active:scale-95 border border-white/10 shadow-xl"
              >
                Record
              </button>
            </div>
          </div>

          {/* Readings Log */}
          <div className="bg-black/50 backdrop-blur-2xl p-6 lg:p-8 rounded-[3rem] border border-white/10 min-w-[200px] lg:min-w-[240px] max-h-[220px] lg:max-h-[280px] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <span className="text-[10px] lg:text-[12px] text-white/40 uppercase font-black block mb-4 tracking-[0.2em]">Data Log</span>
            <div className="flex-1 overflow-y-auto space-y-2 lg:space-y-3 pr-3 custom-scrollbar">
              {readings.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[10px] lg:text-[12px] text-white/20 italic font-medium">No data recorded</div>
              ) : (
                readings.map((r, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-2.5 lg:p-3 rounded-xl lg:rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-[10px] lg:text-[12px] font-mono text-white/40">{r.time.toFixed(0)}s</span>
                    <span className="text-[10px] lg:text-[12px] font-mono font-black text-blue-400">{r.pos.toFixed(1)} mm</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Data Analysis Workspace */}
      <AnimatePresence>
        {step === 'COMPLETE' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-xl p-12 flex flex-col items-center justify-center"
          >
            <div className="max-w-4xl w-full bg-black/40 border border-white/10 rounded-[3rem] p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Experiment Analysis</h2>
                <button 
                  onClick={() => setStep('IDLE')}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <span className="text-[10px] text-white/40 uppercase font-black block mb-4">Experimental Summary</span>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 font-medium">Total Distance</span>
                        <span className="text-xl font-mono font-black text-blue-400">{(bubblePos / 10).toFixed(1)} mm</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400 font-medium">Total Time</span>
                        <span className="text-xl font-mono font-black text-white">{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toFixed(0).padStart(2, '0')} min</span>
                      </div>
                      <div className="h-px bg-white/10 my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-emerald-400 font-black uppercase">Calculated Rate</span>
                        <span className="text-2xl font-mono font-black text-emerald-400">
                          {((bubblePos / 10) / (elapsedTime / 60)).toFixed(2)} <span className="text-xs">mm/min</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600/10 p-6 rounded-3xl border border-blue-500/20">
                    <span className="text-[10px] text-blue-400 uppercase font-black block mb-2">Scientific Principle</span>
                    <p className="text-xs text-blue-200/70 leading-relaxed italic">
                      "The rate of transpiration is directly proportional to the distance moved by the air bubble per unit time. Environmental factors like wind and light increase this rate by maintaining a steep water potential gradient."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex-1">
                    <span className="text-[10px] text-white/40 uppercase font-black block mb-4">Calculation Formula</span>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center justify-center">
                       <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {"$$Rate = \\frac{\\text{Distance (mm)}}{\\text{Time (min)}}$$"}
                      </ReactMarkdown>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setStep('IDLE')}
                    className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Check className="w-6 h-6" />
                    Reset Experiment
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FoodCalorimetrySimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, isPaused, isFullscreen }) => {
  const { foodType, waterVolume } = variables;
  const [step, setStep] = useState<'IDLE' | 'WEIGHING' | 'PREPARING' | 'INITIAL_TEMP' | 'BURNING' | 'FINAL_TEMP' | 'COMPLETE'>('IDLE');
  const [temp, setTemp] = useState(20);
  const [isBurning, setIsBurning] = useState(false);
  const [burnProgress, setBurnProgress] = useState(0);
  const [targetTemp, setTargetTemp] = useState(20);
  const [initialTemp, setInitialTemp] = useState<number | null>(null);
  const [finalTemp, setFinalTemp] = useState<number | null>(null);
  const [mass, setMass] = useState<number | null>(null);

  // Food properties
  const getFoodData = (type: number) => {
    switch (type) {
      case 1: return { name: 'Peanut', color: '#d97706', energy: 28000, speed: 0.2, group: 'Lipid' };
      case 2: return { name: 'Potato Chip', color: '#fbbf24', energy: 23000, speed: 0.3, group: 'Lipid' };
      case 3: return { name: 'Beef Jerky', color: '#7f1d1d', energy: 17000, speed: 0.5, group: 'Protein' };
      case 4: return { name: 'Biscuit', color: '#d6d3d1', energy: 16000, speed: 0.6, group: 'Carb' };
      case 5: return { name: 'Crouton', color: '#92400e', energy: 15000, speed: 0.7, group: 'Carb' };
      case 6: return { name: 'Popcorn', color: '#fef3c7', energy: 12000, speed: 0.9, group: 'Carb' };
      default: return { name: 'Unknown', color: '#ffffff', energy: 0, speed: 1, group: 'N/A' };
    }
  };

  const foodData = getFoodData(foodType);
  const foodName = foodData.name;
  const foodColor = foodData.color;

  useEffect(() => {
    const energyPerGram = foodData.energy;
    const massBurnt = 0.5; 
    const energyReleased = energyPerGram * massBurnt;
    const heatLossFactor = 0.25; 
    const energyCaptured = energyReleased * heatLossFactor;
    const tempRise = energyCaptured / (waterVolume * 4.18);
    setTargetTemp(20 + tempRise);
  }, [foodType, waterVolume, foodData.energy]);

  useEffect(() => {
    if (isPaused) return;

    let interval: NodeJS.Timeout;
    if (isBurning) {
      const burnSpeed = foodData.speed;
      
      interval = setInterval(() => {
        setBurnProgress(prev => {
          if (prev >= 100) {
            setIsBurning(false);
            setStep('FINAL_TEMP');
            return 100;
          }
          return prev + burnSpeed;
        });

        setTemp(prev => {
          if (prev < targetTemp) {
            const riseSpeed = (targetTemp - 20) / (100 / burnSpeed);
            return prev + riseSpeed;
          }
          return prev;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isBurning, isPaused, targetTemp, foodData.speed]);

  const handleWeigh = () => {
    setStep('WEIGHING');
    setTimeout(() => setMass(0.50), 1000);
  };

  const handlePrepare = () => {
    setStep('PREPARING');
    setTimeout(() => setStep('INITIAL_TEMP'), 1500);
  };

  const handleRecordInitial = () => {
    setInitialTemp(temp);
    setStep('BURNING');
  };

  const handleStartBurn = () => {
    setIsBurning(true);
    setBurnProgress(0);
  };

  const handleRecordFinal = () => {
    setFinalTemp(temp);
    setStep('COMPLETE');
  };

  const handleReset = () => {
    setStep('IDLE');
    setTemp(20);
    setIsBurning(false);
    setBurnProgress(0);
    setInitialTemp(null);
    setFinalTemp(null);
    setMass(null);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-3xl">
      {/* Dynamic Lighting Glow */}
      <AnimatePresence>
        {isBurning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-orange-500/20 blur-[100px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Background Lab Scene */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-64 bg-slate-800/40 rounded-lg border border-white/10 flex flex-col items-center justify-center gap-4">
          {/* Improved Fire Extinguisher */}
          <div className="relative w-12 h-40 bg-red-600 rounded-lg border-2 border-red-700 shadow-lg flex flex-col items-center">
            <div className="absolute -top-4 w-6 h-6 bg-slate-400 rounded-full border-2 border-slate-500" />
            <div className="absolute top-4 w-10 h-4 bg-white/20 rounded-sm" />
            <div className="mt-12 w-8 h-20 border-2 border-white/20 rounded-sm flex items-center justify-center">
              <div className="w-1 h-16 bg-white/10" />
            </div>
          </div>
          <span className="text-[8px] text-red-500 font-black uppercase tracking-widest">Fire Safety</span>
        </div>
        <div className="absolute bottom-20 left-20 w-48 h-72 bg-slate-800/40 rounded-3xl border border-white/5" />
      </div>

      {/* Main Apparatus */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          {/* Retort Stand Base */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-80 h-6 bg-slate-800 rounded-xl shadow-2xl border-b-4 border-slate-900" />
          {/* Vertical Pole */}
          <div className="absolute left-1/2 -translate-x-[140px] bottom-10 w-5 h-[420px] bg-gradient-to-r from-slate-600 to-slate-700 rounded-full shadow-inner" />
          
          {/* Clamp and Test Tube Assembly */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 w-full h-full">
            {/* Horizontal Clamp Arm */}
            <div className="absolute left-1/2 -translate-x-[140px] top-24 w-40 h-3 bg-slate-500 rounded-full shadow-lg" />
            {/* Clamp Head */}
            <div className="absolute left-1/2 -translate-x-1/2 top-24 w-16 h-4 bg-slate-400 rounded-md border-2 border-slate-500" />
            
            {/* Test Tube */}
            <div className="absolute left-1/2 -translate-x-1/2 top-12 w-14 h-56 bg-white/5 backdrop-blur-md rounded-b-full border border-white/20 overflow-hidden shadow-2xl">
              {/* Glass Highlights */}
              <div className="absolute top-0 left-2 w-1 h-full bg-white/10 rounded-full blur-[1px]" />
              
              {/* Water */}
              <motion.div 
                className="absolute bottom-0 w-full bg-sky-400/20"
                animate={{ height: `${waterVolume * 1.8}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                <div className="absolute top-0 w-full h-3 bg-sky-300/30 rounded-full blur-[2px]" />
                
                {/* Convection Currents / Bubbles */}
                {isBurning && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute bottom-0 w-1.5 h-1.5 bg-white/20 rounded-full blur-[0.5px]"
                        animate={{ 
                          y: [-10, -120],
                          x: [Math.random() * 50, Math.random() * 50],
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Digital Thermometer Probe (Inserted) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 h-48 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-md">
                <div className="absolute bottom-0 w-2.5 h-6 bg-slate-400 rounded-full left-1/2 -translate-x-1/2 border border-white/10" />
              </div>
            </div>

            {/* Advanced Digital Thermometer Display */}
            <motion.div 
              className="absolute left-1/2 translate-x-16 top-4 bg-slate-900/90 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] min-w-[140px]"
              animate={isBurning ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] text-white/60 uppercase font-black tracking-widest">Digital Precision</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-mono font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)] tabular-nums">
                  {temp.toFixed(1)}
                </span>
                <span className="text-sm font-bold text-red-400/60 uppercase">°C</span>
              </div>
            </motion.div>
          </div>

          {/* Horizontal Food Holder Assembly */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-24 w-full">
            {/* Horizontal Arm from Pole */}
            <div className="absolute left-1/2 -translate-x-[140px] bottom-4 w-32 h-2.5 bg-slate-600 rounded-full shadow-md" />
            
            {/* Mounted Needle (Horizontal) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-40 h-1 bg-gradient-to-r from-slate-400 to-slate-200 rounded-full" />
            
            {/* Food Sample (Horizontal Orientation) */}
            <AnimatePresence>
              {(step === 'INITIAL_TEMP' || step === 'BURNING' || step === 'FINAL_TEMP' || step === 'COMPLETE') && (
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-8 rounded-2xl shadow-2xl cursor-pointer group"
                  style={{ 
                    backgroundColor: foodColor,
                    scale: 1 - (burnProgress / 250),
                    filter: burnProgress > 80 ? 'grayscale(1) brightness(0.3)' : 'none',
                    boxShadow: isBurning ? `0 0 40px ${foodColor}44` : 'none'
                  }}
                >
                  {/* Heat Haze Effect */}
                  {isBurning && (
                    <motion.div 
                      className="absolute -inset-4 bg-white/5 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}

                  {/* Advanced Flame System */}
                  <AnimatePresence>
                    {isBurning && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 w-16 h-28 mb-1"
                      >
                        <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full" />
                        <motion.div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-24 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-200 rounded-full blur-[2px]"
                          animate={{ 
                            height: [80, 100, 90, 110, 85],
                            scaleX: [1, 1.1, 0.9, 1.05, 1],
                            skewX: [-2, 2, -1, 3, 0]
                          }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-14 bg-gradient-to-t from-orange-400 to-white rounded-full blur-[1px]"
                          animate={{ 
                            height: [40, 55, 45],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 0.15, repeat: Infinity }}
                        />
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bottom-10 left-1/2 w-1 h-1 bg-yellow-200 rounded-full shadow-[0_0_5px_#fff]"
                            animate={{ 
                              y: [-20, -100],
                              x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
                              opacity: [1, 0],
                              scale: [1, 0]
                            }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-8 left-8 flex flex-col gap-4">
        <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl min-w-[240px]">
          <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <span className="block text-[10px] text-white/80 uppercase font-black tracking-widest">Calorimetry</span>
              <span className="block text-[8px] text-white/40 uppercase font-bold">Sample: {foodName} ({foodData.group})</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {step === 'IDLE' && (
              <button onClick={handleWeigh} className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-400 transition-all">
                1. Weigh Food Sample
              </button>
            )}

            {step === 'WEIGHING' && (
              <div className="text-center py-2">
                <Activity className="w-6 h-6 text-emerald-400 mx-auto animate-pulse mb-2" />
                <span className="text-[10px] text-white/60 uppercase font-bold">Weighing...</span>
                {mass && <div className="text-xl font-mono font-black text-emerald-400 mt-1">{mass.toFixed(3)}g</div>}
                {mass && (
                  <button onClick={handlePrepare} className="w-full mt-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-blue-500 text-white hover:bg-blue-400 transition-all">
                    2. Mount Sample
                  </button>
                )}
              </div>
            )}

            {step === 'PREPARING' && (
              <div className="text-center py-2">
                <Settings2 className="w-6 h-6 text-blue-400 mx-auto animate-spin mb-2" />
                <span className="text-[10px] text-white/60 uppercase font-bold">Mounting Sample...</span>
              </div>
            )}

            {step === 'INITIAL_TEMP' && (
              <div className="space-y-3">
                <div className="text-center text-[10px] text-white/40 uppercase font-bold">Record Initial Temperature (T₁)</div>
                <button onClick={handleRecordInitial} className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-500 text-white hover:bg-red-400 transition-all">
                  3. Record T₁ ({temp.toFixed(1)}°C)
                </button>
              </div>
            )}

            {step === 'BURNING' && !isBurning && (
              <button onClick={handleStartBurn} className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white hover:bg-orange-400 transition-all">
                4. Ignite Sample
              </button>
            )}

            {isBurning && (
              <div className="text-center py-2">
                <Flame className="w-6 h-6 text-orange-500 mx-auto animate-pulse mb-2" />
                <span className="text-[10px] text-white/60 uppercase font-bold">Combustion in Progress...</span>
                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <motion.div className="h-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${burnProgress}%` }} />
                </div>
              </div>
            )}

            {step === 'FINAL_TEMP' && (
              <div className="space-y-3">
                <div className="text-center text-[10px] text-white/40 uppercase font-bold">Record Final Temperature (T₂)</div>
                <button onClick={handleRecordFinal} className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-500 text-white hover:bg-red-400 transition-all">
                  5. Record T₂ ({temp.toFixed(1)}°C)
                </button>
              </div>
            )}

            {step === 'COMPLETE' && (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                  <div className="flex justify-between text-[8px] text-emerald-400 uppercase font-black mb-1">
                    <span>Results</span>
                    <Check className="w-2 h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="text-white/40">Mass: <span className="text-white">{mass}g</span></div>
                    <div className="text-white/40">ΔT: <span className="text-white">{(finalTemp! - initialTemp!).toFixed(1)}°C</span></div>
                  </div>
                </div>

                {/* Data Analysis Workspace */}
                <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 space-y-2">
                  <div className="text-[8px] text-blue-400 uppercase font-black">Analysis Workspace</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-black/20 p-1.5 rounded-lg border border-white/5">
                      <span className="text-[7px] text-white/40 uppercase">1. Energy (Q)</span>
                      <span className="text-[9px] font-mono text-blue-300">{(waterVolume * 4.18 * (finalTemp! - initialTemp!)).toFixed(0)} J</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/20 p-1.5 rounded-lg border border-white/5">
                      <span className="text-[7px] text-white/40 uppercase">2. Energy Density</span>
                      <span className="text-[9px] font-mono text-emerald-300">{((waterVolume * 4.18 * (finalTemp! - initialTemp!)) / mass!).toFixed(0)} J/g</span>
                    </div>
                  </div>
                  <div className="text-[6px] text-white/30 italic leading-tight">
                    *Calculation: (Water Mass × 4.18 × ΔT) ÷ Food Mass
                  </div>
                </div>

                <button onClick={handleReset} className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-slate-700 text-white hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                  <RotateCcw className="w-3 h-3" />
                  New Trial
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Energy Formula Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-[8px] text-white/40 uppercase font-black mb-2 tracking-widest">Energy Calculation</div>
          <div className="font-serif italic text-white/90 text-sm mb-2">
            Q = m × c × ΔT
          </div>
          <div className="space-y-1 text-[7px] text-white/50 leading-tight">
            <p><span className="text-white/80 font-bold">Q</span> = Energy captured (Joules)</p>
            <p><span className="text-white/80 font-bold">m</span> = Mass of water (g)</p>
            <p><span className="text-white/80 font-bold">c</span> = Specific heat capacity (4.18 J/g°C)</p>
            <p><span className="text-white/80 font-bold">ΔT</span> = Temperature rise (°C)</p>
          </div>
        </div>
      </div>

      {/* Advanced Lab Equipment Background */}
      <div className="absolute bottom-10 right-10 flex items-end gap-8 opacity-60">
        {/* Modern Digital Scale - Improved Color */}
        <div className="group relative">
          <motion.div 
            animate={step === 'WEIGHING' ? { y: [0, -2, 0] } : {}}
            className="w-32 h-16 bg-gradient-to-b from-slate-200 to-slate-400 rounded-2xl border-2 border-slate-500 flex flex-col items-center justify-center p-2 shadow-2xl"
          >
            <div className="w-24 h-6 bg-slate-900 rounded-lg flex items-center justify-end px-2 border border-slate-700 shadow-inner">
              <span className="text-[10px] font-mono text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
                {step === 'WEIGHING' ? (mass ? mass.toFixed(3) : '---') : '0.000'}g
              </span>
            </div>
            <span className="text-[7px] text-slate-800 mt-2 uppercase font-black tracking-tighter">Precision Balance</span>
            
            {/* Food on scale during weighing */}
            {step === 'WEIGHING' && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 w-6 h-4 rounded-full shadow-md"
                style={{ backgroundColor: foodColor }}
              />
            )}
          </motion.div>
        </div>
        
        {/* Improved Beaker */}
        <div className="w-20 h-32 bg-white/10 border-2 border-white/30 rounded-2xl flex flex-col items-center justify-end p-0 backdrop-blur-sm overflow-hidden shadow-xl">
          <div className="w-full h-1/2 bg-sky-500/40 border-t-2 border-sky-300/50 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
          </div>
          <div className="absolute top-4 left-2 w-1 h-24 bg-white/10 rounded-full" />
          <span className="absolute bottom-2 text-[7px] text-white/60 uppercase font-black">Beaker</span>
        </div>
      </div>

      {/* Immersive Student Silhouette */}
      <div className="absolute -bottom-10 -left-10 w-[450px] h-[450px] opacity-[0.03] pointer-events-none rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 15c-6 0-11 5-11 11s5 11 11 11 11-5 11-11-5-11-11-11zm-25 35c-7 0-12 5-12 12v25h74v-25c0-7-5-12-12-12h-50z" />
        </svg>
      </div>
    </div>
  );
};
