import { useContext } from 'react';
import { PomodoroContext } from '../../../app/providers/pomodoroContext';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function CircularTimer() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) return null;

  const { timeRemaining, totalDuration, mode, isRunning } = ctx;

  const radius = 120;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = 1 - timeRemaining / totalDuration;
  const strokeDashoffset = circumference * (1 - progress);

  const modeColors: Record<string, string> = {
    focus: 'var(--accent-purple)',
    shortBreak: 'var(--accent-teal)',
    longBreak: 'var(--accent-blue)',
  };

  const strokeColor = modeColors[mode] ?? 'var(--accent-purple)';

  return (
    <div className="circular-timer">
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="circular-timer__svg"
      >
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="var(--border-primary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
          className="circular-timer__progress"
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s var(--ease-out)' }}
        />
      </svg>
      <div className="circular-timer__center">
        <span className={`circular-timer__time ${timeRemaining === 0 ? 'circular-timer__time--done' : ''}`}>
          {formatTime(timeRemaining)}
        </span>
        <span className={`circular-timer__status ${isRunning ? 'circular-timer__status--running' : ''}`}>
          {isRunning ? '● executando' : timeRemaining === totalDuration ? 'Pronto' : '■ pausado'}
        </span>
      </div>
    </div>
  );
}
