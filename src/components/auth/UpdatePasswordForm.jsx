import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✔ FIXED
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/authApi";
import { EyeIcon, EyeCloseIcon } from "../../icons";
import lock from "../../../public/images/image/ic-password.png";
import { useTranslation } from "react-i18next";

export default function UpdatePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      tempErrors.password = t("update_password_required");
    } else if (!passwordRegex.test(password)) {
      tempErrors.password = t("update_password_rules");
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = t("update_confirm_password_required");
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = t("update_password_mismatch");
    }

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    setLoading(true);
    try {
      const data = await resetPassword(token, password, confirmPassword);

      toast.success(data.message || t("update_password_success"));
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || t("update_password_fail"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-8 bg-white border border-b-blue-100 rounded-lg dark:bg-gray-900 dark:border-gray-700">
          <div className="mb-5 sm:mb-8 text-center">
            <img src={lock} alt="" className="mb-2 mx-auto w-16 h-16" />
            <h1 className="mb-2 text-gray-800 text-[24px] dark:text-white/90 font-bold">
              {t("update_password_title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("update_password_subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Password */}
              <div>
                <Label>
                  {t("update_password_label")}{" "}
                  <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    placeholder={t("update_password_label")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label>
                  {t("update_confirm_password_label")}{" "}
                  <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }}
                    placeholder={t("update_confirm_password_label")}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full"
                size="sm"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? t("update_password_updating")
                  : t("update_password_button")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
