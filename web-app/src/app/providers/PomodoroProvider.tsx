import { createContext, type ReactNode } from 'react';
import type { PomodoroContextValue } from '../../features/pomodoro/types/pomodoro.types';
import { usePomodoroTimer } from '../../features/pomodoro/hooks/usePomodoroTimer';

export const PomodoroContext = createContext<PomodoroContextValue | null>(null);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const timer = usePomodoroTimer();

  return (
    <PomodoroContext value={timer}>
      {children}
    </PomodoroContext>
  );
}
