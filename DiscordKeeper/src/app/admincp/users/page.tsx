"use client";
import { useState, useEffect } from "react";
import { getAllUsers, isAdmin, updateUserRole } from "@/lib/user";
import { getAllRoles } from "@/lib/role";
import UsersTab from "@/components/UsersTable";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";

const AdminCPUsers = () => {
  const { userId } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const [users, roles] = await Promise.all([getAllUsers(), getAllRoles()]);
      setUsers(users);
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

  const handleUserRoleChange = async (userId: string, newRoleId: number) => {
    await updateUserRole(userId, newRoleId);
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, roleId: newRoleId } : user
    );
    setUsers(updatedUsers);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen overflow-hidden sticky top-0 overflow-y-auto">
          <ChatNavbar />
          <div className="overflow-y-auto">
            <h1>AdminCP - Users</h1>
            {isAdminMember ? (
              <UsersTab users={users} roles={roles} handleUserRoleChange={handleUserRoleChange} />
            ) : (
              <p>You do not have access to this section.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCPUsers;
