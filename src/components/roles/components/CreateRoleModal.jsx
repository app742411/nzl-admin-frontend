import React, { useState, useEffect } from "react";
import Select from "../../form/Select";
import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import { rolesList } from "../../../utils/rolesList";
import { getUserListForRole, updateUserRole } from "../../../api/authApi";
import toast from "react-hot-toast";

const CreateRoleModal = ({ onClose, onRefresh, userData }) => {
  const [loading, setLoading] = useState(false);

  const roleTypeOptions = rolesList.filter(
    (role) => role.value !== "superAdmin" && role.value !== "user",
  );

  const [userOptions, setUserOptions] = useState([]);

  const [formData, setFormData] = useState({
    role: "",
    userId: "",
    description: "",
  });

  // Load user list
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUserListForRole();
        console.log("USER LIST RESPONSE:", res.data);

        const formattedUsers = (res.data || []).map((u) => ({
          value: u.id,
          label: `${u.first_name} ${u.last_name || ""}`,
        }));

        setUserOptions(formattedUsers);
      } catch (error) {
        console.log("User fetch error:", error);
      }
    };

    loadUsers();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        userId: userData.id,
        role: userData.role || "",
        description: userData.description || "",
      });
    }
  }, [userData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        role: formData.role,
        description: formData.description,
      };

      const userId = formData.userId;

      await updateUserRole(userId, payload);

      toast.success(userData ? "Role updated!" : "Role added!");

      onRefresh(); //  refresh list
      onClose(); //  close modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-lg">
        {loading && <div className="text-sm text-gray-500 mb-2">Saving...</div>}
        <h3 className="text-xl font-semibold mb-4">
          {userData ? "Edit User Role" : "Add User for Role"}
        </h3>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* User dropdown */}
          <div>
            <Label>Select User</Label>
            <Select
              options={userOptions}
              placeholder="Select user"
              value={formData.userId}
              onChange={(val) => handleChange("userId", val)}
            />
          </div>

          {/* Role selector */}
          <div>
            <Label>Role Type</Label>
            <Select
              options={roleTypeOptions}
              placeholder="Select type"
              value={formData.role}
              onChange={(val) => handleChange("role", val)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <Label>Role Description</Label>
          <textarea
            placeholder="Write a short description for this role..."
            className="w-full border rounded-lg p-3 h-24 text-sm"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

          <Button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={handleSubmit}
          >
            {loading ? "Please wait..." : userData ? "Update Role" : "Add Role"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleModal;
