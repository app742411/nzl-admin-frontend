import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/button/Button";
import BannerComponent from "../common/BannerComponents";
import BulkUploadsForm from "../../pages/Products/BulkUploadsForm";
import { FileIcon } from "../../icons";

const BulkUploadsComp = () => {
  const { t } = useTranslation();

  return (
    <>
      {/*  Banner Section */}
      <BannerComponent
        title={t("bulk_upload_banner.title")}
        desc={t("bulk_upload_banner.desc")}
        button_title={t("bulk_upload_banner.button_start")}
        button_title2={t("bulk_upload_banner.button_how")}
      />

      {/*  Upload Section */}
      <div className="flex w-full gap-4 my-8">
        {/* Left Side - Upload Form */}
        <div className="w-2/3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            <BulkUploadsForm />
          </div>
        </div>

        {/* Right Side - Optional Info / Tips */}
        <div className="w-1/3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] mb-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {t("download_templates.title")}
            </h4>

            <div className="buttonbox flex flex-col w-full gap-3 mb-4">
              <a
                href="/templates/sample_products_template.csv"
                download="sample_products_template.csv"
              >
                <Button className="w-full flex items-center gap-2">
                  <FileIcon className="text-2xl" />
                  {t("download_templates.csv_button")}
                </Button>
              </a>

              <a
                href="/templates/sample_products_template.xlsx"
                download="sample_products_template.xlsx"
              >
                <Button
                  variant="success"
                  className="w-full flex items-center gap-2"
                >
                  <FileIcon className="text-2xl" />
                  {t("download_templates.excel_button")}
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("download_templates.description")}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {t("bulk_upload_tips.title")}
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc p-5 space-y-2">
              <li>{t("bulk_upload_tips.point1")}</li>
              <li>{t("bulk_upload_tips.point2")}</li>
              <li>{t("bulk_upload_tips.point3")}</li>
              <li>{t("bulk_upload_tips.point4")}</li>
              <li>{t("bulk_upload_tips.point5")}</li>
              <li>{t("bulk_upload_tips.point6")}</li>
              <li>{t("bulk_upload_tips.point7")}</li>
              <li>{t("bulk_upload_tips.point8")}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUploadsComp;
