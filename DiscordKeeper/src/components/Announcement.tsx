"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [isChatPage, setIsChatPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch("/data/settings.json");
        const data = await response.json();
        setAnnouncement(data.announcement);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsChatPage(router.pathname.includes("chat"));
    }
  }, [router.pathname]);

  if (!announcement) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`alert alert-success ${isChatPage ? 'fixed top-0 left-0 w-full z-50' : 'top-auto'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{announcement}</span>
    </div>
  );
};

export default Announcement;
