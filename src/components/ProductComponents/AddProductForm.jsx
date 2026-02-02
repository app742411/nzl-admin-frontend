import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import toast from "react-hot-toast";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import imageUpload from "../../../public/images/image/illustration-upload.svg";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  getProductCategories,
  addProduct,
  updateProduct,
  getSingleProduct,
  deleteImages,
  getVendor,
} from "../../api/authApi";
import successAnim from "../../lottie/Success.json";
import Lottie from "lottie-react";
import { useParams, useNavigate } from "react-router-dom";
import { FormShimmer } from "../common/CommonShimmer";



const AddProductForm = () => {
  const { t } = useTranslation();
  const baseURL = import.meta.env.VITE_API_URL;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [successPopup, setSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // NOTE: we keep keys simple in state, but map carefully to API fields on load/submit
    title: "", // represents productName in API
    description: "",
    productImage: [], // { file: File|null, preview: string, fileName?: string }
    category: "",
    vendor: "",
    color: [], // stores color strings
    size: [], // stores size strings
    tags: [],
    quantity: "",
    productCost: "",
    weight: "",
    weightUnit: "g",
    brand: "",
    sku: "",
  });

  const colorOptions = [
    { value: "red", label: t("color.red", "Red") },
    { value: "blue", label: t("color.blue", "Blue") },
    { value: "black", label: t("color.black", "Black") },
    { value: "white", label: t("color.white", "White") },
    { value: "green", label: t("color.green", "Green") },
    { value: "yellow", label: t("color.yellow", "Yellow") },
    { value: "orange", label: t("color.orange", "Orange") },
    { value: "purple", label: t("color.purple", "Purple") },
    { value: "pink", label: t("color.pink", "Pink") },
    { value: "brown", label: t("color.brown", "Brown") },
    { value: "grey", label: t("color.grey", "Grey") },
    { value: "cyan", label: t("color.cyan", "Cyan") },
    { value: "magenta", label: t("color.magenta", "Magenta") },
    { value: "violet", label: t("color.violet", "Violet") },
  ];

  const sizeOptions = [
    { value: "small", label: t("size.small", "Small") },
    { value: "medium", label: t("size.medium", "Medium") },
    { value: "large", label: t("size.large", "Large") },
    { value: "xs", label: t("size.xs", "XS") },
    { value: "s", label: t("size.s", "S") },
    { value: "m", label: t("size.m", "M") },
    { value: "l", label: t("size.l", "L") },
    { value: "xl", label: t("size.xl", "XL") },
    { value: "xxl", label: t("size.xxl", "XXL") },
    { value: "xxxl", label: t("size.xxxl", "3XL") },
    { value: "4xl", label: t("size.4xl", "4XL") },
    { value: "5xl", label: t("size.5xl", "5XL") },
    { value: "free", label: t("size.free", "Free Size") },
  ];

  /* Generic handlers */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleVendorChange = (value) => {
    setFormData((prev) => ({ ...prev, vendor: value }));
  };

  const handleColorChange = (values) => {
    setFormData((prev) => ({
      ...prev,
      color: values.map((v) => (typeof v === "string" ? v : v.value)),
    }));
  };

  const handleSizeChange = (values) => {
    setFormData((prev) => ({
      ...prev,
      size: values.map((v) => (typeof v === "string" ? v : v.value)),
    }));
  };

  /* Tags */
  const handleAddTag = () => {
    const newTag = String(formData.newTag || "")
      .trim()
      .toLowerCase();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
        newTag: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, newTag: "" }));
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  /* Images: upload & preview */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (formData.productImage.length + files.length > 5) {
      toast.error(
        t("add_product.upload_limit_error") || "Maximum 5 images allowed",
      );
      return;
    }

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, ...previews],
    }));

    // CLEAR IMAGE ERROR WHEN IMAGE UPLOADED
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.productImage;
      return updated;
    });
  };

  const handleDeleteExistingImage = async (index) => {
    const img = formData.productImage[index];
    if (!img) return;

    // ================= NEWLY UPLOADED IMAGE =================
    if (img.file) {
      if (img.preview && img.preview.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(img.preview);
        } catch (e) { }
      }

      setFormData((prev) => {
        const updated = [...prev.productImage];
        updated.splice(index, 1);

        // CLEAR image error if at least one image still exists
        setErrors((err) => {
          const copy = { ...err };
          if (updated.length > 0) delete copy.productImage;
          return copy;
        });

        return { ...prev, productImage: updated };
      });

      toast.success(t("add_product.image_removed") || "Image removed");
      return;
    }

    // ================= EXISTING SERVER IMAGE =================
    const imageName = img.fileName;
    if (!imageName) {
      toast.error("Cannot determine image filename to delete");
      return;
    }

    try {
      await deleteImages(id, imageName);

      setFormData((prev) => {
        const updated = [...prev.productImage];
        updated.splice(index, 1);

        //   CLEAR image error if images still exist
        setErrors((err) => {
          const copy = { ...err };
          if (updated.length > 0) delete copy.productImage;
          return copy;
        });

        return { ...prev, productImage: updated };
      });

      toast.success("Image deleted!");
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };

  const handleRemoveAllImages = () => {
    formData.productImage.forEach((img) => {
      if (img?.preview && img.preview.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(img.preview);
        } catch (e) { }
      }
    });
    setFormData((prev) => ({ ...prev, productImage: [] }));
  };

  const scrollToFirstError = (errors) => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;

    const el = document.querySelector(`[data-error-field="${firstKey}"]`);

    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title?.trim())
      newErrors.title = t("add_product.validation.title_required");

    if (!formData.category)
      newErrors.category = t("add_product.validation.category_required");

    if (!formData.vendor)
      newErrors.vendor = t("add_product.validation.vendor_required");

    if (!formData.quantity || Number(formData.quantity) <= 0)
      newErrors.quantity = t("add_product.validation.quantity_required");

    if (!formData.productCost || Number(formData.productCost) <= 0)
      newErrors.productCost = t("add_product.validation.product_cost_required");

    if (!formData.brand?.trim())
      newErrors.brand = t("add_product.validation.brand_required");

    if (!formData.sku?.trim())
      newErrors.sku = t("add_product.validation.sku_required");

    if (formData.productImage.length === 0)
      newErrors.productImage = t("add_product.validation.image_required");
    if (
      !formData.description ||
      formData.description.replace(/<[^>]*>/g, "").trim() === ""
    ) {
      newErrors.description = t("add_product.validation.description_required");
    }
    if (!Array.isArray(formData.color) || formData.color.length === 0) {
      newErrors.color = t("add_product.validation.color_required");
    }
    // ===== SIZE =====
    if (!Array.isArray(formData.size) || formData.size.length === 0) {
      newErrors.size = t("add_product.validation.size_required");
    }
    if (!formData.weight || Number(formData.weight) <= 0)
      newErrors.weight = t("add_product.validation.weight_required");

    setErrors(newErrors);
    return newErrors;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    //console.log(formData, "dfsdfdsfdsfdsf");
    e.preventDefault();

    // require at least one image both add and edit
    // if (formData.productImage.length === 0) {
    //   setImageError("At least 1 image is required");
    //   toast.error("Please upload at least 1 image");
    //   return;
    // }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      toast.error(Object.values(validationErrors)[0]);
      scrollToFirstError(validationErrors);
      return;
    }

    setImageError("");

    try {
      const payload = new FormData();

      // Map to API expected names (we include both productName and title to be robust)
      payload.append("title", formData.title?.trim() || "");
      payload.append("description", formData.description || "");
      const categoryId =
        typeof formData.category === "object"
          ? formData.category.value
          : formData.category;
      const vendorId =
        typeof formData.vendor === "object"
          ? formData.vendor.value
          : formData.vendor;
      payload.append("category", categoryId || "");
      payload.append("vendor", vendorId || "");
      payload.append("quantity", String(formData.quantity || ""));
      payload.append("productCost", String(formData.productCost || ""));
      payload.append("weight", String(formData.weight || ""));
      payload.append("weightUnit", formData.weightUnit || "g");
      payload.append("brand", formData.brand || "");
      payload.append("sku", formData.sku || "");
      // arrays: use API plural names (colors / sizes)
      (formData.color || []).forEach((c) => {
        payload.append("color[]", typeof c === "string" ? c : c.value);
      });
      (formData.size || []).forEach((s) => {
        payload.append("size[]", typeof s === "string" ? s : s.value);
      });

      (formData.tags || []).forEach((t) => payload.append("tags[]", t));
      // append only newly added files (existing remote images already on server)
      (formData.productImage || []).forEach((img) => {
        if (img?.file) payload.append("productImage", img.file);
      });

      let res;
      if (isEditMode) {
        res = await updateProduct(id, payload);
        toast.success(t("add_product.success.updated"));
        setSuccessMessage(t("add_product.success.updated"));
        setSuccessPopup(true);
      } else {
        res = await addProduct(payload);
        toast.success(t("add_product.success.added"));
        setSuccessMessage(t("add_product.success.added"));
        setSuccessPopup(true);

        // revoke any blob previews and reset
        formData.productImage.forEach((img) => {
          if (img?.preview && img.preview.startsWith("blob:")) {
            try {
              URL.revokeObjectURL(img.preview);
            } catch (e) { }
          }
        });

        setFormData({
          title: "",
          description: "",
          productImage: [],
          category: "",
          vendor: "",
          color: [],
          size: [],
          tags: [],
          quantity: "",
          productCost: "",
          weight: "",
          weightUnit: "g",
          brand: "",
          sku: "",
        });
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add/update product",
      );
    }
  };

  const handleWeightUnitChange = (e) => {
    setFormData((prev) => ({ ...prev, weightUnit: e.target.value }));
  };

  /* Load categories, vendors and (if edit) product data */

  useEffect(() => {
    let cancelled = false;

    const loadEverything = async () => {
      try {
        // First load the product data for edit mode
        if (isEditMode) {
          const resProd = await getSingleProduct(id);
          const productData = Array.isArray(resProd.data)
            ? resProd.data[0]
            : resProd.data || {};

          // Load categories and vendors
          const [categoriesRes, vendorsRes] = await Promise.all([
            getProductCategories(),
            getVendor(),
          ]);

          const categories = (categoriesRes?.data || []).map((c) => ({
            value: c.id,
            label: c.category_name,
          }));

          const vendors = (vendorsRes?.data || []).map((v) => ({
            value: v.id,
            label:
              v.business_name ||
              `${v.first_name || ""} ${v.last_name || ""}`.trim(),
          }));

          if (cancelled) return;

          setCategoryOptions(categories);
          setVendorOptions(vendors);

          // Find the matching category and vendor objects
          let matchedCategory = null;
          let matchedVendor = null;

          // Try different possible ID fields from API
          const categoryId =
            productData.category_id ||
            productData.category?.id ||
            productData.category;
          const vendorId =
            productData.vendor_id ||
            productData.vendor?.id ||
            productData.vendor;

          // console.log("Searching for Category ID:", categoryId);
          // console.log("Available Categories:", categories);

          if (categoryId) {
            matchedCategory = categories.find(
              (c) => String(c.value) === String(categoryId),
            );
          }

          // console.log("Searching for Vendor ID:", vendorId);
          // console.log("Available Vendors:", vendors);

          if (vendorId) {
            matchedVendor = vendors.find(
              (v) => String(v.value) === String(vendorId),
            );
          }

          // console.log("Matched Category:", matchedCategory);
          // console.log("Matched Vendor:", matchedVendor);

          if (cancelled) return;

          setFormData({
            title: productData.product_name || productData.title || "",
            description: productData.description || "",
            category: matchedCategory, // This should be the full object {value, label}
            vendor: matchedVendor, // This should be the full object {value, label}
            productImage: Array.isArray(productData.product_images)
              ? productData.product_images.map((img) => ({
                file: null,
                preview: img,
                fileName: img,
              }))
              : [],
            color: Array.isArray(productData.colors)
              ? productData.colors
              : Array.isArray(productData.color)
                ? productData.color
                : [],
            size: Array.isArray(productData.sizes)
              ? productData.sizes
              : Array.isArray(productData.size)
                ? productData.size
                : [],
            tags: Array.isArray(productData.tags) ? productData.tags : [],
            quantity: productData.quantity ?? "",
            productCost: productData.product_cost ?? "",
            weight: productData.weight ?? "",
            weightUnit: productData.weight_unit ?? "g",
            brand: productData.brand ?? "",
            sku: productData.sku ?? "",
            newTag: "",
          });

          setLoadingCategories(false);
        } else {
          // Add mode - just load categories and vendors
          const [categoriesRes, vendorsRes] = await Promise.all([
            getProductCategories(),
            getVendor(),
          ]);

          const categories = (categoriesRes?.data || []).map((c) => ({
            value: c.id,
            label: c.category_name,
          }));

          const vendors = (vendorsRes?.data || []).map((v) => ({
            value: v.id,
            label:
              v.business_name ||
              `${v.first_name || ""} ${v.last_name || ""}`.trim(),
          }));

          if (cancelled) return;

          setCategoryOptions(categories);
          setVendorOptions(vendors);
          setLoadingCategories(false);
        }
      } catch (err) {
        //console.error(" Error loading data:", err);
        toast.error("Failed to load data");
        setLoadingCategories(false);
      }
    };

    loadEverything();

    return () => {
      cancelled = true;
    };
  }, [id, isEditMode, baseURL]);

  useEffect(() => {
    return () => {
      formData.productImage.forEach((img) => {
        if (img?.preview && img.preview.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(img.preview);
          } catch (e) { }
        }
      });
    };
  }, []);

  if (loadingCategories) {
    return <FormShimmer />;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative w-full rounded-3xl bg-white p-5 dark:bg-gray-900"
      >
        <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {isEditMode ? t("edit_product.title") : t("add_product.title")}
        </h4>

        {/* Title */}
        <div className="grid grid-cols-1 mb-6" data-error-field="title">
          <Label>{t("add_product.product_title")}</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={(e) => {
              setFormData((p) => ({ ...p, title: e.target.value }));
              if (e.target.value.trim())
                setErrors((p) => ({ ...p, title: "" }));
            }}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* SKU, productCost, brand */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div data-error-field="sku">
            <Label>{t("add_product.sku")}</Label>
            <Input
              name="sku"
              value={formData.sku}
              onChange={(e) => {
                setFormData((p) => ({ ...p, sku: e.target.value }));
                if (e.target.value.trim())
                  setErrors((p) => ({ ...p, sku: "" }));
              }}
            />
            {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
          </div>

          <div data-error-field="productCost">
            <Label>{t("add_product.product_cost")}</Label>
            <Input
              name="productCost"
              type="number"
              value={formData.productCost}
              onChange={(e) => {
                setFormData((p) => ({ ...p, productCost: e.target.value }));
                if (Number(e.target.value) > 0)
                  setErrors((p) => ({ ...p, productCost: "" }));
              }}
            />
            {errors.productCost && (
              <p className="text-red-500 text-sm">{errors.productCost}</p>
            )}
          </div>

          <div data-error-field="brand">
            <Label>{t("add_product.brand")}</Label>
            <Input
              name="brand"
              value={formData.brand}
              onChange={(e) => {
                setFormData((p) => ({ ...p, brand: e.target.value }));
                if (e.target.value.trim())
                  setErrors((p) => ({ ...p, brand: "" }));
              }}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}
          </div>
        </div>

        {/* Category, Vendor, Quantity */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div data-error-field="category">
            <Label>{t("add_product.category")}</Label>
            <Select
              options={categoryOptions}
              value={formData.category?.value}
              onChange={(value) => {
                const selected = categoryOptions.find((o) => o.value === value);
                setFormData((p) => ({ ...p, category: selected }));
                setErrors((p) => ({ ...p, category: "" }));
              }}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div data-error-field="vendor">
            <Label>{t("add_product.vendor")}</Label>
            <Select
              options={vendorOptions}
              value={formData.vendor?.value}
              onChange={(value) => {
                const selected = vendorOptions.find((o) => o.value === value);
                setFormData((p) => ({ ...p, vendor: selected }));
                setErrors((p) => ({ ...p, vendor: "" }));
              }}
            />
            {errors.vendor && (
              <p className="text-red-500 text-sm">{errors.vendor}</p>
            )}
          </div>

          <div data-error-field="quantity">
            <Label>{t("add_product.quantity")}</Label>
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => {
                setFormData((p) => ({ ...p, quantity: e.target.value }));
                if (Number(e.target.value) > 0)
                  setErrors((p) => ({ ...p, quantity: "" }));
              }}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
        </div>

        {/* Description (Jodit) */}
        <div className="grid grid-cols-1 gap-5 mb-6">
          <div className="my-editor" data-error-field="description">
            <Label className="pb-2">
              {t("add_product.product_description")}
            </Label>

            <CKEditor
              height="300px"
              editor={ClassicEditor}
              data={formData.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({ ...prev, description: data }));
              }}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="mb-8" data-error-field="productImage">
          <Label>{t("add_product.images")}</Label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 dark:bg-gray-800">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              id="file-upload"
              className="hidden"
              disabled={formData.productImage.length >= 5}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer text-gray-500 dark:text-gray-300 ${formData.productImage.length >= 5
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
            >
              <div className="flex flex-col items-center justify-center">
                <img src={imageUpload} alt="" />
                {formData.productImage.length < 5 ? (
                  <p>
                    {t("add_product.drop_or_select")}{" "}
                    <span className="text-blue-500 underline font-bold">
                      {t("add_product.browse")}
                    </span>
                  </p>
                ) : (
                  <p className="text-red-500 font-medium">
                    {t("add_product.max_images")}
                  </p>
                )}
              </div>
              {errors.productImage && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.productImage}
                </p>
              )}
            </label>
          </div>

          {formData.productImage.length > 0 && (
            <>
              <div className="mt-4 flex flex-wrap gap-3">
                {formData.productImage.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.preview}
                      alt={`preview-${idx}`}
                      className="object-cover w-full h-full"
                    />
                    {imageError && (
                      <p className="text-error-500 text-xs mb-2">
                        {imageError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(idx)}
                      className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-full px-1.5 py-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveAllImages}
                >
                  {t("add_product.remove_all")}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Color / Size / Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div data-error-field="color">
            <Label>{t("add_product.color")}</Label>

            <MultiSelect
              options={colorOptions.map((c) => ({
                value: c.value,
                text: c.label,
              }))}
              value={formData.color}
              placeholder={t("add_product.select_colors")}
              onChange={(values) => {
                handleColorChange(values);

                //   CLEAR ERROR WHEN USER SELECTS COLOR
                if (Array.isArray(values) && values.length > 0) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.color;
                    return updated;
                  });
                }
              }}
            />
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          <div data-error-field="size">
            <Label>{t("add_product.size")}</Label>

            <MultiSelect
              options={sizeOptions.map((s) => ({
                value: s.value,
                text: s.label,
              }))}
              value={formData.size}
              placeholder={t("add_product.select_sizes")}
              onChange={(values) => {
                handleSizeChange(values);

                //   CLEAR ERROR WHEN USER SELECTS SIZE
                if (Array.isArray(values) && values.length > 0) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.size;
                    return updated;
                  });
                }
              }}
            />

            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size}</p>
            )}
          </div>

          <div data-error-field="weight">
            <Label>{t("add_product.weight")}</Label>

            <div className="relative w-full">
              <input
                name="weight"
                type="number"
                placeholder={t("add_product.weight_placeholder")}
                value={formData.weight}
                onChange={(e) => {
                  const value = e.target.value;

                  setFormData((prev) => ({ ...prev, weight: value }));

                  //   CLEAR ERROR WHEN VALID WEIGHT ENTERED
                  if (Number(value) > 0) {
                    setErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.weight;
                      return updated;
                    });
                  }
                }}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 pr-20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <select
                name="weightUnit"
                value={formData.weightUnit}
                onChange={handleWeightUnitChange}
                className="absolute inset-y-0 right-0 h-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-l border-gray-300 dark:border-gray-600 rounded-r-lg px-3 pr-6 focus:outline-none cursor-pointer"
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="mg">mg</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </select>
            </div>
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          <div>
            <Label>{t("add_product.tags")}</Label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2">
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 px-2 py-1 text-sm rounded-md flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-xs text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}

              <input
                type="text"
                placeholder={t("add_product.enter_tag")}
                value={formData.newTag}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newTag: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 bg-transparent outline-none p-1 text-sm"
              />

              <Button
                type="button"
                className="text-[12px] p-1"
                size="xs"
                variant="outline"
                onClick={handleAddTag}
              >
                {t("add_product.add_tag")}
              </Button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-8 justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => navigate("/products")}
          >
            {t("add_product.cancel")}
          </Button>
          <Button type="submit" size="sm" disabled={loadingCategories}>
            {t("add_product.save")}
          </Button>
        </div>
      </form>

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full text-center relative shadow-xl">
            <button
              onClick={() => setSuccessPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="w-36 mx-auto mb-3">
              <Lottie animationData={successAnim} loop={false} />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {isEditMode
                ? "Product Updated Successfully!"
                : "Product Added Successfully!"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {successMessage}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Button size="sm" onClick={() => navigate("/Products")}>
                {isEditMode ? "✔ Go to Product List" : "➕ Add New Product"}
              </Button>

              {!isEditMode && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => (window.location.href = "/products")}
                >
                  📦 Go to Product List
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductForm;
