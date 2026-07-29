import { Outlet, Link, useLocation } from 'react-router-dom';
import { APP } from '../../../config/constants';
import { PomodoroProvider } from '../../../app/providers/PomodoroProvider';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <nav className="nav">
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            ~/martools
          </Link>
          <ul className="nav__links">
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                Gerador CPF/CNPJ
              </Link>
            </li>
            <li>
              <Link
                to="/pomodoro"
                className={location.pathname === '/pomodoro' ? 'active' : ''}
              >
                Pomodoro
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="app-layout__main">
        <PomodoroProvider>
          <Outlet />
        </PomodoroProvider>
      </main>

      <footer className="footer">
        <div className="footer__left">
          <span>{APP.name}</span>
          <span className="footer__separator">|</span>
          <span>{APP.description}</span>
        </div>
      </footer>
    </div>
  );
}
