import {
    AlertTriangle,
    Check,
    Pause,
    Ban,
    Flag,
    History,
    Gavel,
    Users,
} from "lucide-react";

export default function ActionsAndFlags() {
    return (
        <div className="rounded-2xl border bg-white p-6 space-y-6">
            {/* ================= HEADER ================= */}
            <h2 className="text-xl font-semibold">Account Actions & Flags</h2>

            {/* ================= WARNING BOX ================= */}
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 mt-1" size={22} />
                    <div>
                        <p className="text-lg font-medium text-yellow-800">
                            Frequent Refund User
                        </p>
                        <p className="text-yellow-700">
                            User has requested 5 refunds in the last 30 days
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="grid grid-cols-2 gap-4">
                {/* Activate */}
                <button className="flex items-center justify-center gap-2 rounded-xl bg-green-100 p-4 text-green-700 font-medium">
                    <Check size={20} />
                    Activate
                </button>

                {/* Deactivate */}
                <button className="flex items-center justify-center gap-2 rounded-xl bg-yellow-100 p-4 text-yellow-800 font-medium">
                    <Pause size={20} />
                    Deactivate
                </button>

                {/* Block */}
                <button className="flex items-center justify-center gap-2 rounded-xl bg-red-100 p-4 text-red-700 font-medium">
                    <Ban size={20} />
                    Block
                </button>

                {/* Flag User */}
                <button className="flex items-center justify-center gap-2 rounded-xl bg-orange-100 p-4 text-orange-700 font-medium">
                    <Flag size={20} />
                    Flag User
                </button>
            </div>

            {/* ================= DIVIDER ================= */}
            <hr />

            {/* ================= QUICK ACTIONS ================= */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Quick Actions</h3>

                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center gap-3">
                        <History size={22} />
                        <span className="text-lg">View Full Order History</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Gavel size={22} />
                        <span className="text-lg">View Bid History</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users size={22} />
                        <span className="text-lg">View Referral Network</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
