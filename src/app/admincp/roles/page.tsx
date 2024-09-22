"use client"
import { useState, useEffect } from "react";
import { getAllRoles } from "@/lib/role";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";
import ManageRoles from "@/components/RolesTable";
import Layout1 from "@/app/ChatLayout/layout";

const AdminCPRoles = () => {
  const { userId } = useAuth();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
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
   <Layout1>
     {isAdminMember ? (
                <>

              <ManageRoles />
                </>
            ) : (
              <p>You do not have access to this section.</p>
            )}
   </Layout1>
  );
};

export default AdminCPRoles;
