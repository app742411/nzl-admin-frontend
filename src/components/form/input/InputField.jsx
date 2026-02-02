import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(function Input(
  {
    type = "text",
    id,
    name,
    placeholder,
    value,
    onChange,
    onFocus,
    className = "",
    required = false,
    ...props
  },
  ref
) {
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const showError = required && touched && !value;

  let inputClasses = `h-11 w-full rounded-lg border px-4 py-2.5 text-sm 
    placeholder:text-gray-400 focus:outline-hidden focus:ring-3 
    dark:bg-gray-900 dark:text-white/90 ${className}`;

  if (showError) {
    inputClasses += " border-error-500 focus:border-error-500";
  } else {
    inputClasses += " border-gray-300 dark:border-gray-700";
  }

  return (
    <div className="relative">
      <input
        ref={ref}                 
        type={inputType}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={onFocus}         
        onBlur={() => setTouched(true)}
        className={`${inputClasses} ${isPassword ? "pr-10" : ""}`}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      {showError && (
        <p className="mt-1.5 text-xs text-error-500">
          This field is required
        </p>
      )}
    </div>
  );
});

export default Input;
