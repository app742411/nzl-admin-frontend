import React from "react";
import NotificationItems from "../../components/NotificationComp/NotificationItems";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

const Notifications = () => {
  return (
    <>
      <PageMeta title="Notifications" />
      <PageBreadcrumb pageTitle="All Notifications" />
      <NotificationItems />
    </>
  );
};

export default Notifications;
