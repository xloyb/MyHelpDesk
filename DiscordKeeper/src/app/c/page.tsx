"use client"
import React from "react";
import styles from "@/app/main.module.css";
import Sidebar from "@/components/Sidebar";
import MyChat from "@/components/MyChat";
import ChatNavbar from "@/components/ChatNavbar";
import MyStats from "@/components/User/UserStats";
import { useAuth } from "@clerk/nextjs";

const Chat = () => {
  const { userId } = useAuth();

  if (!userId) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.container} >
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen overflow-hidden sticky top-0 overflow-x-hidden bg-base-200">
          <ChatNavbar />
          
          <MyStats userId={userId} />
          {/* <MyChat /> */}

          {/* <Footer/> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
