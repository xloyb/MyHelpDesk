"use client"
import dynamic from 'next/dynamic';
import RealTimeChat from '@/components/WebSocketChat/MyRealTimeChat';
import ChatNavbar from '@/components/ChatNavbar';
import Sidebar from '@/components/Sidebar';
import styles from '@/app/main.module.css';


const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

const ChatPage = () => {
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
                <RealTimeChat  ticketId={ticketId as string} />
                </div>
            </div>
          </div>
    </>
  );


};

export default ChatPage;
