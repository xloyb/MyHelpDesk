"use client";
import dynamic from "next/dynamic";
import RealTimeChat from "@/components/WebSocketChat/MyRealTimeChat";
import ChatNavbar from "@/components/ChatNavbar";
import Sidebar from "@/components/Sidebar";
import styles from "@/app/main.module.css";
import { checkTokenExists } from "@/lib/actions";
import { Suspense, useEffect, useState } from "react";
import { hasAccess } from "@/lib/user";
import { getTicketIdByToken } from "@/lib/ticket";
import { useAuth } from "@clerk/nextjs";
import DeniedAccessMotherFucker from "@/components/CustomPages/403";
import NotFoundBitch from "@/components/CustomPages/404";

const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

const ChatPage = () => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const [ticketid, setTicketId] = useState<number | null>(null);
  const { userId } = useAuth();

  const path = window.location.pathname;
  const tokens = path.split("/").filter(Boolean);
  const token = tokens.length > 1 ? tokens[1] : "";

  const checkAccess = async (userId: string, ticketId: number) => {
    try {
      const access = await hasAccess(userId, ticketId);
      setAccessGranted(access);
    } catch (error) {
      console.error("Error checking access:", error);
      setAccessGranted(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const tokenExists = await checkTokenExists(token);
          setIsValidToken(tokenExists);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsValidToken(false);
      }
    };

    const fetchTicketId = async () => {
      try {
        // const ticketId = await getTicketIdByToken(token);
        const ticketId = await getTicketIdByToken(token);

        setTicketId(ticketId); 
        if (userId && ticketId) {
          await checkAccess(userId, ticketId);
        }
      } catch (error) {
        console.error("Error fetching ticket id:", error);
        setTicketId(null); 
      }
    };

    verifyToken();
    fetchTicketId();
  }, [userId, token]);

//   if (isValidToken === null || accessGranted === null) {
//     return <span className="loading loading-ring loading-lg"></span>;
//   }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-x-hidden">
            <ChatNavbar />
            
            
            {/* {isValidToken ? (
  accessGranted ? (
    <>
 <RealTimeChat
              ticketId={(ticketid ?? "") as string}
              token={token as string}
            />    </>
  ) : (
    <>
    <DeniedAccessMotherFucker/>
    </>
  )
) : (
  <>
  <NotFoundBitch/>
  </>
)} */}


<RealTimeChat
              // ticketId={(ticketid ?? "") as string}
              ticketId="4"
              token={token as string}
            />        
  

            
            
           
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '@clerk/nextjs';
// import Image from 'next/image';
// import { CanBan } from '@/lib/ban';
// import { isClosed } from '@/lib/ticket';

// interface User {
//   id: string;
//   email: string;
//   avatar: string | null;
//   cover: string | null;
//   name: string | null;
// }

// interface Comment {
//   id: number;
//   content: string | null;
//   createdAt: Date | null;
//   ticketId: number | null;
//   userId: string | null;
//   user: User | null;
// }

// interface ChatProps {
//   ticketId: string;
//   token: string;
// }

// const Chat: React.FC<ChatProps> = ({ ticketId, token }) => {
//   const { userId } = useAuth();
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [cooldown, setCooldown] = useState(false);
//   const [isTicketClosed, setIsTicketClosed] = useState(false);
//   const [showBanModal, setShowBanModal] = useState(false);
//   const [showClosedModal, setShowClosedModal] = useState(false);
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const [hasAccess, setHasAccess] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAccessAndFetchComments = async () => {
//       try {
//         const ticketClosed = await isClosed(token);
//         setIsTicketClosed(ticketClosed);

//         if (userId) {
//           const canBan = await CanBan(userId);
//           setShowBanModal(canBan);
//         }

//         if (!ticketClosed) {
//           const response = await axios.get(`/api/comments?ticketId=${ticketId}`);
//           setComments(response.data);
//           setHasAccess(true);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAccessAndFetchComments();

//     const websocket = new WebSocket('ws://localhost:3001');

//     websocket.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     websocket.onmessage = (event) => {
//       console.log('WebSocket message received:', event.data);

//       const messageData = typeof event.data === 'string' ? event.data : new TextDecoder().decode(new Uint8Array(event.data));

//       try {
//         if (messageData.trim()) {
//           const message = JSON.parse(messageData);
//           if (message.ticketId === parseInt(ticketId, 10)) {
//             setComments((prevComments) => [...prevComments, message]);
//           }
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     websocket.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setWs(websocket);

//     return () => {
//       websocket.close();
//     };
//   }, [ticketId, userId, token]);

//   const handleSend = async () => {
//     if (isTicketClosed) {
//       setShowClosedModal(true);
//       return;
//     }

//     if (!newComment.trim()) return;

//     try {
//       const response = await axios.post('/api/comments', {
//         content: newComment,
//         ticketId: parseInt(ticketId, 10),
//         userId: userId,
//       });

//       const newCommentData = response.data;

//       setNewComment('');
//       console.log('Sending comment through WebSocket:', newCommentData);
//       ws?.send(JSON.stringify(newCommentData));

//       setCooldown(true);
//       setTimeout(() => setCooldown(false), 1500);
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter' && !cooldown) {
//       handleSend();
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!hasAccess) {
//     return <div>You do not have access to this chat.</div>;
//   }

//   return (
//     <div className="flex bg-base-200 flex-col h-[80vh] z-20">
//       <div className="flex-1 overflow-y-auto p-4 mt-12">
//         {comments.map((comment) => (
//           <div className={`chat ${comment.userId === userId ? 'chat-end' : 'chat-start'}`} key={comment.id}>
//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <Image
//                   src={comment.user?.avatar || 'https://www.mydevify.com/icon.png'}
//                   width={100}
//                   height={100}
//                   alt={comment.user?.name || 'User avatar'}
//                 />
//               </div>
//             </div>
//             <div className="chat-header">
//               {comment.user?.name || comment.userId}
//               <time className="text-xs opacity-50 ml-1">{comment.createdAt ? new Date(comment.createdAt).toLocaleTimeString() : 'Unknown Time'}</time>
//             </div>
//             <div className="chat-bubble">{comment.content || 'No Content'}</div>
//             <div className="chat-footer opacity-50">Delivered</div>
//           </div>
//         ))}
//       </div>

//       <div className="divider mt-2"></div>

//       <div className="bottom-0 left-0 w-full p-4">
//         <div className="flex">
//           <textarea
//             placeholder="Type a message"
//             className="textarea textarea-bordered w-full mr-2"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             className="btn btn-primary mr-2"
//             onClick={handleSend}
//             disabled={cooldown}
//           >
//             Send
//           </button>
//           {showClosedModal && (
//             <dialog open className="modal">
//               <div className="modal-box">
//                 <h3 className="font-bold text-lg">Ticket Closed</h3>
//                 <p>You cannot send a message because the ticket status is closed.</p>
//                 <div className="modal-action">
//                   <button className="btn" onClick={() => setShowClosedModal(false)}>Close</button>
//                 </div>
//               </div>
//             </dialog>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
