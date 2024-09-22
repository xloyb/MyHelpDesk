import { ClerkProvider } from "@clerk/nextjs";
import Whatsapp from "@/components/Layout/Whatsapp";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import styles from "@/app/main.module.css";

import ChatNavbar from "@/components/ChatNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout1({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
             <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-y-auto">
          <ChatNavbar />
          <div className="overflow-y-auto">       
                <>
                {children}
                </>
          </div>
        </div>
      </div>
    </div>
        </ClerkProvider>
    );
}
