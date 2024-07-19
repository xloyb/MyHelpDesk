import { getDashboardStats } from "@/lib/actions";
import { SendAllVouchesToDiscord } from "@/lib/vouch";
import React, { useEffect, useState } from "react";
import { FaUser, FaTicketAlt } from "react-icons/fa";

const DiscordInfoPage = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleSetupTicketsChannel = async () => {
    try {
    //   await setupTicketsChannel(); 
      alert("Tickets channel setup successfully!");
    } catch (error) {
      console.error("Failed to setup tickets channel:", error);
      alert("Failed to setup tickets channel.");
    }
  };

  const handleSendAllVouches = async () => {
    try {
      await SendAllVouchesToDiscord(); 
      alert("All vouches sent to Discord successfully!");
    } catch (error) {
      console.error("Failed to send all vouches to Discord:", error);
      alert("Failed to send all vouches to Discord.");
    }
  };

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Dashboard Stats</div>
      <div className="divider mt-2"></div>
      <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Total Users</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalUsers}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>

        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Total Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalTickets}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaTicketAlt className="w-8 h-8 text-gray-400" />
        </div>

        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Pending Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalPendingTickets}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaTicketAlt className="w-8 h-8 text-gray-400" />
        </div>

        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Closed Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalClosedTickets}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaTicketAlt className="w-8 h-8 text-gray-400" />
        </div>

        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Opened Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalOpenedTickets}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaTicketAlt className="w-8 h-8 text-gray-400" />
        </div>

        <div className="stat flex justify-between items-center shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Total Vouches</div>
            <div className="stat-value text-2xl lg:text-3xl">{stats.totalVouches}</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaTicketAlt className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
        <div className="content-center grid grid-cols-1 gap-4 p-4">
          <div className="flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="text-base font-medium">Setup Tickets Channel</div>
              <div className="text-sm text-gray-500">
                This action configures the tickets channel and sends an embed message to it.
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleSetupTicketsChannel}>Setup</button>
          </div>

          <div className="flex justify-between items-center shadow-lg p-4 rounded-lg">
            <div>
              <div className="text-base font-medium">Send All Registered Vouches</div>
              <div className="text-sm text-gray-500">
                This action fetches all vouches from the database and sends them to the Vouches channel.
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleSendAllVouches}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordInfoPage;
