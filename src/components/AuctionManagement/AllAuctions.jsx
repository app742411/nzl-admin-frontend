import React, { useEffect, useState } from "react";
import {
  getReverseAuctions,
  getBuyTogetherAuctions,
  deleteAuction,
  rescheduleAuction,
  extendAuction,
} from "../../api/authApi";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../store/loaderSlice";

import ReverseAuctionCard from "./auctions/ReverseAuctionCard";
import BuyTogetherCard from "./auctions/BuyTogetherCard";
import RescheduleModal from "./auctions/RescheduleModal";

import deleteAnimation from "../../lottie/Delete.json";
import auctionAnime from "../../lottie/auction.json";
import Lottie from "lottie-react";
import Button from "../ui/button/Button";
import ExtendModal from "./auctions/ExtendModal";

import { getSocket } from "../../socket";

const PAGE_LIMIT = 5;

const AllAuctions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("reverse");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // pagination state
  const [reversePage, setReversePage] = useState(1);
  const [reverseHasMore, setReverseHasMore] = useState(true);
  const [buyPage, setBuyPage] = useState(1);
  const [buyHasMore, setBuyHasMore] = useState(true);

  // data
  const [reverseAuctions, setReverseAuctions] = useState([]);
  const [buyTogetherAuctions, setBuyTogetherAuctions] = useState([]);

  // socket-driven changes
  const [socketStatuses, setSocketStatuses] = useState({});
  const [socketPrices, setSocketPrices] = useState({});

  // modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [extendModal, setExtendModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const baseURL = import.meta.env.VITE_API_URL;

  // --------------------------------------------
  // Compute HasMore
  // --------------------------------------------
  const computeHasMore = (res, page, limit) => {
    if (typeof res.total === "number" && typeof limit === "number") {
      const maxPages = Math.ceil(res.total / limit);
      return page < maxPages;
    }
    if (typeof res.totalPages === "number") {
      return page < res.totalPages;
    }
    if (res.nextPage !== undefined && res.nextPage !== null) {
      return Boolean(res.nextPage);
    }
    return Array.isArray(res.data) && res.data.length >= limit;
  };

  // --------------------------------------------
  // Load Reverse Auctions with Search + Status
  // --------------------------------------------
  const loadReverseAuctions = async (page = 1) => {
    dispatch(showLoader());
    try {
      const res = await getReverseAuctions(
        page,
        PAGE_LIMIT,
        search,
        statusFilter,
      );

      //const items = res.data || [];
      const items = (res.data || []).map((a) => ({
        ...a,

        current_price: Number(a.start_price), // until bidding starts
        start_at: `${a.start_date} ${a.start_time}`,
        end_at: `${a.end_date} ${a.end_time}`,
      }));

      if (page === 1) {
        setReverseAuctions(items);
      } else {
        setReverseAuctions((prev) => {
          const existing = new Set(prev.map((i) => i.id));
          const newItems = items.filter((i) => !existing.has(i.id));
          return [...prev, ...newItems];
        });
      }

      setReverseHasMore(computeHasMore(res, page, PAGE_LIMIT));
    } catch (err) {
      
      toast.error("Failed to load reverse auctions");
      setReverseHasMore(false);
    }
    finally {
    dispatch(hideLoader());
  }
  };

  // --------------------------------------------
  // Load BuyTogether Auctions with Search + Status
  // --------------------------------------------
  const loadBuyTogetherAuctions = async (page = 1) => {
    dispatch(showLoader());
    try {
      const res = await getBuyTogetherAuctions(
        page,
        PAGE_LIMIT,
        search,
        statusFilter,
      );

      const items = res.data || [];

      if (page === 1) {
        setBuyTogetherAuctions(items);
      } else {
        setBuyTogetherAuctions((prev) => {
          const existing = new Set(prev.map((i) => i.id));
          const newItems = items.filter((i) => !existing.has(i.id));
          return [...prev, ...newItems];
        });
      }

      setBuyHasMore(computeHasMore(res, page, PAGE_LIMIT));
    } catch (err) {
      toast.error("Failed to load buy together auctions");
      setBuyHasMore(false);
    }
    finally {
    dispatch(hideLoader());
  }
  };

  // --------------------------------------------
  // Reload when SEARCH or STATUS changes
  // --------------------------------------------
  useEffect(() => {
    setReversePage(1);
    setBuyPage(1);
    loadReverseAuctions(1);
    loadBuyTogetherAuctions(1);
  }, [search, statusFilter]);

  // --------------------------------------------
  // SOCKET HANDLERS
  // --------------------------------------------
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const statusHandler = (data) => {
      if (!data) return;
      setSocketStatuses((prev) => ({ ...prev, [data.auctionId]: data.status }));
    };

    const priceHandler = (data) => {
      if (!data) return;
      setSocketPrices((prev) => ({
        ...prev,
        [data.auctionId]: Number(data.price),
      }));
    };

    const auctionUpdateHandler = (data) => {
      if (!data) return;
      if ("status" in data) {
        setSocketStatuses((prev) => ({
          ...prev,
          [data.auctionId]: data.status,
        }));
      }
      if ("price" in data) {
        setSocketPrices((prev) => ({
          ...prev,
          [data.auctionId]: Number(data.price),
        }));
      }
    };

    socket.on("auction-status-update", statusHandler);
    socket.on("price-update", priceHandler);
    socket.on("auction-update", auctionUpdateHandler);

    // Join rooms for all loaded auctions
    reverseAuctions.forEach((a) => socket.emit("join-auction", a.id));
    buyTogetherAuctions.forEach((a) => socket.emit("join-auction", a.id));

    return () => {
      socket.off("auction-status-update", statusHandler);
      socket.off("price-update", priceHandler);
      socket.off("auction-update", auctionUpdateHandler);
    };
  }, [reverseAuctions, buyTogetherAuctions]);

  // --------------------------------------------
  // ACTION HANDLERS
  // --------------------------------------------
  const handleViewDetails = (auction) => {
    navigate(`/admin/auctions/${auction.id}`, {
      state: { auctionType: activeTab },
    });
  };

  const handleDeleteClick = (auction) => {
    setSelectedAuction(auction);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    dispatch(showLoader());
    try {
      await deleteAuction(selectedAuction.id);
      toast.success("Auction deleted!");
      setDeleteModal(false);
      setSelectedAuction(null);
      loadReverseAuctions(1);
      loadBuyTogetherAuctions(1);
    } catch {
      toast.error("Delete failed");
    }
    finally {
    dispatch(hideLoader());
  }
  };

  const handleRescheduleClick = (auction) => {
    setSelectedAuction(auction);
    setRescheduleModal(true);
  };

  const handleExtendClick = (auction) => {
    setSelectedAuction(auction);
    setExtendModal(true);
  };

  // --------------------------------------------
  // UI START
  // --------------------------------------------
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("reverse")}
                className={`px-4 py-2 border-b-2 text-[18px] ${
                  activeTab === "reverse"
                    ? "text-blue-600 border-blue-500"
                    : "text-gray-500 border-transparent"
                }`}
              >
                Reverse Auction
              </button>

              <button
                onClick={() => setActiveTab("buyTogether")}
                className={`px-4 py-2 border-b-2 text-[18px] ${
                  activeTab === "buyTogether"
                    ? "text-blue-600 border-blue-500"
                    : "text-gray-500 border-transparent"
                }`}
              >
                Buy Together
              </button>
            </div>

            {/* Search + Status */}
            <div className="flex gap-3 items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search auctions..."
                className="border p-2 text-sm rounded w-64"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border p-2 rounded text-sm"
              >
                <option value="">All Status</option>
                <option value="live">Live</option>
                <option value="upcoming">Upcoming</option>
                <option value="paused">Paused</option>
                <option value="ended">Ended</option>
              </select>
            </div>
          </div>

          {/* LISTS */}
          <div className="space-y-4">
            {/* Reverse */}
            {activeTab === "reverse" && (
              <>
                {reverseAuctions.length > 0 ? (
                  reverseAuctions.map((auction) => (
                    <ReverseAuctionCard
                      key={auction.id}
                      auction={auction}
                      socketStatus={socketStatuses[auction.id]}
                      socketPrice={socketPrices[auction.id]}
                      baseURL={baseURL}
                      onDelete={handleDeleteClick}
                      onReschedule={handleRescheduleClick}
                      onExtend={handleExtendClick}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                    {/* Lottie Animation */}
                    <div className="w-40 md:w-40 mb-6">
                      <Lottie animationData={auctionAnime} loop={true} />
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">
                      No {activeTab === "reverse" ? "Reverse Auctions" : "Buy Together Auctions"} Found
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 max-w-md mb-6 text-sm font-normal">
                      You haven’t created any auctions yet. Start your first
                      auction and engage users with live bidding in real time.
                    </p>

                    {/* CTA Button */}
                    <Button
                      onClick={() => navigate("/create-auction")}
                      variant=""
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                   hover:bg-blue-700 transition-all shadow-md"
                    >
                      Create Auction
                    </Button>
                  </div>
                )}

                {reverseHasMore && reverseAuctions.length > 0 && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={() => {
                        setReversePage((prev) => {
                          const next = prev + 1;
                          loadReverseAuctions(next);
                          return next;
                        });
                      }}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Buy Together */}
            {activeTab === "buyTogether" && (
              <>
                {buyTogetherAuctions.length > 0 ? (
                  buyTogetherAuctions.map((auction) => (
                    <BuyTogetherCard
                      key={auction.id}
                      auction={auction}
                      socketStatus={socketStatuses[auction.id]}
                      socketPrice={socketPrices[auction.id]}
                      baseURL={baseURL}
                      onDelete={handleDeleteClick}
                      onReschedule={handleRescheduleClick}
                      onExtend={handleExtendClick}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                    {/* Lottie Animation */}
                    <div className="w-40 md:w-40 mb-6">
                      <Lottie animationData={auctionAnime} loop={true} />
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">
                      No {activeTab === "reverse" ? "Reverse Auctions" : "Buy Together Auctions"} Found
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 max-w-md mb-6 text-sm font-normal">
                      You haven’t created any auctions yet. Start your first
                      auction and engage users with live bidding in real time.
                    </p>

                    {/* CTA Button */}
                    <Button
                      onClick={() => navigate("/create-auction")}
                      variant=""
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                   hover:bg-blue-700 transition-all shadow-md"
                    >
                      Create Auction
                    </Button>
                  </div>
                )}

                {buyHasMore && buyTogetherAuctions.length > 0 && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={() => {
                        setBuyPage((prev) => {
                          const next = prev + 1;
                          loadBuyTogetherAuctions(next);
                          return next;
                        });
                      }}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <div className="bg-white p-6 rounded-xl text-center max-w-sm">
            <Lottie animationData={deleteAnimation} className="w-24 mx-auto" />
            <h2 className="text-xl font-bold mb-2">Delete Auction?</h2>
            <p className="text-gray-600 mb-4">This action cannot be undone.</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <RescheduleModal
          isOpen={rescheduleModal}
          auction={selectedAuction}
          onClose={() => setRescheduleModal(false)}
          onSave={async (updatedData) => {
          dispatch(showLoader());
            try {
              await rescheduleAuction(selectedAuction.id, updatedData);
              toast.success("Rescheduled successfully");
              setRescheduleModal(false);
              loadReverseAuctions(1);
              loadBuyTogetherAuctions(1);
            } catch {
              toast.error("Failed to reschedule");
            }
            finally {
    dispatch(hideLoader());
  }
          }}
        />
      )}

      {/* Extend Modal */}
      {extendModal && (
        <ExtendModal
          isOpen={extendModal}
          auction={selectedAuction}
          onClose={() => setExtendModal(false)}
          onSave={async (newEnd) => {
            dispatch(showLoader());
            try {
              await extendAuction(selectedAuction.id, newEnd);
              toast.success("Auction extended");
              setExtendModal(false);
              loadReverseAuctions(1);
              loadBuyTogetherAuctions(1);
            } catch {
              toast.error("Extend failed");
            }
            finally {
    dispatch(hideLoader());
  }
          }}
        />
      )}
    </>
  );
};

export default AllAuctions;
