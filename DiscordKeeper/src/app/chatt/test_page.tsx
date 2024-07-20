"use client"
import Chat from '@/components/dynamic/chat';
import { useEffect, useState } from 'react';

// Assuming you have ticketId and userId available in your component
const ticketId = 1; // Replace with actual ticketId
const userId = 'user_2jQTiKPD26Qq6MUXtOBqtCNuBAG'; // Replace with actual userId

const fetchComments = async (ticketId: number) => {
  try {
    const response = await fetch(`/api/comments?ticketId=${ticketId}`);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
};

const postComment = async (content: string, ticketId: number, userId: string) => {
  try {
    const response = await fetch('/api/comments/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, ticketId, userId }),
    });
    if (!response.ok) {
      throw new Error(`Post failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Post Error:', error);
  }
};

const ChatPage = () => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchComments(ticketId).then(setComments);
  }, []);

  return (
    <div>
      <h1>Chat</h1>
     <Chat ticketId={1} userId={'user_2jQTiKPD26Qq6MUXtOBqtCNuBAG'}/>
    </div>
  );
};

export default ChatPage;
