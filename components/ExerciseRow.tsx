
import React from 'react';
import { Exercise } from '../types';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface ExerciseRowProps {
  exercise: Exercise;
  onUpdateWeight: (id: string, weight: number) => void;
  onShowChart: (exercise: Exercise) => void;
}

const ExerciseRow: React.FC<ExerciseRowProps> = ({ exercise, onUpdateWeight, onShowChart }) => {
  const previousWeight = exercise.history.length > 1 
    ? exercise.history[exercise.history.length - 2].weight 
    : exercise.history.length === 1 ? exercise.history[0].weight : null;

  const renderTrend = () => {
    if (previousWeight === null || exercise.currentWeight === 0) return <Minus className="w-4 h-4 text-slate-500" />;
    if (exercise.currentWeight > previousWeight) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (exercise.currentWeight < previousWeight) return <TrendingDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-amber-400" />;
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
      <td 
        className="py-3 px-2 font-medium text-slate-300 cursor-pointer flex items-center gap-2"
        onClick={() => onShowChart(exercise)}
      >
        {exercise.name}
        <Info className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100" />
      </td>
      <td className="py-3 px-2 text-center text-slate-400">{exercise.sets}</td>
      <td className="py-3 px-2 text-center text-slate-400">{exercise.reps}</td>
      <td className="py-3 px-2 text-center">
        <input
          type="number"
          value={exercise.currentWeight || ''}
          onChange={(e) => onUpdateWeight(exercise.id, parseFloat(e.target.value) || 0)}
          className="w-16 bg-slate-900 border border-slate-700 rounded-md py-1 px-2 text-center text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          placeholder="0"
        />
      </td>
      <td className="py-3 px-2 text-center flex justify-center items-center h-full">
        {renderTrend()}
      </td>
    </tr>
  );
};

export default ExerciseRow;
