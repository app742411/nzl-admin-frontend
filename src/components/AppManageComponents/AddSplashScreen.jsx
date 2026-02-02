"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import FileInput from "../form/input/FileInput";

import { addSplashScreen, updateSplash } from "../../api/authApi";

const AddSplashScreen = ({ editData, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    splashVideo: null,
    thumbnailImg: null,
  });

  const [errors, setErrors] = useState({});
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /*  PREFILL */
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        description: editData.description,
        splashVideo: null,
        thumbnailImg: null,
      });
      setVideoPreview(editData.splash_video);
      setThumbnailPreview(editData.thumbnail);
    }
  }, [editData]);

  /*  VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";

    if (!editData && !thumbnailPreview)
      newErrors.thumbnailImg = "Thumbnail image is required";

    if (!editData && !videoPreview)
      newErrors.splashVideo = "Splash video is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /*  FILE HANDLERS */
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("video/")) {
      setErrors((p) => ({ ...p, splashVideo: "Invalid video file" }));
      return;
    }
    setErrors((p) => ({ ...p, splashVideo: null }));
    setForm((p) => ({ ...p, splashVideo: file }));
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, thumbnailImg: "Invalid image file" }));
      return;
    }
    setErrors((p) => ({ ...p, thumbnailImg: null }));
    setForm((p) => ({ ...p, thumbnailImg: file }));
    setThumbnailPreview(URL.createObjectURL(file));
  };

  /*  SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.thumbnailImg)
        formData.append("thumbnail_img", form.thumbnailImg);
      if (form.splashVideo) formData.append("splash_video", form.splashVideo);

      if (editData) {
        await updateSplash(editData.id, formData);
        toast.success("Splash screen updated successfully");
      } else {
        await addSplashScreen(formData);
        toast.success("Splash screen added successfully");
      }

      onSuccess?.();
    } catch {
      toast.error("Failed to save splash screen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard>
      <h2 className="py-3 text-xl font-bold">
        {editData ? "Edit Splash Screen" : "Add Splash Screen"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <textarea
            className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.description ? "border-red-500" : ""
              }`}
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        {/* THUMBNAIL */}
        <div>
          <Label>Thumbnail Image</Label>
          <FileInput accept="image/*" onChange={handleThumbnailChange} />
          {errors.thumbnailImg && (
            <p className="mt-1 text-xs text-red-500">{errors.thumbnailImg}</p>
          )}
        </div>

        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            className="h-40 w-full rounded-lg object-cover"
          />
        )}

        {/* VIDEO */}
        <div>
          <Label>Splash Video</Label>
          <FileInput accept="video/*" onChange={handleVideoChange} />
          {errors.splashVideo && (
            <p className="mt-1 text-xs text-red-500">{errors.splashVideo}</p>
          )}
        </div>

        {videoPreview && (
          <video
            src={videoPreview}
            controls
            className="h-48 w-full rounded-lg"
          />
        )}

        {/* ACTION */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
};

export default AddSplashScreen;
