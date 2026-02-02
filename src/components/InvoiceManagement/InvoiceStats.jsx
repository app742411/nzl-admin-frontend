import {
    FileText,
    CheckCircle2,
    Clock,
    Bell,
    Layers,
} from "lucide-react";

export default function InvoiceStats() {
    const stats = [
        {
            title: "Total",
            count: "4 invoices",
            amount: "SAR43.83",
            icon: FileText,
            ring: "border-cyan-400",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-500",
        },
        {
            title: "Paid",
            count: "4 invoices",
            amount: "SAR52.84",
            icon: CheckCircle2,
            ring: "border-green-400",
            iconBg: "bg-green-100",
            iconColor: "text-green-500",
        },
        {
            title: "Pending",
            count: "4 invoices",
            amount: "SAR89.09",
            icon: Clock,
            ring: "border-yellow-400",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-500",
        },
        {
            title: "Overdue",
            count: "4 invoices",
            amount: "SAR60.96",
            icon: Bell,
            ring: "border-orange-400",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-500",
        },
        {
            title: "Draft",
            count: "4 invoices",
            amount: "SAR78.22",
            icon: Layers,
            ring: "border-gray-300",
            iconBg: "bg-gray-100",
            iconColor: "text-gray-500",
        },
    ];

    return (
        <div className="rounded-xl border bg-white px-6 py-4 mb-5">
            <div className="grid grid-cols-5 divide-x divide-dashed">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 px-6"
                        >
                            {/* Icon Circle */}
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${item.ring}`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconBg}`}
                                >
                                    <Icon
                                        size={20}
                                        className={item.iconColor}
                                    />
                                </div>
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {item.count}
                                </p>
                                <p className="mt-1 text-base font-medium text-gray-900">
                                    {item.amount}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
