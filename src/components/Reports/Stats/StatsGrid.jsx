import StatCard from "./StatCard";
import { Users, DollarSign, Activity, Clock } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Users"
        value="12,847"
        change="+12.5%"
        icon={Users}
      />
      <StatCard
        title="Total Revenue"
        value="SAR284,720"
        change="+12.5%"
        icon={DollarSign}
      />
      <StatCard
        title="Active Users"
        value="8,934"
        change="+12.5%"
        icon={Users}
      />
      <StatCard
        title="Active Auctions"
        value="1,247"
        change="+8.2%"
        icon={Activity}
      />
      <StatCard
        title="Total Bids"
        value="45,892"
        change="+15.7%"
        icon={DollarSign}
      />
      <StatCard
        title="Avg Drop Time"
        value="3.2 min"
        change="-5.1%"
        icon={Clock}
        negative
      />
    </div>
  );
}
