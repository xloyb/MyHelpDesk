import { auth } from '@clerk/nextjs/server'
import React from 'react'
import TicketModal from './newticket';

const Sidebar = () => {

  const { userId } = auth();

  console.log(userId)


  return (
    <div className='h-screen overflow-hidden sticky top-0 z-30 overflow-x-hidden '>

    <div className="z-50 drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
      {/* Page content here */}
     
    </div>
    <div className="drawer-side">
  <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
    {/* Sidebar content here */}
    <div>
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </div>
    <TicketModal/>
      <button className="btn btn-outline btn-success mt-auto">New Ticket</button>
  </ul>
</div>

  </div>
    </div>
  )
}

export default Sidebar