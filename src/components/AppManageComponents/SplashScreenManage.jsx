"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ComponentCard from "../common/ComponentCard";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";

import AddSplashScreen from "./AddSplashScreen";
import { PencilIcon, TrashBinIcon } from "../../icons";

import {
  getSplashScreens,
  changeSplashStatus,
  deleteSplash,
} from "../../api/authApi";

const SplashScreenManage = () => {
  /* ADD SPLASH MODAL */
  const {
    isOpen: isAddOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal(false);

  /* STATE */
  const ITEMS_PER_PAGE = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [splashScreens, setSplashScreens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [editSplash, setEditSplash] = useState(null);
  /* FETCH SPLASH SCREENS */
  const fetchSplashScreens = async () => {
    try {
      setLoading(true);
      const res = await getSplashScreens();

      const BASE_URL = import.meta.env.VITE_API_URL;

      //   NORMALIZE API RESPONSE
      const normalized = (res?.data || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        splash_video: item.video,
        thumbnail: item.thumbnail_img,
        is_active: item.status,
      }));

      setSplashScreens(normalized);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (err) {
      toast.error("Failed to load splash screens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSplashScreens();
  }, []);

  /* TOGGLE STATUS */
  const handleToggleStatus = async (item) => {
    const newStatus = !item.is_active;

    // Optimistic UI
    setSplashScreens((prev) =>
      prev.map((s) =>
        s.id === item.id ? { ...s, is_active: newStatus } : s
      )
    );

    try {
      await changeSplashStatus(item.id, newStatus);
      toast.success(`Splash ${newStatus ? "activated" : "deactivated"}`);
    } catch (err) {
      // Rollback
      setSplashScreens((prev) =>
        prev.map((s) =>
          s.id === item.id ? { ...s, is_active: item.is_active } : s
        )
      );
      toast.error("Failed to update status");
    }
  };


  /* DELETE SPLASH */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this splash screen?"
    );
    if (!confirmDelete) return;

    try {
      await deleteSplash(id);
      setSplashScreens((prev) => prev.filter((item) => item.id !== id));
      toast.success("Splash screen deleted");
    } catch (err) {
      toast.error("Failed to delete splash screen");
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          How it's Works
        </h2>

        <Button onClick={openAddModal} size="sm">
          + Add Splash Screen
        </Button>
      </div>

      {/* CONTENT */}
      <ComponentCard>
        {loading && (
          <p className="text-sm text-gray-500">Loading splash screens...</p>
        )}

        {!loading && splashScreens.length === 0 && (
          <p className="text-sm text-gray-500">No splash screens found</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {splashScreens.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {/* VIDEO PREVIEW */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black">
                {playingId === item.id ? (
                  <video
                    src={item.splash_video}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                    {/* PLAY BUTTON */}
                    <button
                      onClick={() => setPlayingId(item.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                        ▶
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* STATUS + TOGGLE */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${item.is_active ? "text-green-600" : "text-gray-400"
                      }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${item.is_active ? "bg-green-500" : "bg-gray-300"
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.is_active ? "translate-x-4" : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setEditSplash(item);
                      openAddModal();
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <TrashBinIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < splashScreens.length && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            >
              Load More
            </Button>
          </div>
        )}
      </ComponentCard>

      {/* ADD SPLASH MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      )}
      <Modal
        isOpen={isAddOpen}
        onClose={() => {
          closeAddModal();
          fetchSplashScreens();
        }}
        className="relative z-50 max-w-3xl"
      >
        <AddSplashScreen
          editData={editSplash}
          onSuccess={() => {
            closeAddModal();
            setEditSplash(null);
            fetchSplashScreens();
          }}
        />
      </Modal>
    </>
  );
};

export default SplashScreenManage;
