import Button from "../../ui/button/Button";

export default function ReportsHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold">Reports & Analytics</h2>

      <div className="flex gap-3">
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Last 30 Days</option>
        </select>
        <Button variant="primary">Export Report</Button>
      </div>
    </div>
  );
}
