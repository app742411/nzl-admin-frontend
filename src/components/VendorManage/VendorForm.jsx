import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import imageUpload from "../../../public/images/image/illustration-upload.svg";
import { getProductCategories, addVendor } from "../../api/authApi";
import PhoneInput from "../form/group-input/PhoneInput";
import { countryCodes } from "../../utils/countryCodes";
import MultiSelect from "../form/MultiSelect";
import { usePlacesAutocomplete } from "../../hooks/usePlacesAutocomplete";

const VendorForm = () => {
  const { t } = useTranslation();

  const handleAddressSelect = ({ address, city, state }) => {
  setFormData((prev) => ({
    ...prev,
    streetAddress: address,
    city,
    state,
  }));

  // optional: clear errors
  setErrors((prev) => {
    const e = { ...prev };
    delete e.streetAddress;
    delete e.city;
    delete e.state;
    return e;
  });
};


const {
  inputRef: businessAddressRef,
  initAutocomplete,
} = usePlacesAutocomplete(handleAddressSelect);


  // ===================== FORM STATE =====================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneCode: "",
    streetAddress: "",
    city: "",
    state: "",
    businessName: "",
    businessType: "",
    description: "",
    taxId: "",
    yearsInBusiness: "",
    category: [],
    monthlySales: "",
    logo: null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ===================== PHONE CODE OPTIONS =====================
  const phoneCodeOptions = [
    { value: "+91", label: "+91 (India)" },
    { value: "+1", label: "+1 (USA)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+61", label: "+61 (Australia)" },
    { value: "+971", label: "+971 (UAE)" },
  ];

  // ===================== STATIC OPTIONS =====================
  const businessTypeOptions = [
    { value: "sole", label: t("vendor_form.business_type_options.sole") },
    { value: "partnership", label: t("vendor_form.business_type_options.partnership") },
    { value: "llp", label: t("vendor_form.business_type_options.llp") },
    { value: "pvt_ltd", label: t("vendor_form.business_type_options.pvt_ltd") },
    { value: "corporation", label: t("vendor_form.business_type_options.corporation") },
    { value: "ltd", label: t("vendor_form.business_type_options.ltd") },
  ];

  const yearOptions = [
    { value: "1-2", label: t("vendor_form.years_in_business_options.1_2") },
    { value: "3-5", label: t("vendor_form.years_in_business_options.3_5") },
    { value: "5+", label: t("vendor_form.years_in_business_options.5_plus") }
  ];

  const monthlySalesOptions = [
    { value: "0-10000", label: "$0 - $10,000" },
    { value: "10000-50000", label: "$10,000 - $50,000" },
    { value: "50000+", label: "$50,000+" },
  ];

  // ===================== CATEGORY API =====================
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getProductCategories();
        const categories = res?.data || [];

        const options = categories.map((cat) => ({
          value: cat.id,
          text: cat.category_name,
        }));

        setCategoryOptions(options);
      } catch (error) {
        toast.error("Unable to load product categories");
      }
    };

    fetchCats();
  }, []);

  // ===================== HANDLERS =====================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      switch (name) {
        case "businessName":
          if (value.trim()) delete updatedErrors.businessName;
          break;

        case "email":
          if (value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            delete updatedErrors.email;
          }
          break;

        case "phoneNumber":
          if (/^\d{10}$/.test(value)) {
            delete updatedErrors.phoneNumber;
          }
          break;

        case "password":
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(value)
          ) {
            delete updatedErrors.password;
          }
          break;

        case "confirmPassword":
          if (value === formData.password) {
            delete updatedErrors.confirmPassword;
          }
          break;

        default:
          break;
      }

      return updatedErrors;
    });
  };


  const handleChangePhone = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      // Phone Code
      if (key === "phoneCode" && value) {
        delete updatedErrors.phoneCode;
      }

      // Phone Number (10 digits)
      if (key === "phoneNumber" && /^\d{10}$/.test(value)) {
        delete updatedErrors.phoneNumber;
      }

      return updatedErrors;
    });
  };


  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (name === "businessType" && value) {
        delete updatedErrors.businessType;
      }

      if (name === "monthlySales" && value) {
        delete updatedErrors.monthlySales;
      }

      if (name === "category" && Array.isArray(value) && value.length > 0) {
        delete updatedErrors.category;
      }

      return updatedErrors;
    });
  };


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid image format");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      logo: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));

    // Clear logo error if any
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors.logo;
      return updatedErrors;
    });
  };


  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));


    setErrors((prev) => ({
      ...prev,
      logo: "Logo is required",
    }));
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.businessName?.trim())
      newErrors.businessName = "Business name is required";

    if (!formData.businessType)
      newErrors.businessType = "Business type is required";

    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.phoneCode) newErrors.phoneCode = "Phone code is required";

    if (!formData.phoneNumber?.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";

    if (!Array.isArray(formData.category) || formData.category.length === 0)
      newErrors.category = "Please select at least one category";

    if (!formData.monthlySales)
      newErrors.monthlySales = "Please select monthly sales";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must include uppercase, lowercase, number & special character";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return newErrors; //   RETURN OBJECT
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      toast.error(Object.values(validationErrors)[0]);
      //   scroll to first visible error
      setTimeout(() => {
        document
          .querySelector(".text-red-500")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    // Proceed with API call

    setLoading(true);

    try {
      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "logo" && formData.logo?.file) {
          fd.append("logo", formData.logo.file);
        } else if (key === "category") {
          fd.append("category", JSON.stringify(formData.category));
        } else {
          fd.append(key, formData[key]);
        }
      });

      const res = await addVendor(fd);

      toast.success("Vendor account created successfully!");

      // Reset
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        phoneCode: "",
        streetAddress: "",
        city: "",
        state: "",
        businessName: "",
        businessType: "",
        description: "",
        taxId: "",
        yearsInBusiness: "",
        category: [],
        monthlySales: "",
        logo: null,
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  

  // ===================== UI =====================
  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full rounded-3xl bg-white p-5 dark:bg-gray-900"
    >
      <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {t("vendor_form.vendor_registration")}
      </h4>

      {/* ================= BUSINESS INFO ================= */}
      <div className="rounded-2xl border p-5 mb-6 dark:border-gray-800">
        <h5 className="text-lg font-semibold mb-4">
          {t("vendor_form.business_info")}
        </h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Business Name */}
          <div>
            <Label>{t("vendor_form.business_name")}</Label>
            <Input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder={t("vendor_form.business_name_placeholder")}
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">{errors.businessName}</p>
            )}
          </div>
          <div>
            <Label>{t("vendor_form.business_type")}</Label>
            <Select
              options={businessTypeOptions}
              placeholder={t("vendor_form.business_type_placeholder")}
              value={formData.businessType}
              onChange={(val) => handleSelectChange("businessType", val)}
            />
            {errors.businessType && (
              <p className="text-red-500 text-sm">{errors.businessType}</p>
            )}
          </div>

          {/* Logo Upload */}
          <div className="lg:col-span-2">
            <Label>{t("vendor_form.business_logo")}</Label>

            {!formData.logo ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <img src={imageUpload} className="w-14 h-14 mb-2" />
                  <p className="text-gray-500">{t("vendor_form.upload_logo")}</p>
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={formData.logo.preview}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLogo}
                >
                  {t("vendor_form.remove_logo")}
                </Button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <Label>{t("vendor_form.description")}</Label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 dark:border-gray-700"
              placeholder={t("vendor_form.description_placeholder")}
            ></textarea>
          </div>

          {/* Tax ID */}
          <div>
            <Label>{t("vendor_form.tax_id")}</Label>
            <Input
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder={t("vendor_form.tax_id_placeholder")}
            />
          </div>

          {/* Years in Business */}
          <div>
            <Label>{t("vendor_form.years_in_business")}</Label>
            <Select
              options={yearOptions}
              placeholder={t("vendor_form.years_in_business_placeholder")}
              value={formData.yearsInBusiness}
              onChange={(val) => handleSelectChange("yearsInBusiness", val)}
            />
          </div>
        </div>
      </div>

      {/* ================= CONTACT INFO ================= */}
      <div className="rounded-2xl border p-5 mb-6 dark:border-gray-800">
        <h5 className="text-lg font-semibold mb-4">{t("vendor_form.contact_info")}</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* First Name */}
          <div>
            <Label>{t("vendor_form.first_name")}</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("vendor_form.first_name_placeholder")}
            />
          </div>

          {/* Last Name */}
          <div>
            <Label>{t("vendor_form.last_name")}</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("vendor_form.last_name_placeholder")}
            />
          </div>

          {/* Password */}
          <div>
            <Label>{t("vendor_form.password")}</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("vendor_form.password_placeholder")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label>{t("vendor_form.confirm_password")}</Label>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("vendor_form.confirm_password_placeholder")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <Label>{t("vendor_form.email")}</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("vendor_form.email_placeholder")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <Label>{t("vendor_form.phone_number")}</Label>
            <PhoneInput
              countries={countryCodes}
              placeholder={t("vendor_form.phone_number_placeholder")}
              selectPosition="start"
              value={{
                phoneCode: formData.phoneCode,
                phoneNumber: formData.phoneNumber,
              }}
              onChange={({ phoneCode, phoneNumber }) => {
                handleChangePhone("phoneCode", phoneCode);
                handleChangePhone("phoneNumber", phoneNumber);
              }}
            />

            {errors.phoneCode && (
              <p className="text-red-500 text-sm">{errors.phoneCode}</p>
            )}
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Address */}
          <div className="lg:col-span-2 ">
            <Label>{t("vendor_form.address")}</Label>
            <Input
            ref={businessAddressRef}
              name="streetAddress"
              value={formData.streetAddress} //   matches state
              onChange={handleChange}
              onFocus={initAutocomplete}
              placeholder={t("vendor_form.address_placeholder")}
            />
          </div>

          <div>
            <Label>{t("vendor_form.city")}</Label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={t("vendor_form.city_placeholder")}
            />
          </div>

          <div>
            <Label>{t("vendor_form.state")}</Label>
            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder={t("vendor_form.state_placeholder")}
            />
          </div>
        </div>
      </div>

      {/* ================= SELLING PREFERENCES ================= */}
      <div className="rounded-2xl border p-5 mb-6 dark:border-gray-800">
        <h5 className="text-lg font-semibold mb-4">{t("vendor_form.selling_preferences")}</h5>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <Label>{t("vendor_form.category")}</Label>
            <MultiSelect
              options={categoryOptions}
              placeholder={t("vendor_form.category_placeholder")}
              value={formData.category}
              onChange={(val) => handleSelectChange("category", val)}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Monthly Sales */}
          <div>
            <Label>{t("vendor_form.monthly_sales")}</Label>
            <Select
              options={monthlySalesOptions}
              placeholder={t("vendor_form.monthly_sales_placeholder")}
              value={formData.monthlySales}
              onChange={(val) => handleSelectChange("monthlySales", val)}
            />
            {errors.monthlySales && (
              <p className="text-red-500 text-sm">{errors.monthlySales}</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          {t("vendor_form.save_draft")}
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? t("vendor_form.creating") : t("vendor_form.create_account")}
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;
