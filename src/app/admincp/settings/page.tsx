"use client"
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import Settings from "@/components/Settings";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";
import Layout1 from "@/app/ChatLayout/layout";

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
    <Layout1>
      <Settings />
    </Layout1>
  );
};

export default AdminCPSettings;
