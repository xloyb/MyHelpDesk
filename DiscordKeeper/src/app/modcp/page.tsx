"use client"
import { useState, useEffect } from 'react';
import { getAllTickets, updateTicketStatus } from '@/lib/ticket';
import { getAllVouches, createVouch } from '@/lib/vouch';
import { getAllUsers, updateUserRole } from '@/lib/user';
import { getAllRoles, createRole } from '@/lib/role';
import Image from 'next/image';
import UsersTab from '@/components/UsersTable';
import TicketsTable from '@/components/TicketsTable';
import VouchesTable from '@/components/VouchesTable';
import { User } from '@prisma/client';
import styles from '@/app/main.module.css'
import Sidebar from '@/components/Sidebar'
import MyChat from '@/components/MyChat'
import ChatNavbar from '@/components/ChatNavbar'

const ModCP = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [vouches, setVouches] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    fetchData();
  }, []);

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

  const handleCreateVouch = async (vouchedBy: string, vouchedTo: string, message: string) => {
    const newVouch = await createVouch(vouchedBy, vouchedTo, message);
    setVouches([...vouches, newVouch]);
  };

  const handleCreateRole = async (name: string, description: string) => {
    const newRole = await createRole(name, description);
    setRoles([...roles, newRole]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/> 
      </div>
      <div className={styles.content}>

    <div className='h-screen overflow-hidden sticky top-0  overflow-x-hidden' >
        <ChatNavbar/>

        <div>
      <h1>ModCP - Management</h1>


<h2>Users:</h2>

<UsersTab users={users} roles={roles} handleUserRoleChange={handleUserRoleChange}/>

      <h2>Tickets</h2>
      <TicketsTable tickets={tickets} handleStatusChange={handleStatusChange}/>
     


     
     
    </div>        
        {/* <Footer/> */}

      </div>

      </div>
    </div>

    
  );
};

export default ModCP;
