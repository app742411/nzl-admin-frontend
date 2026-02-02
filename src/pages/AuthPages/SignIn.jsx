import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// export default function SignIn() {
//   return (
//     <>
//       <PageMeta
//         title="NZL SignIn Dashboard"

//       />
//       <AuthLayout>
//         <div className="absolute top-4 right-4 z-10">
//         <LanguageSwitcher />
//       </div>
//         <SignInForm />
//       </AuthLayout>
//     </>
//   );
// }

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <PageMeta title="NZL SignIn Dashboard" />
      <AuthLayout>
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
