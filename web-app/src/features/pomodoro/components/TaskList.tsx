import { useState, useCallback } from 'react';
import { useTasks } from '../hooks/useTasks';

export function TaskList() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [input, setInput] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      addTask(input);
      setInput('');
    },
    [input, addTask],
  );

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="task-list card">
      <h3 className="task-list__title">Tarefas</h3>

      {/* Input */}
      <form className="task-list__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-list__input"
          placeholder="+ adicionar tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={120}
        />
      </form>

      {/* Pending */}
      {pending.length > 0 && (
        <ul className="task-list__items">
          {pending.map((task) => (
            <li key={task.id} className="task-list__item">
              <button
                type="button"
                className="task-list__checkbox"
                onClick={() => toggleTask(task.id)}
                aria-label="Marcar como concluída"
              />
              <span className="task-list__text">{task.text}</span>
              <button
                type="button"
                className="task-list__remove"
                onClick={() => removeTask(task.id)}
                aria-label="Remover tarefa"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <ul className="task-list__items task-list__items--completed">
          {completed.map((task) => (
            <li key={task.id} className="task-list__item task-list__item--done">
              <button
                type="button"
                className="task-list__checkbox task-list__checkbox--checked"
                onClick={() => toggleTask(task.id)}
                aria-label="Desmarcar"
              />
              <span className="task-list__text">{task.text}</span>
              <button
                type="button"
                className="task-list__remove"
                onClick={() => removeTask(task.id)}
                aria-label="Remover tarefa"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length === 0 && (
        <p className="task-list__empty">Nenhuma tarefa ainda.</p>
      )}
    </div>
  );
}
