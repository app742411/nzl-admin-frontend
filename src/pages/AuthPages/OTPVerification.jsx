import OTPVerificationForm from "../../components/auth/OTPVerifactionForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

export default function OTPVerification() {
  return (
    <>
      <PageMeta title=" OTP Verification |NZL SignIn Dashboard " />
      <AuthLayout>
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        <OTPVerificationForm />
      </AuthLayout>
    </>
  );
}
