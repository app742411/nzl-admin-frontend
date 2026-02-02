import React, { useState, useEffect } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import DatePicker from "../form/DatePicker";
import TimePicker from "../form/TimePickerNew";
import { productListAuction, addAuction } from "../../api/authApi";
import toast from "react-hot-toast";
import successAnim from "../../lottie/Success.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import ImageSelect from "../form/ImageSelect";
const baseURL = import.meta.env.VITE_API_URL;

const AuctionForm = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [auctionType, setAuctionType] = useState("");
  const [availableQty, setAvailableQty] = useState(0);
  const [successPopup, setSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [errors, setErrors] = useState({});

  const combineToUTC = (date, time) => {
    if (!date || !time) return null;

    const [dd, mm, yyyy] = date.split("-").map(Number);
    const [hh, mi] = time.split(":").map(Number);

    // Create LOCAL datetime (browser timezone)
    const localDate = new Date(yyyy, mm - 1, dd, hh, mi);

    // Convert to UTC string
    return localDate.toISOString();
  };

  const validateSchedule = () => {
    const newErrors = {};

    const sd = formData.startDate;
    const ed = formData.endDate;
    const st = formData.startTime;
    const et = formData.endTime;

    // Convert "DD-MM-YYYY HH:mm" to JS Date
    const parseDateTime = (d, t) => {
      if (!d || !t) return null;
      const [dd, mm, yyyy] = d.split("-").map(Number);
      const [hh, mi] = t.split(":").map(Number);
      return new Date(yyyy, mm - 1, dd, hh, mi);
    };

    const start = parseDateTime(sd, st);
    const end = parseDateTime(ed, et);
    const isSameDay = (d1, d2) => d1 === d2;

    // ---------- Date Validation ----------
    if (!sd) newErrors.startDate = "Start date is required";
    if (!ed) newErrors.endDate = "End date is required";

    if (sd && ed && sd > ed) {
      newErrors.endDate = "End date cannot be before start date";
    }

    // ---------- Time Validation ----------
    if (!st) newErrors.startTime = "Start time is required";
    if (!et) newErrors.endTime = "End time is required";

    if (sd === ed && st && et) {
      if (start >= end) {
        newErrors.endTime = "End time must be later than start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    auctionTitle: "",
    productId: "",
    minQuantity: "",
    buyTogetherPrice: "",
    startPrice: "",
    floorPrice: "",
    dropSpeed: "",
    finalPrice: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const auctionTypeOptions = [
    { value: "reverse", label: "Reverse Auction" },
    { value: "buyTogether", label: "Buy Together" },
  ];

  // Fetch products
  useEffect(() => {
    if (!auctionType) return;

    const fetchProducts = async () => {
      try {
        const res = await productListAuction(auctionType);

        const formatted = res.data.map((item) => ({
          value: item.id,
          label: `${item.product_name} (Qty: ${item.quantity})`,
          quantity: item.quantity,
          imageUrl: item.product_image,
        }));

        setProductOptions(formatted);
        setFormData((prev) => ({ ...prev, productId: "" })); // reset selected product
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, [auctionType]);

  // Select product
  const handleProductChange = (value) => {
    setFormData((prev) => ({ ...prev, productId: value }));

    const selected = productOptions.find((p) => p.value === value);
    setAvailableQty(selected?.quantity || 0);
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Quantity validation
    if (name === "minQuantity" && Number(value) > availableQty) {
      toast.error(`Max available quantity: ${availableQty}`);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //scroll
  const scrollToFirstError = (errors) => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;

    const el = document.querySelector(`[data-error-field="${firstKey}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const validateForm = () => {
    let newErrors = {};

    if (!formData.auctionTitle?.trim())
      newErrors.auctionTitle = "Auction title is required";

    if (!auctionType) newErrors.auctionType = "Auction type is required";

    if (!formData.productId) newErrors.productId = "Product is required";

    if (!formData.startDate) newErrors.startDate = "Start date is required";

    if (!formData.startTime) newErrors.startTime = "Start time is required";

    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (!formData.endTime) newErrors.endTime = "End time is required";

    // Date + time comparison
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startTime &&
      formData.endTime
    ) {
      const parse = (d, t) => {
        const [dd, mm, yyyy] = d.split("-").map(Number);
        const [hh, mi] = t.split(":").map(Number);
        return new Date(yyyy, mm - 1, dd, hh, mi);
      };

      const start = parse(formData.startDate, formData.startTime);
      const end = parse(formData.endDate, formData.endTime);

      if (end <= start) newErrors.endTime = "End time must be after start time";
    }
    /* =========================
   BUY TOGETHER VALIDATION
   ========================= */
    if (auctionType === "buyTogether") {
      if (!formData.minQuantity || Number(formData.minQuantity) <= 0) {
        newErrors.minQuantity = "Minimum quantity is required";
      }

      if (
        !formData.buyTogetherPrice ||
        Number(formData.buyTogetherPrice) <= 0
      ) {
        newErrors.buyTogetherPrice = "Buy together price is required";
      }
    }

    /* =========================
   REVERSE AUCTION VALIDATION
   ========================= */
    if (auctionType === "reverse") {
      if (!formData.startPrice || Number(formData.startPrice) <= 0) {
        newErrors.startPrice = "Start price is required";
      }

      if (!formData.floorPrice || Number(formData.floorPrice) <= 0) {
        newErrors.floorPrice = "Floor price is required";
      }

      if (Number(formData.floorPrice) >= Number(formData.startPrice)) {
        newErrors.floorPrice = "Floor price must be less than start price";
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ============================
    // VALIDATION SECTION
    // ============================
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      toast.error(Object.values(validationErrors)[0]);
      scrollToFirstError(validationErrors);
      return;
    }

    // ============================
    // API CALL
    // ============================
    try {
      const startDateTime = combineToUTC(
        formData.startDate,
        formData.startTime,
      );

      const endDateTime = combineToUTC(formData.endDate, formData.endTime);

      const payload = {
        auctionTitle: formData.auctionTitle,
        productId: formData.productId,
        auctionType: auctionType,
        minQuantity: formData.minQuantity,
        buyTogetherPrice: formData.buyTogetherPrice,
        startPrice: formData.startPrice,
        floorPrice: formData.floorPrice,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      };

      const res = await addAuction(payload);

      toast.success("Auction created successfully!");
      setSuccessMessage("Auction created successfully!");
      setSuccessPopup(true);

      // Reset Form
      setFormData({
        auctionTitle: "",
        productId: "",
        minQuantity: "",
        buyTogetherPrice: "",
        startPrice: "",
        floorPrice: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });

      setAuctionType("");
      setAvailableQty(0);

      setResetKey((prev) => prev + 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create auction");
    }
  };

  const showReverseFields = auctionType === "reverse" || auctionType === "both";
  const showBuyTogetherFields =
    auctionType === "buyTogether" || auctionType === "both";

  const today = new Date();

  return (
    <div className="auctionForm">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full rounded-3xl bg-white p-5 dark:bg-gray-900"
      >
        <h4 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Create New Auction
        </h4>

        {/* Title + Product */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div data-error-field="auctionTitle">
            <Label>Auction Title</Label>
            <Input
              name="auctionTitle"
              value={formData.auctionTitle}
              onChange={(e) => {
                setFormData((p) => ({ ...p, auctionTitle: e.target.value }));
                if (e.target.value.trim())
                  setErrors((p) => ({ ...p, auctionTitle: "" }));
              }}
            />
            {errors.auctionTitle && (
              <p className="text-red-500 text-sm">{errors.auctionTitle}</p>
            )}
          </div>

          <div data-error-field="auctionType">
            <Label>Auction Type</Label>
            <Select
              options={auctionTypeOptions}
              value={auctionType}
              onChange={(value) => {
                setAuctionType(value);
                setErrors((p) => ({ ...p, auctionType: "" }));
              }}
            />
            {errors.auctionType && (
              <p className="text-red-500 text-sm">{errors.auctionType}</p>
            )}
          </div>
        </div>

        {/* Auction Type */}
        <div className="grid grid-cols-1 mb-6">
          <div data-error-field="productId">
            <Label>Select Product</Label>
            <ImageSelect
              options={productOptions}
              value={formData.productId}
              onChange={(value) => {
                handleProductChange(value);
                setErrors((p) => ({ ...p, productId: "" }));
              }}
            />
            {errors.productId && (
              <p className="text-red-500 text-sm">{errors.productId}</p>
            )}
          </div>
        </div>

        {/* BUY TOGETHER FIELDS */}
        {showBuyTogetherFields && (
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div data-error-field="minQuantity">
              <Label>
                Min Quantity (Buy Together)
                <span className="text-green-500 ml-2">
                  ({availableQty} available)
                </span>
              </Label>

              <Input
                name="minQuantity"
                type="number"
                value={formData.minQuantity}
                placeholder={`Max allowed: ${availableQty}`}
                onChange={(e) => {
                  const value = e.target.value;

                  if (Number(value) > availableQty) {
                    toast.error(`You can select max ${availableQty}`);
                    return;
                  }

                  setFormData((p) => ({ ...p, minQuantity: value }));

                  if (Number(value) > 0) {
                    setErrors((p) => {
                      const updated = { ...p };
                      delete updated.minQuantity;
                      return updated;
                    });
                  }
                }}
              />

              {errors.minQuantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.minQuantity}
                </p>
              )}
            </div>
            <div data-error-field="buyTogetherPrice">
              <Label>Buy Together Price</Label>

              <Input
                name="buyTogetherPrice"
                type="number"
                value={formData.buyTogetherPrice}
                placeholder="Enter price"
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((p) => ({ ...p, buyTogetherPrice: value }));

                  if (Number(value) > 0) {
                    setErrors((p) => {
                      const updated = { ...p };
                      delete updated.buyTogetherPrice;
                      return updated;
                    });
                  }
                }}
              />

              {errors.buyTogetherPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.buyTogetherPrice}
                </p>
              )}
            </div>
          </div>
        )}

        {/* REVERSE AUCTION */}
        {showReverseFields && (
          <>
            <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3">
              Reverse Auction Pricing
            </h5>

            <div className="grid grid-cols-2 gap-5">
              <div data-error-field="startPrice">
                <Label>Start Price</Label>

                <Input
                  name="startPrice"
                  type="number"
                  value={formData.startPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((p) => ({ ...p, startPrice: value }));

                    if (Number(value) > 0) {
                      setErrors((p) => {
                        const updated = { ...p };
                        delete updated.startPrice;
                        return updated;
                      });
                    }
                  }}
                />

                {errors.startPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startPrice}
                  </p>
                )}
              </div>

              <div data-error-field="floorPrice">
                <Label>Floor Price</Label>

                <Input
                  name="floorPrice"
                  type="number"
                  value={formData.floorPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((p) => ({ ...p, floorPrice: value }));

                    if (Number(value) > 0) {
                      setErrors((p) => {
                        const updated = { ...p };
                        delete updated.floorPrice;
                        return updated;
                      });
                    }
                  }}
                />

                {errors.floorPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.floorPrice}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* DATE & TIME */}
        <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-8 mb-3">
          Auction Schedule
        </h5>

        <div className="grid grid-cols-2 gap-5">
          {/* START DATE */}
          <div data-error-field="startDate">
            <Label>Start Date</Label>
            <DatePicker
              value={formData.startDate}
              disablePast={true}
              onChange={(date) => {
                setFormData((p) => ({ ...p, startDate: date }));
                setErrors((p) => ({ ...p, startDate: "" }));
                if (
                  formData.endDate &&
                  isEndBeforeStart(date, formData.endDate)
                ) {
                  setFormData((p) => ({ ...p, endDate: "", endTime: "" }));
                }
              }}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>

          {/* START TIME */}
          <div data-error-field="startTime">
            <Label>Start Time</Label>
            <TimePicker
              value={formData.startTime}
              onChange={(time) => {
                setFormData((p) => ({ ...p, startTime: time }));
                setErrors((p) => ({ ...p, startTime: "" }));
              }}
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm">{errors.startTime}</p>
            )}
          </div>

          {/* END DATE */}
          <div data-error-field="endDate">
            <Label>End Date</Label>
            <DatePicker
              value={formData.endDate}
              minDate={formData.startDate}
              onChange={(date) => {
                setFormData((p) => ({ ...p, endDate: date }));
                setErrors((p) => ({ ...p, endDate: "" }));
              }}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}
          </div>

          {/* END TIME */}
          <div data-error-field="endTime">
            <Label>End Time</Label>
            <TimePicker
              value={formData.endTime}
              onChange={(time) => {
                setFormData((p) => ({ ...p, endTime: time }));
                setErrors((p) => ({ ...p, endTime: "" }));
              }}
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
          >
            Schedule Auction
          </button>
        </div>
      </form>

      {/* SUCCESS POPUP */}
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
              Auction Added Successfully!
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {successMessage}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                className="px-4 py-2 bg-brand-500 text-white rounded-lg"
                onClick={() => navigate("/auctions")}
              >
                Go to Auction List
              </button>

              <button
                className="px-4 py-2 border border-brand-500 text-brand-500 rounded-lg"
                onClick={() => setSuccessPopup(false)}
              >
                Add Another Auction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionForm;
