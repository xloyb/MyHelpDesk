import React from 'react';
import { FaUser } from 'react-icons/fa6';

const StatsComponent = () => {
  return (
    <div className="bg-base-200 card mx-6 mt-5 md:pt-4 px-6">
      <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="stat flex justify-between items-center bg-neutral text-neutral-content shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Total Users</div>
            <div className="stat-value text-2xl lg:text-3xl">$34,545</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>
    
        <div className="stat flex justify-between items-center bg-neutral text-neutral-content shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Total Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">x</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>
    
        <div className="stat flex justify-between items-center bg-neutral text-neutral-content shadow-lg p-4 rounded-lg">
          <div>
            <div className="stat-title text-sm">Pending Tickets</div>
            <div className="stat-value text-2xl lg:text-3xl">x</div>
            <div className="stat-desc text-xs">Current month</div>
          </div>
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
