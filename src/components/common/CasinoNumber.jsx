import { useEffect, useState } from "react";

export default function PriceDrop({ value, duration = 800 }) {
  // Split integer & decimal
  const getParts = (num) => {
    const [int, dec] = num.toFixed(2).split(".");
    return { int: Number(int), dec };
  };

  const { int: initialInt, dec: initialDec } = getParts(value);
  const [displayInt, setDisplayInt] = useState(initialInt);
  const [displayDec, setDisplayDec] = useState(initialDec);

  useEffect(() => {
    const { int: startInt } = getParts(displayInt);
    const { int: endInt, dec: newDec } = getParts(value);

    setDisplayDec(newDec); // decimals update instantly / stable

    const diff = endInt - startInt;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth cubic easing
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const current = startInt + diff * eased;

      setDisplayInt(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className="text-xl font-bold text-brand-500">
      {displayInt}.{displayDec}
    </span>
  );
}
