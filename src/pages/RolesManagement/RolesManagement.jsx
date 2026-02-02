import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import RolesManage from "../../components/roles/RolesManage";

const RolesManagement = () => {
  return (
    <>
      <PageMeta title="Roles Management" />
      <PageBreadcrumb pageTitle="Roles Management" />
      <RolesManage />
    </>
  );
};

export default RolesManagement;
