'use client';
import Image from "next/image";

export default function FloatingContactButtons() {
  // Hàm scroll lên đầu trang
  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed z-50 flex flex-col items-center gap-2 sm:gap-3 right-3 bottom-3 sm:right-8 sm:bottom-8">
      {/* Phone */}
      <a
        href="tel:0987013286"
        className="flex items-center justify-center w-10 h-10 transition-transform bg-orange-500 rounded-full shadow-lg sm:w-12 sm:h-12 hover:scale-110"
        aria-label="Gọi Hotline"
        title="Điện thoại: 0987013286"
      >
        <svg
          width="20"
          height="20"
          className="sm:w-7 sm:h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.518 2.073a2 2 0 01-.45 1.947l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.947-.45l2.073.518A2 2 0 0121 16.72V19a2 2 0 01-2 2h-.01C6.477 21 3 17.523 3 13.01V5z"
          />
        </svg>
      </a>
      {/* Zalo */}
      <a
        href="https://zalo.me/0987013286"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0084FF] rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat Zalo"
        title="Zalo: 0987013286"
      >
        <Image
          src="/logo_zalo.png"
          alt="Zalo"
          width={20}
          height={20}
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      </a>
      {/* Messenger */}
      <a
        href="https://www.facebook.com/hai.bui.7771"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff5af2] via-[#5a8cff] to-[#00eaff] rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat Messenger"
        title="Messenger: Hoàng Hải Forklift XN"
      >
        <svg
          width="20"
          height="20"
          className="sm:w-7 sm:h-7"
          viewBox="0 0 32 32"
          fill="white"
        >
          <path d="M16 3C8.268 3 2 8.647 2 15.5c0 3.7 1.81 6.98 4.77 9.18V29l4.38-2.41c1.36.38 2.8.59 4.35.59 7.732 0 14-5.647 14-12.5S23.732 3 16 3zm1.13 15.41l-3.02-3.23-6.09 3.23 7.13-7.41 3.02 3.23 6.09-3.23-7.13 7.41z"/>
        </svg>
      </a>
      {/* Scroll to top */}
      <button
        type="button"
        onClick={handleScrollTop}
        className="flex items-center justify-center w-10 h-10 transition-transform bg-indigo-500 rounded-full shadow-lg sm:w-12 sm:h-12 hover:scale-110 hover:cursor-pointer"
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
      >
        <svg
          width="20"
          height="20"
          className="sm:w-6 sm:h-6"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 8l6 6H6z" />
        </svg>
      </button>
    </div>
  );
}
