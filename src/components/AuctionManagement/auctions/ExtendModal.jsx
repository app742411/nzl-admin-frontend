import React, { useState, useEffect } from "react";
import DatePicker from "../../form/DatePicker";
import TimePickerNew from "../../form/TimePickerNew";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const ExtendModal = ({ isOpen, onClose, auction, onSave }) => {
  const [newEndDate, setNewEndDate] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auction) return;

    setNewEndDate(auction.endDate || "");
    setNewEndTime(auction.endTime || "");
    setError("");
  }, [auction]);

  if (!isOpen) return null;

  const parse = (dateStr, timeStr) => {
    const [dd, mm, yyyy] = dateStr.split("-").map(Number);
    const [hh, mi] = timeStr.split(":").map(Number);
    return new Date(yyyy, mm - 1, dd, hh, mi);
  };

  const validate = () => {
    if (!newEndDate || !newEndTime) {
      setError("End date & time is required.");
      return false;
    }

    const now = new Date();
    const selectedEnd = parse(newEndDate, newEndTime);
    const currentEnd = parse(auction.endDate, auction.endTime);

    if (selectedEnd < now) {
      setError("Cannot select a past date/time.");
      return false;
    }

    if (selectedEnd <= currentEnd) {
      setError("New end time must be greater than current end time.");
      return false;
    }

    setError("");
    return true;
  };
  const formatDate = (dateObj) => {
    if (!dateObj) return "";

    const d = new Date(dateObj);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  const convertToDMY = (dateObj) => {
    if (!dateObj) return "";

    if (typeof dateObj === "string") return dateObj;

    const d = new Date(dateObj);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  const handleSave = () => {
    if (!validate()) return;

    const formatted = {
      endDate: convertToDMY(newEndDate),
      endTime: newEndTime,
    };

    onSave(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Extend Auction
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Editing: <b>{auction?.productName}</b>
        </p>

        <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <b>Current End Date:</b> {auction?.endDate}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <b>Current End Time:</b> {auction?.endTime}
          </p>
        </div>

        <div className="mb-4">
          <DatePicker
            label="New End Date"
            value={newEndDate}
            onChange={(dateStr) => {
              setNewEndDate(dateStr);
            }}
          />
        </div>

        <div className="mb-4">
          <TimePickerNew
            label="New End Time"
            value={newEndTime}
            onChange={(time) => {
              setNewEndTime(time);
            }}
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 text-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendModal;
