import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddNotificationForm from "../../components/NotificationComp/AddNotificationForm";

const AddNotifications = () => {
  return (
    <>
      <PageMeta title="Manage Campaign" />
      <PageBreadcrumb pageTitle="Add Campaign" />
      <AddNotificationForm />
      {/* Add your form or content for adding notifications here */}
    </>
  );
};

export default AddNotifications;
