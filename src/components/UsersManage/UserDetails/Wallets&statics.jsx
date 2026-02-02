import { Plus, Minus } from "lucide-react";
import Button from "../../ui/button/Button";

export default function WalletStatics() {
    return (
        <div className="rounded-2xl border bg-white p-6 space-y-6">
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Wallet & Statistics</h2>

                <Button className="text-white gap-2 px-5">
                    <span className="text-xl">+</span>
                    Manual Credit/Debit
                </Button>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-4 gap-4">
                {/* Wallet Balance */}
                <div className="rounded-xl bg-blue-50 p-5">
                    <h3 className="text-2xl font-bold text-blue-600">SAR2,450</h3>
                    <p className="mt-2 text-blue-500 text-lg">Wallet Balance</p>
                </div>

                {/* Total Orders */}
                <div className="rounded-xl bg-green-50 p-5">
                    <h3 className="text-2xl font-bold text-green-600">47</h3>
                    <p className="mt-2 text-green-500 text-lg">Total Orders</p>
                </div>

                {/* Active Bids */}
                <div className="rounded-xl bg-purple-50 p-5">
                    <h3 className="text-2xl font-bold text-purple-600">12</h3>
                    <p className="mt-2 text-purple-500 text-lg">Active Bids</p>
                </div>

                {/* Referrals */}
                <div className="rounded-xl bg-orange-50 p-5">
                    <h3 className="text-2xl font-bold text-orange-600">8</h3>
                    <p className="mt-2 text-orange-500 text-lg">Referrals</p>
                </div>
            </div>

            <hr />

            {/* ================= TRANSACTIONS ================= */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Wallet Transactions</h3>

                {/* Transaction + */}
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Plus className="text-green-600" />
                        </div>

                        <div>
                            <p className="font-medium text-lg">Order Payment</p>
                            <p className="text-gray-500">Jan 20, 2024</p>
                        </div>
                    </div>

                    <p className="text-green-600 text-xl font-semibold">
                        +SAR150.00
                    </p>
                </div>

                {/* Transaction - */}
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <Minus className="text-red-600" />
                        </div>

                        <div>
                            <p className="font-medium text-lg">Refund Processed</p>
                            <p className="text-gray-500">Jan 18, 2024</p>
                        </div>
                    </div>

                    <p className="text-red-600 text-xl font-semibold">
                        -SAR75.00
                    </p>
                </div>
            </div>
        </div>
    );
}
