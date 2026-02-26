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
    rose: { light: 'bg-rose-50/50', border: 'border-rose-100' },
    blue: { light: 'bg-blue-50/50', border: 'border-blue-100' },
    emerald: { light: 'bg-emerald-50/50', border: 'border-emerald-100' },
    amber: { light: 'bg-amber-50/50', border: 'border-amber-100' },
    teal: { light: 'bg-teal-50/50', border: 'border-teal-100' },
    violet: { light: 'bg-violet-50/50', border: 'border-violet-100' },
    cyan: { light: 'bg-cyan-50/50', border: 'border-cyan-100' },
    orange: { light: 'bg-orange-50/50', border: 'border-orange-100' },
    yellow: { light: 'bg-yellow-50/50', border: 'border-yellow-100' },
    red: { light: 'bg-red-50/50', border: 'border-red-100' },
    indigo: { light: 'bg-indigo-50/50', border: 'border-indigo-100' },
    purple: { light: 'bg-purple-50/50', border: 'border-purple-100' },
    pink: { light: 'bg-pink-50/50', border: 'border-pink-100' },
    lime: { light: 'bg-lime-50/50', border: 'border-lime-100' },
    fuchsia: { light: 'bg-fuchsia-50/50', border: 'border-fuchsia-100' },
    sky: { light: 'bg-sky-50/50', border: 'border-sky-100' },
    slate: { light: 'bg-slate-50/50', border: 'border-slate-100' },
    green: { light: 'bg-green-50/50', border: 'border-green-100' },
  };
  return colors[color] || colors.blue;
}
