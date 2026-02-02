import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserListComp from "../../components/UsersManage/UsersListComp";

export default function UserList() {
  return (
    <>
      <PageMeta title="All Users" description="NZL Admin Dashboard" />
      <PageBreadcrumb pageTitle="menu.all_users" />
      <div className=" gap-4 md:gap-6">
        <UserListComp />
      </div>
    </>
  );
}
