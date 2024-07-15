"use client";
import { useState, useEffect } from "react";
import { getAllRoles } from "@/lib/role";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";
import ManageRoles from "@/components/RolesTable";

const AdminCPRoles = () => {
  const { userId } = useAuth();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
      setLoading(false);
    };

    const checkUserRole = async () => {
      if (userId) {
        const isAdminMember = await isAdmin(userId);
        setisAdminMember(isAdminMember);
      }
    };

    fetchData();
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
        <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-y-auto">
          <ChatNavbar />
          <div className="overflow-y-auto">
            <h1>AdminCP - Roles</h1>
            {isAdminMember ? (
                <>

              <ManageRoles />
            <div className="flex flex-col items-center justify-center h-screen">test</div>
                </>
            ) : (
              <p>You do not have access to this section.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCPRoles;
