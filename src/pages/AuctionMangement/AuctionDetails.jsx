import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AuctionActivityLog from "../../components/AuctionManagement/auctions/AuctionActivityLog";
import ReverseAuctionDetails from "../../components/AuctionManagement/auctions/AuctionDetailsCard";
import { getSocket } from "../../socket";
import { getAuctionById } from "../../api/authApi";
import AuctionProductDetails from "../../components/AuctionManagement/auctions/AuctionProductDetails";
import AuctionUsersList from "../../components/AuctionManagement/auctions/AuctionUsersList";

const normalizeAuction = (data) => {
  return {
    id: data.id,
    auction_name: data.auction_title,
    auction_type: data.auction_type,
    status: data.status,
    min_quantity: data.min_quantity,

    // Dates & time
    start_date: data.start_date,
    start_time: data.start_time,
    end_date: data.end_date,
    end_time: data.end_time,

    // Prices (safe for both types)
    start_price: data.start_price,
    floor_price: data.floor_price,
    buy_together_price: data.buy_together_price,
    current_price: data.start_price, // default for reverse

    // Product info
    product_name: data.product?.product_name || "-",
    category_name: data.product?.category?.name || "-",
    vendor_name: data.product?.vendor?.business_name || "-",

    // Images
    product_images:
      data.product?.images?.length > 0
        ? data.product.images
        : ["placeholder.png"],

    // Users
    users: data.users || [],
  };
};

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [product, setProduct] = useState(null);

  const activityLogs = [
    { action: "Auction Status Updated", performedBy: "Admin", time: "20h ago" },
    { action: "Auction Extended", performedBy: "Manager", time: "1 day ago" },
    { action: "Auction Paused", performedBy: "Admin", time: "3 days ago" },
  ];

  /* FETCH AUCTION */
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await getAuctionById(id);
        const data = res.data || res; // Handle structure variation just in case

        if (!data) return;

        const normalizedAuction = normalizeAuction(data);
        setAuction(normalizedAuction);

        setProduct({
          product_name: data.product?.product_name,
          description: data.product?.description,
          quantity: data.product?.quantity,
          brand: data.product?.brand,
          weight: data.product?.weight,
          weight_unit: data.product?.weight_unit,
          sku: data.product?.sku,
          product_cost: data.product?.product_cost,
          category_name: data.product?.category?.name,
          vendor_name: data.product?.vendor?.business_name,
          colors: data.product?.colors || [],
          sizes: data.product?.sizes || [],
          tags: data.product?.tags || [],
        });
      } catch (err) {
        console.error("Auction fetch failed", err);
      }
    };

    fetchAuction();
  }, [id]);

  /* SOCKET */
  useEffect(() => {
    if (!auction?.id) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("join-auction", auction.id);

    const priceHandler = (d) => {
      if (d?.auctionId === auction.id) {
        setAuction((p) => ({ ...p, current_price: Number(d.price) }));
      }
    };

    const statusHandler = (d) => {
      if (d?.auctionId === auction.id) {
        setAuction((p) => ({ ...p, status: d.status }));
      }
    };

    socket.on("price-update", priceHandler);
    socket.on("auction-status-update", statusHandler);

    return () => {
      socket.off("price-update", priceHandler);
      socket.off("auction-status-update", statusHandler);
    };
  }, [auction?.id]);

  if (!auction) return null;

  return (
    <>
      <PageMeta title="Auction Details" />
      <PageBreadcrumb pageTitle="Auction Details" />

      {/* TOP: REVERSE AUCTION DETAILS CARD */}
      <ReverseAuctionDetails auction={auction} />

      {/* BOTTOM: SIDE-BY-SIDE LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* LEFT: PRODUCT DETAILS */}
        <div className="w-full lg:w-7/12">
          <AuctionProductDetails product={product} />
        </div>

        {/* RIGHT: ACTION USERS LIST */}
        <div className="w-full lg:w-5/12">
          <AuctionUsersList users={auction.users} />
        </div>
      </div>

      {/* ACTIVITY LOG */}
      <div className="mt-8">
        <AuctionActivityLog logs={activityLogs} />
      </div>
    </>
  );
};

export default AuctionDetails;
