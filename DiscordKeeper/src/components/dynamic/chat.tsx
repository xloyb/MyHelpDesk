"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    name: string;
  };
}

interface ChatProps {
  ticketId: string;
}

const Chatd: React.FC<ChatProps> = ({ ticketId }) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?ticketId=${ticketId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Setup WebSocket connection
    const websocket = new WebSocket('ws://localhost:3001');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = async (event) => {
      try {
        const text = await event.data.text();
        const message = JSON.parse(text);
        if (message.ticketId === parseInt(ticketId, 10)) {
          setComments((prevComments) => [...prevComments, message]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(websocket);

    // Cleanup WebSocket on component unmount
    return () => {
      websocket.close();
    };
  }, [ticketId]);

  const handleSend = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        content: newComment,
        ticketId: parseInt(ticketId, 10), 
        userId: userId, 
      });

      const newCommentData = response.data;

      setNewComment('');
      ws?.send(JSON.stringify(newCommentData));
      setComments((prevComments) => [...prevComments, newCommentData]); // Update chat directly
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <strong>{comment.user?.name || 'Unknown User'}:</strong> {comment.content}
            </div>
          ))}
        </div>
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatd;
