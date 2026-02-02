import React, { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import DatePicker from "../form/DatePicker";
import toast from "react-hot-toast";
import moment from "moment";
import { addCoupon } from "../../api/authApi";

const AddCouponForm = ({ onCouponAdded }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "discountValue") {
      return setFormData((prev) => ({
        ...prev,
        discountValue: value === "" ? "" : Number(value),
      }));
    }

    if (name === "usageLimit") {
      return setFormData((prev) => ({
        ...prev,
        usageLimit: value === "" ? "" : Number(value),
      }));
    }
    if (name === "minOrderAmount") {
      return setFormData((prev) => ({
        ...prev,
        minOrderAmount: value === "" ? "" : Number(value),
      }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle DatePicker values (DD-MM-YYYY)
  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value, // already in DD-MM-YYYY
    }));
  };

  // Convert DD-MM-YYYY → JS Date
  const parseDate = (d) => {
    if (!d) return null;
    const [dd, mm, yyyy] = d.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
  };

  const validate = () => {
    let newErrors = {};

    const start = parseDate(formData.startDate);
    const end = parseDate(formData.endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time

    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (start && start < today) {
      newErrors.startDate = "Start date cannot be today or in the past";
    }

    if (start && end && end < start) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // BASIC VALIDATIONS
    if (!formData.code.trim()) return toast.error("Coupon code is required");
    if (formData.discountValue === "" || formData.discountValue === null) {
      return toast.error("Discount value is required");
    }

    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      return toast.error("Percentage discount cannot exceed 100%");
    }

    // DATE VALIDATION
    if (!validate()) return;

    // Convert DD-MM-YYYY → ISO for backend
    const startISO = moment(formData.startDate, "DD-MM-YYYY").toISOString();
    const endISO = moment(formData.endDate, "DD-MM-YYYY").toISOString();

    const payload = {
      ...formData,
      discountValue: Number(formData.discountValue),
      minOrderAmount: Number(formData.minOrderAmount),
      usageLimit: Number(formData.usageLimit),

      startDate: formData.startDate, // Keep human readable
      endDate: formData.endDate,

      startDateTime: startISO, // For backend
      endDateTime: endISO,
    };

    try {
      const res = await addCoupon(payload);
      if (!res) {
        throw new Error("Invalid response from server");
      }

      toast.success("Coupon created successfully!");
      if (onCouponAdded) onCouponAdded();
      // RESET FORM
      setFormData({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        usageLimit: "",
        startDate: "",
        endDate: "",
      });

      setErrors({});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Add New Coupon
      </h2>

      {/* Coupon Code */}
      <div className="mb-4">
        <Label>Coupon Code *</Label>
        <Input
          name="code"
          placeholder="Enter coupon code"
          value={formData.code}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label>Description</Label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Discount Type + Value */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Discount Type *</Label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <div>
          <Label>Discount Value *</Label>
          <Input
            type="number"
            name="discountValue"
            placeholder="Enter value"
            value={formData.discountValue}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Minimum Order Amount */}
      <div className="mb-4">
        <Label>Minimum Order Amount *</Label>
        <Input
          type="number"
          name="minOrderAmount"
          placeholder="Enter min amount"
          value={formData.minOrderAmount}
          onChange={handleChange}
        />
      </div>

      {/* Usage Limit */}
      <div className="mb-4">
        <Label>Usage Limit *</Label>
        <Input
          type="number"
          name="usageLimit"
          placeholder="Usage limit"
          value={formData.usageLimit}
          onChange={handleChange}
        />
      </div>

      {/* Start + End Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Start Date *</Label>
          <DatePicker
            value={formData.startDate}
            disablePast={true}
            onChange={(value) => handleDateChange("startDate", value)}
            error={errors.startDate}
          />
        </div>

        <div>
          <Label>End Date *</Label>
          <DatePicker
            value={formData.endDate}
            disablePast={true}
            minDate={formData.startDate}
            onChange={(value) => handleDateChange("endDate", value)}
            error={errors.endDate}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <Button size="sm" type="submit">
          Save Coupon
        </Button>
      </div>
    </form>
  );
};

export default AddCouponForm;
