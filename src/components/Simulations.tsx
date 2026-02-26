import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { Plus, Scale, Weight, Waves, Thermometer, Lightbulb, FlaskConical, Timer, Check, RotateCcw, Play, Activity, Settings2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const EnzymeSimulation = ({ variables, isPaused = false, setVariables }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>> }) => {
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

export const OsmosisSimulation = ({ variables, isPaused = false, setVariables }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>> }) => {
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

export const PhotosynthesisSimulation = ({ variables, isPaused = false, setVariables }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>> }) => {
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

export const LactoseBreakdownSimulation = ({ variables, isPaused = false, setVariables }: { variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>> }) => {
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
