// "use client";

// import React, { useState } from "react";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";
// import DropzoneComponent from "../form/form-elements/DropZone";
// import { useTranslation } from "react-i18next";
// import { addCategory } from "../../api/authApi";
// import toast from "react-hot-toast";
// import { X } from "lucide-react";

// const CategoryManageForm = ({ onCategoryAdded }) => {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.dir() === "rtl";

//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (files) => {
//     if (files?.length > 0) {
//       setImage(files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name) return toast.error(t("category.name_required"));
//     if (!image) return toast.error(t("category.image_required"));

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("categoryName", name);
//       formData.append("image", image);

//       await addCategory(formData);

//       toast.success(t("category.add_success"));
//       if (onCategoryAdded) onCategoryAdded();

//       setName("");
//       setImage(null);
//     } catch (error) {
//       toast.error(error?.message || "Failed to add category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={`relative w-full rounded-3xl bg-white dark:bg-gray-900 ${
//         isRTL ? "text-right" : "text-left"
//       }`}
//     >
//       <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
//         {t("category.add_title")}
//       </h4>

//       <div className="grid grid-cols-1 gap-5 mb-6">
//         {/* Name field */}
//         <div>
//           <Label>{t("category.name_label")}</Label>
//           <Input
//             name="title"
//             value={name}
//             placeholder={t("category.placeholder")}
//             dir={isRTL ? "rtl" : "ltr"}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/*  Dropzone Always Visible */}
//         <div>
//           <Label>{t("category.image_label") || "Upload Image"}</Label>

//           <DropzoneComponent
//             type="image"
//             multiple={false}
//             maxFiles={1}
//             onChange={handleImageUpload}
//           />

//           {/*  Image Preview Below Dropzone */}
//           {image && (
//             <div className="relative w-24 h-24 mt-4">
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="preview"
//                 className="w-full h-full rounded-lg object-cover border"
//               />

//               {/*  Remove Button */}
//               <button
//                 type="button"
//                 onClick={() => setImage(null)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div
//           className={`flex items-center gap-3 mt-2 ${
//             isRTL ? "justify-start" : "justify-end"
//           }`}
//         >
//           <Button type="button" size="sm" variant="outline">
//             {t("category.cancel")}
//           </Button>

//           <Button type="submit" size="sm" disabled={loading}>
//             {loading ? t("category.saving") : t("category.save")}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CategoryManageForm;
"use client";

import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import DropzoneComponent from "../form/form-elements/DropZone";
import { useTranslation } from "react-i18next";
import { addCategory } from "../../api/authApi";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const CategoryManageForm = ({ onCategoryAdded }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("category.name_required");
    }

    if (!image) {
      newErrors.image = t("category.image_required");
    }

    setErrors(newErrors);
    return newErrors;
  };

  // ================= HANDLERS =================
  const handleImageUpload = (files) => {
    if (files?.length > 0) {
      setImage(files[0]);

      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.image;
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      toast.error(Object.values(validationErrors)[0]);

      setTimeout(() => {
        document
          .querySelector(".text-red-500")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("categoryName", name);
      formData.append("image", image);

      await addCategory(formData);

      toast.success(t("category.add_success"));
      if (onCategoryAdded) onCategoryAdded();

      setName("");
      setImage(null);
      setErrors({});
    } catch (error) {
      toast.error(error?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full rounded-3xl bg-white dark:bg-gray-900 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {t("category.add_title")}
      </h4>

      <div className="grid grid-cols-1 gap-5 mb-6">
        {/* Name field */}
        <div>
          <Label>{t("category.name_label")}</Label>
          <Input
            name="title"
            value={name}
            placeholder={t("category.placeholder")}
            dir={isRTL ? "rtl" : "ltr"}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);

              if (value.trim()) {
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.name;
                  return updated;
                });
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <Label>{t("category.image_label") || "Upload Image"}</Label>

          <DropzoneComponent
            type="image"
            multiple={false}
            maxFiles={1}
            onChange={handleImageUpload}
          />

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}

          {/* Image Preview */}
          {image && (
            <div className="relative w-24 h-24 mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full rounded-lg object-cover border"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setErrors((prev) => ({
                    ...prev,
                    image: t("category.image_required"),
                  }));
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          className={`flex items-center gap-3 mt-2 ${
            isRTL ? "justify-start" : "justify-end"
          }`}
        >
          <Button type="button" size="sm" variant="outline">
            {t("category.cancel")}
          </Button>

          <Button type="submit" size="sm" disabled={loading}>
            {loading ? t("category.saving") : t("category.save")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CategoryManageForm;
