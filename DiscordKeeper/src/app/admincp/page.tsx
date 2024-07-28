// "use client"
// import { useState, useEffect } from "react";
// import { getAllTickets, updateTicketStatus } from "@/lib/ticket";
// import { getAllUsers, isAdmin, updateUserRole } from "@/lib/user";
// import { getAllRoles } from "@/lib/role";
// import UsersTab from "@/components/UsersTable";
// import Sidebar from "@/components/Sidebar";
// import ChatNavbar from "@/components/ChatNavbar";
// import { useAuth } from "@clerk/nextjs";
// import ManageRoles from "@/components/RolesTable";
// import Settings from "@/components/Settings";
// import styles from "@/app/main.module.css";


// const AdminCP = () => {
//   const { userId } = useAuth();

//   const [tickets, setTickets] = useState<any[]>([]);
//   const [users, setUsers] = useState<any[]>([]);
//   const [roles, setRoles] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isAdminMember, setisAdminMember] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const [tickets, users, roles] = await Promise.all([
//         getAllTickets(),
//         getAllUsers(),
//         getAllRoles(),
//       ]);
//       setTickets(tickets);
//       setUsers(users);
//       setRoles(roles);
//       setLoading(false);
//     };

//     const checkUserRole = async () => {
//       if (userId) {
//         const isAdminMember = await isAdmin(userId);
//         setisAdminMember(isAdminMember);
//       }
//     };

//     fetchData();
//     checkUserRole();
//   }, [userId]);

//   const handleStatusChange = async (ticketId: number, newStatus: string) => {
//     await updateTicketStatus(ticketId, newStatus);
//     const updatedTickets = tickets.map((ticket) =>
//       ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
//     );
//     setTickets(updatedTickets);
//   };

//   const handleUserRoleChange = async (userId: string, newRoleId: number) => {
//     await updateUserRole(userId, newRoleId);
//     const updatedUsers = users.map((user) =>
//       user.id === userId ? { ...user, roleId: newRoleId } : user
//     );
//     setUsers(updatedUsers);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar />
//       </div>
//       <div className={styles.content}>
//         <div className="sticky top-0 z-10">
//           <ChatNavbar />
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           {isAdminMember ? (
//             <>
//               <h2 className="text-xl font-semibold mb-2">Settings</h2>
//               <Settings />
//               <h2 className="text-xl font-semibold mt-4 mb-2">Users</h2>
//               <UsersTab
//                 users={users}
//                 roles={roles}
//                 handleUserRoleChange={handleUserRoleChange}
//               />
//               <h2 className="text-xl font-semibold mt-4 mb-2">Roles</h2>
//               <ManageRoles />
//             </>
//           ) : (
//             <p>You do not have access to this section.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCP;


"use client";
import { useState, useEffect } from "react";
import { getAllTickets, updateTicketStatus } from "@/lib/ticket";
import { getAllUsers, isAdmin, updateUserRole } from "@/lib/user";
import { getAllRoles } from "@/lib/role";
import UsersTab from "@/components/UsersTable";
import Sidebar from "@/components/Sidebar";
import ChatNavbar from "@/components/ChatNavbar";
import { useAuth } from "@clerk/nextjs";
import ManageRoles from "@/components/RolesTable";
import Settings from "@/components/Settings";
import styles from "@/app/main.module.css";

const AdminCP = () => {
  const { userId } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminMember, setIsAdminMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsData, usersData, rolesData] = await Promise.all([
          getAllTickets(),
          getAllUsers(),
          getAllRoles(),
        ]);
        setTickets(ticketsData);
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkUserRole = async () => {
      if (userId) {
        try {
          const isAdminMember = await isAdmin(userId);
          setIsAdminMember(isAdminMember);
        } catch (error) {
          console.error("Failed to check user role:", error);
        }
      }
    };

    fetchData();
    checkUserRole();
  }, [userId]);

  const handleStatusChange = async (ticketId: number, newStatus: string) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  const handleUserRoleChange = async (userId: string, newRoleId: number) => {
    try {
      await updateUserRole(userId, newRoleId);
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, roleId: newRoleId } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className="sticky top-0 z-10">
          <ChatNavbar />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {isAdminMember ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <Settings />
              <h2 className="text-xl font-semibold mt-4 mb-2">Users</h2>
              <UsersTab
                users={users}
                roles={roles}
                handleUserRoleChange={handleUserRoleChange}
              />
              <h2 className="text-xl font-semibold mt-4 mb-2">Roles</h2>
              <ManageRoles />
            </>
          ) : (
            <p>You do not have access to this section.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCP;

