import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../shared/components/layout/AppLayout';
import { CpfCnpjPage } from '../features/cpf-cnpj/pages/CpfCnpjPage';
import { PomodoroPage } from '../features/pomodoro/pages/PomodoroPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <CpfCnpjPage /> },
      { path: 'pomodoro', element: <PomodoroPage /> },
    ],
  },
]);
