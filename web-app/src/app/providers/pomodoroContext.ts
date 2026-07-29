import { createContext } from 'react';
import type { PomodoroContextValue } from '../../features/pomodoro/types/pomodoro.types';

export const PomodoroContext = createContext<PomodoroContextValue | null>(null);
