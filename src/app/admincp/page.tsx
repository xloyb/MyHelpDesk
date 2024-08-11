"use client";
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";
import styles from "@/app/main.module.css";

const AdminCP = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setIsAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (userId) {
        try {
          const isAdminMember = await isAdmin(userId);
          setIsAdminMember(isAdminMember);
        } catch (error) {
          console.error("Failed to check user role:", error);
        }
      }
    };

    checkUserRole();
  }, [userId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="sticky top-0 z-10">
          <ChatNavbar />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {isAdminMember ? (
            <>
              test
            </>
          ) : (
            <p>You do not have access to this section.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCP;

