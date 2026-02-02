import React from "react";
import blockimg from "../../public/images/image/block.webp";
import { useNavigate, Link } from "react-router-dom";

export default function NoAccess() {
  const navigate = useNavigate();

  return (
    <div className="p-10 text-center">
      <img
        src={blockimg}
        alt="Access Blocked"
        width={400}
        className="mx-auto mix-blend-multiply mb-12"
      />

      <h1 className="text-2xl font-semibold text-red-600">Access Denied</h1>

      <p className="text-gray-600 mt-2">
        You do not have permission to view this page.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
