import { useState, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";

const Select = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  className = "",
  value = "",
  required = false, //  NEW
  error = false, //  NEW
  errorMessage = "", //  NEW
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [touched, setTouched] = useState(false); //  NEW

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Mark touched
    setTouched(true);

    setSelectedValue(newValue);
    onChange(newValue);
  };

  //  Determine if this field is invalid
  const showError = required && touched && !selectedValue;

  return (
    <div className="relative w-full">
      <select
        className={`
          h-11 w-full appearance-none rounded-lg border bg-transparent 
          px-2 py-2.5 text-sm shadow-theme-xs
          placeholder:text-gray-400
          focus:outline-hidden focus:ring-3 
          dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
          ${selectedValue ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"}
          ${showError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-300 dark:border-gray-700 focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800"}
          ${className}
        `}
        value={selectedValue}
        onChange={handleChange}
        onBlur={() => setTouched(true)} //  Mark as touched on blur
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>

      <span className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
        <ChevronDownIcon className="h-4 w-4" />
      </span>

      {/*  Error message */}
      {showError && (
        <p className="mt-1 text-xs text-red-500">
          {errorMessage || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default Select;
