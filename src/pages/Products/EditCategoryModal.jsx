"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import { useTranslation } from "react-i18next";

const EditCategoryModal = ({ open, onClose, onSave, category }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // new file
  const [preview, setPreview] = useState(""); // old or new preview

  // useEffect(() => {
  //   if (category) {
  //     setName(category.categoryName);
  //     setPreview(category.image);
  //     setImage(null);
  //   }

  useEffect(() => {
    if (category) {
      setName(category.category_name || "");
      setPreview(category.image || "");
      setImage(null);
    }
  }, [category]);

  const handleImageUpload = (files) => {
    if (files?.length > 0) {
      setImage(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = () => {
    if (!name) return toast.error(t("category.name_required"));

    const formData = new FormData();
    //formData.append("categoryName", name);
    formData.append("categoryName", name);
    if (image) formData.append("image", image);

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6 relative min-w-[600px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {t("category.edit_title")}
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <Label>{t("category.name_label")}</Label>
          <Input
            value={name}
            placeholder="Category Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <Label>{t("category.image_label")}</Label>

          <DropzoneComponent
            type="image"
            multiple={false}
            maxFiles={1}
            onChange={handleImageUpload}
          />

          {preview && (
            <div className="mt-3 flex items-start gap-3">
              <img
                src={
                  image
                    ? preview
                    : `${preview}`
                }
                className="w-24 h-24 rounded-lg border object-cover"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button size="sm" variant="outline" onClick={onClose}>
            {t("category.cancel")}
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            {t("category.save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
