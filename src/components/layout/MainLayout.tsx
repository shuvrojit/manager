import { Link, Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav role="navigation">
          <ul className={styles.nav}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
