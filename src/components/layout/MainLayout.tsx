import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Sidebar from '../sidebar/Sidebar';
import { useState } from 'react';

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar onCollapse={(collapsed: boolean) => setSidebarCollapsed(collapsed)} />
      <div className={`${styles.content} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
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
