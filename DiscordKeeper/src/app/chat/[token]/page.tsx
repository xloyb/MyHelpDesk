/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { checkTokenExists } from '@/lib/actions';
import React, { useState, useEffect } from 'react';
import styles from '@/app/main.module.css';
import Sidebar from '@/components/Sidebar';
import ChatNavbar from '@/components/ChatNavbar';
import Chat from '@/components/Chat';
import { getTicketIdByToken } from '@/lib/data';
import { hasAccess } from '@/lib/user';
import { useAuth } from '@clerk/nextjs';

const ChatPage: React.FC = () => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const path = window.location.pathname;
  const tokens = path.split('/').filter(Boolean);
  const token = tokens.length > 1 ? tokens[1] : '';
  const [ticketid, setTicketId] = useState<number | null>(null); 
  const { userId } = useAuth();

  const verifyToken = async () => {
    try {
      if (token) {
        const tokenExists = await checkTokenExists(token);
        setIsValidToken(tokenExists);
      } else {
        setIsValidToken(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsValidToken(false);
    }
  };

  const checkAccess = async (userId: string, ticketId: number) => {
    try {
      const access = await hasAccess(userId, ticketId);
      setAccessGranted(access);
    } catch (error) {
      console.error('Error checking access:', error);
      setAccessGranted(false);
    }
  };

  useEffect(() => {
    const fetchTicketId = async () => {
      try {
        const id = await getTicketIdByToken(token);
        setTicketId(id); // Set ticketid state after fetching
        if (userId && id) {
          await checkAccess(userId, id);
        }
      } catch (error) {
        console.error('Error fetching ticket id:', error);
        setTicketId(null); // Handle error case
      }
    };

    fetchTicketId();
    verifyToken();
  }, [verifyToken, userId]);

  if (isValidToken === null || accessGranted === null) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div>
        {isValidToken && accessGranted ? (
          <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              <div className='h-screen overflow-hidden sticky top-0 overflow-x-hidden'>
                <ChatNavbar />
                <Chat token={token} ticketid={ticketid ?? 0} />
              </div>
            </div>
          </div>
        ) : (
          <p>Token {token} is not valid or does not exist, or you do not have access.</p>
        )}
      </div>
    </>
  );
};

export default ChatPage;
