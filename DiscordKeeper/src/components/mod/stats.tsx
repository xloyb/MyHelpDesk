import React from 'react'
import { FaUser } from 'react-icons/fa6'

const StatsComponent = () => {
  return (
    <>
    <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <FaUser className='w-8 h-8'/>
    </div>
    <div className="stat-title">Total Users</div>
    <div className="stat-value">12</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <FaUser className='w-8 h-8'/>
    </div>
    <div className="stat-title">Total Tickets</div>
    <div className="stat-value">x</div>
  </div>

  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <FaUser className='w-8 h-8'/>
    </div>
    <div className="stat-title">Pending Tickets</div>
    <div className="stat-value">x</div>
  </div>
</div></>
  )
}

export default StatsComponent