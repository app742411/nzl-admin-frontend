import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";

const ImageSelect = ({
  options = [],
  placeholder = "Select option",
  value = "",
  onChange = () => {},
  className = "",
  searchable = true,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* SELECT BOX */}
      <div
        className="flex h-11 w-full items-center justify-between rounded-lg border px-3 cursor-pointer bg-white dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.imageUrl && (
            <img
              src={selectedOption.imageUrl}
              alt="product"
              className="h-8 w-8 rounded object-cover border"
            />
          )}

          <span
            className={`truncate ${
              selectedOption ? "text-gray-900 dark:text-white" : "text-gray-400"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 max-h-64 overflow-auto p-2">
          {searchable && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          )}

          {filteredOptions.length === 0 && (
            <p className="text-gray-500 text-sm p-2">No options found</p>
          )}

          {filteredOptions.map((item) => (
            <div
              key={item.value}
              className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
                setSearch("");
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.label}
                className="h-10 w-10 rounded object-cover border"
              />

              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSelect;
