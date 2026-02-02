import React, { useState, useEffect } from "react";
import DatePicker from "../../form/DatePicker";
import TimePickerNew from "../../form/TimePickerNew";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";

const RescheduleModal = ({ isOpen, onClose, auction, onSave }) => {
  const [newStartDate, setNewStartDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const today = moment().format("DD-MM-YYYY");

  useEffect(() => {
    if (!auction) return;

    setNewStartDate(today);
    setNewStartTime(auction.startTime || "");
    setNewEndDate(today);
    setNewEndTime(auction.endTime || "");
  }, [auction]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!newStartDate) return toast.error("Start Date is required");
    if (!newStartTime) return toast.error("Start Time is required");
    if (!newEndDate) return toast.error("End Date is required");
    if (!newEndTime) return toast.error("End Time is required");

    // OPTIONAL but GOOD validation: end must be after start
    const parse = (dateStr, timeStr) => {
      const [dd, mm, yyyy] = dateStr.split("-").map(Number);
      const [hh, mi] = timeStr.split(":").map(Number);
      return new Date(yyyy, mm - 1, dd, hh, mi);
    };

    const start = parse(newStartDate, newStartTime);
    const end = parse(newEndDate, newEndTime);
    const now = new Date();

    if (start < now) return toast.error("Start time cannot be in past");
    if (end <= start) return toast.error("End time must be after start time");
    onSave({
      startDate: newStartDate,
      startTime: newStartTime,
      endDate: newEndDate,
      endTime: newEndTime,
    });
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
          Reschedule Auction
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Editing: <b>{auction?.productName}</b>
        </p>

        {/* Start Date */}
        <div className="mb-4">
          <DatePicker
            label="Start Date"
            value={newStartDate} //  FULL CONTROLLED
            disablePast={true}
            onChange={(dateStr) => {
              setNewStartDate(dateStr);

              if (newEndDate && newEndDate < dateStr) {
                setNewEndDate("");
                setNewEndTime("");
              }
            }}
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <TimePickerNew
            label="Start Time"
            value={newStartTime}
            onChange={(time) => {
              setNewStartTime(time);

              if (
                newStartDate === newEndDate &&
                newEndTime &&
                time >= newEndTime
              ) {
                setNewEndTime("");
              }
            }}
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <DatePicker
            label="End Date"
            value={newEndDate} //  IMPORTANT
            minDate={newStartDate}
            onChange={(dateStr) => {
              setNewEndDate(dateStr);

              if (newStartDate === dateStr && newEndTime <= newStartTime) {
                setNewEndTime("");
              }
            }}
          />
        </div>

        {/* End Time */}
        <div className="mb-6">
          <TimePickerNew
            label="End Time"
            value={newEndTime}
            minAllowedTime={newStartDate === newEndDate ? newStartTime : null}
            onChange={setNewEndTime}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 text-[16px]"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-[16px]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
