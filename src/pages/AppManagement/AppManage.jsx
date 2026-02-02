import React from 'react'
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb"; 
import SplashScreenManage from '../../components/AppManageComponents/SplashScreenManage';
import ManagePopup from '../../components/AppManageComponents/ManagePopup';
import CategoryToggleManage from '../../components/AppManageComponents/CategoryToggleManage';
import ThemeColorSettings from '../../components/AppManageComponents/ThemeColorSettings';
import AuctionBannerManager from '../../components/AppManageComponents/Banner/AuctionBannerManager';


const AppManage = () => {
  return (
    <>
    <PageMeta title="App Management" />
    <PageBreadcrumb pageTitle="App Management" />
    
    <div className="p-4 md:p-6 gap-3 mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Banner Management
        </h2>
      <AuctionBannerManager />
    </div>
    <div className="p-4 md:p-6 gap-3 mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <SplashScreenManage />
    </div>
    <div className="p-4 md:p-6 gap-3 mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <ManagePopup/>
    </div>
    <div className="grid grid-cols-10 gap-4">
  <div className="col-span-7">
    <CategoryToggleManage />
  </div>

  <div className="col-span-3">
  <ThemeColorSettings />
  </div>
</div>

    </>
  )
}

export default AppManage;