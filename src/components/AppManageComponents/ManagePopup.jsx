"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ComponentCard from "../common/ComponentCard";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";

import AddImagePopup from "./AddImagePopup";
import { PencilIcon, TrashBinIcon } from "../../icons";

import { getPopups, changePopupStatus, deletePopup } from "../../api/authApi";

const ManagePopup = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  /* STATE */
  const ITEMS_PER_PAGE = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [popupList, setPopupList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);

  /* FETCH POPUPS */
  const fetchPopups = async () => {
    try {
      setLoading(true);
      const res = await getPopups();

      const BASE_URL = import.meta.env.VITE_API_URL;

      // normalize backend response
      const normalized = (res?.data || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        screen_type: item.screen_type,
        image: item.image,
        isActive: item.status,
      }));

      setPopupList(normalized);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch {
      toast.error("Failed to load popups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  /* TOGGLE STATUS */
  const handleToggleStatus = async (item) => {
    const newStatus = !item.isActive;

    // optimistic UI
    setPopupList((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, isActive: newStatus } : p)),
    );

    try {
      await changePopupStatus(item.id, newStatus);
      toast.success(`Popup ${newStatus ? "activated" : "deactivated"}`);
    } catch {
      // rollback
      setPopupList((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, isActive: item.isActive } : p,
        ),
      );
      toast.error("Failed to update popup status");
    }
  };

  /* DELETE POPUP */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this popup?")) return;

    try {
      await deletePopup(id);
      setPopupList((prev) => prev.filter((p) => p.id !== id));
      toast.success("Popup deleted");
    } catch {
      toast.error("Failed to delete popup");
    }
  };

  /* ADD / EDIT */
  const handleAdd = () => {
    setEditItem(null);
    openModal();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    openModal();
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Popup Management
        </h2>

        <Button onClick={handleAdd} size="sm">
          + Add Popup Image
        </Button>
      </div>

      {/* LIST */}
      <ComponentCard>
        {loading && <p className="text-sm text-gray-500">Loading popups...</p>}

        {!loading && popupList.length === 0 && (
          <p className="text-sm text-gray-500">No popup images added yet.</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popupList.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-full object-cover"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.title}
                </p>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.screen_type === "group_deal"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.screen_type === "group_deal" ? "Group Deal" : "Home"}
                </span>
              </div>

              {/* DESCRIPTION */}
              {item.description && (
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* STATUS */}
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${
                    item.isActive ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>

                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    item.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      item.isActive ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* ACTIONS */}
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashBinIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < popupList.length && (
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

      {/* MODAL (ADD / EDIT) */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          setEditItem(null);
        }}
        className="max-w-lg"
      >
        <AddImagePopup
          onClose={() => {
            closeModal();
            setEditItem(null);
          }}
          editData={editItem}
          onSave={fetchPopups} //  refresh list after add/edit
        />
      </Modal>
    </>
  );
};

export default ManagePopup;
