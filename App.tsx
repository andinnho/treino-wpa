
import React, { useState, useEffect, useCallback } from 'react';
import { DayOfWeek, WorkoutDay, Exercise } from './types';
import { INITIAL_WORKOUTS } from './constants';
import ExerciseRow from './components/ExerciseRow';
import ProgressChart from './components/ProgressChart';
import AICoach from './components/AICoach';
import { Dumbbell, Calendar, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [workouts, setWorkouts] = useState<Record<DayOfWeek, WorkoutDay>>(INITIAL_WORKOUTS);
  const [activeDay, setActiveDay] = useState<DayOfWeek>(DayOfWeek.SEGUNDA);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('treino_semanal_data');
    if (saved) {
      try {
        setWorkouts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse workouts data", e);
      }
    }
  }, []);

  // Save to LocalStorage
  const saveToStorage = useCallback((data: Record<DayOfWeek, WorkoutDay>) => {
    localStorage.setItem('treino_semanal_data', JSON.stringify(data));
  }, []);

  const handleUpdateWeight = (exerciseId: string, weight: number) => {
    setWorkouts(prev => {
      const currentDay = prev[activeDay];
      const newExercises = currentDay.exercises.map(ex => {
        if (ex.id === exerciseId) {
          const date = new Date().toLocaleDateString('pt-BR');
          // Add to history only if the weight actually changed and it's not the same day or it's a new entry
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
    if (confirm("Tem certeza que deseja resetar todos os dados? Isso apagará seu histórico.")) {
      localStorage.removeItem('treino_semanal_data');
      setWorkouts(INITIAL_WORKOUTS);
    }
  };

  const currentWorkout = workouts[activeDay];

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Dumbbell className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Treino Semanal Pro
            </h1>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
            title="Resetar dados"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* AICoach Section */}
        <AICoach workoutData={workouts} />

        {/* Day Selector */}
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
          {Object.values(DayOfWeek).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition-all border ${
                activeDay === day
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {/* Workout Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-8 bg-gradient-to-br ${currentWorkout.color}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-white/80 font-medium mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="capitalize">{activeDay}</span>
                </div>
                <h2 className="text-3xl font-black text-white">{currentWorkout.title}</h2>
                <p className="text-white/80 mt-1">{currentWorkout.subtitle}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">
                    <th className="py-3 px-2 text-left font-semibold">Exercício</th>
                    <th className="py-3 px-2 text-center font-semibold">Séries</th>
                    <th className="py-3 px-2 text-center font-semibold">Reps</th>
                    <th className="py-3 px-2 text-center font-semibold">Carga (Kg)</th>
                    <th className="py-3 px-2 text-center font-semibold">Evol.</th>
                  </tr>
                </thead>
                <tbody className="group">
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
              <div className="mt-8 p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl">
                <p className="text-emerald-400 font-semibold">{currentWorkout.cardio}</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-600 text-sm">
          <p>© 2024 Treino Semanal Pro • Foco & Constância</p>
        </footer>
      </main>

      {/* Overlays */}
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
