"use client";
import { useState, useEffect } from "react";
import { getAllTickets, updateTicketStatus } from "@/lib/ticket";
import { getAllUsers, isTeam, updateUserRole } from "@/lib/user";
import { getAllRoles } from "@/lib/role";
import TicketsTable from "@/components/TicketsTable";
import styles from "@/app/main.module.css";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";

const ModCP = () => {
  const { userId } = useAuth();

  const [tickets, setTickets] = useState<any[]>([]);
  const [vouches, setVouches] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTeamMember, setIsTeamMember] = useState<boolean>(false);

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
        const isTeamMember = await isTeam(userId);
        setIsTeamMember(isTeamMember);
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
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen bg-base-200 sticky top-0 overflow-x-auto">
          <ChatNavbar />
          <div>
            {isTeamMember ? (
              <>
                <TicketsTable
                  tickets={tickets}
                  handleStatusChange={handleStatusChange}
                />
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

export default ModCP;
