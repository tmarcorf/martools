import { useContext } from 'react';
import { PomodoroContext } from '../../../app/providers/PomodoroProvider';
import { TIMER_LABELS, type TimerMode } from '../types/pomodoro.types';

const MODES: TimerMode[] = ['focus', 'shortBreak', 'longBreak'];

export function TimerControls() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) return null;

  const { mode, isRunning, togglePause, reset, setMode } = ctx;

  return (
    <div className="timer-controls">
      {/* Mode selector */}
      <div className="timer-controls__modes">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            className={`timer-controls__mode ${mode === m ? 'timer-controls__mode--active' : ''}`}
            onClick={() => setMode(m)}
          >
            {TIMER_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="timer-controls__actions">
        <button
          type="button"
          className={`timer-controls__btn timer-controls__btn--primary ${isRunning ? 'timer-controls__btn--pause' : ''}`}
          onClick={togglePause}
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          type="button"
          className="timer-controls__btn timer-controls__btn--ghost"
          onClick={reset}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
