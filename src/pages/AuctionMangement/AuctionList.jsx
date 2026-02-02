import React from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AllAuctions from "../../components/AuctionManagement/AllAuctions";
import AuctionPerformance from "../../components/AuctionManagement/AuctionPerformance";
import ReverseAuctionCarousel from "../../components/AuctionManagement/auctions/ReverseAuctionCarousel";
import { getReverseAuctions } from "../../api/authApi";
import { getSocket } from "../../socket";
import { useEffect, useState } from "react";
import AuctionStatic from "../../components/AuctionManagement/AuctionStatics";
import AntiSnipingForm from "../../components/AuctionManagement/auctions/AntiSinipping";
import AuctionLog from "../../components/AuctionManagement/auctions/AuctionLog";

const baseURL = import.meta.env.VITE_API_URL;
const ShimmerCard = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/2" />
    <div className="h-32 bg-gray-200 rounded" />
    <div className="h-32 bg-gray-200 rounded" />
  </div>
);

const AuctionList = () => {
  const [reverseAuctions, setReverseAuctions] = useState([]);
  const [socketStatuses, setSocketStatuses] = useState({});
  const [socketPrices, setSocketPrices] = useState({});
  const [loading, setLoading] = useState(true);

  // LOAD AUCTIONS
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await getReverseAuctions();
        setReverseAuctions(res.data || []);
      } catch (err) {
        console.error("Failed to load auctions", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (reverseAuctions.length === 0) return;

    console.log("📡 Joining reverse auction rooms from AuctionList...");

    reverseAuctions.forEach((auction) => {
      console.log("➡️ Joining room:", auction.id);
      socket.emit("join-auction", auction.id);
    });
  }, [reverseAuctions]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // STATUS UPDATE
    socket.on("auction-status-update", (data) => {
      console.log(" STATUS UPDATE RECEIVED:", data);

      setSocketStatuses((prev) => ({
        ...prev,
        [data.auctionId]: data.status,
      }));
    });

    // PRICE UPDATE (THIS WAS MISSING)
    socket.on("price-update", (data) => {
      console.log(" PRICE UPDATE RECEIVED:", data);

      setSocketPrices((prev) => ({
        ...prev,
        [data.auctionId]: Number(data.price),
      }));
    });

    // AUCTION UPDATE (pause/resume etc.)
    socket.on("auction-update", (data) => {
      console.log(" AUCTION UPDATE RECEIVED:", data);

      if (data.status) {
        setSocketStatuses((prev) => ({
          ...prev,
          [data.auctionId]: data.status,
        }));
      }

      if (data.price !== undefined) {
        setSocketPrices((prev) => ({
          ...prev,
          [data.auctionId]: Number(data.price),
        }));
      }
    });

    return () => {
      socket.off("auction-status-update");
      socket.off("price-update");
      socket.off("auction-update");
    };
  }, []);

  return (
    <>
      <PageMeta title="Auction Status Monitor" />
      <PageBreadcrumb pageTitle="Auction Status Monitor" />
      <AuctionStatic />
      <div className=" flex flex-col lg:flex-row w-full gap-8 items-start">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 w-full lg:w-8/12">
          <h1 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
            Active Auctions
            <AllAuctions />
          </h1>
        </div>

        <div className="lg:w-4/12 flex flex-col gap-6 w-full">
          <AntiSnipingForm/>


          <div className="rounded-2xl border border-gray-200 bg-brand-1000 p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <AuctionPerformance />
          </div>
          <AuctionLog/>
        </div>
      </div>
    </>
  );
};

export default AuctionList;
