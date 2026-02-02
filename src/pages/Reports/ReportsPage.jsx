import ReportsHeader from "../../components/Reports/Header/ReportsHeader";
import StatsGrid from "../../components/Reports/Stats/StatsGrid";
import SalesSummary from "../../components/Reports/Sales/SalesSummary";
import AuctionPerformance from "../../components/Reports/Auction/AuctionPerformance";
import RevenueBreakdown from "../../components/Reports/Revenue/RevenueBreakdown";
import UserEngagement from "../../components/Reports/Engagement/UserEngagement";
import TopVendors from "../../components/Reports/Vendors/TopVendors";
import WalletBalances from "../../components/Reports/Wallet/WalletBalances";
import DetailedReportsTable from "../../components/Reports/Table/DetailedReportsTable";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <ReportsHeader />
      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SalesSummary />
        <AuctionPerformance />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueBreakdown />
        <UserEngagement />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopVendors />
        <WalletBalances />
      </div>

      <DetailedReportsTable />
    </div>
  );
}
