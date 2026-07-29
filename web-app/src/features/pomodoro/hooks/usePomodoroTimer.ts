import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimerMode, TimerState } from '../types/pomodoro.types';
import { TIMER_DURATIONS } from '../types/pomodoro.types';

function playEndSound() {
  try {
    const ctx = new AudioContext();

    const playNote = (
      frequency: number,
      startTime: number,
      duration: number,
      volume: number,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
      gain.gain.setValueAtTime(volume, startTime + duration * 0.7);
      gain.gain.linearRampToValueAtTime(0, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;

    // C major arpeggio: C5 → E5 → G5 → C6
    const notes: Array<{ freq: number; delay: number; duration: number; volume: number }> = [
      { freq: 523.25, delay: 0, duration: 0.25, volume: 0.3 },
      { freq: 659.25, delay: 0.12, duration: 0.25, volume: 0.3 },
      { freq: 783.99, delay: 0.24, duration: 0.25, volume: 0.3 },
      { freq: 1046.50, delay: 0.36, duration: 0.5, volume: 0.35 },
    ];

    for (const note of notes) {
      playNote(note.freq, now + note.delay, note.duration, note.volume);
    }
  } catch {
    // Audio not supported — silently ignore
  }
}

export function usePomodoroTimer() {
  const [state, setState] = useState<TimerState>({
    timeRemaining: TIMER_DURATIONS.focus,
    mode: 'focus',
    isRunning: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  });

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

  // Start/stop interval when isRunning or timeRemaining changes
  useEffect(() => {
    if (state.isRunning && state.timeRemaining > 0) {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => clearTimer();
  }, [state.isRunning, state.timeRemaining, tick, clearTimer]);

  // Play sound when timer reaches 0 naturally (not on mount or mode switch)
  const justFinishedRef = useRef(false);
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isRunning && justFinishedRef.current) {
      playEndSound();
    }
    justFinishedRef.current = state.timeRemaining > 0 && state.isRunning;
  }, [state.timeRemaining, state.isRunning]);

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
