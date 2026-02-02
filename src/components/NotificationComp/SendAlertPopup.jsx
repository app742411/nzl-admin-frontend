"use client";

import React, { useState } from "react";
import Label from "../form/Label";
import InputField from "../form/input/InputField";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import Button from "../ui/button/Button";

export default function SendAlertPopup({ onClose }) {
  const [userType, setUserType] = useState("all");

  const userList = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Priya Sharma" },
    { value: "3", label: "Alex Carter" },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Alert</h2>

        <Label>User Selection</Label>
        <Select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          options={[
            { value: "all", label: "All Users" },
            { value: "single", label: "Single User" },
            { value: "multiple", label: "Multiple Users" },
          ]}
        />

        {userType === "single" && (
          <div className="mt-4">
            <Label>Select User</Label>
            <Select options={userList} />
          </div>
        )}

        {userType === "multiple" && (
          <div className="mt-4">
            <Label>Select Multiple Users</Label>
            <MultiSelect options={userList} />
          </div>
        )}

        <Label className="mt-4">Title</Label>
        <InputField placeholder="Enter notification title" />

        <Label className="mt-4">Message</Label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 h-24 text-sm"
          placeholder="Enter your message"
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button className="bg-gray-200 text-gray-700" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Send Alert
          </Button>
        </div>
      </div>
    </div>
  );
}
