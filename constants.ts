
import { WorkoutDay, DayOfWeek } from './types';

export const INITIAL_WORKOUTS: Record<DayOfWeek, WorkoutDay> = {
  [DayOfWeek.SEGUNDA]: {
    id: DayOfWeek.SEGUNDA,
    title: 'Peito & Tríceps',
    subtitle: '🔴 Foco em Empurrar',
    color: 'from-red-500 to-orange-500',
    cardio: '🏃 Cardio: 10–15 min',
    exercises: [
      { id: 'supino', name: 'Supino reto', sets: 4, reps: '8–12', currentWeight: 0, history: [] },
      { id: 'inclinado', name: 'Supino inclinado', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'crucifixo', name: 'Crucifixo', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'pulley', name: 'Tríceps pulley', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'frances', name: 'Tríceps francês', sets: 3, reps: '10', currentWeight: 0, history: [] },
    ]
  },
  [DayOfWeek.TERCA]: {
    id: DayOfWeek.TERCA,
    title: 'Costas & Bíceps',
    subtitle: '🔵 Foco em Puxar',
    color: 'from-blue-500 to-cyan-500',
    exercises: [
      { id: 'puxada', name: 'Puxada alta', sets: 4, reps: '8–12', currentWeight: 0, history: [] },
      { id: 'remada', name: 'Remada curvada', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'unilateral', name: 'Remada unilateral', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'rosca', name: 'Rosca direta', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'martelo', name: 'Rosca martelo', sets: 3, reps: '10', currentWeight: 0, history: [] },
    ]
  },
  [DayOfWeek.QUARTA]: {
    id: DayOfWeek.QUARTA,
    title: 'Pernas',
    subtitle: '🟢 Foco em Inferiores',
    color: 'from-green-500 to-emerald-500',
    exercises: [
      { id: 'agachamento', name: 'Agachamento', sets: 4, reps: '10', currentWeight: 0, history: [] },
      { id: 'legpress', name: 'Leg press', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'extensora', name: 'Extensora', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'flexora', name: 'Flexora', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'panturrilha', name: 'Panturrilha', sets: 3, reps: '15', currentWeight: 0, history: [] },
    ]
  },
  [DayOfWeek.QUINTA]: {
    id: DayOfWeek.QUINTA,
    title: 'Ombros & Trapézio',
    subtitle: '🟣 Foco em Deltoides',
    color: 'from-purple-500 to-pink-500',
    exercises: [
      { id: 'lateral', name: 'Elevação lateral', sets: 4, reps: '12', currentWeight: 0, history: [] },
      { id: 'desenv', name: 'Desenvolvimento', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'frontal', name: 'Elevação frontal', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'encolhimento', name: 'Encolhimento', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'facepull', name: 'Face pull', sets: 3, reps: '12', currentWeight: 0, history: [] },
    ]
  },
  [DayOfWeek.SEXTA]: {
    id: DayOfWeek.SEXTA,
    title: 'Braços & Core',
    subtitle: '🟠 Foco em Isolamento',
    color: 'from-orange-500 to-yellow-500',
    exercises: [
      { id: 'alternada', name: 'Rosca alternada', sets: 3, reps: '10', currentWeight: 0, history: [] },
      { id: 'testa', name: 'Tríceps testa', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'concentrada', name: 'Rosca concentrada', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'kickback', name: 'Kickback', sets: 3, reps: '12', currentWeight: 0, history: [] },
      { id: 'prancha', name: 'Prancha (s)', sets: 3, reps: '30', currentWeight: 0, history: [] },
    ]
  },
};
