"use client";
import dynamic from "next/dynamic";
import RealTimeChat from "@/components/WebSocketChat/MyRealTimeChat";
import ChatNavbar from "@/components/ChatNavbar";
import Sidebar from "@/components/Sidebar";
import styles from "@/app/main.module.css";
import { checkTokenExists } from "@/lib/actions";
import { useEffect, useState } from "react";
import { hasAccess } from "@/lib/user";
import { getTicketIdByToken } from "@/lib/ticket";
import { useAuth } from "@clerk/nextjs";

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

    fetchTicketId();
    verifyToken();
  }, [userId, token]);

  if (isValidToken === null || accessGranted === null) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-x-hidden">
            <ChatNavbar />
            <RealTimeChat
              ticketId={(ticketid ?? "") as string}
              token={token as string}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
