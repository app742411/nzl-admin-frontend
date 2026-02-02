import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import { useTranslation } from "react-i18next";

const PageBreadcrumb = ({ pageTitle }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const back = () => navigate(-1);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]
      ${isRTL ? "flex-row-reverse text-right" : ""}`}
    >
      <h2
        className={`text-xl font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2 cursor-pointer
        ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Back Icon */}
        <ChevronLeftIcon
          onClick={back}
          className={`cursor-pointer ${isRTL ? "rotate-180" : ""}`}
        />
        {t(pageTitle) || pageTitle}
      </h2>

      {/* Breadcrumb Navigation */}
      <nav>
        <ol
          className={`flex items-center gap-1.5 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Home Link */}
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              to="/dashboard"
            >
              {t("breadcrumb.home")}
              <svg
                className={`stroke-current ${isRTL ? "rotate-180" : ""}`}
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>

          {/* Current Page */}
          <li className="text-sm text-gray-800 dark:text-white/90">
            {t(pageTitle) || pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
