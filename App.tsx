
import React, { useState, useEffect, useCallback } from 'react';
import { DayOfWeek, WorkoutDay, Exercise } from './types';
import { INITIAL_WORKOUTS } from './constants';
import ExerciseRow from './components/ExerciseRow';
import ProgressChart from './components/ProgressChart';
import { Dumbbell, Calendar, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [workouts, setWorkouts] = useState<Record<DayOfWeek, WorkoutDay>>(INITIAL_WORKOUTS);
  const [activeDay, setActiveDay] = useState<DayOfWeek>(DayOfWeek.SEGUNDA);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('treino_semanal_data');
    if (saved) {
      try {
        setWorkouts(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados do LocalStorage", e);
      }
    }
  }, []);

  const saveToStorage = useCallback((data: Record<DayOfWeek, WorkoutDay>) => {
    localStorage.setItem('treino_semanal_data', JSON.stringify(data));
  }, []);

  const handleUpdateWeight = (exerciseId: string, weight: number) => {
    setWorkouts(prev => {
      const currentDay = prev[activeDay];
      const newExercises = currentDay.exercises.map(ex => {
        if (ex.id === exerciseId) {
          const date = new Date().toLocaleDateString('pt-BR');
          const lastHistory = ex.history[ex.history.length - 1];
          const updatedHistory = [...ex.history];
          
          if (!lastHistory || lastHistory.weight !== weight) {
            updatedHistory.push({ date, weight });
          }

          return { ...ex, currentWeight: weight, history: updatedHistory };
        }
        return ex;
      });

      const nextState = {
        ...prev,
        [activeDay]: { ...currentDay, exercises: newExercises }
      };
      
      saveToStorage(nextState);
      return nextState;
    });
  };

  const handleReset = () => {
    if (confirm("Deseja apagar todo o histórico de progresso?")) {
      localStorage.removeItem('treino_semanal_data');
      setWorkouts(INITIAL_WORKOUTS);
    }
  };

  const currentWorkout = workouts[activeDay];

  return (
    <div className="min-h-screen pb-12 bg-slate-950 text-slate-200">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Dumbbell className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Treino Semanal <span className="text-emerald-400">Pro</span>
            </h1>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-500/10"
            title="Resetar dados"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Seletor de Dias */}
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
          {(Object.keys(workouts) as DayOfWeek[]).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 rounded-2xl font-bold capitalize whitespace-nowrap transition-all border ${
                activeDay === day
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xl shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Card do Treino */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-300">
          <div className={`p-8 bg-gradient-to-br ${currentWorkout.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-white/80 font-semibold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="capitalize text-sm tracking-wide">{activeDay}</span>
                </div>
                <h2 className="text-4xl font-black text-white leading-tight">{currentWorkout.title}</h2>
                <p className="text-white/80 mt-1 font-medium">{currentWorkout.subtitle}</p>
              </div>
              <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-xl border border-white/20 shadow-inner">
                <Dumbbell className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/50">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 bg-slate-900/50">
                    <th className="py-4 px-4 text-left font-bold">Exercício</th>
                    <th className="py-4 px-2 text-center font-bold">Sets</th>
                    <th className="py-4 px-2 text-center font-bold">Reps</th>
                    <th className="py-4 px-2 text-center font-bold">Peso (Kg)</th>
                    <th className="py-4 px-4 text-center font-bold">Evol.</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWorkout.exercises.map((ex) => (
                    <ExerciseRow
                      key={ex.id}
                      exercise={ex}
                      onUpdateWeight={handleUpdateWeight}
                      onShowChart={setSelectedExercise}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {currentWorkout.cardio && (
              <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <p className="text-emerald-400 font-bold text-lg">{currentWorkout.cardio}</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-600 pb-8">
          <p className="font-medium tracking-wide">Treino Semanal Pro • 2024</p>
        </footer>
      </main>

      {/* Popups */}
      {selectedExercise && (
        <ProgressChart 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
};

export default App;
