import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AddRoleUser from "../../components/roles/AddRoleUser";

const AddUserRoles = () => {
  return (
    <>
      <PageMeta title="Add User For Roles" />
      <PageBreadcrumb pageTitle="Add User For Roles" />
      <AddRoleUser />
    </>
  );
};

export default AddUserRoles;
