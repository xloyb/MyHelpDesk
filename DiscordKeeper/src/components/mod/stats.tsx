import { getDashboardStats } from '@/lib/actions';
import React, { useEffect, useState } from 'react';
import { FaUser, FaTicketAlt } from 'react-icons/fa';

const StatsComponent = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">Stats </div>

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
    </div>
  );
};

export default StatsComponent;
