import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BannerAuctionPicker from "./BannerAuctionPicker";
import BannerList from "./BannerList";
import {
  getBannerAuctionList,
  getAllBannerAuctions,
  selectBannerAuctions,
  removeBannerAuction,
} from "../../../api/authApi";

export default function AuctionBannerManager() {
  const [auctions, setAuctions] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH AUCTIONS (PICKER)
  const fetchAuctions = async (search = "") => {
    try {
      setLoading(true);
      const res = await getBannerAuctionList({ search });
      setAuctions(res?.data || []);
    } catch {
      toast.error("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  // FETCH ACTIVE BANNERS
  const fetchBanners = async () => {
    try {
      const res = await getAllBannerAuctions();
      setBanners(res?.data || []);
    } catch {
      toast.error("Failed to load active banners");
    }
  };

  useEffect(() => {
    fetchAuctions();
    fetchBanners();
  }, []);

  // ADD BANNER
  const handleAdd = async (auctionId) => {
    if (banners.length >= 5) {
      return toast.error("Maximum 5 banners allowed");
    }

    if (banners.some((b) => b.auction_id === auctionId)) {
      return toast.error("Auction already added as banner");
    }

    try {
      await selectBannerAuctions([auctionId]);
      toast.success("Banner added successfully");
      fetchBanners();
    } catch {
      toast.error("Failed to add banner");
    }
  };

  // REMOVE BANNER
  const handleRemove = async (bannerId) => {
    try {
      await removeBannerAuction(bannerId);
      toast.success("Banner removed");
      setBanners((prev) => prev.filter((b) => b.id !== bannerId));
    } catch {
      toast.error("Failed to remove banner");
    }
  };

  // SELECTED AUCTION 
  const selectedAuctionIds = banners.map((b) => b.auction_id);

  return (
    <div className="space-y-6">
      <BannerAuctionPicker
        auctions={auctions}
        loading={loading}
        disabled={banners.length >= 5}
        onAdd={handleAdd}
        onSearch={fetchAuctions}
        selectedAuctionIds={selectedAuctionIds}
      />
      <BannerList banners={banners} onRemove={handleRemove} />
    </div>
  );
}
