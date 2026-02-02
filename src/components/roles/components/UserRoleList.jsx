import React, { useEffect, useState } from "react";
import RoleRow from "./RoleRow";
import { getAllUsersWithRoles } from "../../../api/authApi";
import { rolePermissions } from "../../../utils/rolePermissions";
import { TableShimmer } from "../../common/CommonShimmer";

export default function UserRoleList({
  onAddRole,
  onEditUser,
  onDeleteUser,
  refreshTrigger,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsersWithRoles();

      setUsers(res.data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const getPermissionsForRole = (role) => {
    return rolePermissions[role] || [];
  };

  return (
    <section>
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-semibold">Users & Role Permissions</h3>
            <p className="text-sm text-gray-500">List of users with roles</p>
          </div>

          <button
            onClick={onAddRole}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add New User
          </button>
        </div>
        {loading ? (
          <TableShimmer rows={5} columns={6} />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-dashed">
                <th className="pb-3">User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <RoleRow
                  key={u.id}
                  user={u}
                  //name={`${u.firstName} ${u.lastName}`}
                  name={`${u.first_name || ""} ${u.last_name || ""}`}
                  email={u.email}
                  role={u.role}
                  permissions={getPermissionsForRole(u.role)}
                  created={new Date(u.created_at).toLocaleDateString()}
                  onEdit={(user) => onEditUser(user)}
                  onDelete={(id) => onDeleteUser(id)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
