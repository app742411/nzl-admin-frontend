"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/DatePicker";
import toast from "react-hot-toast";
import moment from "moment";

const EditCouponModal = ({ open, onClose, onSave, coupon }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
  });

  // Fill form when coupon loads
  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        description: coupon.description || "",
        discountType: coupon.discountType || "percentage",
        discountValue: coupon.discountValue || "",
        usageLimit: coupon.usageLimit || "",
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
      });
    }
  }, [coupon]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["discountValue", "usageLimit"].includes(name)) {
      return setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date picker
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate before save
  const handleSubmit = () => {
    if (!formData.code.trim()) return toast.error("Coupon code is required");
    if (!formData.discountValue)
      return toast.error("Discount value is required");

    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      return toast.error("Percentage cannot exceed 100%");
    }

    // Convert dates to ISO for backend
    const startISO = moment(formData.startDate, "DD-MM-YYYY").toISOString();
    const endISO = moment(formData.endDate, "DD-MM-YYYY").toISOString();

    const payload = {
      ...formData,
      startDateTime: startISO,
      endDateTime: endISO,
    };

    onSave(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6 relative min-w-[600px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Coupon</h2>

        {/* Coupon Code */}
        <div className="mb-4">
          <Label>Coupon Code *</Label>
          <Input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter coupon code"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <Label>Description</Label>
          <textarea
            name="description"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Discount Type */}
        <div className="mb-4">
          <Label>Discount Type *</Label>
          <select
            name="discountType"
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-800"
            value={formData.discountType}
            onChange={handleChange}
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        {/* Discount Value */}
        <div className="mb-4">
          <Label>Discount Value *</Label>
          <Input
            type="number"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            placeholder="Enter discount value"
          />
        </div>

        {/* Usage Limit */}
        <div className="mb-4">
          <Label>Usage Limit *</Label>
          <Input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            placeholder="Enter usage limit"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date *</Label>
            <DatePicker
              value={formData.startDate}
              disablePast={true}
              onChange={(v) => handleDateChange("startDate", v)}
            />
          </div>

          <div>
            <Label>End Date *</Label>
            <DatePicker
              value={formData.endDate}
              disablePast={true}
              minDate={formData.startDate}
              onChange={(v) => handleDateChange("endDate", v)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button size="sm" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCouponModal;
