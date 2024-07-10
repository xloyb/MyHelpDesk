"use client";
import { useState, useEffect } from "react";
import { getAllTickets, updateTicketStatus } from "@/lib/ticket";
import { getAllVouches, createVouch } from "@/lib/vouch";
import { getAllUsers, isAdmin, updateUserRole } from "@/lib/user";
import { getAllRoles } from "@/lib/role";
import UsersTab from "@/components/UsersTable";
import TicketsTable from "@/components/TicketsTable";
import VouchesTable from "@/components/VouchesTable";
import styles from "@/app/main.module.css";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";
import ManageRoles from "@/components/RolesTable";
import Settings from "@/components/Settings";

const AdminCP = () => {
  const { userId } = useAuth();

  const [tickets, setTickets] = useState<any[]>([]);
  const [vouches, setVouches] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const [tickets, vouches, users, roles] = await Promise.all([
        getAllTickets(),
        getAllVouches(),
        getAllUsers(),
        getAllRoles(),
      ]);
      setTickets(tickets);
      setVouches(vouches);
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

  const handleStatusChange = async (ticketId: number, newStatus: string) => {
    await updateTicketStatus(ticketId, newStatus);
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
  };

  const handleUserRoleChange = async (userId: string, newRoleId: number) => {
    await updateUserRole(userId, newRoleId);
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, roleId: newRoleId } : user
    );
    setUsers(updatedUsers);
  };

  const handleCreateVouch = async (
    vouchedBy: string,
    vouchedTo: string,
    message: string
  ) => {
    const newVouch = await createVouch(vouchedBy, vouchedTo, message);
    setVouches([...vouches, newVouch]);
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
        <div className="h-screen overflow-hidden sticky top-0 overflow-x-hidden">
          <ChatNavbar />
          <div>
            <h1>AdminCP - Management</h1>
            {isAdminMember ? (
              <>
              <h2>Settings</h2>

<Settings/>


                <h2>Users:</h2>
                <UsersTab
                  users={users}
                  roles={roles}
                  handleUserRoleChange={handleUserRoleChange}
                />

                <h1>Roles: </h1>
                <ManageRoles/>
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

export default AdminCP;
