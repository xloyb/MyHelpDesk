"use client"
import CryptoTracker from "@/components/CryptoList";
import React from "react";
import styles from "@/app/main.module.css";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";

const Page: React.FC = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <div className="h-screen overflow-hidden sticky top-0  overflow-x-hidden bg-base-200">
            <ChatNavbar />

            <CryptoTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
