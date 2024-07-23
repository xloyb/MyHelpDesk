"use client"
import dynamic from 'next/dynamic';
import RealTimeChat from '@/components/WebSocketChat/MyRealTimeChat';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

const ChatPage = () => {
  // const { ticketId } = router.query;
  const  ticketId  = "4";


  if (!ticketId) {
    return <div>Loading...</div>;
  }

  // return <Chatd ticketId={ticketId as string} />;
  return <RealTimeChat  ticketId={ticketId as string} token={'dsfg'} />;


};

export default ChatPage;
