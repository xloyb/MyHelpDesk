"use client"
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import Settings from "@/components/Settings";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";

const AdminCPSettings = () => {
  const { userId } = useAuth();
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (userId) {
        const isAdminMember = await isAdmin(userId);
        setisAdminMember(isAdminMember);
      }
    };

    checkUserRole();
  }, [userId]);

  if (!isAdminMember) {
    return <div>You do not have access to this section.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-y-auto">
          <ChatNavbar />
          <div className="overflow-y-auto">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCPSettings;
