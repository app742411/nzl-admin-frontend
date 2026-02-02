import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

export default function ForgetPassword() {
  return (
    <>
      <PageMeta title="Forget Password | NZL " />
      <AuthLayout>
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <ForgetPasswordForm />
      </AuthLayout>
    </>
  );
}
