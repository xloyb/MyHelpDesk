import React, { useEffect, useState } from 'react';
import { fetchCommentsByTicketToken } from '@/lib/data';
import { FaDownload } from "react-icons/fa";

type Comment = {
  id: number;
  content: string | null;
  createdAt: Date | null;
  user: {
    id: string;
    email: string;
    avatar: string | null;
    cover: string | null;
    name: string | null;
    userid: string | null;
    roleId: number;
  } | null;
};

type DownloadChatComponentProps = {
  token: string;
};

const DownloadChatComponent: React.FC<DownloadChatComponentProps> = ({ token }) => {
  const [comments, setComments] = useState<Comment[]>([]);

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

  const handleDownload = () => {
    const chatContent = comments.map(comment => {
      const userName = comment.user?.name || 'Unknown User';
      const content = comment.content || 'No Content';
      const createdAt = comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Unknown Date';
      return `${userName}: ${content} (${createdAt})`;
    }).join('\n');

    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
      <button onClick={handleDownload} className="btn btn-outline btn-success mt-2 btn-xs sm:btn-sm md:btn-md">
      <FaDownload />
      </button>
  );
};

export default DownloadChatComponent;
