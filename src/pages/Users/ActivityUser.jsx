import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ActivityUsersComp from "../../components/UsersManage/ActivityUsersComp";

export default function ActivityUser() {
    return (
        <>
            <PageMeta title="Activity Users" />
            <PageBreadcrumb pageTitle="Activity Users" />
            <div className="space-y-6">
                <ActivityUsersComp />
            </div>
        </>
    );
}
