"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Button from "../ui/button/Button";

import { addPopupImage, updatePopupImage } from "../../api/authApi";

const AddImagePopup = ({ onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    screen_type: "home",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  //   VALIDATION STATE
  const [errors, setErrors] = useState({});

  /* PREFILL IN EDIT MODE */
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        image: null,
        screen_type: editData.screen_type || "home",
      });
      setPreview(editData.image || null);
    }
  }, [editData]);

  /* HANDLERS */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    // clear error while typing
    if (value?.toString().trim()) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));

    // clear image error
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  // -----------------------------------
  // VALIDATION (VENDOR STYLE)
  // -----------------------------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.screen_type) {
      newErrors.screen_type = "Please select screen type";
    }

    if (!form.image && !preview) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(Object.values(errors)[0] || "Please fix the errors");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("screen_type", form.screen_type);

      if (form.image) {
        formData.append("popup_img", form.image);
      }

      if (editData) {
        await updatePopupImage(editData.id, formData);
        toast.success("Popup updated successfully");
      } else {
        await addPopupImage(formData);
        toast.success("Popup added successfully");
      }

      onSave?.();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard>
      <div className="space-y-4">
        <h2 className="p-3 font-bold text-xl">
          {editData ? "Edit Popup Image" : "Add Popup Image"}
        </h2>

        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input
            value={form.title}
            placeholder="Enter title"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <textarea
            className="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            rows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* SCREEN TYPE */}
        <div>
          <Label>Screen Type</Label>

          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="screen_type"
                value="home"
                checked={form.screen_type === "home"}
                onChange={(e) => handleChange("screen_type", e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-sm">Home</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="screen_type"
                value="group_deal"
                checked={form.screen_type === "group_deal"}
                onChange={(e) => handleChange("screen_type", e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-sm">Group Deal</span>
            </label>
          </div>

          {errors.screen_type && (
            <p className="text-red-500 text-sm mt-1">{errors.screen_type}</p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <Label>Upload Image</Label>
          <FileInput accept="image/*" onChange={handleImageChange} />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="rounded-lg border p-2">
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : editData ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddImagePopup;
