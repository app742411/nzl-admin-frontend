import React from "react";
import Badge from "../../ui/badge/Badge";

const AuctionUsersList = ({ users }) => {
    if (!users) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 h-full flex flex-col">
            <h3 className="mb-4 text-xl font-semibold">Auction Participants ({users.length})</h3>

            <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 max-h-[500px]">
                {users.length > 0 ? (
                    <div className="space-y-4">
                        {users.map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {user.first_name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-sm text-gray-800">
                                            {user.first_name} {user.last_name}
                                        </h5>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-800">
                                        SAR {Number(user.order_amount || 0).toLocaleString()}
                                    </p>
                                    <div className="mt-1">
                                        <Badge size="xs" color={getStatusColor(user.order_status)}>
                                            {user.order_status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                        <p>No participants yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "paid": return "success";
        case "confirmed": return "info";
        case "pending": return "warning";
        case "cancelled": return "error";
        default: return "light";
    }
};

export default AuctionUsersList;
