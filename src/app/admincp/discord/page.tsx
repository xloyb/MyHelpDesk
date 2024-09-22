"use client";
import { useState, useEffect } from "react";
import { getAllRoles } from "@/lib/role";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";
import DiscordInfoPage from "@/components/admincp/Discord_info";
import Layout1 from "@/app/ChatLayout/layout";

const AdminCP_Discord = () => {
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
   <Layout1>
    {isAdminMember ? (
                <>
                <DiscordInfoPage/>
                </>
            ) : (
              <p>You do not have access to this section.</p>
            )}
   </Layout1>
  );
};

export default AdminCP_Discord;
