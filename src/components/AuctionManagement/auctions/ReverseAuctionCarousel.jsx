import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ReverseAuctionCardView from "./ReverseAuctionCardView";

export default function ReverseAuctionCarousel({
  auctions = [],
  baseURL,
  socketStatuses,
  socketPrices,
}) {
  if (!auctions.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reverse Auctions</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={false}
        autoplay={{ delay: 5000 }}
      >
        {auctions.map((auction) => {
          const livePrice = socketPrices?.[auction.id] ?? auction.startPrice;
          const liveStatus = socketStatuses?.[auction.id] ?? auction.status;

          return (
            <SwiperSlide key={auction.id}>
              <ReverseAuctionCardView
                auction={auction}
                baseURL={baseURL}
                socketStatus={liveStatus}
                socketPrice={livePrice}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
