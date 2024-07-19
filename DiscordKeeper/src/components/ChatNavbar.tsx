"use client"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, useAuth, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaCircleRight } from "react-icons/fa6";
import Announcement from './Announcement';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { getUserRoleId, isTeam } from '@/lib/user';
import ThemeToggle from './ThemeToggle';



const ChatNavbar = () => {
    const { userId } = useAuth();
    const [roleId, setRoleId] = useState<number | null>(null);
    const [isTeamMember, setIsTeamMember] = useState<boolean>(false);



    useEffect(() => {
        const fetchRoleAndTeamStatus = async () => {
          if (userId) {
            try {
              const role = await getUserRoleId(userId);
              const teamStatus = await isTeam(userId);
              setRoleId(role);
              setIsTeamMember(teamStatus);
            } catch (error) {
              console.error('Error fetching user role ID or team status:', error);
            }
          }
        };
    
        fetchRoleAndTeamStatus();
      }, [userId]);
    
      if (roleId === null) {
        return null; // Show l3asba
      }
      

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" style={{ zIndex: 20 }}
>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/chat'>Dashboard</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>

                    <label htmlFor="my-drawer-2" className=" btn-neutral drawer-button lg:hidden">
                        {/* <FaRegArrowAltCircleRight /> */}
                        <FaCircleRight />
                    </label>

                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">Discord Keeper</a>
                </div>
                <div className="navbar-end">

<ThemeToggle/>

                {/* <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="mr-4"><MdOutlineAdminPanelSettings size={40} /></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div> */}


{isTeamMember && (
        <>
        <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="mr-4"><MdOutlineAdminPanelSettings size={40} /></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow" style={{ zIndex: 20 }}>
   
          {roleId === 2 && (
            <li>
                <li>Support Team</li>
            <ul className='menu menu-compact'>
                <li><Link href='/modcp'>View Tickets</Link> </li>
            </ul>
            </li>

          )}
          {roleId === 3 && (
           <li>
           <li>Support Team</li>
       <ul className='menu menu-compact'>
           <li><Link href='/modcp'>View Tickets</Link> </li>
       </ul>
       <li>Moderators</li>
       <ul className='menu menu-compact'>
           <li><Link href='/modcp'>Moderators Controle Panel</Link> </li>
       </ul>
       </li>
          )}
          {(roleId === 4) && (
           <li>
           <li>Support Team</li>
       <ul className='menu menu-compact'>
           <li><Link href='/modcp'>View Tickets</Link> </li>
       </ul>
       <li>Moderators</li>
       <ul className='menu menu-compact'>
           <li><Link href='/modcp'>Moderators Controle Panel</Link> </li>
       </ul>
       <li>Admins</li>
       <ul className='menu menu-compact'>
       <li><Link href='/admincp'>Admins Controle Panel</Link> </li>
       <li><Link href='/admincp/settings'>Settings</Link> </li>
       <li><Link href='/admincp/users'>Users</Link> </li>
       <li><Link href='/admincp/roles'>Roles</Link> </li>
       <li><Link href='/admincp/discord'>Discord</Link> </li>
       </ul>

       </li>
       
          )}
          </ul>
          </div>
        </>
      )}


                    <ClerkLoading>
                        <span className="loading loading-ring loading-lg"></span>
                    </ClerkLoading>
                   <ClerkLoaded>

                    <SignedIn>
                        {/* <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        src="https://www.mydevify.com/icon.png"
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                    />
                                    <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://www.mydevify.com/icon.png" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div> */}
                        <UserButton/>
                    </SignedIn>

                    <SignedOut>
                        <div className="flex items-center gap-2 text-sm">
                            <Image src="/img/login.png" alt="" width={20} height={20} />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                    </ClerkLoaded>

                </div>

            </div>
            <Announcement/>
        </div>
    )
}

export default ChatNavbar