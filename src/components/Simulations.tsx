import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { Plus, Scale, Weight, Waves, Thermometer, Lightbulb, FlaskConical, Timer, Check, RotateCcw, Play, Activity, Settings2, Flame, Palette, Zap, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { GoogleGenAI } from "@google/genai";

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

  // Draggable Positions
  const [fanPos, setFanPos] = useState({ x: -450, y: -150 });
  const [potometerPos, setPotometerPos] = useState({ x: 0, y: 0 });
  const [lampPos, setLampPos] = useState({ x: 450, y: -150 });
  const [controlsPos, setControlsPos] = useState({ x: -250, y: 350 });
  const [logPos, setLogPos] = useState({ x: 250, y: 350 });
  const [meterPos, setMeterPos] = useState({ x: 0, y: 350 });

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
        "relative w-full h-full flex flex-col items-center justify-center z-20 transition-all duration-500",
        isFullscreen ? "p-10" : "p-6"
      )}>
        {/* Draggable Workspace */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
          
          {/* 1. Realistic Fan */}
          <motion.div 
            drag
            dragMomentum={false}
            onDrag={(e, info) => setFanPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: fanPos.x, y: fanPos.y }}
            className="absolute z-30 cursor-grab active:cursor-grabbing flex flex-col items-center scale-75 lg:scale-85 origin-bottom"
          >
            <div className="w-40 h-40 lg:w-48 lg:h-48 bg-[#111] rounded-full border-4 border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 z-10 border-[14px] border-[#111] rounded-full opacity-60" />
              <div className="absolute inset-0 z-10 grid grid-cols-12 gap-0 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-white" />
                ))}
              </div>
              <motion.div 
                animate={{ rotate: wind * 360 }}
                transition={{ duration: wind > 0 ? 0.4 / (wind/2) : 0, repeat: Infinity, ease: "linear" }}
                className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center"
              >
                {[0, 1, 2].map(i => (
                  <div key={i} className="absolute w-10 h-32 lg:w-12 lg:h-40 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[50%_50%_10%_10%] opacity-95 shadow-inner" style={{ transform: `rotate(${i * 120}deg)` }} />
                ))}
              </motion.div>
              <div className="absolute w-8 h-8 lg:w-10 lg:h-10 bg-[#222] rounded-full border-2 border-[#333] z-20 shadow-lg" />
            </div>
            <div className="w-32 h-6 bg-[#111] rounded-t-2xl mt-[-4px]" />
            <div className="w-44 h-3 bg-[#0a0a0a] rounded-full shadow-xl" />
          </motion.div>

          {/* 2. Realistic Potometer Setup (Based on Image) */}
          <motion.div 
            drag
            dragMomentum={false}
            onDrag={(e, info) => setPotometerPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: potometerPos.x, y: potometerPos.y }}
            className="absolute z-20 cursor-grab active:cursor-grabbing flex flex-col items-center scale-90 lg:scale-110"
          >
            <div className="relative w-[600px] h-[400px]">
              {/* Left: Air Tight Container with Plant */}
              <div className="absolute left-0 bottom-20 flex flex-col items-center">
                <div className="relative z-30 mb-[-10px]">
                  <div className="w-2 h-24 lg:h-32 bg-gradient-to-r from-[#2d1f16] to-[#3d2b1f] rounded-full relative shadow-lg">
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
                          "absolute w-16 h-10 lg:w-20 lg:h-12 origin-bottom rounded-[100%_10%_100%_10%] shadow-[4px_8px_15px_rgba(0,0,0,0.4)] overflow-hidden",
                          i % 2 === 0 ? "left-1 -rotate-[15deg]" : "right-1 rotate-[15deg] scale-x-[-1]"
                        )}
                        style={{ 
                          top: i * 14,
                          background: 'linear-gradient(135deg, #065f46 0%, #064e3b 50%, #022c22 100%)',
                          boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.5), inset 2px 2px 10px rgba(255,255,255,0.1)'
                        }}
                      >
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] mix-blend-overlay" />
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400/20 blur-[0.5px]" />
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Air Tight Container Cup */}
                <div className="w-24 h-28 bg-blue-500/20 border-2 border-white/30 rounded-b-[2rem] rounded-t-lg relative backdrop-blur-sm shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-400/10" />
                  <div className="w-20 h-4 bg-[#3d2b1f] rounded-full absolute top-0 border border-white/10" />
                  <span className="absolute -bottom-8 text-[8px] font-black text-white/40 uppercase tracking-widest text-center w-32">Air Tight Container</span>
                </div>
              </div>

              {/* Center: Reservoir with Tap */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center">
                {/* Reservoir Bottle */}
                <div className="w-20 h-32 bg-blue-500/20 border-2 border-white/30 rounded-t-full rounded-b-lg relative backdrop-blur-sm shadow-inner mb-[-10px]">
                  <div className="absolute bottom-0 w-full h-20 bg-blue-400/40 rounded-b-lg" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/40 uppercase tracking-widest">Reservoir</span>
                </div>
                {/* Funnel/Tap Junction */}
                <div className="w-16 h-16 bg-gradient-to-b from-[#222] to-[#111] rounded-full border border-white/10 flex items-center justify-center relative z-10 shadow-xl">
                  <div className="w-4 h-4 bg-emerald-500/20 rounded-full border border-emerald-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  </div>
                  {/* Tap Handle */}
                  <div className="absolute -right-4 w-8 h-2 bg-[#333] rounded-full border border-white/10" />
                </div>
                {/* Stand */}
                <div className="w-32 h-40 bg-white/5 border-x border-white/10 relative flex flex-col items-center">
                  <div className="w-2 h-full bg-gradient-to-b from-[#222] to-[#111]" />
                  <div className="w-40 h-8 bg-[#3d2b1f] rounded-xl border-t-2 border-white/10 shadow-2xl" />
                </div>
              </div>

              {/* Right: Beaker with Water */}
              <div className="absolute right-0 bottom-0 flex flex-col items-center">
                <div className="w-32 h-40 bg-white/5 border-x border-b border-white/20 rounded-b-lg relative backdrop-blur-md shadow-2xl">
                  <div className="absolute bottom-0 w-full h-28 bg-blue-500/30 rounded-b-lg border-t border-white/20" />
                  {/* Capillary End */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-32 bg-white/10 border-x border-white/20" />
                  <div className="w-36 h-4 bg-[#3d2b1f] rounded-full absolute top-[-2px] border border-white/10" />
                </div>
              </div>

              {/* Connecting Capillary Tube */}
              <div className="absolute left-12 right-16 bottom-[140px] h-3 bg-white/10 border-y border-white/20 backdrop-blur-sm shadow-inner flex items-center">
                <div className="absolute inset-0 bg-blue-400/10" />
                {/* Air Bubble */}
                <motion.div 
                  animate={{ x: 450 - (bubblePos / 450) * 450 }}
                  transition={{ type: "tween", ease: "linear" }}
                  className="w-12 h-4 bg-white/90 rounded-full border border-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10 relative"
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/60 uppercase tracking-widest whitespace-nowrap">Air Bubble</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 3. Desk Lamp */}
          <motion.div 
            drag
            dragMomentum={false}
            onDrag={(e, info) => setLampPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: lampPos.x, y: lampPos.y }}
            className="absolute z-30 cursor-grab active:cursor-grabbing flex flex-col items-center scale-75 lg:scale-85 origin-bottom"
          >
            <div className="relative w-32 lg:w-40 h-56 lg:h-64 flex flex-col items-center">
              {/* Lamp Head */}
              <motion.div 
                animate={{ rotate: -25 }}
                className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[100%_0_0_100%] relative z-20 border-r-8 border-yellow-400/20 shadow-2xl"
              >
                {/* Light Bulb & Glow */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full blur-2xl opacity-90" />
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
          </motion.div>

          {/* 4. Digital Uptake Meter */}
          <motion.div
            drag
            dragMomentum={false}
            onDrag={(e, info) => setMeterPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: meterPos.x, y: meterPos.y }}
            className="absolute z-40 cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#f0f0f0] to-[#d0d0d0] p-4 lg:p-6 rounded-[2rem] border-4 border-[#aaa] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center min-w-[220px] lg:min-w-[280px]"
          >
            <div className="text-[10px] lg:text-[12px] text-slate-500 font-black uppercase mb-4 tracking-[0.2em]">Transpiration Rate Meter</div>
            <div className="bg-[#b8c9b0] p-4 lg:p-6 rounded-xl border-2 border-black/15 w-full text-center shadow-[inset_0_4px_15px_rgba(0,0,0,0.2)] space-y-4">
              <div>
                <span className="text-[8px] lg:text-[10px] text-slate-600 font-bold uppercase block mb-1">Transpiration Rate</span>
                <span className="text-2xl lg:text-4xl font-mono font-black text-slate-800 tracking-tighter">
                  {step === 'RUNNING' ? rate.toFixed(2) : '0.00'}<span className="text-sm lg:text-lg ml-1">mm/min</span>
                </span>
              </div>
              <div className="h-px bg-black/5" />
              <div>
                <span className="text-[8px] lg:text-[10px] text-slate-600 font-bold uppercase block mb-1">Total Distance (mm)</span>
                <span className="text-2xl lg:text-4xl font-mono font-black text-blue-700 tracking-tighter">
                  {(bubblePos / 10).toFixed(2)}<span className="text-sm lg:text-lg ml-1">mm</span>
                </span>
              </div>

              {/* Explicit Calculation UI */}
              <div className="pt-3 border-t border-black/10">
                <span className="text-[7px] lg:text-[9px] text-slate-500 font-black uppercase block mb-2 tracking-widest">Calculation: d / t</span>
                <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] lg:text-[12px] text-slate-700 bg-white/30 py-2 rounded-lg border border-black/5">
                  <span className="font-bold">{(bubblePos / 10).toFixed(1)}</span>
                  <span className="opacity-40">/</span>
                  <span className="font-bold">{(elapsedTime / 60).toFixed(1)}</span>
                  <span className="opacity-40">=</span>
                  <span className="text-blue-600 font-black">
                    {elapsedTime > 0 ? ((bubblePos / 10) / (elapsedTime / 60)).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Control & Data Panels */}
        <div className={cn(
          "absolute bottom-10 flex gap-8 lg:gap-12 w-full justify-center scale-85 lg:scale-95 mb-4 transition-all duration-500",
          isFullscreen ? "max-w-none px-20" : "max-w-6xl"
        )}>
          {/* Experiment Control */}
          <motion.div 
            drag
            dragMomentum={false}
            onDrag={(e, info) => setControlsPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: controlsPos.x, y: controlsPos.y }}
            className="cursor-move bg-black/70 backdrop-blur-2xl p-6 lg:p-8 rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] min-w-[300px] lg:min-w-[340px]"
          >
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
                onPointerDown={(e) => e.stopPropagation()}
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
                onPointerDown={(e) => e.stopPropagation()}
                className="py-4 lg:py-5 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-2xl lg:rounded-3xl font-black text-[10px] lg:text-[12px] text-white uppercase tracking-[0.2em] transition-all active:scale-95 border border-white/10 shadow-xl"
              >
                Record
              </button>
            </div>
          </motion.div>

          {/* Readings Log */}
          <motion.div 
            drag
            dragMomentum={false}
            onDrag={(e, info) => setLogPos(prev => ({ x: prev.x + info.delta.x, y: prev.y + info.delta.y }))}
            animate={{ x: logPos.x, y: logPos.y }}
            className="cursor-move bg-black/50 backdrop-blur-2xl p-6 lg:p-8 rounded-[3rem] border border-white/10 min-w-[200px] lg:min-w-[240px] max-h-[220px] lg:max-h-[280px] flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
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
          </motion.div>
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

