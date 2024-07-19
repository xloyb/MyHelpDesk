"use client"

import React, { useState } from 'react';
import { FaUser, FaTicketAlt } from 'react-icons/fa';

const vouches = [
  {
    id: 1,
    message: "Great service!",
    vouchedBy: "UserA",
    vouchedTo: "UserB",
    createdAt: new Date(),
  },
  {
    id: 2,
    message: "Highly recommended!",
    vouchedBy: "UserC",
    vouchedTo: "UserD",
    createdAt: new Date(),
  },
];

const DiscordInfoPage = () => {
  const [stats] = useState({
    totalUsers: 100,
    totalTickets: 50,
    totalPendingTickets: 10,
    totalClosedTickets: 30,
    totalOpenedTickets: 20,
    totalVouches: vouches.length,
  });

  const handleSendVouches = async () => {
    try {
    //   await sendAllVouchesToDiscord(vouches);
      alert('All vouch notifications sent successfully');
    } catch (error) {
      console.error('Error sending vouch notifications:', error);
      alert('Failed to send vouch notifications');
    }
  };

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
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
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSendVouches}
          className="btn btn-primary"
        >
          Send All Vouches to Discord
        </button>
      </div>
    </div>
  );
};

export default DiscordInfoPage;
