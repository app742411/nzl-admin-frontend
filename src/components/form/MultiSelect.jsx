import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "../../icons";

const MultiSelect = ({
  label,
  options,
  defaultSelected = [],
  value,
  onChange,
  disabled = false,
  placeholder = "Select options",
  required = false, //  NEW
  error = "", //  NEW
}) => {
  const isControlled = value !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selectedOptions = isControlled ? value : internalSelected;
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const updateSelection = (newSelected) => {
    const cleanArr = [...newSelected];
    if (!isControlled) setInternalSelected(cleanArr);
    onChange?.(cleanArr);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue) => {
    const newSelected = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((v) => v !== optionValue)
      : [...selectedOptions, optionValue];

    updateSelection(newSelected);
  };

  const removeOption = (optionValue) => {
    updateSelection(selectedOptions.filter((v) => v !== optionValue));
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    e.preventDefault();
    switch (e.key) {
      case "Enter":
        if (!isOpen) setIsOpen(true);
        else if (focusedIndex >= 0) handleSelect(options[focusedIndex].value);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        if (!isOpen) setIsOpen(true);
        else
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        if (isOpen)
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            className="w-full"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
          >
            <div
              className={`mb-2 flex min-h-11 rounded-lg border py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition
                ${
                  error
                    ? "border-error-500 text-error-500"
                    : "border-gray-300 dark:border-gray-700"
                }
                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                    : "cursor-pointer"
                }
              `}
            >
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((value) => {
                    const text =
                      options.find((opt) => opt.value === value)?.text ||
                      options.find((opt) => opt.value === value)?.label ||
                      value;

                    return (
                      <div
                        key={value}
                        className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-white/90"
                      >
                        <span className="flex-initial max-w-full">{text}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!disabled) removeOption(value);
                          }}
                          disabled={disabled}
                          className="pl-2 text-gray-500 cursor-pointer dark:text-gray-400"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full h-full p-1 pr-2 text-sm text-gray-400 dark:text-gray-500 pointer-events-none">
                    {placeholder}
                  </div>
                )}
              </div>

              <div className="flex items-center self-start py-1 pl-1 pr-1 w-7">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <ChevronDownIcon className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg shadow-sm top-full max-h-select dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
              role="listbox"
            >
              {options
                .filter((option) => !selectedOptions.includes(option.value)) //  KEY LINE
                .map((option) => {
                  const isSelected = selectedOptions.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={`hover:bg-primary/5 w-full cursor-pointer border-b border-gray-200 dark:border-gray-800 ${
                        isSelected ? "bg-primary/10" : ""
                      }`}
                      onClick={() => handleSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex w-full items-center p-2 pl-2">
                        <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                          {option.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/*  ERROR BELOW INPUT */}
      {error && <p className="text-error-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelect;
