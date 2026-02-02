import { useEffect, useState, useMemo } from "react";

export default function useAuctionStatus(auction, socketStatus, socketPrice) {
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState("");
  const [price, setPrice] = useState(
    Number(auction?.start_price || auction?.buy_together_price || 0)
  );

  /* ============================
     PARSE UTC TIMES (ONCE)
     ============================ */

  const startTime = useMemo(() => {
    if (!auction?.start_datetime) return null;
    return new Date(auction.start_datetime).getTime();
  }, [auction?.start_datetime]);

  const endTime = useMemo(() => {
    if (!auction?.end_datetime) return null;
    return new Date(auction.end_datetime).getTime();
  }, [auction?.end_datetime]);


  /* ============================
     FORMAT COUNTDOWN
     ============================ */

  const format = (ms) => {
    if (ms <= 0) return "0s";

    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    return `${h}h ${m}m ${s}s`;
  };

  /* ============================
     SOCKET PRICE UPDATE
     ============================ */

  useEffect(() => {
    if (socketPrice !== undefined && socketPrice !== null) {
      setPrice(Number(socketPrice));
    }
  }, [socketPrice]);

  /* ============================
     STATUS & TIMER LOGIC
     ============================ */

  useEffect(() => {
    const apply = () => {
      const now = Date.now();

      // 🔌 Socket status overrides everything
      if (socketStatus) {
        setStatus(socketStatus);

        if (socketStatus === "paused") {
          setCountdown("Paused");
          return;
        }

        if (socketStatus === "ended") {
          setCountdown("0s");
          return;
        }
      }

      if (!startTime || !endTime) {
        setStatus("upcoming");
        setCountdown("");
        return;
      }

      if (now < startTime) {
        setStatus("upcoming");
        setCountdown(format(startTime - now));
        return;
      }

      if (now >= startTime && now < endTime) {
        setStatus("live");
        setCountdown(format(endTime - now));
        return;
      }

      setStatus("ended");
      setCountdown("0s");
    };

    apply();
    const interval = setInterval(apply, 1000);
    return () => clearInterval(interval);
  }, [socketStatus, startTime, endTime]);

  return { status, countdown, price };
}
