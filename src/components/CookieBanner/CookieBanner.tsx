"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] md:w-150 bg-blue-950/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 z-50">
      <p className="text-blue-100 text-sm mb-4">
        {`We use cookies to enhance your experience, analyze traffic, and improve our services. By clicking "Accept", you consent to our use of cookies.`}
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleReject}
          className="px-4 py-2 text-sm rounded-lg border border-white/30 text-blue-200 hover:bg-white/10 transition"
        >
          Reject
        </button>

        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}