import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import { sendForgotPasswordOTP } from "../../api/authApi";
import forget from "../../../public/images/image/ic-email-inbox.png";
import { ChevronLeftIcon } from "../../icons";
import { useTranslation } from "react-i18next";

export default function ForgetPasswordForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "" });
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrors({ email: "" });

    if (!email) {
      setErrors({ email: t("forgot_required_email") });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrors({ email: t("forgot_invalid_email") });
      return;
    }

    setLoading(true);

    try {
      const response = await sendForgotPasswordOTP(email);

      toast.success(response.message || t("forgot_success"));

      //   FIX HERE — correct id path
      navigate("/verify-otp", {
        state: {
          email,
          id: response.data,
        },
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || //  API message (user not found)
        err?.message ||
        t("forgot_error"); // fallback

      setErrors({ email: message }); // show below input
      toast.error(message); // show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-8 bg-white border border-b-blue-100 rounded-lg dark:bg-gray-900 dark:border-gray-700">
          <div className="mb-5 sm:mb-8 text-center">
            <img src={forget} alt="" className="mb-2 mx-auto w-16 h-16" />
            <h1 className="mb-2 text-gray-800 text-[24px] dark:text-white/90 font-bold">
              {t("forgot_title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("forgot_subtitle")}
            </p>
          </div>

          <form onSubmit={handleSendOTP} noValidate>
            <div className="space-y-6">
              <div>
                <Label>
                  {t("forgot_email_label")}{" "}
                  <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ email: "" });
                  }}
                  placeholder={t("forgot_email_label")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? t("forgot_sending") : t("forgot_send_otp")}
                </Button>

                <Link
                  to="/"
                  className="text-sm text-brand-500 hover:text-brand-600 font-bold gap-2 mt-5 text-center flex items-center justify-center"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  {t("forgot_back_to_signin")}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
