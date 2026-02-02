import React, { useState } from "react";
import Button from "../../components/ui/button/Button";
import { useTranslation } from "react-i18next";
import ComponentCard from "../../components/common/ComponentCard";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import { bulkUpload } from "../../api/authApi";
import toast from "react-hot-toast";

const BulkUploadsForm = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState(null); //  actual file object

  // File selected in Dropzone
  const handleFileSelect = (files) => {
    if (files?.length > 0) {
      setFileData(files[0]); // Save file
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!fileData) {
      toast.error("Please upload a CSV or XLSX file");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("csvFile", fileData); // backend expects this

      const res = await bulkUpload(formData);

      toast.success("Bulk products Uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFileData(null);
  };

  return (
    <div id="addproduct">
      <form
        onSubmit={handleUpload}
        className={`relative w-full rounded-3xl bg-white p-5 dark:bg-gray-900 transition-all ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {t("bulk_uploads.title")}
        </h4>

        <div className="grid grid-cols-1 gap-5 mb-6">
          {/*  Dropzone */}
          <DropzoneComponent type="file" onChange={handleFileSelect} />

          {/*  SHOW FILE PREVIEW + DELETE BUTTON */}
          {fileData && (
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                📄 {fileData.name}
              </span>

              <button
                type="button"
                onClick={removeFile}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </div>
          )}

          {/* Buttons */}
          <div
            className={`flex items-center gap-3 mt-2 ${
              isRTL ? "justify-start" : "justify-end"
            }`}
          >
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={removeFile}
            >
              {t("bulk_uploads.cancel")}
            </Button>

            <Button type="submit" size="sm" disabled={isUploading || !fileData}>
              {isUploading
                ? t("bulk_uploads.uploading")
                : t("bulk_uploads.upload_button")}
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div
          className={`cards flex flex-col sm:flex-row gap-4 ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <ComponentCard
            className="flex flex-col gap-3 hover:border-blue-400 hover:shadow-lg cursor-pointer"
            title={t("bulk_uploads.csv_title")}
            desc={t("bulk_uploads.csv_desc")}
          >
            <img
              src="/images/image/csv.png"
              alt="CSV Icon"
              className="h-8 w-8 object-contain"
            />
          </ComponentCard>

          <ComponentCard
            className="flex flex-col gap-3 hover:border-green-400 hover:shadow-lg cursor-pointer"
            title={t("bulk_uploads.excel_title")}
            desc={t("bulk_uploads.excel_desc")}
          >
            <img
              src="/images/image/xls.png"
              alt="Excel Icon"
              className="h-8 w-8 object-contain"
            />
          </ComponentCard>
        </div>
      </form>
    </div>
  );
};

export default BulkUploadsForm;
