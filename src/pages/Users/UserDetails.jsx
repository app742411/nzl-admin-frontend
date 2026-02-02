import { useParams } from "react-router-dom";

import UserInfo from "../../components/UsersManage/UserDetails/UserInfo";
import WalletStatics from "../../components/UsersManage/UserDetails/Wallets&statics";
import UserActivity from "../../components/UsersManage/UserDetails/Useractivity";
import ActionsFlags from "../../components/UsersManage/UserDetails/Actions&flags";

export default function ViewDetails() {
  const { id } = useParams(); //  only take id

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between rounded-xl border bg-white px-6 py-4">
        <h1 className="text-xl font-semibold">User Details</h1>
        <div className="text-sm text-gray-500">
          Home / <span className="text-blue-600">User Details</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-4">
          <UserInfo userId={id} />
        </div>

        {/* RIGHT TOP */}
        <div className="col-span-8">
          <WalletStatics />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT BOTTOM */}
        <div className="col-span-7">
          <UserActivity />
        </div>

        {/* RIGHT BOTTOM */}
        <div className="col-span-5">
          <ActionsFlags />
        </div>
      </div>
    </div>
  );
}
