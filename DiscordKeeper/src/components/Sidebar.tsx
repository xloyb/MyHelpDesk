"use client"
import React, { useEffect, useState } from 'react';
import TicketModal from './newticket';
import { useAuth } from '@clerk/nextjs';
import { fetchUserTickets } from '@/lib/data';
import { Ticket } from '@prisma/client'; // Ensure this import matches your actual path
import Link from 'next/link';

const Sidebar = () => {
  const { userId } = useAuth();
  console.log(userId)
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (userId) { // Check if userId is defined
          const userTickets = await fetchUserTickets(userId);
          setTickets(userTickets);
        } else {
          console.error('User ID is not defined.');
          // Handle case where userId is null or undefined
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // Handle error state if needed
      }
    };

    fetchTickets();
  }, [userId]);

  return (
    <div className='h-screen overflow-hidden sticky top-0 z-30 overflow-x-hidden '>
      <div className="z-50 drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
            {/* Sidebar content here */}
            <>
            {tickets.map(ticket => (
              <Link key={ticket.id} href={`/chat/${ticket.token}`}>
              <li>
                    <p>{ticket.title}</p>
                  </li>
              </Link>
                  
                ))}
            </>
            <TicketModal />
            {/* Display tickets in sidebar */}
            {/* <div>
              <h3>Your Tickets:</h3>
              <ul>
                {tickets.map(ticket => (
                  <li key={ticket.id}>
                    <p>Title: {ticket.title}</p>
                    <p>Token: {ticket.token}</p>
                  </li>
                ))}
              </ul>
            </div> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
