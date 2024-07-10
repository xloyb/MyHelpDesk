import React, { useState, useEffect } from 'react';
import { getAllRoles, updateRole } from '@/lib/role';
import { Role } from '@prisma/client';

const ManageRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getAllRoles();
        setRoles(rolesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditRole((prevEditRole) => prevEditRole ? ({
      ...prevEditRole,
      [name]: value,
    }) : null);
  };

  const handleEdit = (role: Role) => {
    setEditRole(role);
  };

  const handleSave = async () => {
    if (editRole) {
      try {
        const updatedRole = await updateRole(
          editRole.id,
          editRole.name,
          editRole.description ?? '' // Convert null to an empty string
        );
        setRoles((prevRoles) => prevRoles.map((role) => (role.id === editRole.id ? updatedRole : role)));
        setEditRole(null);
        alert('Role updated successfully!');
      } catch (error) {
        console.error('Error updating role:', error);
        alert('Failed to update role');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
      {roles.map((role) => (
        <div key={role.id} className="mb-4 p-4 border rounded">
          <div className="mb-2">
            <strong>Name:</strong> {role.name}
          </div>
          <div className="mb-2">
            <strong>Description:</strong> {role.description}
          </div>
          <button className="btn btn-primary" onClick={() => handleEdit(role)}>
            Edit
          </button>
        </div>
      ))}
      {editRole && (
        <div className="p-4 border rounded mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Role</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={editRole.name}
              onChange={handleEditChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2">Description:</label>
            <input
              type="text"
              name="description"
              value={editRole.description ?? ''}
              onChange={handleEditChange}
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageRoles;
