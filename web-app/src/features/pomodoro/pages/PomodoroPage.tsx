import { useContext } from 'react';
import { PomodoroContext } from '../../../app/providers/pomodoroContext';
import { TIMER_LABELS } from '../types/pomodoro.types';
import { CircularTimer } from '../components/CircularTimer';
import { TimerControls } from '../components/TimerControls';
import { TaskList } from '../components/TaskList';

export function PomodoroPage() {
  const ctx = useContext(PomodoroContext);

  return (
    <section className="section pomodoro-page">
      <div className="section__inner">
        <div className="section-divider">// pomodoro</div>

        <div className="pomodoro-page__layout">
          {/* Timer section */}
          <div className="pomodoro-page__timer">
            <div className="card pomodoro-card animate-fade-in">
              {/* Mode indicator */}
              {ctx && (
                <div className={`pomodoro-card__mode-indicator pomodoro-card__mode-indicator--${ctx.mode}`}>
                  {TIMER_LABELS[ctx.mode]}
                </div>
              )}

              <CircularTimer />
              <TimerControls />
            </div>
          </div>

          {/* Task section */}
          <div className="pomodoro-page__tasks">
            <TaskList />
          </div>
        </div>
      </div>
    </section>
  );
}
