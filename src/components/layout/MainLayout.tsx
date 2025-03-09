import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Sidebar from '../sidebar/Sidebar';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
