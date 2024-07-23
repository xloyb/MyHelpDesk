"use client"
import dynamic from 'next/dynamic';
import RealTimeChat from '@/components/WebSocketChat/MyRealTimeChat';
import ChatNavbar from '@/components/ChatNavbar';
import Sidebar from '@/components/Sidebar';
import styles from '@/app/main.module.css';
import { checkTokenExists } from '@/lib/actions';
import { useState } from 'react';


const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

const ChatPage = () => {
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const path = window.location.pathname;
  const tokens = path.split('/').filter(Boolean);
  const token = tokens.length > 1 ? tokens[1] : '';


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


  const  ticketId  = "4";


  if (!ticketId) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              <div className='h-screen bg-base-200 overflow-hidden sticky top-0 overflow-x-hidden'>
                <ChatNavbar />
                <RealTimeChat  ticketId={ticketId as string} token={token as string}  />
                </div>
            </div>
          </div>
    </>
  );


};

export default ChatPage;
