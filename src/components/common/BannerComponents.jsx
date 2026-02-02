import PropTypes from "prop-types";
import Button from "../ui/button/Button";
import { FileIcon } from "../../icons";

const BannerComponent = ({
  title,
  children,
  className = "",
  desc = "",
  button_title = "",
  button_title2 = "",
}) => {
  const handleScroll = () => {
    const element = document.getElementById("addproduct");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className={`rounded-2xl border border-gray-200 banner dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-0 py-5">
        <h3 className="text-3xl font-bold text-white dark:text-white/90 mb-3">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-normal text-white dark:text-gray-400 mb-8 max-w-full lg:max-w-[50%] ">
            {desc}
          </p>
        )}
        <div className="flex gap-5">
          <Button onClick={handleScroll}>
            <FileIcon className="text-2xl" />
            {button_title}
          </Button>
          <Button variant="outline">{button_title2}?</Button>
        </div>
      </div>

      {/* Card Body */}
    </div>
  );
};

export default BannerComponent;
