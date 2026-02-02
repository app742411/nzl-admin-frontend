import React from "react";
import DashboardStatCard from "../common/DashboardStatCard";
import { Gavel, Users, DollarSign, PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";

const AuctionStatic = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:gap-4 mb-4">
        <DashboardStatCard
          to="/add-vendor"
          variant="stats"
          bgColor="bg-blue-100"
          icon={<Gavel className="text-blue-600" />}
          label="Active Auctions"
          value="24"
        />

        <DashboardStatCard
          to="/participants"
          variant="stats"
          bgColor="bg-indigo-100"
          icon={<Users className="text-indigo-600" />}
          label="Total Participants"
          value="1,247"
        />

        <DashboardStatCard
          to="/revenue"
          variant="stats"
          bgColor="bg-yellow-100"
          icon={<DollarSign className="text-yellow-600" />}
          label="Revenue Today"
          value="SAR45,280"
        />

        <DashboardStatCard
          to="/success"
          variant="stats"
          bgColor="bg-purple-100"
          icon={<PieChart className="text-purple-600" />}
          label="Success Rate"
          value="94.2%"
        />
      </div>
    </>
  );
};

export default AuctionStatic;
