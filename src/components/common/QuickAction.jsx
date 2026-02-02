import React from "react";
import ComponentCard from "./ComponentCard";
import DashboardStatCard from "./DashboardStatCard";
import {
  Plus,
  PackagePlus,
  Gavel,
  SendHorizonal,
  ClipboardList,
  CreditCard,
  FileBarChart,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const QuickAction = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <ComponentCard>
      <h3
        className={`font-bold text-xl py-3 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}
      >
        {t("quick_actions.title")}
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 md:gap-3">
        <DashboardStatCard
          to="/add-vendor"
          variant="mini"
          bgColor="bg-blue-100"
          icon={<Plus className="text-blue-600" />}
          value={t("quick_actions.add_vendor")}
          label={t("quick_actions.add_vendor_desc")}
        />

        <DashboardStatCard
          to="/add-product"
          variant="mini"
          bgColor="bg-green-100"
          icon={<PackagePlus className="text-green-600" />}
          value={t("quick_actions.add_product")}
          label={t("quick_actions.add_product_desc")}
        />

        <DashboardStatCard
          to="/create-auction"
          variant="mini"
          bgColor="bg-purple-100"
          icon={<Gavel className="text-purple-600" />}
          value={t("quick_actions.create_auction")}
          label={t("quick_actions.create_auction_desc")}
        />

        <DashboardStatCard
          to="/add-campaign"
          variant="mini"
          bgColor="bg-orange-100"
          icon={<SendHorizonal className="text-orange-600" />}
          value={t("quick_actions.send_notification")}
          label={t("quick_actions.send_notification_desc")}
        />

        <DashboardStatCard
          to="/orders"
          variant="mini"
          bgColor="bg-yellow-100"
          icon={<ClipboardList className="text-yellow-600" />}
          value={t("quick_actions.view_pending_orders")}
          label={t("quick_actions.view_pending_orders_desc")}
        />

        <DashboardStatCard
          to="/payment/capture"
          variant="mini"
          bgColor="bg-red-100"
          icon={<CreditCard className="text-red-600" />}
          value={t("quick_actions.reserve_capture_center")}
          label={t("quick_actions.reserve_capture_center_desc")}
        />

        <DashboardStatCard
          to="/reports/daily"
          variant="mini"
          bgColor="bg-indigo-100"
          icon={<FileBarChart className="text-indigo-600" />}
          value={t("quick_actions.export_daily_report")}
          label={t("quick_actions.export_daily_report_desc")}
        />
      </div>
    </ComponentCard>
  );
};

export default QuickAction;
