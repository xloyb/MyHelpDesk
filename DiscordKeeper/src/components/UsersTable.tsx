import Image from "next/image";

import { User, Role } from "@prisma/client";

interface Props {
    users: User[];
    roles: Role[];
    handleUserRoleChange: (userId: string, roleId: number) => void;
  }
  interface Props {
    users: User[];
    roles: Role[];
    handleUserRoleChange: (userId: string, roleId: number) => void;
  }
  
  const UsersTab: React.FC<Props> = ({ users = [], roles = [], handleUserRoleChange }) => {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={user.avatar || "https://www.mydevify.com/icon.png"}
                          alt={`Avatar of ${user.name}`}
                          width={100}
                          height={100}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://www.mydevify.com/icon.png";
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.roleId}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.roleId}
                    onChange={(e) => handleUserRoleChange(user.id, Number(e.target.value))}
                    className="select select-bordered"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
               
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    );
  };
  
  export default UsersTab;