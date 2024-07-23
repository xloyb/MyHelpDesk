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
// }

// const Chat: React.FC<ChatProps> = ({ ticketId }) => {
//   const { userId } = useAuth();
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [cooldown, setCooldown] = useState(false);
//   const [isTicketClosed, setIsTicketClosed] = useState(false);
//   const [showBanModal, setShowBanModal] = useState(false);
//   const [showClosedModal, setShowClosedModal] = useState(false);
//   const [ws, setWs] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/comments?ticketId=${ticketId}`);
//         setComments(response.data);

//         const ticketClosed = await isClosed("f27fd93fe4b0ac4b0923ce417926bcd6275d51fbd2a4ad8c772dc0b30fb626f7");
//         setIsTicketClosed(ticketClosed);

//         if (userId) {
//           const canBan = await CanBan(userId);
//           setShowBanModal(canBan);
//         }
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();

//     const websocket = new WebSocket('ws://localhost:3001');

//     websocket.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     websocket.onmessage = (event) => {
//       console.log('WebSocket message received:', event.data);

//       // Check if the message is binary and convert it to text
//       const messageData = typeof event.data === 'string' ? event.data : new TextDecoder().decode(new Uint8Array(event.data));

//       try {
//         // Ensure message is a valid JSON string
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
//   }, [ticketId, userId]);

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
//       ws?.send(JSON.stringify(newCommentData)); // Send the comment through WebSocket
//       setComments((prevComments) => [...prevComments, newCommentData]);

//       setCooldown(true);
//       setTimeout(() => setCooldown(false), 1500); // Cooldown period of 1.5 seconds
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter' && !cooldown) {
//       handleSend();
//     }
//   };

//   return (
//     <div className="flex bg-base-200 flex-col h-[90vh] z-20">
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { CanBan } from '@/lib/ban';
import { isClosed } from '@/lib/ticket';

interface User {
  id: string;
  email: string;
  avatar: string | null;
  cover: string | null;
  name: string | null;
}

interface Comment {
  id: number;
  content: string | null;
  createdAt: Date | null;
  ticketId: number | null;
  userId: string | null;
  user: User | null;
}

interface ChatProps {
  ticketId: number;
  token: string;

}

const Chat: React.FC<ChatProps> = ({ ticketId, token }) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [isTicketClosed, setIsTicketClosed] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?ticketId=${ticketId}`);
        setComments(response.data);

        const ticketClosed = await isClosed(token);
        setIsTicketClosed(ticketClosed);

        if (userId) {
          const canBan = await CanBan(userId);
          setShowBanModal(canBan);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    const websocket = new WebSocket('ws://localhost:3001');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);

      // Check if the message is binary and convert it to text
      const messageData = typeof event.data === 'string' ? event.data : new TextDecoder().decode(new Uint8Array(event.data));

      try {
        // Ensure message is a valid JSON string
        if (messageData.trim()) {
          const message = JSON.parse(messageData);
          if (message.ticketId === ticketId) {
            setComments((prevComments) => [...prevComments, message]);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [ticketId, userId, token]);

  // const handleSend = async () => {
  //   if (isTicketClosed) {
  //     setShowClosedModal(true);
  //     return;
  //   }

  //   if (!newComment.trim()) return;

  //   try {
  //     const response = await axios.post('/api/comments', {
  //       content: newComment,
  //       ticketId: ticketId,
  //       userId: userId,
  //     });

  //     const newCommentData = response.data;

  //     setNewComment('');
  //     console.log('Sending comment through WebSocket:', newCommentData);
  //     ws?.send(JSON.stringify(newCommentData)); // Send the comment through WebSocket

  //     setCooldown(true);
  //     setTimeout(() => setCooldown(false), 1500); // Cooldown period of 1.5 seconds
  //   } catch (error) {
  //     console.error('Error posting comment:', error);
  //   }
  // };

  const handleSend = async () => {
    if (isTicketClosed) {
      setShowClosedModal(true);
      return;
    }
  
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.post('/api/comments', {
        content: newComment,
        ticketId: ticketId,
        userId: userId,
      });
  
      const newCommentData = response.data;
  
      setNewComment('');
      console.log('Sending comment through WebSocket:', newCommentData);
  
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(newCommentData)); // Send the comment through WebSocket
      } else {
        console.error('WebSocket is not open. Cannot send message.');
      }
  
      setCooldown(true);
      setTimeout(() => setCooldown(false), 1500); // Cooldown period of 1.5 seconds
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !cooldown) {
      handleSend();
    }
  };

  return (
    <div className="flex bg-base-200 flex-col h-[80vh] z-20">
      <div className="flex-1 overflow-y-auto p-4 mt-12">
        {comments.map((comment) => (
          <div className={`chat ${comment.userId === userId ? 'chat-end' : 'chat-start'}`} key={comment.id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={comment.user?.avatar || 'https://www.mydevify.com/icon.png'}
                  width={100}
                  height={100}
                  alt={comment.user?.name || 'User avatar'}
                />
              </div>
            </div>
            <div className="chat-header">
              {comment.user?.name || comment.userId}
              <time className="text-xs opacity-50 ml-1">{comment.createdAt ? new Date(comment.createdAt).toLocaleTimeString() : 'Unknown Time'}</time>
            </div>
            <div className="chat-bubble">{comment.content || 'No Content'}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      <div className="divider mt-2"></div>

      <div className="bottom-0 left-0 w-full p-4">
        <div className="flex">
          <textarea
            placeholder="Type a message"
            className="textarea textarea-bordered w-full mr-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary mr-2"
            onClick={handleSend}
            disabled={cooldown}
          >
            Send
          </button>
          {showClosedModal && (
            <dialog open className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Ticket Closed</h3>
                <p>You cannot send a message because the ticket status is closed.</p>
                <div className="modal-action">
                  <button className="btn" onClick={() => setShowClosedModal(false)}>Close</button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

