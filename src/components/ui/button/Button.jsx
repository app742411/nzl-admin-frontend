import React from "react";

const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button", //   DEFAULT TYPE ADDED
}) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 active:bg-brand-700 disabled:bg-brand-300 text-[16px] font-medium disabled:cursor-not-allowed disabled:opacity-50",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    success:
      "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 disabled:bg-green-300 dark:bg-green-600 dark:hover:bg-green-500",
    error:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 dark:bg-red-600 dark:hover:bg-red-500",
    warning:
      "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 disabled:bg-amber-300 dark:bg-amber-600 dark:hover:bg-amber-500",
    info: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50",
    link: "bg-transparent text-brand-500 underline hover:text-brand-600 disabled:text-gray-400",
  };

  return (
    <button
      type={type} //   FIXED
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;
