"use client";
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/user";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import styles from "@/app/main.module.css";
import { useAuth } from "@clerk/nextjs";
import Services from "@/components/admincp/Store";
import AuthorizedCountries from "@/components/admincp/AuthorizedCountries";
import ManageCategories from "@/components/admincp/ManageCategories";
import CountryTable from "@/components/admincp/ManageCountries";
import Layout1 from "@/app/ChatLayout/layout";


type settings = {
  sitename: string;
  announcement: string;
  offer: string;
  logo: string;
  theme: string;
  discordLogs: boolean;
  exchangeSystem: boolean;
  storeSystem: boolean;
  ticketSystem: boolean;
};


const AdminCPRoles = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setisAdminMember] = useState<boolean>(false);
  const [Settings, setSettings] = useState<settings | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    const checkUserRole = async () => {
      if (userId) {
        const isAdminMember = await isAdmin(userId);
        setisAdminMember(isAdminMember);
      }
    };
    const FetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data: settings = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch Site Settings:", error);

      }
    };
    FetchSiteSettings()
    fetchData();
    checkUserRole();
  }, [userId]);




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout1>
      {isAdminMember ? (
        <>
          {/* <AuthorizedCountries/> */}
          {Settings?.storeSystem ? (<>
            <ManageCategories />
            <Services />
            <CountryTable />
          </>) : (<>Store is Disabled from the settings, Please Enable it to access this page.</>)}

        </>
      ) : (
        <p>You do not have access to this section.</p>
      )}
    </Layout1>
  );
};

export default AdminCPRoles;
