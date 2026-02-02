"use client";

import React, { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";

import PhoneInput from "../form/group-input/PhoneInput";
import { countryCodes } from "../../utils/countryCodes";
import { rolesList } from "../../utils/rolesList";
import { createUser } from "../../api/authApi";
import toast from "react-hot-toast";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const AddRoleUser = () => {
  const safeRolesList = rolesList.filter((r) => r.value !== "superAdmin");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const updated = { ...prev };

      switch (key) {
        case "firstName":
        case "lastName":
          if (value.trim()) delete updated[key];
          break;

        case "email":
          if (/^\S+@\S+\.\S+$/.test(value)) delete updated.email;
          break;

        case "phone":
          if (/^\d{10}$/.test(value)) delete updated.phone;
          break;

        case "password":
          if (PASSWORD_REGEX.test(value)) delete updated.password;
          break;

        case "confirmPassword":
          if (value === form.password) delete updated.confirmPassword;
          break;

        case "role":
          if (value) delete updated.role;
          break;

        default:
          break;
      }

      return updated;
    });
  };

  // -------------------------------------------
  // VALIDATION
  // -------------------------------------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.phoneCode) newErrors.phone = "Select country code";
    if (!form.phone) newErrors.phone = "Enter phone number";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits";

    // PASSWORD VALIDATION
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number & special character";
    }

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.role) newErrors.role = "Select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------------------
  // SUBMIT
  // -------------------------------------------
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = { ...form };
    console.log("📤 Sending:", payload);

    try {
      const res = await createUser(payload);
      toast.success("User created successfully!");

      // RESET FORM
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        notes: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user");
    }
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Add User for Role</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>First Name</Label>
            <Input
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <Label>Phone Number</Label>
            <PhoneInput
              countries={countryCodes}
              selectPosition="start"
              value={{
                phoneCode: form.phoneCode,
                phoneNumber: form.phone,
              }}
              onChange={({ phoneCode, phoneNumber }) => {
                handleChange("phoneCode", phoneCode);
                handleChange("phone", phoneNumber);
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter password"
            />
            <p className="text-xs text-gray-500">
              Min 8 chars, uppercase, lowercase, number & special character
            </p>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label>Assign Role</Label>
          <Select
            options={safeRolesList}
            value={form.role}
            onChange={(value) => handleChange("role", value)}
          />
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="mt-4">
          <Label>Notes (optional)</Label>
          <textarea
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border rounded-lg p-3 h-24 text-sm"
            placeholder="Write any notes..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 rounded-lg bg-gray-100">Cancel</button>
          <Button
            className="bg-blue-600 text-white px-6 py-2"
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleUser;