export const LeafChromatographySimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, isPaused, isFullscreen }) => {
  const { leafType, solvent } = variables;
  const [progress, setProgress] = useState(0);
  const [internalIsPaused, setInternalIsPaused] = useState(false);
  const [step, setStep] = useState('IDLE');
  const [isCrushed, setIsCrushed] = useState(false);
  const [isSpotted, setIsSpotted] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);

  const getLeafData = (type: number) => {
    switch (type) {
      case 1: return { 
        name: 'Spinach', 
        color: '#166534',
        pigments: [
          { name: 'Carotene', color: '#f97316', rf: 0.95, label: 'Orange' },
          { name: 'Xanthophyll', color: '#eab308', rf: 0.75, label: 'Yellow' },
          { name: 'Chlorophyll a', color: '#15803d', rf: 0.45, label: 'Blue-Green' },
          { name: 'Chlorophyll b', color: '#4ade80', rf: 0.25, label: 'Yellow-Green' }
        ]
      };
      case 2: return { 
        name: 'Coleus (Purple)', 
        color: '#701a75',
        pigments: [
          { name: 'Anthocyanin', color: '#a21caf', rf: 0.85, label: 'Purple' },
          { name: 'Carotene', color: '#f97316', rf: 0.92, label: 'Orange' },
          { name: 'Chlorophyll a', color: '#15803d', rf: 0.40, label: 'Green' }
        ]
      };
      case 3: return { 
        name: 'Autumn Maple', 
        color: '#991b1b',
        pigments: [
          { name: 'Anthocyanin', color: '#dc2626', rf: 0.88, label: 'Red' },
          { name: 'Carotene', color: '#fb923c', rf: 0.94, label: 'Orange' },
          { name: 'Xanthophyll', color: '#facc15', rf: 0.70, label: 'Yellow' }
        ]
      };
      default: return { name: 'Unknown', color: '#ffffff', pigments: [] };
    }
  };

  const leafData = getLeafData(leafType);

  useEffect(() => {
    if (isPlaced && !isPaused && !internalIsPaused && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStep('COMPLETE');
            return 100;
          }
          return prev + 0.2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isPlaced, isPaused, internalIsPaused, progress]);

  const handleCrush = () => {
    setStep('CRUSHING');
    setTimeout(() => {
      setIsCrushed(true);
      setStep('SPOTTING');
    }, 1500);
  };

  const handleSpot = () => {
    setIsSpotted(true);
    setStep('READY');
  };

  const handlePlace = () => {
    setIsPlaced(true);
    setStep('RUNNING');
  };

  const handleReset = () => {
    setStep('IDLE');
    setProgress(0);
    setIsCrushed(false);
    setIsSpotted(false);
    setIsPlaced(false);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-3xl flex flex-col">
      {/* Lab Bench Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-20" />
      
      <div className="relative flex-1 flex items-center justify-center gap-12 p-8">
        {/* Left Side: Extraction Area */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-48 h-48">
            {/* Mortar and Pestle */}
            <div className="absolute inset-0 bg-slate-800 rounded-full border-b-8 border-slate-900 shadow-2xl flex items-center justify-center">
              <div className="w-40 h-40 bg-slate-700 rounded-full border-inner shadow-inner flex items-center justify-center overflow-hidden">
                {isCrushed ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 rounded-full blur-2xl"
                    style={{ backgroundColor: leafData.color }}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 p-6 justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: leafData.color }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {step === 'CRUSHING' && (
              <motion.div 
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  x: [0, 15, -15, 0],
                  y: [0, -10, 10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-40 bg-slate-500 rounded-full border-b-4 border-slate-600 shadow-2xl z-10"
              />
            )}
          </div>
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Extraction Area</span>
            <span className="text-xs font-bold text-white/80">{leafData.name}</span>
          </div>
        </div>

        {/* Center: Chromatography Setup */}
        <div className="relative w-80 h-[550px] flex items-center justify-center">
          {/* Beaker */}
          <div className="absolute bottom-10 w-64 h-80 bg-white/5 backdrop-blur-md rounded-b-[3rem] border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Solvent */}
            <div className="absolute bottom-0 w-full h-20 bg-sky-500/10 border-t border-sky-400/20">
              <div className="absolute top-0 w-full h-3 bg-sky-400/20 blur-[2px]" />
            </div>
            
            {/* Paper Strip */}
            <motion.div 
              animate={isPlaced ? { y: 60 } : isSpotted ? { y: -120 } : { y: -250 }}
              className="absolute left-1/2 -translate-x-1/2 w-32 h-[450px] bg-slate-50 shadow-2xl border border-white/10 flex flex-col items-center"
            >
              {/* Pencil Line */}
              <div className="absolute bottom-24 w-full h-[1px] bg-slate-300" />
              
              {/* Pigment Spot */}
              {isSpotted && (
                <motion.div 
                  className="absolute bottom-[22px] w-6 h-6 rounded-full blur-[3px]"
                  style={{ backgroundColor: leafData.color }}
                  animate={isPlaced ? { opacity: 0 } : { opacity: 1 }}
                />
              )}

              {/* Separating Pigments */}
              {isPlaced && leafData.pigments.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-24 h-12 rounded-full blur-[12px] opacity-70"
                  style={{ backgroundColor: p.color }}
                  animate={{ 
                    bottom: `${24 + (progress * p.rf)}%`,
                    scale: [1, 1.1, 1],
                    opacity: progress > 5 ? 0.7 : 0
                  }}
                />
              ))}

              {/* Solvent Front */}
              {isPlaced && (
                <motion.div 
                  className="absolute w-full h-2 bg-sky-400/20 blur-[2px]"
                  animate={{ bottom: `${24 + progress}%` }}
                />
              )}
            </motion.div>
          </div>

          {/* Glass Rod Holder */}
          <div className="absolute top-20 w-72 h-3 bg-slate-700 rounded-full shadow-lg border-b border-white/5" />
        </div>

        {/* Right Side: Controls & Info */}
        <div className="w-72 flex flex-col gap-6">
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Experiment Status</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Leaf Source</span>
                  <span className="text-xs font-bold text-white">{leafData.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Solvent</span>
                  <span className="text-xs font-bold text-white">{solvent === 1 ? 'Propanone' : 'Ethanol'}</span>
                </div>
              </div>
            </div>

            {isPlaced && (
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Migration</div>
                  <span className="text-[10px] font-mono text-sky-400">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {step === 'IDLE' && (
              <button 
                onClick={handleCrush}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
              >
                1. Crush Leaf
              </button>
            )}
            {step === 'SPOTTING' && (
              <button 
                onClick={handleSpot}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
              >
                2. Apply Pigment Spot
              </button>
            )}
            {step === 'READY' && (
              <button 
                onClick={handlePlace}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
              >
                3. Place in Solvent
              </button>
            )}
            {step === 'RUNNING' && (
              <button 
                onClick={() => setInternalIsPaused(!internalIsPaused)}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all"
              >
                {internalIsPaused ? 'Resume' : 'Pause Development'}
              </button>
            )}
            {step === 'COMPLETE' && (
              <button 
                onClick={handleReset}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Experiment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Overlay */}
      <AnimatePresence>
        {step === 'COMPLETE' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl min-w-[500px]"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Chromatogram Analysis</h4>
              <div className="px-3 py-1 bg-sky-500/20 rounded-full border border-sky-500/30 text-[8px] font-black text-sky-400 uppercase">Success</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {leafData.pigments.map((p, i) => (
                <div key={i} className="flex flex-col items-center p-4 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="w-6 h-6 rounded-full mb-3 shadow-lg" style={{ backgroundColor: p.color }} />
                  <span className="text-[9px] font-bold text-white/60 mb-1">{p.name}</span>
                  <span className="text-xl font-mono font-black text-sky-400 tracking-tighter">
                    {p.rf.toFixed(2)}
                  </span>
                  <span className="text-[7px] font-black text-white/20 uppercase mt-1 tracking-widest">Rf Value</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AcidBaseTitrationSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  const { drop_speed, concentration_base } = variables;
  const [volume, setVolume] = React.useState(0);
  const [isTitrating, setIsTitrating] = React.useState(false);
  const [isSwirling, setIsSwirling] = React.useState(false);
  const [indicator, setIndicator] = React.useState<'phenolphthalein' | 'methyl_orange'>('phenolphthalein');
  const [step, setStep] = React.useState<'IDLE' | 'TITRATING' | 'END_POINT' | 'OVER_TITRATED'>('IDLE');
  
  // Target volume for neutralization (M1V1 = M2V2)
  // HCl: M1 = 0.12M, V1 = 25ml
  // NaOH: M2 = concentration_base, V2 = ?
  const targetVolume = React.useMemo(() => 3.0 / concentration_base, [concentration_base]); 
  const tolerance = 0.10; // even tighter tolerance for realism
  const dropCounter = React.useRef(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTitrating) {
      interval = setInterval(() => {
        setVolume(prev => {
          const next = prev + (drop_speed * 0.015); // Increased speed for better UX
          
          // Automatic stirring logic: stir every 5 drops
          // Assuming 1 drop is roughly 0.01ml for the sake of the counter
          dropCounter.current += 1;
          if (dropCounter.current >= 5) {
            setIsSwirling(true);
            setTimeout(() => setIsSwirling(false), 400); // Longer swirl
            dropCounter.current = 0;
          }

          if (next > targetVolume + 2.0) {
            setStep('OVER_TITRATED');
            setIsTitrating(false);
            return targetVolume + 2.0;
          }
          
          // Check for end point
          if (next >= targetVolume - tolerance && next <= targetVolume + tolerance) {
            setStep('END_POINT');
            // We don't auto-stop here, user must stop manually to be realistic
          } else if (next > targetVolume + tolerance) {
            setStep('OVER_TITRATED');
            setIsTitrating(false);
          } else {
            setStep('TITRATING');
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTitrating, drop_speed, targetVolume, tolerance]);

  const handleReset = () => {
    setVolume(0);
    setStep('IDLE');
    setIsTitrating(false);
    if (setVariables) {
      setVariables(prev => ({ ...prev, volume_added: 0 }));
    }
  };

  const handleRecord = () => {
    if (setVariables) {
      setVariables(prev => ({ ...prev, volume_added: volume }));
    }
  };

  // Liquid color based on step and indicator
  const getLiquidColor = () => {
    if (indicator === 'phenolphthalein') {
      if (step === 'IDLE' || volume < targetVolume - tolerance) return '#ffffff1a'; // Colorless
      if (step === 'END_POINT') return '#ff1493'; // Deep Pink
      if (step === 'OVER_TITRATED') return '#c026d3'; // Magenta
    } else {
      // Methyl Orange: Red (Acid) -> Orange (End Point) -> Yellow (Base)
      if (step === 'IDLE' || volume < targetVolume - tolerance) return '#ef4444'; // Red
      if (step === 'END_POINT') return '#f97316'; // Orange
      if (step === 'OVER_TITRATED') return '#eab308'; // Yellow
    }
    return '#ffffff1a';
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-4 lg:p-8 flex flex-col lg:flex-row items-center justify-center gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      {/* Lab Setup View */}
      <div className="relative flex-1 flex items-center justify-center min-h-[400px]">
        {/* Burette */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-4 h-64 bg-white/10 border-x border-white/20 relative flex flex-col justify-end">
            {/* Liquid in Burette */}
            <div 
              className="w-full bg-blue-400/30 transition-all duration-300" 
              style={{ height: `${Math.max(0, 100 - (volume / 50) * 100)}%` }}
            />
            {/* Markings */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
              {[0, 10, 20, 30, 40, 50].map(m => (
                <div key={m} className="flex items-center gap-1">
                  <div className="w-2 h-[1px] bg-white/40" />
                  <span className="text-[6px] text-white/40 font-mono">{m}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Tap */}
          <div className="w-8 h-8 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center relative z-10 shadow-xl cursor-pointer"
               onClick={() => setIsTitrating(!isTitrating)}>
            <div className={cn("w-1 h-6 bg-slate-400 rounded-full transition-transform duration-300", isTitrating ? "rotate-90" : "rotate-0")} />
          </div>
          <div className="w-2 h-8 bg-white/10 border-x border-white/20" />
          
          {/* Falling Drops */}
          {isTitrating && (
            <motion.div 
              animate={{ y: [0, 100], opacity: [1, 1, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
              className="w-1.5 h-1.5 bg-blue-400/60 rounded-full absolute top-[300px]"
            />
          )}
        </div>

        {/* Conical Flask */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-20">
          <motion.div 
            animate={isSwirling ? { x: [-3, 3, -3], rotate: [-1, 1, -1] } : {}}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="relative"
            onMouseEnter={() => setIsSwirling(true)}
            onMouseLeave={() => setIsSwirling(false)}
          >
            {/* Flask Body - Bigger and more realistic */}
            <svg width="180" height="220" viewBox="0 0 150 180" className="drop-shadow-2xl">
              <path d="M 55 10 L 95 10 L 95 50 L 140 160 Q 145 175 130 175 L 20 175 Q 5 175 10 160 L 55 50 Z" 
                    fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              {/* Liquid inside */}
              <mask id="flask-mask">
                <path d="M 55 10 L 95 10 L 95 50 L 140 160 Q 145 175 130 175 L 20 175 Q 5 175 10 160 L 55 50 Z" fill="white" />
              </mask>
              <rect x="0" y={175 - (40 + (volume/50)*100)} width="150" height="180" 
                    style={{ fill: getLiquidColor(), transition: 'fill 0.5s ease-in-out' }}
                    mask="url(#flask-mask)" />
              
              {/* Reflections */}
              <path d="M 60 20 L 60 45" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
              <path d="M 120 140 Q 130 160 110 165" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
            </svg>
            
            {/* Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-widest text-white/40">
              25ml HCl + {indicator.replace('_', ' ')}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-72 flex flex-col gap-4 relative z-20">
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Titration Monitor</div>
            <div className={cn("w-2 h-2 rounded-full", isTitrating ? "bg-blue-500 animate-pulse" : "bg-slate-700")} />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Select Indicator</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setIndicator('phenolphthalein')}
                  className={cn(
                    "py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter border transition-all",
                    indicator === 'phenolphthalein' 
                      ? "bg-pink-500/20 border-pink-500/50 text-pink-400" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                  )}
                >
                  Phenolphthalein
                </button>
                <button 
                  onClick={() => setIndicator('methyl_orange')}
                  className={cn(
                    "py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter border transition-all",
                    indicator === 'methyl_orange' 
                      ? "bg-orange-500/20 border-orange-500/50 text-orange-400" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                  )}
                >
                  Methyl Orange
                </button>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex justify-between items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Volume Added</span>
              <div className="text-right">
                <span className="text-3xl font-mono font-bold text-blue-400">{volume.toFixed(2)}</span>
                <span className="text-xs text-blue-400/60 ml-1">ml</span>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
              <span className={cn(
                "text-[10px] font-black uppercase px-2 py-1 rounded",
                step === 'IDLE' && "text-slate-500 bg-slate-500/10",
                step === 'TITRATING' && "text-blue-400 bg-blue-400/10",
                step === 'END_POINT' && "text-emerald-400 bg-emerald-400/10 animate-pulse",
                step === 'OVER_TITRATED' && "text-red-400 bg-red-400/10"
              )}>
                {step.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsTitrating(!isTitrating)}
                disabled={step === 'OVER_TITRATED'}
                className={cn(
                  "py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg",
                  isTitrating 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20"
                )}
              >
                {isTitrating ? 'Stop' : 'Start'}
              </button>
              
              <button 
                onClick={() => {
                  setVolume(prev => {
                    const next = prev + 1.0;
                    if (next > targetVolume + 2.0) {
                      setStep('OVER_TITRATED');
                      return targetVolume + 2.0;
                    }
                    if (next >= targetVolume - tolerance && next <= targetVolume + tolerance) {
                      setStep('END_POINT');
                    } else if (next > targetVolume + tolerance) {
                      setStep('OVER_TITRATED');
                    } else {
                      setStep('TITRATING');
                    }
                    return next;
                  });
                  setIsSwirling(true);
                  setTimeout(() => setIsSwirling(false), 500);
                }}
                disabled={step === 'OVER_TITRATED' || isTitrating}
                className="py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-all border border-white/10"
              >
                +1.0 ml
              </button>
            </div>
            
            <button 
              onClick={handleRecord}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
            >
              Record Volume
            </button>

            <button 
              onClick={handleReset}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Lab
            </button>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
          <p className="text-[10px] text-blue-300/80 italic leading-relaxed">
            "Watch for the first hint of permanent pink. Swirl the flask gently to ensure mixing."
          </p>
        </div>
      </div>
    </div>
  );
};

export const ReactionRatesGasSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, isPaused }) => {
  const { concentration, surface_area } = variables;
  const [volume, setVolume] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  
  // Rate constant based on variables
  const k = 0.05 * concentration * surface_area;
  const maxVolume = 100;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused && volume < maxVolume) {
      interval = setInterval(() => {
        setTime(t => t + 0.1);
        setVolume(v => {
          const next = v + k * (1 - v / maxVolume); // Simple saturation model
          return next > maxVolume ? maxVolume : next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, k, volume]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setVolume(0);
    setTime(0);
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Apparatus */}
        <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
          {/* Conical Flask */}
          <div className="relative">
            <svg width="120" height="150" viewBox="0 0 120 150">
              <path d="M 45 10 L 75 10 L 75 40 L 110 130 Q 115 145 100 145 L 20 145 Q 5 145 10 130 L 45 40 Z" 
                    fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              {/* Acid */}
              <path d="M 25 145 L 95 145 L 85 110 L 35 110 Z" fill="rgba(59,130,246,0.2)" />
              {/* Bubbles */}
              {isActive && volume < maxVolume && (
                <g>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.circle
                      key={i}
                      animate={{ y: [130, 40], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      cx={40 + Math.random() * 40}
                      r="2"
                      fill="white"
                      fillOpacity="0.4"
                    />
                  ))}
                </g>
              )}
            </svg>
            {/* Delivery Tube */}
            <svg width="200" height="100" className="absolute -top-10 left-1/2">
              <path d="M 0 50 Q 50 50 50 0 L 150 0" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            </svg>
          </div>

          {/* Gas Syringe */}
          <div className="ml-32 relative">
            <div className="w-48 h-12 bg-white/5 border border-white/20 rounded-r-lg relative">
              {/* Syringe Plunger */}
              <motion.div 
                animate={{ x: (volume / maxVolume) * 150 }}
                className="absolute left-0 top-1 bottom-1 w-2 bg-slate-400 rounded-sm"
              />
              <motion.div 
                animate={{ width: (volume / maxVolume) * 150 }}
                className="absolute left-0 top-2 bottom-2 bg-slate-600/30"
              />
              {/* Scale */}
              <div className="absolute inset-0 flex justify-between px-2 items-end pb-1">
                {[0, 20, 40, 60, 80, 100].map(m => (
                  <div key={m} className="flex flex-col items-center">
                    <div className="w-[1px] h-2 bg-white/40" />
                    <span className="text-[6px] text-white/40 font-mono">{m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest text-white/40">
              Gas Syringe (ml)
            </div>
          </div>
        </div>

        {/* Controls & Readout */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-6">Reaction Monitor</div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Gas Volume</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400">{volume.toFixed(1)} ml</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    animate={{ width: `${volume}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Time Elapsed</span>
                <span className="text-xl font-mono font-bold text-white">{time.toFixed(1)}s</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {!isActive ? (
                <button 
                  onClick={handleStart}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
                >
                  Start Reaction
                </button>
              ) : (
                <button 
                  onClick={handleReset}
                  className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Lab
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HookesLawSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables }) => {
  const { mass } = variables;
  const k = 50; // Spring constant N/m
  const g = 9.81;
  const force = (mass / 1000) * g; // mass in g to kg
  const extension = (force / k) * 100; // extension in cm
  
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Spring Apparatus */}
        <div className="relative flex-1 flex items-center justify-center min-h-[400px]">
          {/* Support */}
          <div className="absolute top-0 w-48 h-4 bg-slate-800 rounded-full" />
          
          {/* Spring */}
          <div className="relative mt-4 flex flex-col items-center">
            <svg width="40" height={100 + extension * 10} viewBox={`0 0 40 ${100 + extension * 10}`} preserveAspectRatio="none">
              <path 
                d={`M 20 0 ${Array.from({ length: 20 }).map((_, i) => {
                  const y = (i + 1) * ((100 + extension * 10) / 20);
                  const x = 20 + (i % 2 === 0 ? 15 : -15);
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
            </svg>
            
            {/* Weight */}
            <motion.div 
              animate={{ y: 0 }}
              className="w-12 h-16 bg-orange-600 rounded-lg flex flex-col items-center justify-center shadow-xl border border-orange-400/30"
            >
              <span className="text-[10px] font-black text-white">{mass}g</span>
              <div className="w-8 h-1 bg-orange-400/40 rounded-full mt-1" />
            </motion.div>
          </div>

          {/* Ruler */}
          <div className="absolute right-1/4 top-0 bottom-0 w-8 bg-white/5 border-l border-white/10 flex flex-col justify-between py-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-[1px] bg-white/40" />
                <span className="text-[8px] text-white/40 font-mono">{i * 2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Readout */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-6">Force Analyzer</div>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Force (Weight)</span>
                <div className="text-2xl font-mono font-bold text-orange-400">{force.toFixed(3)} N</div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Extension</span>
                <div className="text-2xl font-mono font-bold text-white">{extension.toFixed(2)} cm</div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="text-[10px] text-slate-500 italic leading-relaxed">
                "Extension is directly proportional to force until the limit of proportionality is reached."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OhmsLawSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables }) => {
  const { voltage } = variables;
  const resistance = 10; // Fixed for this simple demo
  const current = voltage / resistance;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] rounded-3xl p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-12">
        {/* Circuit Diagram */}
        <div className="relative w-full max-w-xs md:max-w-md h-48 md:h-64 border-4 border-slate-700 rounded-xl flex items-center justify-center">
          {/* Battery */}
          <div className="absolute -left-1 w-12 h-16 bg-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center gap-1">
            <div className="w-8 h-1 bg-slate-500" />
            <div className="w-4 h-1 bg-slate-500" />
            <div className="w-8 h-1 bg-slate-500" />
            <div className="w-4 h-1 bg-slate-500" />
          </div>
          
          {/* Resistor */}
          <div className="absolute -right-6 w-12 h-24 bg-slate-800 border-2 border-slate-600 rounded flex flex-col justify-around py-2 px-1">
            <div className="h-2 bg-red-500 rounded-sm" />
            <div className="h-2 bg-black rounded-sm" />
            <div className="h-2 bg-brown-500 rounded-sm" />
            <div className="h-2 bg-gold-500 rounded-sm" />
          </div>

          {/* Electrons Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  pathOffset: [0, 1],
                  x: [0, 320, 320, 0, 0],
                  y: [0, 0, 256, 256, 0]
                }}
                transition={{
                  duration: current > 0 ? 5 / current : 0,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                style={{ left: -4, top: -4 }}
              />
            ))}
          </div>

          <div className="text-white/20 font-black uppercase tracking-widest text-4xl">Circuit</div>
        </div>

        {/* Meters */}
        <div className="flex gap-8">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl flex flex-col items-center min-w-[160px]">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ammeter</div>
            <div className="text-4xl font-mono font-bold text-yellow-400">
              {current.toFixed(2)} <span className="text-sm">A</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl flex flex-col items-center min-w-[160px]">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Voltmeter</div>
            <div className="text-4xl font-mono font-bold text-blue-400">
              {voltage.toFixed(1)} <span className="text-sm">V</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RefractionSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables }) => {
  const { angle_inc, ref_index } = variables;
  const [isOn, setIsOn] = React.useState(true);
  
  const n1 = 1.0; // Air
  const n2 = ref_index;
  
  const theta1_rad = (angle_inc * Math.PI) / 180;
  const sin_theta2 = (n1 * Math.sin(theta1_rad)) / n2;
  const theta2_rad = Math.asin(sin_theta2);
  const angle_ref = (theta2_rad * 180) / Math.PI;

  const rayLength = 300;
  
  // Incident ray start (top left-ish)
  const x0 = 400 - Math.sin(theta1_rad) * rayLength;
  const y0 = 300 - Math.cos(theta1_rad) * rayLength;
  
  // Refracted ray end (bottom right-ish)
  const x2 = 400 + Math.sin(theta2_rad) * rayLength;
  const y2 = 300 + Math.cos(theta2_rad) * rayLength;

  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05)_0%,transparent_70%)]" />
      
      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20 flex flex-col gap-4">
        <button 
          onClick={() => setIsOn(!isOn)}
          className={cn(
            "px-4 py-2 lg:px-6 lg:py-3 rounded-2xl border font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg",
            isOn 
              ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30" 
              : "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30"
          )}
        >
          {isOn ? "Turn Off Laser" : "Turn On Laser"}
        </button>

        <div className="bg-black/40 backdrop-blur-md p-3 lg:p-4 rounded-2xl border border-white/10 shadow-2xl max-w-[200px] lg:max-w-[240px]">
          <div className="text-[8px] text-white/40 uppercase font-black mb-2 tracking-widest">Lab Guidance</div>
          <p className="text-[10px] text-white/70 leading-relaxed">
            <span className="text-amber-400 font-bold">Measurement:</span> Measure the angle between the <span className="text-white font-bold underline decoration-white/30">Normal Line</span> (dashed) and the ray.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-[9px] text-amber-400/80 font-bold uppercase">Snell's Law: n₁sinθ₁ = n₂sinθ₂</span>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl max-h-[500px] relative z-10">
        {/* Media Boundary */}
        <rect x="0" y="300" width="800" height="300" fill="rgba(59, 130, 246, 0.05)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
        
        {/* Normal Line */}
        <line x1="400" y1="50" x2="400" y2="550" stroke="white" strokeWidth="1" strokeDasharray="8,8" strokeOpacity="0.2" />
        
        {/* Protractor Visual */}
        <g opacity="0.15">
          <path d="M 250 300 A 150 150 0 0 1 550 300" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 250 300 A 150 150 0 0 0 550 300" fill="none" stroke="white" strokeWidth="1" />
          {Array.from({ length: 19 }).map((_, i) => {
            const angle = (i * 10) * Math.PI / 180;
            const x1 = 400 + Math.cos(angle) * 140;
            const y1 = 300 + Math.sin(angle) * 140;
            const x2 = 400 + Math.cos(angle) * 150;
            const y2 = 300 + Math.sin(angle) * 150;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" />;
          })}
        </g>

        {/* Labels */}
        <text x="40" y="280" fill="white" fillOpacity="0.3" className="text-[9px] font-black uppercase tracking-[0.2em]">Medium 1: Air (n=1.0)</text>
        <text x="40" y="330" fill="white" fillOpacity="0.3" className="text-[9px] font-black uppercase tracking-[0.2em]">Medium 2: n={n2.toFixed(2)}</text>

        <AnimatePresence>
          {isOn && (
            <g>
              {/* Incident Ray */}
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, x1: x0, y1: y0, x2: 400, y2: 300 }}
                exit={{ opacity: 0 }}
                stroke="#fbbf24" strokeWidth="3"
                className="drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"
              />
              
              {/* Refracted Ray */}
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, x1: 400, y1: 300, x2: x2, y2: y2 }}
                exit={{ opacity: 0 }}
                stroke="#fbbf24" strokeWidth="3"
                className="drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]"
              />

              {/* Angle Arcs */}
              <path 
                d={`M 400 ${300 - 60} A 60 60 0 0 0 ${400 - Math.sin(theta1_rad) * 60} ${300 - Math.cos(theta1_rad) * 60}`} 
                fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.5" 
              />
              <path 
                d={`M 400 ${300 + 60} A 60 60 0 0 1 ${400 + Math.sin(theta2_rad) * 60} ${300 + Math.cos(theta2_rad) * 60}`} 
                fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.5" 
              />
            </g>
          )}
        </AnimatePresence>

        {/* Laser Source Box */}
        <motion.g
          animate={{ rotate: angle_inc, x: x0, y: y0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <rect x="-15" y="-35" width="30" height="45" fill="#1e293b" rx="6" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
          <rect x="-8" y="10" width="16" height="8" fill="#334155" rx="2" />
          {isOn && (
            <motion.circle 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
              cx="0" cy="18" r="3" fill="#ef4444" 
            />
          )}
          <text x="0" y="-15" fill="white" fillOpacity="0.4" textAnchor="middle" className="text-[6px] font-bold uppercase">Laser</text>
        </motion.g>
        
        {/* Point of Incidence */}
        <circle cx="400" cy="300" r="4" fill="white" className="drop-shadow-[0_0_8px_white]" />
      </svg>

      {/* Digital Readout Overlay */}
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 flex gap-4">
        <div className="bg-black/60 backdrop-blur-md p-4 lg:p-6 rounded-3xl border border-white/10 shadow-2xl min-w-[160px] lg:min-w-[200px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[8px] text-white/40 uppercase font-black tracking-widest">Digital Analyzer</div>
            <div className={cn("w-2 h-2 rounded-full", isOn ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Incidence (θ₁)</span>
              <span className="text-lg font-mono font-bold text-amber-400">{angle_inc}°</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Refraction (θ₂)</span>
              <span className="text-lg font-mono font-bold text-blue-400">{isOn ? angle_ref.toFixed(1) : "---"}°</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Refractive Index (n₂)</span>
              <span className="text-lg font-mono font-bold text-emerald-400">{n2.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DCCircuitSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables }) => {
  const { voltage, r1, r2, type } = variables;
  const isParallel = type === 1;
  
  const totalResistance = isParallel 
    ? 1 / (1/r1 + 1/r2)
    : r1 + r2;
    
  const totalCurrent = voltage / totalResistance;
  
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 lg:gap-12">
        <div className="text-center">
          <h3 className="text-xl lg:text-2xl font-black text-white tracking-tighter uppercase mb-2">
            {isParallel ? 'Parallel' : 'Series'} Circuit Analysis
          </h3>
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Kirchhoff's Laws in Action</div>
        </div>

        {/* Circuit Schematic Area */}
        <div className="relative w-full h-64 lg:h-80 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
          {/* Schematic SVG */}
          <svg viewBox="0 0 600 300" className="w-full h-full max-w-[600px] overflow-visible">
            {/* Main Loop */}
            <rect x="100" y="50" width="400" height="200" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
            
            {/* Battery Symbol */}
            <g transform="translate(100, 150) rotate(90)">
              <line x1="-15" y1="0" x2="15" y2="0" stroke="white" strokeWidth="4" />
              <line x1="-8" y1="5" x2="8" y2="5" stroke="white" strokeWidth="2" />
              <line x1="-15" y1="10" x2="15" y2="10" stroke="white" strokeWidth="4" />
              <line x1="-8" y1="15" x2="8" y2="15" stroke="white" strokeWidth="2" />
            </g>
            <text x="60" y="155" fill="white" className="text-[10px] font-bold">{voltage}V</text>

            {/* Resistors */}
            {isParallel ? (
              <>
                {/* Parallel Branch 1 */}
                <rect x="300" y="80" width="60" height="30" fill="#1e293b" stroke="white" strokeWidth="2" />
                <text x="315" y="100" fill="white" className="text-[10px] font-bold">{r1}Ω</text>
                <line x1="300" y1="95" x2="250" y2="95" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                <line x1="360" y1="95" x2="410" y2="95" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                
                {/* Parallel Branch 2 */}
                <rect x="300" y="190" width="60" height="30" fill="#1e293b" stroke="white" strokeWidth="2" />
                <text x="315" y="210" fill="white" className="text-[10px] font-bold">{r2}Ω</text>
                <line x1="300" y1="205" x2="250" y2="205" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                <line x1="360" y1="205" x2="410" y2="205" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                
                {/* Junctions */}
                <line x1="250" y1="95" x2="250" y2="205" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                <line x1="410" y1="95" x2="410" y2="205" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
                <circle cx="250" cy="150" r="3" fill="white" />
                <circle cx="410" cy="150" r="3" fill="white" />
              </>
            ) : (
              <>
                {/* Series Resistor 1 */}
                <rect x="200" y="35" width="60" height="30" fill="#1e293b" stroke="white" strokeWidth="2" />
                <text x="215" y="55" fill="white" className="text-[10px] font-bold">{r1}Ω</text>
                
                {/* Series Resistor 2 */}
                <rect x="340" y="35" width="60" height="30" fill="#1e293b" stroke="white" strokeWidth="2" />
                <text x="355" y="55" fill="white" className="text-[10px] font-bold">{r2}Ω</text>
              </>
            )}

            {/* Ammeter Symbol */}
            <circle cx="500" cy="150" r="15" fill="#0f172a" stroke="white" strokeWidth="2" />
            <text x="495" y="155" fill="white" className="text-xs font-bold">A</text>

            {/* Electron Flow Animation */}
            <g>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.circle
                  key={i}
                  r="2"
                  fill="#fbbf24"
                  animate={{
                    cx: [100, 500, 500, 100, 100],
                    cy: [50, 50, 250, 250, 50]
                  }}
                  transition={{
                    duration: totalCurrent > 0 ? 10 / totalCurrent : 0,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Data Readout */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Resistance</div>
            <div className="text-3xl font-mono font-bold text-white">
              {totalResistance.toFixed(2)} <span className="text-sm text-slate-500">Ω</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Current</div>
            <div className="text-3xl font-mono font-bold text-yellow-400">
              {totalCurrent.toFixed(3)} <span className="text-sm text-yellow-600">A</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Power Dissipated</div>
            <div className="text-3xl font-mono font-bold text-blue-400">
              {(voltage * totalCurrent).toFixed(2)} <span className="text-sm text-blue-600">W</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewtonSecondLawSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, isPaused }) => {
  const { force, mass } = variables;
  const acceleration = force / mass;
  
  const [position, setPosition] = React.useState(0);
  const [velocity, setVelocity] = React.useState(0);
  const requestRef = React.useRef<number | undefined>(undefined);
  const lastTimeRef = React.useRef<number | undefined>(undefined);

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined && !isPaused) {
      const deltaTime = (time - lastTimeRef.current) / 1000; // seconds
      
      setVelocity(prev => {
        const newVel = prev + acceleration * deltaTime;
        setPosition(p => {
          const newPos = p + newVel * deltaTime * 100; // Scale for pixels
          return newPos > 600 ? 0 : newPos; // Reset if off track
        });
        return position > 600 ? 0 : newVel;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [acceleration, isPaused]);

  // Reset simulation when variables change significantly
  React.useEffect(() => {
    setPosition(0);
    setVelocity(0);
  }, [force, mass]);

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 lg:gap-12">
        <div className="text-center">
          <h3 className="text-xl lg:text-2xl font-black text-white tracking-tighter uppercase mb-2">
            Newton's Second Law
          </h3>
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">F = m × a</div>
        </div>

        {/* Track Area */}
        <div className="relative w-full h-48 md:h-64 bg-white/5 rounded-3xl border border-white/10 flex items-center overflow-hidden">
          {/* Track Lines */}
          <div className="absolute inset-x-0 top-1/2 h-1 bg-white/10 -translate-y-1/2" />
          
          {/* Trolley */}
          <motion.div 
            style={{ x: position }}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Mass Label */}
            <div className="mb-2 px-2 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded text-[10px] font-bold text-indigo-300">
              {mass}kg
            </div>
            {/* Trolley Body */}
            <div className="w-24 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg relative">
              <div className="absolute -bottom-2 left-2 w-4 h-4 bg-slate-700 rounded-full border border-slate-500" />
              <div className="absolute -bottom-2 right-2 w-4 h-4 bg-slate-700 rounded-full border border-slate-500" />
            </div>
            {/* Pulling String */}
            <div className="absolute left-full top-1/2 w-[800px] h-0.5 bg-white/20 -translate-y-1/2" />
          </motion.div>

          {/* Force Vector Arrow */}
          <motion.div
            style={{ x: position + 100 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
          >
            <div className="h-1 bg-emerald-500" style={{ width: force * 20 }} />
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-[8px] border-l-emerald-500" />
            <div className="ml-2 text-[10px] font-bold text-emerald-400 uppercase">Force: {force}N</div>
          </motion.div>
        </div>

        {/* Data Readout */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Acceleration</div>
            <div className="text-3xl font-mono font-bold text-white">
              {acceleration.toFixed(2)} <span className="text-sm text-slate-500">m/s²</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Velocity</div>
            <div className="text-3xl font-mono font-bold text-indigo-400">
              {velocity.toFixed(2)} <span className="text-sm text-indigo-600">m/s</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Position</div>
            <div className="text-3xl font-mono font-bold text-emerald-400">
              {(position/100).toFixed(2)} <span className="text-sm text-emerald-600">m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RespirationSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, isPaused }) => {
  const { temp, organism_type } = variables;
  const [distance, setDistance] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  // Rate based on temp (Q10 rule) and organism type
  // 1: Germinating Seeds, 2: Small Invertebrate, 3: Control
  const baseRates: Record<number, number> = { 1: 0.2, 2: 0.5, 3: 0 };
  const baseRate = baseRates[organism_type] || 0;
  const tempEffect = Math.pow(2, (temp - 20) / 10);
  const rate = baseRate * tempEffect;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime(t => t + 1);
        setDistance(d => d + rate * 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, rate]);

  const handleStart = () => setIsActive(true);
  const handleReset = () => {
    setIsActive(false);
    setDistance(0);
    setTime(0);
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Respirometer Apparatus */}
        <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
          {/* Boiling Tube */}
          <div className="relative w-16 h-48 bg-white/5 border-2 border-white/20 rounded-b-full">
            {/* Organisms */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col gap-1">
              {organism_type === 1 && Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-4 h-6 bg-emerald-800/40 rounded-full border border-emerald-500/20" />
              ))}
              {organism_type === 2 && (
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-4 bg-slate-700 rounded-full border border-slate-500/30" 
                />
              )}
            </div>
            {/* KOH (Soda Lime) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-8 bg-white/20 rounded-b-full border-t border-white/10" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-white/40 font-bold uppercase">KOH</div>
          </div>

          {/* Manometer Tube */}
          <div className="ml-4 flex items-center">
            <div className="w-64 h-2 bg-white/5 border border-white/20 relative">
              {/* Colored Liquid Index */}
              <motion.div 
                animate={{ x: distance * 10 }}
                className="absolute left-0 top-0 bottom-0 w-4 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              />
              {/* Scale */}
              <div className="absolute inset-0 flex justify-between px-2 items-end pb-1">
                {[0, 5, 10, 15, 20].map(m => (
                  <div key={m} className="w-[1px] h-2 bg-white/40" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-6">Respiration Monitor</div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Distance Moved</span>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-emerald-400">{distance.toFixed(1)}</span>
                  <span className="text-xs text-emerald-400/60 ml-1">mm</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Time</span>
                <span className="text-xl font-mono font-bold text-white">{time}s</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {!isActive ? (
                <button 
                  onClick={handleStart}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-lg"
                >
                  Start Experiment
                </button>
              ) : (
                <button 
                  onClick={handleReset}
                  className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NaturalSelectionSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables }) => {
  const { background_type, duration } = variables;
  const [moths, setMoths] = React.useState<{ id: number, type: 'light' | 'dark', x: number, y: number, alive: boolean }[]>([]);
  const [time, setTime] = React.useState(0);
  const [isSimulating, setIsSimulating] = React.useState(false);

  const bgColors = {
    1: 'bg-[#d1d5db]', // Light (Lichen)
    2: 'bg-[#1f2937]'  // Dark (Sooty)
  };

  const initMoths = () => {
    const newMoths = [];
    for (let i = 0; i < 20; i++) {
      newMoths.push({
        id: i,
        type: i < 10 ? 'light' : 'dark',
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        alive: true
      });
    }
    setMoths(newMoths);
    setTime(0);
    setIsSimulating(true);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating && time < duration) {
      interval = setInterval(() => {
        setTime(t => t + 1);
        setMoths(prev => prev.map(m => {
          if (!m.alive) return m;
          // Probability of being eaten based on visibility
          const visibility = (m.type === 'light' && background_type === 2) || (m.type === 'dark' && background_type === 1) ? 0.05 : 0.01;
          if (Math.random() < visibility) return { ...m, alive: false };
          return m;
        }));
      }, 1000);
    } else if (time >= duration) {
      setIsSimulating(false);
    }
    return () => clearInterval(interval);
  }, [isSimulating, time, duration, background_type]);

  const lightCount = moths.filter(m => m.type === 'light' && m.alive).length;
  const darkCount = moths.filter(m => m.type === 'dark' && m.alive).length;

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Simulation Area */}
        <div className={cn("relative flex-1 aspect-video rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl transition-colors duration-1000", bgColors[background_type as 1 | 2])}>
          {/* Tree Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/bark.png')]" />
          
          {moths.map(m => m.alive && (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: `${m.x}%`, y: `${m.y}%` }}
              className={cn(
                "absolute w-6 h-4 rounded-full shadow-lg",
                m.type === 'light' ? "bg-white/80 border border-slate-200" : "bg-black/80 border border-slate-800"
              )}
            >
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-inherit rounded-full rotate-45" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-1 bg-inherit rounded-full -rotate-45" />
            </motion.div>
          ))}

          {!isSimulating && time === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <button 
                onClick={initMoths}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl"
              >
                Start Simulation
              </button>
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-6">Population Data</div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Light Moths</span>
                </div>
                <span className="text-xl font-mono font-bold text-white">{lightCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black rounded-full border border-white/20" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Dark Moths</span>
                </div>
                <span className="text-xl font-mono font-bold text-white">{darkCount}</span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Time</span>
                <span className="text-xl font-mono font-bold text-blue-400">{time} / {duration}s</span>
              </div>
            </div>

            {time > 0 && (
              <button 
                onClick={() => { setTime(0); setMoths([]); setIsSimulating(false); }}
                className="w-full mt-6 py-3 bg-slate-800 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-700 transition-all"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RedoxReactionSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  const { metal_type, concentration } = variables;
  const [isDipped, setIsDipped] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [temperature, setTemperature] = React.useState(20);
  
  const metals = [
    { id: 1, name: 'Zinc', color: '#a1a1aa', reactivity: 0.7, solutionColor: 'bg-blue-500/30', finalSolutionColor: 'bg-slate-300/20' },
    { id: 2, name: 'Iron', color: '#71717a', reactivity: 0.4, solutionColor: 'bg-blue-500/30', finalSolutionColor: 'bg-emerald-500/20' },
    { id: 3, name: 'Magnesium', color: '#e5e7eb', reactivity: 1.0, solutionColor: 'bg-blue-500/30', finalSolutionColor: 'bg-slate-100/10' }
  ];

  const currentMetal = metals.find(m => m.id === metal_type) || metals[0];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDipped && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (0.5 * concentration);
          if (next >= 100) return 100;
          return next;
        });
        setTemperature(prev => {
          const maxTemp = 20 + (currentMetal.reactivity * 30 * concentration);
          if (prev < maxTemp) return prev + 0.1;
          return prev;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isDipped, progress, concentration, currentMetal]);

  const handleReset = () => {
    setIsDipped(false);
    setProgress(0);
    setTemperature(20);
    if (setVariables) {
      setVariables(prev => ({ ...prev, temp_change: 0 }));
    }
  };

  const handleRecord = () => {
    if (setVariables) {
      setVariables(prev => ({ ...prev, temp_change: temperature - 20 }));
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl p-4 lg:p-8 flex flex-col lg:flex-row items-center justify-center gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />
      
      {/* Lab View */}
      <div className="relative flex-1 flex items-center justify-center min-h-[400px]">
        {/* Beaker */}
        <div className="relative w-48 h-64 border-x-4 border-b-4 border-white/20 rounded-b-3xl flex flex-col justify-end overflow-hidden">
          {/* Solution */}
          <motion.div 
            className={cn("absolute inset-0 transition-colors duration-1000", 
              progress > 50 ? currentMetal.finalSolutionColor : currentMetal.solutionColor
            )}
            style={{ top: '30%' }}
          >
            {/* Bubbles for high reactivity */}
            {isDipped && currentMetal.reactivity > 0.8 && progress < 100 && (
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-10, -150], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-white/40 rounded-full absolute bottom-0"
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Metal Strip */}
          <motion.div 
            animate={{ y: isDipped ? 80 : 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-12 h-48 rounded-sm shadow-2xl z-10"
            style={{ backgroundColor: currentMetal.color }}
          >
            {/* Coating on metal */}
            <div 
              className="absolute inset-0 bg-orange-900/60 transition-all duration-1000"
              style={{ height: `${progress}%`, opacity: progress / 100 }}
            />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[6px] font-black text-black/40 uppercase vertical-text">
              {currentMetal.name}
            </div>
          </motion.div>
        </div>

        {/* Thermometer */}
        <div className="absolute right-10 bottom-20 flex flex-col items-center">
          <div className="w-4 h-48 bg-slate-800 rounded-full border border-white/10 relative flex flex-col justify-end p-0.5">
            <div 
              className="w-full bg-red-500 rounded-full transition-all duration-300"
              style={{ height: `${((temperature - 20) / 40) * 100}%` }}
            />
            <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
              {[60, 50, 40, 30, 20].map(t => (
                <div key={t} className="flex items-center gap-1">
                  <div className="w-1 h-[1px] bg-white/40" />
                  <span className="text-[6px] text-white/40 font-mono">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-slate-800 -mt-2 shadow-lg" />
          <div className="mt-2 text-[10px] font-mono font-bold text-red-400">{temperature.toFixed(1)}°C</div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full lg:w-72 flex flex-col gap-4 relative z-20">
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Reaction Monitor</div>
            <div className={cn("w-2 h-2 rounded-full", isDipped && progress < 100 ? "bg-orange-500 animate-pulse" : "bg-slate-700")} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Metal</span>
              <span className="text-xs font-bold text-white">{currentMetal.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Solution</span>
              <span className="text-xs font-bold text-blue-400">Copper(II) Sulfate</span>
            </div>
            
            <div className="h-px bg-white/10" />

            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-white/40 uppercase font-black">
                <span>Reaction Progress</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-orange-500"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={() => setIsDipped(!isDipped)}
              className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg",
                isDipped 
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
                  : "bg-orange-600 text-white hover:bg-orange-500 shadow-orange-600/20"
              )}
            >
              {isDipped ? 'Remove Metal' : 'Dip Metal Strip'}
            </button>
            
            <button 
              onClick={handleRecord}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
            >
              Record ΔT
            </button>

            <button 
              onClick={handleReset}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Lab
            </button>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl">
          <p className="text-[10px] text-orange-300/80 italic leading-relaxed">
            "Observe the color change of the solution and the formation of a solid coating on the metal strip."
          </p>
        </div>
      </div>
    </div>
  );
};

export const FlameTestSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  const { metal_type } = variables;
  const [isDipped, setIsDipped] = React.useState(false);
  const [isHeating, setIsHeating] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [flameImageUrl, setFlameImageUrl] = React.useState<string | null>(null);
  const [isLoopClean, setIsLoopClean] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const metals = [
    { id: 0, name: 'Lithium', symbol: 'Li', color: 'Crimson Red', hex: '#dc2626' },
    { id: 1, name: 'Sodium', symbol: 'Na', color: 'Persistent Yellow', hex: '#eab308' },
    { id: 2, name: 'Potassium', symbol: 'K', color: 'Lilac', hex: '#c084fc' },
    { id: 3, name: 'Calcium', symbol: 'Ca', color: 'Brick Red', hex: '#ea580c' },
    { id: 4, name: 'Strontium', symbol: 'Sr', color: 'Crimson', hex: '#b91c1c' },
    { id: 5, name: 'Barium', symbol: 'Ba', color: 'Apple Green', hex: '#84cc16' },
    { id: 6, name: 'Copper', symbol: 'Cu', color: 'Blue-Green', hex: '#0d9488' },
    { id: 7, name: 'Rubidium', symbol: 'Rb', color: 'Red-Violet', hex: '#9d174d' },
    { id: 8, name: 'Cesium', symbol: 'Cs', color: 'Blue-Violet', hex: '#4338ca' }
  ];

  const currentMetal = metals.find(m => m.id === metal_type) || metals[0];

  const generateFlameImage = async () => {
    if (!isLoopClean && !isDipped) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `A highly realistic, scientifically accurate close-up photo of a Bunsen burner's non-luminous blue flame during a flame test. The flame is prominently colored a vibrant, glowing ${currentMetal.color} due to the presence of ${currentMetal.name} ions on a nichrome wire loop. The background is a dark, out-of-focus chemistry laboratory. Cinematic lighting, 4k resolution, professional macro photography.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        setFlameImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
      } else {
        throw new Error("No image generated");
      }
    } catch (err) {
      console.error("Gemini Image Generation Error:", err);
      setError("Failed to generate realistic flame. Using simulated color.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDip = () => {
    if (isHeating) return;
    setIsDipped(true);
    setIsLoopClean(false);
    setFlameImageUrl(null);
  };

  const handleHeat = () => {
    if (!isDipped && isLoopClean) {
      setIsHeating(true);
      setTimeout(() => setIsHeating(false), 2000);
      return;
    }
    
    setIsHeating(true);
    generateFlameImage();
  };

  const handleClean = () => {
    setIsDipped(false);
    setIsLoopClean(true);
    setFlameImageUrl(null);
    setIsHeating(false);
  };

  const handleReset = () => {
    handleClean();
    if (setVariables) {
      setVariables(prev => ({ ...prev, flame_color: 0 }));
    }
  };

  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl p-4 lg:p-8 flex flex-col lg:flex-row items-center justify-center gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />
      
      <div className="relative flex-1 flex items-center justify-center min-h-[500px] w-full">
        <div className="relative mt-40">
          <div className="w-24 h-4 bg-slate-700 rounded-t-lg border-x border-t border-white/10" />
          <div className="w-32 h-6 bg-slate-800 rounded-lg -mt-1 border border-white/10 shadow-xl" />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-40 bg-slate-600 border-x border-white/10 flex flex-col items-center">
            <div className="w-8 h-4 bg-slate-700 mt-32 border-y border-white/10" />
          </div>

          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-48 h-64 flex items-end justify-center pointer-events-none">
            <AnimatePresence>
              {isHeating ? (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative w-full h-full flex items-end justify-center"
                >
                  {flameImageUrl ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                      <img 
                        src={flameImageUrl} 
                        alt="Flame Test Result" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                  ) : (
                    <div className="relative w-24 h-48 flex items-end justify-center">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.6, 0.8, 0.6],
                          y: [0, -5, 0]
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute w-16 h-40 rounded-full blur-xl"
                        style={{ backgroundColor: isLoopClean ? '#3b82f6' : currentMetal.hex }}
                      />
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          y: [0, -10, 0]
                        }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="absolute w-8 h-24 bg-white/40 rounded-full blur-md"
                      />
                      <div className="absolute w-4 h-16 bg-white/80 rounded-full blur-sm" />
                    </div>
                  )}
                  
                  {isGenerating && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 text-amber-400"
                    >
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="relative w-8 h-12 bg-blue-500/40 rounded-full blur-md animate-pulse" />
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          animate={{ 
            x: isHeating ? 0 : (isDipped ? 200 : -200),
            y: isHeating ? -100 : (isDipped ? 200 : 0),
            rotate: isHeating ? -45 : (isDipped ? 45 : 0)
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="absolute z-30 flex items-center"
        >
          <div className="w-48 h-3 bg-slate-800 rounded-l-full border border-white/10 shadow-lg" />
          <div className="w-32 h-1 bg-slate-400" />
          <div className="relative w-6 h-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
            {isDipped && !isLoopClean && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 bg-white/80 rounded-full blur-[2px]"
              />
            )}
          </div>
        </motion.div>

        <div className="absolute bottom-10 right-10 flex gap-4">
          <div className="relative group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all shadow-xl"
                 onClick={handleDip}>
              <div className="w-8 h-8 bg-white/80 rounded-full blur-[1px] shadow-inner" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black uppercase tracking-widest text-white/60 whitespace-nowrap">
                {currentMetal.name} Chloride
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="w-16 h-20 border-x-2 border-b-2 border-white/20 rounded-b-xl flex flex-col justify-end p-1 cursor-pointer hover:bg-white/5 transition-all"
                 onClick={handleClean}>
              <div className="w-full h-1/2 bg-blue-400/20 rounded-b-lg" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black uppercase tracking-widest text-white/60 whitespace-nowrap">
                Conc. HCl
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[6px] font-bold text-white/20">HCl</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-4 relative z-20">
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[10px] text-white/40 uppercase font-black tracking-widest flex items-center gap-2">
              <Flame className="w-3 h-3 text-orange-500" />
              Flame Spectrometer
            </div>
            <div className={cn("w-2 h-2 rounded-full", isGenerating ? "bg-amber-500 animate-pulse" : "bg-slate-700")} />
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Sample</span>
                <span className="text-xs font-bold text-white">{currentMetal.name} ({currentMetal.symbol})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected Color</span>
                <span className="text-xs font-bold" style={{ color: currentMetal.hex }}>{currentMetal.color}</span>
              </div>
            </div>
            
            <div className="h-px bg-white/10" />

            <div className="space-y-2">
              <div className="flex justify-between text-[8px] text-white/40 uppercase font-black">
                <span>Loop Status</span>
                <span className={isLoopClean ? "text-emerald-400" : "text-amber-400"}>
                  {isLoopClean ? "Clean" : "Contaminated"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={cn("h-full", isLoopClean ? "bg-emerald-500" : "bg-amber-500")}
                  animate={{ width: isLoopClean ? "100%" : "30%" }}
                />
              </div>
            </div>

            {error && (
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] text-red-400 text-center">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button 
              onClick={handleHeat}
              disabled={isHeating || isGenerating}
              className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2",
                isHeating 
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" 
                  : "bg-orange-600 text-white hover:bg-orange-500 shadow-orange-600/20"
              )}
            >
              {isGenerating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Generating Real Flame...
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  Heat Loop
                </>
              )}
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleClean}
                className="py-3 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-all border border-white/10"
              >
                Clean Loop
              </button>
              <button 
                onClick={handleReset}
                className="py-3 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black text-blue-300 uppercase">Nano Banana Powered</span>
          </div>
          <p className="text-[10px] text-blue-300/80 italic leading-relaxed">
            "Heating the loop triggers Gemini to generate a realistic, scientifically accurate image of the characteristic flame color."
          </p>
        </div>
      </div>
    </div>
  );
};

export const GeneticDiagramSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  // Genetic Diagram State
  const [p1Genotype, setP1Genotype] = React.useState('Aa');
  const [p2Genotype, setP2Genotype] = React.useState('Aa');
  
  // Helper to get phenotype from genotype
  const getPhenotype = (genotype: string) => {
    if (!genotype) return 'Unknown';
    const alleles = genotype.split('');
    return alleles.some(a => a === a.toUpperCase()) ? 'Dominant' : 'Recessive';
  };

  // Helper to get gametes from genotype
  const getGametes = (genotype: string) => {
    if (!genotype || genotype.length < 2) return ['', ''];
    return [genotype[0], genotype[1]];
  };

  // Helper to sort alleles (Dominant first)
  const sortGenotype = (a1: string, a2: string) => {
    return [a1, a2].sort((a, b) => {
      if (a === a.toUpperCase() && b === b.toLowerCase()) return -1;
      if (a === a.toLowerCase() && b === b.toUpperCase()) return 1;
      return a.localeCompare(b);
    }).join('');
  };

  const p1Gametes = getGametes(p1Genotype);
  const p2Gametes = getGametes(p2Genotype);

  const offspringGenotypes = [
    sortGenotype(p1Gametes[0], p2Gametes[0]),
    sortGenotype(p1Gametes[0], p2Gametes[1]),
    sortGenotype(p1Gametes[1], p2Gametes[0]),
    sortGenotype(p1Gametes[1], p2Gametes[1])
  ];

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-4 lg:p-8 flex flex-col items-center justify-start gap-8 relative overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex flex-col items-center justify-start gap-12 w-full max-w-3xl z-10 py-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-purple-400 uppercase tracking-[0.4em]">Genetic Diagram</h2>
          <p className="text-xs text-white/40 italic">A step-by-step flow from parental genotypes to offspring results.</p>
        </div>

        <div className="w-full space-y-12">
          {/* Step 1: Parental Genotypes */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">1</div>
              <span className="text-sm font-black text-purple-300 uppercase tracking-widest">Parental Genotypes</span>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Parent 1 (Male)</label>
                <input 
                  type="text"
                  value={p1Genotype}
                  onChange={(e) => setP1Genotype(e.target.value.slice(0, 2))}
                  className="w-full bg-purple-500/10 border-2 border-purple-500/40 rounded-2xl p-4 text-center text-2xl font-black text-purple-300 focus:outline-none focus:border-purple-400 transition-all shadow-xl shadow-purple-500/5"
                  placeholder="Aa"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Parent 2 (Female)</label>
                <input 
                  type="text"
                  value={p2Genotype}
                  onChange={(e) => setP2Genotype(e.target.value.slice(0, 2))}
                  className="w-full bg-purple-500/10 border-2 border-purple-500/40 rounded-2xl p-4 text-center text-2xl font-black text-purple-300 focus:outline-none focus:border-purple-400 transition-all shadow-xl shadow-purple-500/5"
                  placeholder="Aa"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Parental Phenotypes */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">2</div>
              <span className="text-sm font-black text-purple-300 uppercase tracking-widest">Parental Phenotypes</span>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white/80 backdrop-blur-sm">
                {getPhenotype(p1Genotype)}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-sm font-bold text-white/80 backdrop-blur-sm">
                {getPhenotype(p2Genotype)}
              </div>
            </div>
          </div>

          {/* Step 3: Gametes */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">3</div>
              <span className="text-sm font-black text-purple-300 uppercase tracking-widest">Gametes</span>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="flex justify-center gap-6">
                {p1Gametes.map((g, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 rounded-full border-2 border-purple-500/40 bg-purple-500/10 flex items-center justify-center text-xl font-black text-purple-300 shadow-lg shadow-purple-500/10"
                  >
                    {g}
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center gap-6">
                {p2Gametes.map((g, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 rounded-full border-2 border-purple-500/40 bg-purple-500/10 flex items-center justify-center text-xl font-black text-purple-300 shadow-lg shadow-purple-500/10"
                  >
                    {g}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Punnett Square */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">4</div>
              <span className="text-sm font-black text-purple-300 uppercase tracking-widest">Punnett Square</span>
            </div>
            <div className="flex justify-center">
              <div className="relative grid grid-cols-3 grid-rows-3 gap-3 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-center relative">
                  <div className="absolute inset-0 border-b border-r border-white/10" />
                  <span className="text-[8px] font-black text-white/20 absolute top-2 right-2">P2</span>
                  <span className="text-[8px] font-black text-white/20 absolute bottom-2 left-2">P1</span>
                </div>
                <div className="flex items-center justify-center text-2xl font-black text-purple-300/40">{p2Gametes[0]}</div>
                <div className="flex items-center justify-center text-2xl font-black text-purple-300/40">{p2Gametes[1]}</div>
                
                <div className="flex items-center justify-center text-2xl font-black text-purple-300/40">{p1Gametes[0]}</div>
                <div className="w-20 h-20 bg-purple-500/20 border-2 border-purple-500/40 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-purple-500/10">
                  {offspringGenotypes[0]}
                </div>
                <div className="w-20 h-20 bg-purple-500/20 border-2 border-purple-500/40 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-purple-500/10">
                  {offspringGenotypes[1]}
                </div>

                <div className="flex items-center justify-center text-2xl font-black text-purple-300/40">{p1Gametes[1]}</div>
                <div className="w-20 h-20 bg-purple-500/20 border-2 border-purple-500/40 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-purple-500/10">
                  {offspringGenotypes[2]}
                </div>
                <div className="w-20 h-20 bg-purple-500/20 border-2 border-purple-500/40 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-purple-500/10">
                  {offspringGenotypes[3]}
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Results */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-black shadow-lg shadow-purple-500/20">5</div>
              <span className="text-sm font-black text-purple-300 uppercase tracking-widest">Genetic Ratios</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Genotypic Ratio</span>
                <div className="space-y-2">
                  {Array.from(new Set(offspringGenotypes)).map(g => (
                    <div key={g} className="flex justify-between items-center bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                      <span className="text-sm font-black text-purple-300">{g}</span>
                      <span className="text-xs font-mono text-white/60">{(offspringGenotypes.filter(x => x === g).length / 4) * 100}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Phenotypic Ratio</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black text-emerald-400 uppercase">Dominant</span>
                    <span className="text-xs font-mono text-white/60">
                      {(offspringGenotypes.filter(g => g.toLowerCase() !== g).length / 4) * 100}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black text-amber-400 uppercase">Recessive</span>
                    <span className="text-xs font-mono text-white/60">
                      {(offspringGenotypes.filter(g => g.toLowerCase() === g).length / 4) * 100}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Activity className="w-48 h-48 text-purple-500" />
      </div>
    </div>
  );
};

export const PedigreeAnalysisSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  const { pedigree_type, view_mode } = variables;
  
  // Pedigree Challenge State
  const [showAnswers, setShowAnswers] = React.useState(false);

  // Offspring Predictor State
  const [parent1Genotype, setParent1Genotype] = React.useState<string>('');
  const [parent2Genotype, setParent2Genotype] = React.useState<string>('');

  const pedigreeTypes = [
    { name: 'Autosomal Dominant', desc: 'Affected in every generation. Affected parents can have unaffected children.', key: 'AD' },
    { name: 'Autosomal Recessive', desc: 'Can skip generations. Unaffected parents can have affected children.', key: 'AR' },
    { name: 'X-linked Dominant', desc: 'Affected fathers pass to all daughters, no sons.', key: 'XD' },
    { name: 'X-linked Recessive', desc: 'More common in males. Affected mothers pass to all sons.', key: 'XR' },
    { name: 'Y-linked', desc: 'Only males affected. Affected fathers pass to all sons.', key: 'Y' },
    { name: 'Mitochondrial', desc: 'Passed only from mother to all children.', key: 'Mito' }
  ];

  const currentPedigree = pedigreeTypes[pedigree_type] || pedigreeTypes[0];

  // Initialize genotypes when mode or type changes
  React.useEffect(() => {
    if (view_mode === 1) {
      switch (currentPedigree.key) {
        case 'AD': case 'AR':
          setParent1Genotype('Aa');
          setParent2Genotype('Aa');
          break;
        case 'XD': case 'XR':
          setParent1Genotype('X^A Y');
          setParent2Genotype('X^A X^a');
          break;
        case 'Y':
          setParent1Genotype('X Y^A');
          setParent2Genotype('X X');
          break;
        case 'Mito':
          setParent1Genotype('m');
          setParent2Genotype('M');
          break;
      }
    }
  }, [view_mode, pedigree_type]);

  const getGenotypeOptions = (isMale: boolean) => {
    switch (currentPedigree.key) {
      case 'AD': case 'AR':
        return ['AA', 'Aa', 'aa'];
      case 'XD': case 'XR':
        return isMale ? ['X^A Y', 'X^a Y'] : ['X^A X^A', 'X^A X^a', 'X^a X^a'];
      case 'Y':
        return isMale ? ['X Y^A', 'X Y^a'] : ['X X'];
      case 'Mito':
        return isMale ? ['M', 'm'] : ['M', 'm'];
      default: return [];
    }
  };

  const isAffected = (genotype: string, isMale: boolean) => {
    switch (currentPedigree.key) {
      case 'AD': return genotype.includes('A');
      case 'AR': return genotype === 'aa';
      case 'XD': return genotype.includes('X^A');
      case 'XR': return isMale ? genotype === 'X^a Y' : genotype === 'X^a X^a';
      case 'Y': return isMale && genotype === 'X Y^A';
      case 'Mito': return genotype === 'M';
      default: return false;
    }
  };

  const calculateOffspring = () => {
    if (!parent1Genotype || !parent2Genotype) return [];
    
    const offspring: { genotype: string, isMale: boolean, probability: number }[] = [];

    if (currentPedigree.key === 'AD' || currentPedigree.key === 'AR') {
      const p1 = parent1Genotype.split('');
      const p2 = parent2Genotype.split('');
      const combos: Record<string, number> = {};
      p1.forEach(a1 => {
        p2.forEach(a2 => {
          const g = [a1, a2].sort().join('');
          combos[g] = (combos[g] || 0) + 0.25;
        });
      });
      Object.entries(combos).forEach(([g, p]) => {
        offspring.push({ genotype: g, isMale: true, probability: p / 2 });
        offspring.push({ genotype: g, isMale: false, probability: p / 2 });
      });
    } else if (currentPedigree.key === 'XD' || currentPedigree.key === 'XR') {
      const p1Alleles = parent1Genotype.split(' '); // ["X^A", "Y"]
      const p2Alleles = [parent2Genotype.substring(0, 3), parent2Genotype.substring(4, 7)]; // ["X^A", "X^a"]
      
      p1Alleles.forEach(a1 => {
        p2Alleles.forEach(a2 => {
          const isMale = a1 === 'Y';
          const g = isMale ? `${a2} Y` : [a1, a2].sort().join(' ');
          offspring.push({ genotype: g, isMale, probability: 0.25 });
        });
      });
    } else if (currentPedigree.key === 'Y') {
      const p1Y = parent1Genotype.split(' ')[1];
      offspring.push({ genotype: `X ${p1Y}`, isMale: true, probability: 0.5 });
      offspring.push({ genotype: `X X`, isMale: false, probability: 0.5 });
    } else if (currentPedigree.key === 'Mito') {
      offspring.push({ genotype: parent2Genotype, isMale: true, probability: 0.5 });
      offspring.push({ genotype: parent2Genotype, isMale: false, probability: 0.5 });
    }

    // Group by genotype and sex to avoid duplicates in display
    const grouped: Record<string, number> = {};
    offspring.forEach(o => {
      const key = `${o.genotype}|${o.isMale}`;
      grouped[key] = (grouped[key] || 0) + o.probability;
    });

    return Object.entries(grouped).map(([key, p]) => {
      const [genotype, isMaleStr] = key.split('|');
      return { genotype, isMale: isMaleStr === 'true', probability: p };
    });
  };

  // Pedigree Genotype Logic for Challenge
  const getPedigreeGenotype = (id: string, type: string) => {
    switch (type) {
      case 'AD':
        if (id === 'I-1') return 'Aa';
        if (id === 'I-2') return 'aa';
        if (id === 'II-1') return 'Aa';
        if (id === 'II-2') return 'Aa';
        if (id === 'II-3') return 'aa';
        return 'aa';
      case 'AR':
        if (id === 'I-1') return 'Aa';
        if (id === 'I-2') return 'Aa';
        if (id === 'II-1') return 'AA/Aa';
        if (id === 'II-2') return 'AA/Aa';
        if (id === 'II-3') return 'aa';
        return 'AA/Aa';
      case 'XD':
        if (id === 'I-1') return 'X^A Y';
        if (id === 'I-2') return 'X^a X^a';
        if (id === 'II-1') return 'X^a Y';
        if (id === 'II-2') return 'X^A X^a';
        if (id === 'II-3') return 'X^a Y';
        return 'X^a X^a';
      case 'XR':
        if (id === 'I-1') return 'X^A Y';
        if (id === 'I-2') return 'X^A X^a';
        if (id === 'II-1') return 'X^A Y';
        if (id === 'II-2') return 'X^A X^A/a';
        if (id === 'II-3') return 'X^a Y';
        return 'X^A X^A/a';
      default: return 'Unknown';
    }
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-3xl p-4 lg:p-8 flex flex-col items-center justify-start gap-8 relative overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex flex-col items-center justify-start gap-12 w-full max-w-5xl z-10 py-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-purple-400 uppercase tracking-[0.4em]">Pedigree Analysis</h2>
          <p className="text-xs text-white/40 italic">
            {view_mode === 0 ? 'Challenge: Identify the genotypes of the numbered individuals.' : 'Interactive: Predict offspring genotypes and phenotypes.'}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <button 
            onClick={() => setVariables?.(prev => ({ ...prev, view_mode: 0 }))}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              view_mode === 0 ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-white/40 hover:text-white/60"
            )}
          >
            Analysis Challenge
          </button>
          <button 
            onClick={() => setVariables?.(prev => ({ ...prev, view_mode: 1 }))}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              view_mode === 1 ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-white/40 hover:text-white/60"
            )}
          >
            Offspring Predictor
          </button>
        </div>

        {/* Inheritance Pattern Selector */}
        <div className="w-full max-w-2xl bg-white/5 p-2 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-2">
          {pedigreeTypes.map((type, index) => (
            <button
              key={type.key}
              onClick={() => setVariables?.(prev => ({ ...prev, pedigree_type: index }))}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                pedigree_type === index 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" 
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              )}
            >
              {type.name}
            </button>
          ))}
        </div>

        {view_mode === 0 ? (
          <div className="w-full bg-white/5 rounded-[4rem] border border-white/10 p-12 flex flex-col items-center gap-16 relative shadow-2xl backdrop-blur-sm">
            <div className="absolute top-12 left-12 flex flex-col gap-2">
              <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">{currentPedigree.name}</span>
              <span className="text-[10px] text-white/30 max-w-[240px] leading-relaxed italic">{currentPedigree.desc}</span>
            </div>

            <div className="flex flex-col items-center gap-16 pt-12">
              {/* Generation 1 */}
              <div className="flex gap-32 relative">
                <PedigreeNode 
                  type="male" 
                  affected={pedigree_type === 0 || pedigree_type === 4} 
                  label="1" 
                  genotype={showAnswers ? getPedigreeGenotype('I-1', currentPedigree.key) : undefined}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-white/20" />
                <PedigreeNode 
                  type="female" 
                  affected={pedigree_type === 5} 
                  label="2" 
                  genotype={showAnswers ? getPedigreeGenotype('I-2', currentPedigree.key) : undefined}
                />
              </div>

              {/* Connector */}
              <div className="relative w-0.5 h-16 bg-white/20">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-0.5 bg-white/20" />
              </div>

              {/* Generation 2 */}
              <div className="flex gap-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-white/20" />
                  <PedigreeNode 
                    type="male" 
                    affected={pedigree_type === 0 || pedigree_type === 4 || (pedigree_type === 5)} 
                    label="3" 
                    genotype={showAnswers ? getPedigreeGenotype('II-1', currentPedigree.key) : undefined}
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-white/20" />
                  <PedigreeNode 
                    type="female" 
                    affected={pedigree_type === 0 || pedigree_type === 2 || pedigree_type === 5} 
                    label="4" 
                    genotype={showAnswers ? getPedigreeGenotype('II-2', currentPedigree.key) : undefined}
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-white/20" />
                  <PedigreeNode 
                    type="male" 
                    affected={pedigree_type === 1 || pedigree_type === 3} 
                    label="5" 
                    genotype={showAnswers ? getPedigreeGenotype('II-3', currentPedigree.key) : undefined}
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-0.5 h-8 bg-white/20" />
                  <PedigreeNode 
                    type="female" 
                    affected={pedigree_type === 1} 
                    label="6" 
                    genotype={showAnswers ? getPedigreeGenotype('II-4', currentPedigree.key) : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-purple-600/20 active:scale-95"
              >
                {showAnswers ? 'Hide Genotypes' : 'Identify Genotypes'}
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-12 right-12 flex flex-col gap-3 bg-black/60 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-white/10 border border-white/20" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Male</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-white/10 border border-white/20 rounded-full" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Female</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-purple-500 shadow-lg shadow-purple-500/40" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Affected</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white/5 rounded-[4rem] border border-white/10 p-12 flex flex-col items-center gap-16 relative shadow-2xl backdrop-blur-sm">
            <div className="absolute top-12 left-12 flex flex-col gap-2">
              <span className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Offspring Predictor</span>
              <span className="text-[10px] text-white/30 max-w-[240px] leading-relaxed italic">Select parental genotypes to see predicted offspring.</span>
            </div>

            <div className="flex flex-col items-center gap-16 pt-12 w-full">
              {/* Parents Selection */}
              <div className="flex gap-32 relative items-center">
                <div className="flex flex-col items-center gap-4">
                  <PedigreeNode 
                    type="male" 
                    affected={isAffected(parent1Genotype, true)} 
                    label="Parent 1" 
                    genotype={parent1Genotype}
                  />
                  <select 
                    value={parent1Genotype}
                    onChange={(e) => setParent1Genotype(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-[10px] text-white font-bold outline-none focus:border-purple-500 transition-all"
                  >
                    {getGenotypeOptions(true).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                  </select>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-white/20" />

                <div className="flex flex-col items-center gap-4">
                  <PedigreeNode 
                    type="female" 
                    affected={isAffected(parent2Genotype, false)} 
                    label="Parent 2" 
                    genotype={parent2Genotype}
                  />
                  <select 
                    value={parent2Genotype}
                    onChange={(e) => setParent2Genotype(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-[10px] text-white font-bold outline-none focus:border-purple-500 transition-all"
                  >
                    {getGenotypeOptions(false).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Connector */}
              <div className="relative w-0.5 h-16 bg-white/20">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-0.5 bg-white/20" />
              </div>

              {/* Predicted Offspring */}
              <div className="flex flex-wrap justify-center gap-12 w-full">
                {calculateOffspring().map((off, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4">
                    <div className="w-0.5 h-8 bg-white/20" />
                    <PedigreeNode 
                      type={off.isMale ? 'male' : 'female'} 
                      affected={isAffected(off.genotype, off.isMale)} 
                      label={`${(off.probability * 100).toFixed(0)}%`} 
                      genotype={off.genotype}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-12 right-12 flex flex-col gap-3 bg-black/60 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-white/10 border border-white/20" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Male</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-white/10 border border-white/20 rounded-full" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Female</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-purple-500 shadow-lg shadow-purple-500/40" />
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">Affected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Activity className="w-48 h-48 text-purple-500" />
      </div>
    </div>
  );
};

export const BiomoleculeTestingSimulation: React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>, isFullscreen?: boolean }> = ({ variables, setVariables }) => {
  const { sample, test } = variables;
  const [isHeating, setIsHeating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const samples = [
    { id: 1, name: 'Glucose Solution', contents: { sugar: true } },
    { id: 2, name: 'Starch Solution', contents: { starch: true } },
    { id: 3, name: 'Albumin (Protein)', contents: { protein: true } },
    { id: 4, name: 'Vegetable Oil', contents: { lipid: true } },
    { id: 5, name: 'Vitamin C Solution', contents: { vitC: true } },
    { id: 6, name: 'Milk', contents: { sugar: true, protein: true, lipid: true } },
    { id: 7, name: 'Apple Juice', contents: { sugar: true, vitC: true } },
    { id: 8, name: 'Distilled Water', contents: {} }
  ];

  const tests = [
    { id: 1, name: "Benedict's", reagent: "Benedict's Reagent", color: '#3b82f6', needsHeat: true },
    { id: 2, name: "Iodine", reagent: "Iodine Solution", color: '#92400e', needsHeat: false },
    { id: 3, name: "Biuret", reagent: "Biuret Reagent", color: '#6366f1', needsHeat: false },
    { id: 4, name: "Ethanol Emulsion", reagent: "Ethanol", color: '#f8fafc', needsHeat: false },
    { id: 5, name: "DCPIP", reagent: "DCPIP Solution", color: '#1d4ed8', needsHeat: false }
  ];

  const currentSample = samples.find(s => s.id === sample) || samples[0];
  const currentTest = tests.find(t => t.id === test) || tests[0];

  React.useEffect(() => {
    setProgress(0);
    setIsHeating(false);
  }, [sample, test]);

  const handleStart = () => {
    if (currentTest.needsHeat) {
      setIsHeating(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsHeating(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    } else {
      setProgress(100);
    }
  };

  const getResultColor = () => {
    if (progress < 100) return currentTest.color;

    const { sugar, starch, protein, lipid, vitC } = currentSample.contents;

    switch (currentTest.id) {
      case 1: // Benedict's
        return sugar ? '#ef4444' : '#3b82f6'; // Red if sugar, else Blue
      case 2: // Iodine
        return starch ? '#1e1b4b' : '#92400e'; // Blue-black if starch, else Orange
      case 3: // Biuret
        return protein ? '#a855f7' : '#6366f1'; // Purple if protein, else Blue
      case 4: // Ethanol
        return lipid ? '#f1f5f9' : '#ffffff00'; // Cloudy if lipid, else Clear
      case 5: // DCPIP
        return vitC ? '#ffffff00' : '#1d4ed8'; // Colorless if vitC, else Blue
      default:
        return currentTest.color;
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl p-8 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="flex flex-col items-center gap-4 text-center z-10">
        <h2 className="text-2xl font-black text-orange-500 uppercase tracking-widest">Biomolecule Testing</h2>
        <p className="text-white/40 text-xs font-medium max-w-md">Test various food samples for the presence of sugars, starch, proteins, lipids, and Vitamin C.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-4xl z-10">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-72">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">1. Select Sample</label>
            <div className="grid grid-cols-1 gap-2">
              {samples.map(s => (
                <button
                  key={s.id}
                  onClick={() => setVariables?.(prev => ({ ...prev, sample: s.id }))}
                  className={cn(
                    "px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-left border",
                    sample === s.id 
                      ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/20" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">2. Select Test</label>
            <div className="grid grid-cols-1 gap-2">
              {tests.map(t => (
                <button
                  key={t.id}
                  onClick={() => setVariables?.(prev => ({ ...prev, test: t.id }))}
                  className={cn(
                    "px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-left border",
                    test === t.id 
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Simulation */}
        <div className="flex-1 flex flex-col items-center gap-12">
          <div className="relative">
            {/* Test Tube Rack */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-slate-800 rounded-full blur-xl opacity-50" />
            
            {/* Test Tube */}
            <div className="relative w-20 h-64 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-b-full overflow-hidden shadow-2xl">
              {/* Liquid */}
              <motion.div 
                initial={false}
                animate={{ 
                  height: progress > 0 ? '60%' : '30%',
                  backgroundColor: progress > 0 ? getResultColor() : '#ffffff20'
                }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 right-0 transition-colors duration-1000"
              >
                {/* Bubbles if heating */}
                {isHeating && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: -20, opacity: [0, 1, 0] }}
                        transition={{ 
                          duration: 1 + Math.random(), 
                          repeat: Infinity, 
                          delay: Math.random() 
                        }}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{ left: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Emulsion effect */}
                {currentTest.id === 4 && progress === 100 && currentSample.contents.lipid && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm animate-pulse" />
                )}
              </motion.div>

              {/* Reflections */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-4 w-1 h-full bg-white/10" />
                <div className="absolute top-0 right-4 w-2 h-full bg-white/5" />
              </div>
            </div>

            {/* Dropper Animation */}
            <AnimatePresence>
              {progress > 0 && progress < 10 && !currentTest.needsHeat && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: -40, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-4 h-16 bg-slate-300 rounded-t-full border border-slate-400" />
                  <motion.div 
                    animate={{ scaleY: [1, 1.5, 1], y: [0, 10, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="w-1 h-8 bg-blue-400/60 rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bunsen Burner (if heating) */}
            <AnimatePresence>
              {isHeating && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-4 h-12 bg-slate-700 rounded-t-lg" />
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-8 h-12 bg-blue-500 rounded-full blur-md"
                    />
                    <div className="absolute inset-0 w-4 h-8 bg-blue-200 rounded-full blur-sm left-1/2 -translate-x-1/2 top-2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Setup</span>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                <span className="text-xs font-bold text-white">{currentSample.name}</span>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-xs font-bold text-blue-400">{currentTest.name} Test</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStart}
                disabled={progress > 0}
                className={cn(
                  "px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3",
                  progress > 0 
                    ? "bg-white/5 text-white/20 cursor-not-allowed" 
                    : "bg-orange-600 hover:bg-orange-500 text-white shadow-xl shadow-orange-900/20 active:scale-95"
                )}
              >
                {currentTest.needsHeat ? 'Heat Sample' : 'Add Reagent'}
                {progress > 0 && progress < 100 && (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
              </button>

              <button
                onClick={() => { setProgress(0); setIsHeating(false); }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white/60 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legend / Info */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2 z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Positive Result</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Negative Result</span>
        </div>
      </div>
    </div>
  );
};
const PedigreeNode = ({ type, affected, label, genotype }: { type: 'male' | 'female', affected: boolean, label: string, genotype?: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <motion.div 
        initial={false}
        animate={{ 
          backgroundColor: affected ? '#a855f7' : 'rgba(255,255,255,0.05)',
          borderColor: affected ? '#c084fc' : 'rgba(255,255,255,0.2)'
        }}
        className={cn(
          "w-16 h-16 border-2 transition-colors shadow-2xl flex items-center justify-center",
          type === 'male' ? 'rounded-none' : 'rounded-full',
          affected && "shadow-purple-500/40"
        )}
      >
        <span className={cn("text-sm font-black", affected ? "text-white" : "text-white/20")}>{label}</span>
      </motion.div>
      
      <AnimatePresence>
        {genotype && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-500 px-3 py-1 rounded-lg text-xs font-black text-white shadow-2xl z-20 border border-purple-400"
          >
            {genotype}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);


