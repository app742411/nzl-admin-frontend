import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ChangePasswordForm from "../../components/auth/PasswordChangeForm";

export default function ChangePassword() {
  return (
    <>
      <PageMeta title="Change Password" />
      <PageBreadcrumb pageTitle="Change Password" />

      <div className="max-w-xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] mt-55px">
        <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Change Admin Password
        </h3>

        <ChangePasswordForm />
      </div>
    </>
  );
}
