import { AlertTriangle } from "lucide-react";

export default function WalletBalances() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="font-semibold mb-4">Wallet & Balances</h3>

      <div className="rounded-lg bg-blue-50 p-4 mb-4">
        <p className="text-sm text-gray-600">Total Deposits</p>
        <p className="text-xl font-semibold">SAR 892,340</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-orange-50 p-4">
          <p className="text-sm text-gray-600">Outstanding</p>
          <p className="font-semibold">SAR 24,890</p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-600">Cleared</p>
          <p className="font-semibold">SAR 867,450</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <AlertTriangle size={16} />
        Pending withdrawals processed within 2–3 business days
      </div>
    </div>
  );
}
