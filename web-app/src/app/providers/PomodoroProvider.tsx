import { type ReactNode } from 'react';
import { PomodoroContext } from './pomodoroContext';
import { usePomodoroTimer } from '../../features/pomodoro/hooks/usePomodoroTimer';

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const timer = usePomodoroTimer();

  return (
    <PomodoroContext value={timer}>
      {children}
    </PomodoroContext>
  );
}
