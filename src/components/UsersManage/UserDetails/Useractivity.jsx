import { Monitor, Smartphone, Laptop } from "lucide-react";

export default function UserActivity() {
    return (
        <div className="rounded-2xl border bg-white p-6 space-y-6">
            {/* ================= HEADER ================= */}
            <h2 className="text-xl font-semibold">Login Devices & History</h2>

            {/* ================= DEVICE LIST ================= */}
            <div className="space-y-4">
                {/* Windows PC */}
                <div className="flex items-center justify-between rounded-xl border p-5">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Monitor className="text-blue-600" size={28} />
                        </div>

                        <div>
                            <p className="text-lg font-medium">Windows PC</p>
                            <p className="text-gray-500">
                                Chrome 120 • New York, US
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-green-600 font-medium">Current</p>
                        <p className="text-gray-500">2 hours ago</p>
                    </div>
                </div>

                {/* iPhone */}
                <div className="flex items-center justify-between rounded-xl border p-5">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-green-50 p-3">
                            <Smartphone className="text-green-600" size={28} />
                        </div>

                        <div>
                            <p className="text-lg font-medium">iPhone 15</p>
                            <p className="text-gray-500">
                                Safari • New York, US
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-medium text-gray-900">Active</p>
                        <p className="text-gray-500">Yesterday</p>
                    </div>
                </div>

                {/* MacBook Pro (Suspicious) */}
                <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-5">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-red-100 p-3">
                            <Laptop className="text-red-600" size={28} />
                        </div>

                        <div>
                            <p className="text-lg font-medium">MacBook Pro</p>
                            <p className="text-gray-600">
                                Safari • Miami, FL
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-red-600 font-medium">Suspicious</p>
                        <p className="text-gray-500">3 days ago</p>
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border p-5">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-green-50 p-3">
                            <Smartphone className="text-green-600" size={28} />
                        </div>

                        <div>
                            <p className="text-lg font-medium">iPhone 15</p>
                            <p className="text-gray-500">
                                Safari • New York, US
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-medium text-gray-900">Active</p>
                        <p className="text-gray-500">Yesterday</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
