import { useState, useCallback, useEffect } from 'react';
import type { PomodoroTask } from '../types/pomodoro.types';

const STORAGE_KEY = 'martools-pomodoro-tasks';

function loadTasks(): PomodoroTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PomodoroTask[]) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: PomodoroTask[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<PomodoroTask[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((text: string) => {
    const task: PomodoroTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, task]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, toggleTask, removeTask };
}
