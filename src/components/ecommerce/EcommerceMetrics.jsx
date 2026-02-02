import {
  FisrtIcon,
  SecondIcon,
  ThirdIcon,
  FourthIcon,
  FifthIcon,
  SixthIcon,
  SeventhIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import DashboardStatCard from "../common/DashboardStatCard";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:gap-4 mb-4">
      {/* 1. Total users */}
      <DashboardStatCard
        bgColor="bg-blue-600"
        icon={<FisrtIcon className="text-white" size={48} />}
        value="96"
        label="Total users"
        to="/users"
      />
      {/* 2. Total Products */}
      <DashboardStatCard
        icon={<SixthIcon className="text-white" size={48} />}
        value="03"
        label="Total Products"
        to="/products"
      />

      {/* 2. Pending orders */}
      <DashboardStatCard
        bgColor="bg-red-500"
        icon={<SecondIcon className="text-white" size={48} />}
        value="22"
        label="Pending orders"
        to="/orders"
      />

      {/* 3. Orders Delivered */}
      <DashboardStatCard
        bgColor="bg-yellow-500"
        icon={<ThirdIcon className="text-white" size={48} />}
        value="356"
        label="Orders Delivered"
        to="/orders"
      />

      {/* 4. Live Auctions */}
      <DashboardStatCard
        bgColor="bg-cyan-600"
        icon={<FourthIcon className="text-white" size={48} />}
        value="696"
        label="Live Auctions"
        to="/auctions"
      />

      {/* 5. Held Amount */}
      <DashboardStatCard
        bgColor="bg-blue-500"
        icon={<FifthIcon className="text-white" size={48} />}
        value="SAR 220"
        label="Held Amount"
      />

      {/* 6. Captured Today */}
      <DashboardStatCard
        bgColor="bg-green-600"
        icon={<SixthIcon className="text-white" size={48} />}
        value="SAR 220"
        label="Captured Today"
      />

      {/* 7. Refund Cases */}
      <DashboardStatCard
        bgColor="bg-purple-600"
        icon={<SeventhIcon className="text-white" size={48} />}
        value="59"
        label="Merchant Refund Cases"
      />

      {/* <!-- Metric Item End --> */}
    </div>
  );
}
