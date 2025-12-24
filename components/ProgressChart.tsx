
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Exercise } from '../types';
import { X } from 'lucide-react';

interface ProgressChartProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  const data = exercise.history.map(log => ({
    date: log.date,
    peso: log.weight
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-100">{exercise.name}</h2>
            <p className="text-sm text-slate-400">Histórico de Cargas (Kg)</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-64 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="peso" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
              <p>Nenhum dado registrado para este exercício.</p>
              <p className="text-xs mt-2 italic">Insira novos pesos para ver o gráfico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
