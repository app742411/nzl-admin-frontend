import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disablePast = false,
  error = "",
}) {
  const [open, setOpen] = useState(false);

  const selected = value ? moment(value, "DD-MM-YYYY").toDate() : undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const disabledDays = [
    disablePast ? { before: today } : null,
    minDate ? { before: moment(minDate, "DD-MM-YYYY").toDate() } : null,
    maxDate ? { after: moment(maxDate, "DD-MM-YYYY").toDate() } : null,
  ].filter(Boolean);

  const handleSelect = (date) => {
    if (!date) return;
    const formatted = moment(date).format("DD-MM-YYYY");
    onChange(formatted);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          value={value || ""}
          readOnly
          placeholder="Select date"
          className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm cursor-pointer bg-white 
            ${error ? "border-red-500" : "border-gray-300"}
          `}
          onClick={() => setOpen(true)}
        />

        <Calendar
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      {open && (
        <div className="absolute z-50 top-full mt-2 bg-white shadow-xl rounded-xl p-4">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            disabled={disabledDays}
          />
        </div>
      )}
    </div>
  );
}
