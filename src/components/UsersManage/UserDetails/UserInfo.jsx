import { useEffect, useState } from "react";
import { MapPin, Mail, Briefcase } from "lucide-react";
import { getUserDetailsById } from "../../../api/authApi";

export default function UserInfo({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await getUserDetailsById(userId);
                setUser(res.data.data);
            } catch (err) {
                console.error("Failed to fetch user", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                Loading user info...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="rounded-2xl border bg-white p-6">
                User not found
            </div>
        );
    }

    return (
        <div className="rounded-2xl border bg-white p-6 space-y-6">
            {/* USER HEADER */}
            <div className="flex items-center gap-4">
                <img
                    src={user.image || "/images/user/default-user.png"}
                    alt={user.first_name}
                    className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                    <h2 className="text-2xl font-semibold">
                        {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>

                    <div className="mt-2 flex gap-2">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            {user.status}
                        </span>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>

            <hr />

            {/* USER META */}
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                    <MapPin className="text-orange-500" size={18} />
                    <span>
                        {user.city}, {user.state}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Mail className="text-blue-500" size={18} />
                    <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Briefcase className="text-green-500" size={18} />
                    <span>{user.street_address}</span>
                </div>
            </div>

            <hr />

            {/* FOOTER */}
            <div className="grid grid-cols-2 gap-y-4 text-sm">
                <span className="text-gray-500">User ID:</span>
                <span className="text-right font-medium">
                    #{user.id.slice(0, 8)}
                </span>

                <span className="text-gray-500">Join Date:</span>
                <span className="text-right font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                </span>

                <span className="text-gray-500">Last Active:</span>
                <span className="text-right font-medium">2 hours ago</span>
            </div>
        </div>
    );
}
