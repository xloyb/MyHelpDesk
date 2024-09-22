"use client";
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";
import styles from "@/app/main.module.css";
import AdminHome from "@/components/admincp/AdminHome";
import Layout1 from "../ChatLayout/layout";

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
    setLoading(false);
  }, [userId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout1>
       {isAdminMember ? (
            <>
              <AdminHome/>
            </>
          ) : (
            <p>You do not have access to this section.</p>
          )}
    </Layout1>
  );
};

export default AdminCP;

