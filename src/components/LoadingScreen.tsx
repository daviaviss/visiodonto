"use client";

import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [slideUp, setSlideUp] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSlideUp(true), 1000);
    const t2 = setTimeout(() => setHidden(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        transform: slideUp ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="w-10 h-10 rounded-full border-4 border-[#00798a]/20 border-t-[#00798a] animate-spin" />
    </div>
  );
};
