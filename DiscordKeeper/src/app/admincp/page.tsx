"use client";
import { useState, useEffect } from "react";
import { getAllTickets, updateTicketStatus } from "@/lib/ticket";
import { getAllUsers, isAdmin, updateUserRole } from "@/lib/user";
import { getAllRoles } from "@/lib/role";
import UsersTab from "@/components/UsersTable";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";
import ManageRoles from "@/components/RolesTable";
import Settings from "@/components/Settings";

const AdminCP = () => {
  const { userId } = useAuth();

  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const [tickets, users, roles] = await Promise.all([
        getAllTickets(),
        getAllUsers(),
        getAllRoles(),
      ]);
      setTickets(tickets);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-base-200 flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/4">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10">
          <ChatNavbar />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-4">AdminCP - Management</h1>
          {isAdminMember ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <Settings />
              <h2 className="text-xl font-semibold mt-4 mb-2">Users</h2>
              <UsersTab
                users={users}
                roles={roles}
                handleUserRoleChange={handleUserRoleChange}
              />
              <h2 className="text-xl font-semibold mt-4 mb-2">Roles</h2>
              <ManageRoles />
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
