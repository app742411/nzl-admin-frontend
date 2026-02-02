import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import { verifyOTP, sendForgotPasswordOTP } from "../../api/authApi";
import code from "../../../public/images/image/ic-email-sent.png";
import { useTranslation } from "react-i18next";

export default function OTPVerificationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  //  Handle OTP paste (MAIN FIX)
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedText) return;

    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedText[i] || "";
    }

    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedText.length, 6) - 1;
    if (lastIndex >= 0) {
      inputsRef.current[lastIndex]?.focus();
    }
  };

  const { email, id } = location.state;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputsRef = useRef([]);

  // If user refreshes page, email disappears
  useEffect(() => {
    if (!email) {
      toast.error("Email missing! Please start again.");
      navigate("/forgot-password");
    }
  }, [email]);

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputsRef.current[index + 1].focus();
    if (!value && index > 0) inputsRef.current[index - 1].focus();
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpStr = otp.join("").trim();

    if (otpStr.length !== 6) {
      setErrors(t("otp_error"));
      return;
    }

    if (!id) {
      toast.error("Invalid process. Please restart.");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    setErrors("");

    try {
      const data = await verifyOTP(id, otpStr);

      toast.success(data?.message || t("otp_success"));

      navigate(`/update-password/${data.data}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || t("otp_invalid"));
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setTimer(30);

    try {
      const data = await sendForgotPasswordOTP(email);
      toast.success(data.message || t("otp_resend_success"));
    } catch (err) {
      toast.error(err?.response?.data?.message || t("otp_resend_fail"));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-8 bg-white border border-b-blue-100 rounded-lg dark:bg-gray-900 dark:border-gray-700">
          <div className="mb-5 sm:mb-8 text-center">
            <img src={code} alt="" className="mb-2 mx-auto w-16 h-16" />
            <h1 className="mb-2 text-gray-800 text-[24px] dark:text-white/90 font-bold">
              {t("otp_title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("otp_subtitle")} <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerifyOTP}>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              ))}
            </div>

            {errors && (
              <p className="mb-2 text-sm text-red-600 dark:text-red-400">
                {errors}
              </p>
            )}

            <Button
              className="w-full mb-2"
              type="submit"
              size="sm"
              disabled={loading}
            >
              {loading ? t("otp_verifying") : t("otp_verify")}
            </Button>

            <div className="text-center">
              <div
                className={`mt-3 font-bold text-sm ${
                  timer > 0 || resendLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-brand-700 hover:text-brand-800 cursor-pointer"
                }`}
                onClick={() => {
                  if (timer <= 0 && !resendLoading) handleResendOTP();
                }}
              >
                {resendLoading
                  ? t("otp_resending")
                  : timer > 0
                    ? t("otp_resend_in", { seconds: timer })
                    : t("otp_resend")}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
