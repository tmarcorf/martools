export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
};

export const TIMER_LABELS: Record<TimerMode, string> = {
  focus: 'Foco',
  shortBreak: 'Pausa Curta',
  longBreak: 'Pausa Longa',
};

export interface TimerState {
  timeRemaining: number;
  mode: TimerMode;
  isRunning: boolean;
}

export interface PomodoroContextValue {
  timeRemaining: number;
  mode: TimerMode;
  isRunning: boolean;
  totalDuration: number;
  togglePause: () => void;
  reset: () => void;
  setMode: (mode: TimerMode) => void;
}

export interface PomodoroTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
