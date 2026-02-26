import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(val => `"${val}"`).join(',')
  ).join('\n');
  
  const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getLabColorClasses(color: string) {
  const colors: Record<string, any> = {
    rose: { 
      bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-600', ring: 'ring-rose-500/20', 
      accent: 'accent-rose-600', hover: 'hover:bg-rose-700', light: 'bg-rose-50', 
      hoverBorder: 'hover:border-rose-500', hoverText: 'group-hover:text-rose-600', 
      hoverBg: 'group-hover:bg-rose-50', fill: 'fill-rose-600', shadow: 'shadow-rose-500/5',
      chart: '#e11d48'
    },
    blue: { 
      bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', ring: 'ring-blue-500/20', 
      accent: 'accent-blue-600', hover: 'hover:bg-blue-700', light: 'bg-blue-50', 
      hoverBorder: 'hover:border-blue-500', hoverText: 'group-hover:text-blue-600', 
      hoverBg: 'group-hover:bg-blue-50', fill: 'fill-blue-600', shadow: 'shadow-blue-500/5',
      chart: '#2563eb'
    },
    emerald: { 
      bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', ring: 'ring-emerald-500/20', 
      accent: 'accent-emerald-600', hover: 'hover:bg-emerald-700', light: 'bg-emerald-50', 
      hoverBorder: 'hover:border-emerald-500', hoverText: 'group-hover:text-emerald-600', 
      hoverBg: 'group-hover:bg-emerald-50', fill: 'fill-emerald-600', shadow: 'shadow-emerald-500/5',
      chart: '#059669'
    },
    amber: { 
      bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600', ring: 'ring-amber-500/20', 
      accent: 'accent-amber-600', hover: 'hover:bg-amber-700', light: 'bg-amber-50', 
      hoverBorder: 'hover:border-amber-500', hoverText: 'group-hover:text-amber-600', 
      hoverBg: 'group-hover:bg-amber-50', fill: 'fill-amber-600', shadow: 'shadow-amber-500/5',
      chart: '#d97706'
    },
    teal: { 
      bg: 'bg-teal-600', text: 'text-teal-600', border: 'border-teal-600', ring: 'ring-teal-500/20', 
      accent: 'accent-teal-600', hover: 'hover:bg-teal-700', light: 'bg-teal-50', 
      hoverBorder: 'hover:border-teal-500', hoverText: 'group-hover:text-teal-600', 
      hoverBg: 'group-hover:bg-teal-50', fill: 'fill-teal-600', shadow: 'shadow-teal-500/5',
      chart: '#0d9488'
    },
    violet: { 
      bg: 'bg-violet-600', text: 'text-violet-600', border: 'border-violet-600', ring: 'ring-violet-500/20', 
      accent: 'accent-violet-600', hover: 'hover:bg-violet-700', light: 'bg-violet-50', 
      hoverBorder: 'hover:border-violet-500', hoverText: 'group-hover:text-violet-600', 
      hoverBg: 'group-hover:bg-violet-50', fill: 'fill-violet-600', shadow: 'shadow-violet-500/5',
      chart: '#7c3aed'
    },
    cyan: { 
      bg: 'bg-cyan-600', text: 'text-cyan-600', border: 'border-cyan-600', ring: 'ring-cyan-500/20', 
      accent: 'accent-cyan-600', hover: 'hover:bg-cyan-700', light: 'bg-cyan-50', 
      hoverBorder: 'hover:border-cyan-500', hoverText: 'group-hover:text-cyan-600', 
      hoverBg: 'group-hover:bg-cyan-50', fill: 'fill-cyan-600', shadow: 'shadow-cyan-500/5',
      chart: '#0891b2'
    },
    orange: { 
      bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600', ring: 'ring-orange-500/20', 
      accent: 'accent-orange-600', hover: 'hover:bg-orange-700', light: 'bg-orange-50', 
      hoverBorder: 'hover:border-orange-500', hoverText: 'group-hover:text-orange-600', 
      hoverBg: 'group-hover:bg-orange-50', fill: 'fill-orange-600', shadow: 'shadow-orange-500/5',
      chart: '#ea580c'
    },
    yellow: { 
      bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-500', ring: 'ring-yellow-500/20', 
      accent: 'accent-yellow-500', hover: 'hover:bg-yellow-600', light: 'bg-yellow-50', 
      hoverBorder: 'hover:border-yellow-500', hoverText: 'group-hover:text-yellow-600', 
      hoverBg: 'group-hover:bg-yellow-50', fill: 'fill-yellow-500', shadow: 'shadow-yellow-500/5',
      chart: '#eab308'
    },
    red: { 
      bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600', ring: 'ring-red-500/20', 
      accent: 'accent-red-600', hover: 'hover:bg-red-700', light: 'bg-red-50', 
      hoverBorder: 'hover:border-red-500', hoverText: 'group-hover:text-red-600', 
      hoverBg: 'group-hover:bg-red-50', fill: 'fill-red-600', shadow: 'shadow-red-500/5',
      chart: '#dc2626'
    },
    indigo: { 
      bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600', ring: 'ring-indigo-500/20', 
      accent: 'accent-indigo-600', hover: 'hover:bg-indigo-700', light: 'bg-indigo-50', 
      hoverBorder: 'hover:border-indigo-500', hoverText: 'group-hover:text-indigo-600', 
      hoverBg: 'group-hover:bg-indigo-50', fill: 'fill-indigo-600', shadow: 'shadow-indigo-500/5',
      chart: '#4f46e5'
    },
    purple: { 
      bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600', ring: 'ring-purple-500/20', 
      accent: 'accent-purple-600', hover: 'hover:bg-purple-700', light: 'bg-purple-50', 
      hoverBorder: 'hover:border-purple-500', hoverText: 'group-hover:text-purple-600', 
      hoverBg: 'group-hover:bg-purple-50', fill: 'fill-purple-600', shadow: 'shadow-purple-500/5',
      chart: '#9333ea'
    },
    pink: { 
      bg: 'bg-pink-600', text: 'text-pink-600', border: 'border-pink-600', ring: 'ring-pink-500/20', 
      accent: 'accent-pink-600', hover: 'hover:bg-pink-700', light: 'bg-pink-50', 
      hoverBorder: 'hover:border-pink-500', hoverText: 'group-hover:text-pink-600', 
      hoverBg: 'group-hover:bg-pink-50', fill: 'fill-pink-600', shadow: 'shadow-pink-500/5',
      chart: '#db2777'
    },
    lime: { 
      bg: 'bg-lime-600', text: 'text-lime-600', border: 'border-lime-600', ring: 'ring-lime-500/20', 
      accent: 'accent-lime-600', hover: 'hover:bg-lime-700', light: 'bg-lime-50', 
      hoverBorder: 'hover:border-lime-500', hoverText: 'group-hover:text-lime-600', 
      hoverBg: 'group-hover:bg-lime-50', fill: 'fill-lime-600', shadow: 'shadow-lime-500/5',
      chart: '#65a30d'
    },
    fuchsia: { 
      bg: 'bg-fuchsia-600', text: 'text-fuchsia-600', border: 'border-fuchsia-600', ring: 'ring-fuchsia-500/20', 
      accent: 'accent-fuchsia-600', hover: 'hover:bg-fuchsia-700', light: 'bg-fuchsia-50', 
      hoverBorder: 'hover:border-fuchsia-500', hoverText: 'group-hover:text-fuchsia-600', 
      hoverBg: 'group-hover:bg-fuchsia-50', fill: 'fill-fuchsia-600', shadow: 'shadow-fuchsia-500/5',
      chart: '#c026d3'
    },
    sky: { 
      bg: 'bg-sky-600', text: 'text-sky-600', border: 'border-sky-600', ring: 'ring-sky-500/20', 
      accent: 'accent-sky-600', hover: 'hover:bg-sky-700', light: 'bg-sky-50', 
      hoverBorder: 'hover:border-sky-500', hoverText: 'group-hover:text-sky-600', 
      hoverBg: 'group-hover:bg-sky-50', fill: 'fill-sky-600', shadow: 'shadow-sky-500/5',
      chart: '#0284c7'
    },
    slate: { 
      bg: 'bg-slate-600', text: 'text-slate-600', border: 'border-slate-600', ring: 'ring-slate-500/20', 
      accent: 'accent-slate-600', hover: 'hover:bg-slate-700', light: 'bg-slate-50', 
      hoverBorder: 'hover:border-slate-500', hoverText: 'group-hover:text-slate-600', 
      hoverBg: 'group-hover:bg-slate-50', fill: 'fill-slate-600', shadow: 'shadow-slate-500/5',
      chart: '#475569'
    },
    green: { 
      bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600', ring: 'ring-green-500/20', 
      accent: 'accent-green-600', hover: 'hover:bg-green-700', light: 'bg-green-50', 
      hoverBorder: 'hover:border-green-500', hoverText: 'group-hover:text-green-600', 
      hoverBg: 'group-hover:bg-green-50', fill: 'fill-green-600', shadow: 'shadow-green-500/5',
      chart: '#16a34a'
    },
  };
  return colors[color] || colors.blue;
}
