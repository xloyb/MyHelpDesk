// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?ticketId=${ticketId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data);
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

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.ticketId === ticketId) {
        setComments((prevComments) => [...prevComments, message]);
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
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          ticketId,
          userId: 'user-id-here', // Replace with the actual user ID
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');
      
      setNewComment('');
      ws?.send(JSON.stringify({ content: newComment, ticketId }));
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
