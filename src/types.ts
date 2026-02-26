import { LucideIcon } from 'lucide-react';

export type LabCategory = 'Biochemistry' | 'Cell Biology' | 'Physiology' | 'Genetics' | 'Ecology';

export interface SafetyOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Lab {
  id: string;
  title: string;
  category: LabCategory;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color name (e.g., 'blue', 'emerald')
  theory: string;
  method: string;
  independentVariables: VariableConfig[];
  dependentVariable: {
    name: string;
    unit: string;
    label: string;
  };
  controlledVariables: string[];
  safetyOptions: SafetyOption[];
}

export interface VariableConfig {
  id: string;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface DataPoint {
  x: number;
  y: number;
  timestamp: number;
  type: 'manual' | 'auto';
}

export interface SimulationState {
  variables: Record<string, number>;
  data: DataPoint[];
  isIdentifyingVariables: boolean;
  identifiedVariables: {
    independent: string;
    dependent: string;
    controlled: string[];
  };
}
