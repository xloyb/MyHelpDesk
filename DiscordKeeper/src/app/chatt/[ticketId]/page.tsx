"use client"
// src/pages/chat/[ticketId].tsx
import dynamic from 'next/dynamic';
import Chatd from '@/components/dynamic/chat';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

const ChatPage = () => {
  // const { ticketId } = router.query;
  const  ticketId  = "1";


  if (!ticketId) {
    return <div>Loading...</div>;
  }

  return <Chatd ticketId={ticketId as string} />;
};

export default ChatPage;
