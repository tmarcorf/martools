import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimerMode, TimerState } from '../types/pomodoro.types';
import { TIMER_DURATIONS } from '../types/pomodoro.types';

export function usePomodoroTimer() {
  const [state, setState] = useState<TimerState>({
    timeRemaining: TIMER_DURATIONS.focus,
    mode: 'focus',
    isRunning: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const stateRef = useRef(state);
  stateRef.current = state;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const tick = useCallback(() => {
    const current = stateRef.current;
    if (current.timeRemaining <= 1) {
      clearTimer();
      setState((prev) => ({ ...prev, timeRemaining: 0, isRunning: false }));
      return;
    }
    setState((prev) => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
  }, [clearTimer]);

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (prev.isRunning) {
        clearTimer();
        return { ...prev, isRunning: false };
      }
      return { ...prev, isRunning: true };
    });
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      timeRemaining: TIMER_DURATIONS[prev.mode],
      mode: prev.mode,
      isRunning: false,
    }));
  }, [clearTimer]);

  const setMode = useCallback(
    (mode: TimerMode) => {
      clearTimer();
      setState({
        timeRemaining: TIMER_DURATIONS[mode],
        mode,
        isRunning: false,
      });
    },
    [clearTimer],
  );

  // Start/stop interval when isRunning changes
  useEffect(() => {
    if (state.isRunning && state.timeRemaining > 0) {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => clearTimer();
  }, [state.isRunning, tick, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    timeRemaining: state.timeRemaining,
    mode: state.mode,
    isRunning: state.isRunning,
    totalDuration: TIMER_DURATIONS[state.mode],
    togglePause,
    reset,
    setMode,
  };
}
