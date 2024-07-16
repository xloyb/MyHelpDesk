import React, { useState, useEffect } from 'react';
import { addComment } from '@/lib/actions';
import { fetchCommentsByTicketToken } from '@/lib/data';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { CiSettings } from "react-icons/ci";
import VouchModal from './VouchModal';
import TicketStatusModal from './TicketStatusModal';



// import { Comment, User } from '@prisma/client';

interface User {
  id: string;
  email: string;
  avatar: string | null;
  cover: string | null;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  ticketId: number;
  userId: string;
  user: User;
}

const Chat = ({ token, ticketid }: { token: string; ticketid: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const { userId } = useAuth();
  const [cooldown, setCooldown] = useState(false);


  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByTicketToken(token);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };
    loadComments();
  }, [token]);

  const handleAddComment = async () => {
    try {
      await addComment(ticketid, userId || '', newComment);
      setNewComment('');
      setCooldown(true);
      setTimeout(() => setCooldown(false), 1500); 
      const fetchedComments = await fetchCommentsByTicketToken(token);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !cooldown) {
      handleAddComment();
    }
  };


  return (
    <div className="flex bg-base-200 flex-col h-[90vh]">
      <div className="flex-1 overflow-y-auto p-4">
        {comments.map((comment) => (
          <div className={`chat ${comment.userId === userId ? 'chat-end' : 'chat-start'}`} key={comment.id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                {/* <img
                  alt="User avatar"
                  src={comment.user.avatar || 'https://www.mydevify.com/icon.png'}
                /> */}
                <Image
                  src={comment.user.avatar || 'https://www.mydevify.com/icon.png'}
                  width={100}
                  height={100}
                  alt={comment.user.name}
                />              </div>
            </div>
            <div className="chat-header">
              {comment.user.name || comment.userId}
              <time className="text-xs opacity-50 ml-1">{new Date(comment.createdAt).toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble">{comment.content}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>
      <div className="divider mt-2"></div>

      <div className="bottom-0 left-0 w-full p-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="input input-bordered w-full mr-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary mr-2" onClick={handleAddComment}>Send</button>
          <button className="btn btn-neutral mr-2"> <CiSettings /></button>
          {/* <button className="btn btn-neutral mr-2"> <IoLockClosedOutline /></button> */}
          {/* <button className="btn btn-neutral mr-2"> <FaHeartCirclePlus /> </button> */}
          <VouchModal/>
          <TicketStatusModal token={token}/>
        </div>
      </div>
    </div>
  );
};

export default Chat;
