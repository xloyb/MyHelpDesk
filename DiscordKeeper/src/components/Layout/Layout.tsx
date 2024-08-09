import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatNavbar from '@/components/ChatNavbar';
import styles from '@/app/main.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="sticky top-0 z-10">
          <ChatNavbar />
        </div>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
