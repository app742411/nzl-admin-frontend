"use client";

import React, { useState } from "react";
import PredefinedRoles from "./components/PredefinedRoles";
import ActivityLog from "./components/ActivityLog";
import UserRoleList from "./components/UserRoleList";
import CreateRoleModal from "./components/CreateRoleModal";
import toast from "react-hot-toast";
import { deleteRole, editUserRole } from "../../api/authApi";

const RolesManage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev); // REFRESH EVERYTHING
  };

  const handleDeleteUserRole = async (id) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      setLoading(true);
      await deleteRole(id);
      toast.success("Role deleted successfully!");
      handleRefresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen space-y-10">
      {loading && (
        <div className="text-center text-sm text-gray-500">Processing...</div>
      )}
      <PredefinedRoles refreshTrigger={refreshTrigger} /> {/* REFRESH*/}
      <UserRoleList
        refreshTrigger={refreshTrigger}
        onAddRole={() => {
          setEditUser(null);
          setShowCreateModal(true);
        }}
        onEditUser={async (user) => {
          try {
            setLoading(true);
            const res = await editUserRole(user.id);
            setEditUser(res.data);
            setShowCreateModal(true);
          } catch (error) {
            toast.error("Failed to load user data");
          } finally {
            setLoading(false);
          }
        }}
        onDeleteUser={handleDeleteUserRole}
      />
      <ActivityLog refreshTrigger={refreshTrigger} /> {/* REFRESH*/}
      {showCreateModal && (
        <CreateRoleModal
          onClose={() => setShowCreateModal(false)}
          onRefresh={handleRefresh}
          userData={editUser}
        />
      )}
    </div>
  );
};

export default RolesManage;
