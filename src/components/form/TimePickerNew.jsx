import { useState, useRef, useEffect } from "react";
import { Clock8 } from "lucide-react";

export default function TimePickerNew({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];
  const meridiem = ["AM", "PM"];

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");

  // Parse existing value when editing
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      let hourNum = parseInt(h);
      const am = hourNum < 12 ? "AM" : "PM";

      hourNum = hourNum % 12;
      if (hourNum === 0) hourNum = 12;

      setHour(String(hourNum).padStart(2, "0"));
      setMinute(m);
      setAmpm(am);
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyTime = (h, m, ap) => {
    if (!h || !m || !ap) return;

    let hour24 = parseInt(h);
    if (ap === "PM" && hour24 !== 12) hour24 += 12;
    if (ap === "AM" && hour24 === 12) hour24 = 0;

    const final = `${String(hour24).padStart(2, "0")}:${m}`;
    onChange(final);
  };

  return (
    <div className="relative" ref={pickerRef}>
      {/* Input Box */}
      <div
        onClick={() => setOpen(!open)}
        className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 flex items-center justify-between bg-white"
      >
        <span className="text-sm text-gray-500">
          {value ? value : "Select time"}
        </span>
        <Clock8 size={16} className="text-gray-500" />
      </div>

      {/* Popup */}
      {open && (
        <div className="absolute mt-2 z-50 w-56 bg-white rounded-lg shadow-lg border p-3 flex gap-2">
          {/* Hours */}
          <div className="flex-1 max-h-40 overflow-y-auto text-center border-r">
            {hours.map((h) => (
              <div
                key={h}
                onClick={() => {
                  setHour(h);
                  applyTime(h, minute, ampm);
                }}
                className={`py-1 cursor-pointer ${
                  hour === h ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Minutes */}
          <div className="flex-1 max-h-40 overflow-y-auto text-center border-r">
            {minutes.map((m) => (
              <div
                key={m}
                onClick={() => {
                  setMinute(m);
                  applyTime(hour, m, ampm);
                }}
                className={`py-1 cursor-pointer ${
                  minute === m ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`}
              >
                {m}
              </div>
            ))}
          </div>

          {/* AM / PM */}
          <div className="flex-1 max-h-40 overflow-y-auto text-center">
            {meridiem.map((ap) => (
              <div
                key={ap}
                onClick={() => {
                  setAmpm(ap);
                  applyTime(hour, minute, ap);
                }}
                className={`py-1 cursor-pointer ${
                  ampm === ap ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`}
              >
                {ap}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
