import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserPayment from "../components/UserProfile/UserPayment";
import PageMeta from "../components/common/PageMeta";
import { profileDetails } from "../api/authApi";
import toast from "react-hot-toast";

export default function UserProfiles() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileDetails();
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return null;

  return (
    <>
      <PageMeta
        title="NZL Profile Dashboard"
        description="Manage your profile and account settings on NZL."
      />
      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} setUser={setUser} />
          <UserPayment />
        </div>
      </div>
    </>
  );
}
