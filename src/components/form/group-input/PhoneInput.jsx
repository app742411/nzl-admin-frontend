import React, { useState, useEffect } from "react";

export default function PhoneInput({
  countries = [],
  placeholder = "Enter phone number",
  selectPosition = "start",
  onChange,
  value,
}) {
  //   const [country, setCountry] = useState("");
  // const [phone, setPhone] = useState("");
  const defaultCountry = value?.phoneCode || countries[0]?.label || "";

  const [country, setCountry] = useState(defaultCountry);
  const [phone, setPhone] = useState(value?.phoneNumber || "");

  useEffect(() => {
    if (value?.phoneNumber === "" && value?.phoneCode === "") {
      setPhone("");
      setCountry(countries[0]?.label || "");
    }
  }, [value?.phoneNumber, value?.phoneCode]);

 

  useEffect(() => {
    if (onChange) {
      onChange({
        phoneCode: country,
        phoneNumber: phone,
      });
    }
  }, [country, phone]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ""); // keep only digits
    setPhone(numericValue);
  };

  return (
    <div className="relative flex w-full">
      {/* Country dropdown at START */}
      {selectPosition === "start" && (
        <div className="absolute left-0 z-10 h-full flex items-center">
          <div className="relative">
            <select
              className="appearance-none rounded-l-lg border-r border-gray-300 bg-transparent py-3 pl-3 pr-10 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300"
              value={country}
              onChange={handleCountryChange}
            >
              {countries.map((c, index) => (
                <option key={`${c.label}-${index}`} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Chevron Icon */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* Input field */}
      <input
        type="tel"
        className={`h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90
          ${selectPosition === "start" ? "pl-[90px]" : "pr-[90px]"}
        `}
        placeholder={placeholder}
        value={phone}
        onChange={handlePhoneChange}
      />

      {/* Country dropdown at END */}
      {selectPosition === "end" && (
        <div className="absolute right-0 z-10">
          <select
            className="appearance-none rounded-r-lg border-l border-gray-300 bg-transparent py-3 pl-3 pr-8 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300"
            value={country}
            onChange={handleCountryChange}
          >
            {countries.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
