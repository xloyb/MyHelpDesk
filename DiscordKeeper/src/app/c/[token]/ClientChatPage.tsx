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
import DeniedAccessMotherFucker from "@/components/CustomPages/403";
import NotFoundBitch from "@/components/CustomPages/404";

const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

const ClientChatPage = ({ token }: { token: string }) => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

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
    const verifyTokenAndFetchData = async () => {
      try {
        if (token) {
          const tokenExists = await checkTokenExists(token);
          setIsValidToken(tokenExists);

          if (tokenExists) {
            const ticketId = await getTicketIdByToken(token);
            setTicketId(ticketId);

            if (userId && ticketId) {
              await checkAccess(userId, ticketId);
            }
          }
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error in verification and fetching data:", error);
        setIsValidToken(false);
        setTicketId(null);
        setAccessGranted(false);
      } finally {
        setLoading(false);
      }
    };

    verifyTokenAndFetchData();
  }, [userId, token]);

  if (loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="h-screen bg-base-200 overflow-hidden sticky top-0 overflow-x-hidden">
          <ChatNavbar />

          {isValidToken ? (
            accessGranted ? (
              ticketId ? (
                <RealTimeChat ticketId={ticketId} token={token as string} />
              ) : (
                <span className="loading loading-ring loading-lg"></span>
              )
            ) : (
              <DeniedAccessMotherFucker />
            )
          ) : (
            <NotFoundBitch />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientChatPage;
