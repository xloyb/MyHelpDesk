"use client";
import { useState, useEffect } from "react";
import { getAllRoles, updateRole } from "@/lib/role";
import styles from "@/app/main.module.css";

const ManageRoles = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRoles();
      setRoles(roles);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdateRole = async (roleId: number, name: string, description: string) => {
    try {
      await updateRole(roleId, name, description);
      const updatedRoles = roles.map((role) =>
        role.id === roleId ? { ...role, name, description } : role
      );
      setRoles(updatedRoles);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Manage Roles</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                <input
  type="text"
  placeholder="Type here"
  className="input input-bordered input-primary w-full max-w-xs" 
  value={role.name}
                    onChange={(e) => handleUpdateRole(role.id, e.target.value, role.description)}/>
                  {/* <input
                    type="text"
                    value={role.name}
                    onChange={(e) => handleUpdateRole(role.id, e.target.value, role.description)}
                  /> */}
                </td>
                <td>
                <input
  type="text"
  placeholder="Type here"
  className="input input-bordered input-primary w-full max-w-xs" 
  value={role.description}
                    onChange={(e) => handleUpdateRole(role.id, role.name, e.target.value)}
              />
                  {/* <input
                    type="text"
                    value={role.description}
                    onChange={(e) => handleUpdateRole(role.id, role.name, e.target.value)}
                  /> */}
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleUpdateRole(role.id, role.name, role.description)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageRoles;
