
export interface ExerciseLog {
  date: string;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  currentWeight: number;
  history: ExerciseLog[];
}

export interface WorkoutDay {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  exercises: Exercise[];
  cardio?: string;
}

export enum DayOfWeek {
  SEGUNDA = 'segunda',
  TERCA = 'terca',
  QUARTA = 'quarta',
  QUINTA = 'quinta',
  SEXTA = 'sexta'
}
