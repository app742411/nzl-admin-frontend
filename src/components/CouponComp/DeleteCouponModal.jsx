"use client";

import React from "react";
import Button from "../ui/button/Button";
import { X } from "lucide-react";
import Lottie from "lottie-react";
import deleteAnimation from "../../lottie/Delete.json";

const DeleteCouponModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-xl p-10 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Lottie Icon */}
        <Lottie
          animationData={deleteAnimation}
          loop={false}
          className="w-24 mx-auto"
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center pt-4 pb-2">
          Delete This Coupon?
        </h2>

        {/* Message */}
        <p className="text-gray-700 dark:text-gray-300 text-base text-center mb-6">
          Are you sure you want to delete this coupon? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button size="sm" variant="outline" onClick={onClose}>
            No, Cancel
          </Button>

          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;
