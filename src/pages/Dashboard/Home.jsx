import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import QuickAction from "../../components/common/QuickAction";

export default function Home() {
  return (
    <>
      <PageMeta title="NZL Dashboard" description="NZL Dashboard" />
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <h1 className="font-extrabold text-2xl pt-4 pb-2 w-full">
            Welcome Back, Admin
          </h1>
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-7">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12">

          <StatisticsChart />
        </div>
        <div className="col-span-12">
          <QuickAction />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
