import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useTranslation } from "react-i18next";
import logo from "../../../public/images/logo/nzl-logo.png";
import { loginUser } from "../../api/authApi";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // -----------------------------
  // STATE
  // -----------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // HANDLE LOGIN
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Email required
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    // Email format validation
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Password required
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        newErrors.password =
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginUser(email, password);

      const user = res.user;
      const token = res.token;

      const storage = isChecked ? localStorage : sessionStorage;

      storage.setItem("user", JSON.stringify(user));
      storage.setItem("token", token);
      storage.setItem("userId", user.id);

      dispatch(loginSuccess({ user, token }));
      toast.success("Login Successful!");
      if (token) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      const message =
        err?.response?.data?.message || "Invalid email or password";

      setErrors((prev) => ({ ...prev, server: message }));
      toast.error(message);
    }

    setLoading(false);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-8 bg-white border border-b-blue-100 rounded-lg">
          {/* Logo */}
          <div className="mb-5 sm:mb-8 text-center">
            <img src={logo} alt="NZL Logo" className="mx-auto py-4 w-28" />
            <h1 className="mb-2 font-bold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t("welcome_title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("welcome_subtitle")}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} noValidate>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <Label>
                  {t("email_label")} <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="info@gmail.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label>
                  {t("password_label")}{" "}
                  <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    placeholder={t("password_label")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Server Error */}
              {errors.server && (
                <p className="mt-1 text-sm text-red-500">{errors.server}</p>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />

                  <span className="block font-normal text-gray-700 text-theme-sm">
                    {t("keep_logged_in")}
                  </span>
                </label>

                <Link
                  to="/forget-password"
                  className="text-sm text-error-500 hover:text-brand-600"
                >
                  {t("forgot_password")}
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? t("signing_in") : t("sign_in")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
