import { useState } from "react";
import toast from "react-hot-toast";

const AntiSnipingForm = () => {
  const [form, setForm] = useState({
    extensionTime: 30,
    triggerWindow: 60,
    enabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (form.extensionTime <= 0 || form.triggerWindow <= 0) {
      toast.error("Values must be greater than 0");
      return;
    }

    //  API call goes here later
    console.log("Anti-sniping settings:", form);

    toast.success("Settings saved successfully");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border dark:bg-gray-900 dark:border-gray-800">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
          Anti-Sniping Configuration
        </h3>

        {/* Extension Time */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Extension Time (seconds)
          </label>
          <input
            type="number"
            name="extensionTime"
            value={form.extensionTime}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Trigger Window */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Trigger Window (seconds)
          </label>
          <input
            type="number"
            name="triggerWindow"
            value={form.triggerWindow}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Enable checkbox */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Enable anti-sniping globally
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AntiSnipingForm;
