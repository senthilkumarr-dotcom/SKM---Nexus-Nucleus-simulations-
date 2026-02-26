/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import SimulationLayout from './components/SimulationLayout';
import VariableIdentification from './components/VariableIdentification';
import { LABS } from './constants';
import { EnzymeSimulation, OsmosisSimulation, PhotosynthesisSimulation, LactoseBreakdownSimulation, TranspirationSimulation } from './components/Simulations';

export default function App() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);

  const selectedLab = LABS.find(l => l.id === selectedLabId);

  const handleSelectLab = (id: string) => {
    setSelectedLabId(id);
    setIsIdentifying(true);
  };

  const handleIdentificationComplete = () => {
    setIsIdentifying(false);
  };

  const handleBack = () => {
    setSelectedLabId(null);
    setIsIdentifying(false);
  };

  // 1. Register your visual components here
  const SIMULATION_COMPONENTS: Record<string, React.FC<{ variables: Record<string, number>, isPaused?: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>> }>> = {
    'enzyme-action': EnzymeSimulation,
    'osmosis': OsmosisSimulation,
    'photosynthesis': PhotosynthesisSimulation,
    'lactose-breakdown': LactoseBreakdownSimulation,
    'transpiration': TranspirationSimulation,
  };

  // 2. Register your mathematical models here
  const CALCULATION_MODELS: Record<string, (vars: Record<string, number>) => number> = {
    'enzyme-action': (vars) => {
      const { temp, ph } = vars;
      const tempEffect = Math.exp(-0.5 * Math.pow((temp - 37) / 15, 2));
      const phEffect = Math.exp(-0.5 * Math.pow((ph - 7) / 2, 2));
      return tempEffect * phEffect * 50;
    },
    'osmosis': (vars) => (0.3 - vars.molarity) * 25,
    'photosynthesis': (vars) => {
      const { light, temp, co2 } = vars;
      const lightEffect = light / 100;
      const co2Effect = co2 > 0 ? (co2 / (co2 + 0.05)) * 1.25 : 0;
      const tempEffect = Math.exp(-0.5 * Math.pow((temp - 30) / 10, 2));
      return lightEffect * co2Effect * tempEffect * 60;
    },
    'transpiration': (vars) => {
      const { wind, humidity, temp, light } = vars;
      // Wind increases rate, humidity decreases it
      const windEffect = 1 + (wind / 5);
      const humidityEffect = Math.max(0.1, (100 - humidity) / 50);
      const tempEffect = 1 + (temp - 25) / 50; // Rate increases with temp
      const lightEffect = 1 + (light / 100); // Stomata open more in light
      return windEffect * humidityEffect * tempEffect * lightEffect * 2; // mm/min
    },
    'lactose-breakdown': (vars) => {
      const { temp, enzyme } = vars;
      const tempEffect = Math.exp(-0.5 * Math.pow((temp - 37) / 15, 2));
      const enzymeEffect = enzyme / 10;
      return tempEffect * enzymeEffect * 50;
    },
  };

  const renderSimulationContent = (id: string, variables: Record<string, number>, isPaused: boolean, setVariables?: React.Dispatch<React.SetStateAction<Record<string, number>>>) => {
    const Component = SIMULATION_COMPONENTS[id];
    if (Component) return <Component variables={variables} isPaused={isPaused} setVariables={setVariables} />;

    return (
      <div className="text-white/40 text-center p-8">
        <p className="text-xl font-bold mb-2 font-sans">Simulation Scaffolding</p>
        <p className="text-sm">This simulation is currently in "Build Mode". The UI and data analysis are fully functional.</p>
      </div>
    );
  };

  const calculateResult = (id: string, variables: Record<string, number>) => {
    const model = CALCULATION_MODELS[id];
    if (model) return model(variables);

    // Default generic model for new labs
    const firstVar = Object.values(variables)[0] || 0;
    return firstVar * 1.5 + (Math.random() * 2);
  };

  if (!selectedLab) {
    return <Dashboard onSelectLab={handleSelectLab} />;
  }

  if (isIdentifying) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <VariableIdentification 
          lab={selectedLab} 
          onComplete={handleIdentificationComplete} 
        />
      </div>
    );
  }

  return (
    <SimulationLayout 
      lab={selectedLab}
      onBack={handleBack}
      renderSimulation={(vars, isPaused, setVars) => renderSimulationContent(selectedLab.id, vars, isPaused, setVars)}
      calculateResult={(vars) => calculateResult(selectedLab.id, vars)}
    />
  );
}
