'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="relative z-50 w-full bg-white shadow-md px-4 sm:px-10 lg:px-[180px]">
      {/* Top Bar */}
      <div className="items-center justify-between hidden py-2 text-sm text-gray-600 sm:flex bg-gray-50">
        <span className="flex items-center space-x-1">
          <span className="font-semibold text-black">Hotline:</span>
          <span className="ml-1 font-semibold text-orange-500">0987 013 286</span>
        </span>
        <span className="hidden text-sm text-purple-500 sm:inline">
          GIA BẢO FORKLIFT - Chuyên cung cấp xe nâng hàng chất lượng cao!
        </span>
        <form className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="px-3 py-1 pr-10 text-sm border border-gray-300 rounded"
          />
          <button type="submit" className="absolute inset-y-0 right-0 px-2 text-gray-500 hover:cursor-pointer hover:text-gray-700">
            🔍
          </button>
        </form>
      </div>

      {/* Mobile-only Hotline (top, right) */}
      <div className="flex items-center justify-end w-full pt-2 pb-1 sm:hidden">
        <span className="text-xs font-semibold text-orange-500">
          <span className="text-black">Hotline:</span> 0987 013 286
        </span>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between py-3 sm:py-4">
        {/* Logo */}
        <Link className="flex items-center space-x-2" href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-lg font-bold">GIA BẢO FORKLIFT</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden space-x-6 text-sm font-medium sm:flex">
          <a href="/" className="hover:text-orange-500">Trang chủ</a>
          <a href="#" className="hover:text-orange-500">Giới thiệu</a>
          <a href="#" className="hover:text-orange-500">Sản phẩm</a>
          <a href="#" className="hover:text-orange-500">Phụ tùng</a>
          <a href="#" className="hover:text-orange-500">Dịch vụ</a>
          <a href="#" className="hover:text-orange-500">Tin tức</a>
          <a href="#" className="hover:text-orange-500">Liên hệ</a>
        </nav>

        {/* Desktop Register Button */}
        <div className="hidden sm:block">
          <button className="px-4 py-2 text-sm text-orange-500 border border-orange-500 rounded hover:cursor-pointer hover:bg-orange-50">
            Đăng nhập
          </button>
        </div>

        {/* Mobile Search & Menu Toggle */}
        <div className="relative flex items-center space-x-2 sm:hidden">
          {/* Search Icon */}
          <button
            className="text-xl text-gray-600 hover:cursor-pointer hover:text-orange-500"
            aria-label="Tìm kiếm"
            onClick={() => setShowMobileSearch((v) => !v)}
            id="mobile-search-btn"
          >
            🔍
          </button>
          {/* Mobile Menu Toggle */}
          <button
            className="text-2xl text-gray-600 hover:cursor-pointer hover:text-orange-500"
            onClick={() => setMenuOpen(true)}
            aria-label="Mở menu"
          >
            ☰
          </button>
          {/* Mobile Search Input (absolute, below icon) */}
          {showMobileSearch && (
            <div className="absolute right-0 z-50 w-64 mt-2 top-full">
              <form className="relative flex">
                <input
                  autoFocus
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="flex-1 px-3 py-2 pr-8 text-sm border border-gray-300 rounded shadow"
                />
                <button
                  type="button"
                  className="absolute text-lg text-gray-500 -translate-y-1/2 hover:cursor-pointer right-2 top-1/2 hover:text-red-500"
                  aria-label="Đóng tìm kiếm"
                  onClick={() => setShowMobileSearch(false)}
                >
                  ×
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
      {menuOpen && (
        <>
          {/* Overlay: chỉ phủ nửa phải màn hình */}
          <div
            className="fixed inset-y-0 right-0 z-40 transition-all left-1/2"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar Menu chiếm nửa trái */}
          <nav
            className={`fixed top-0 left-0 z-50 w-1/2 h-full px-4 pt-6 pb-10 bg-white shadow-lg transform transition-transform duration-300 ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Close Button */}
            <button
              className="absolute text-gray-600 top-4 right-4 hover:cursor-pointer hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
              aria-label="Đóng menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Items */}
            <a href="/" className="block py-2 mt-4 text-base hover:text-orange-500">Trang chủ</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Giới thiệu</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Sản phẩm</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Phụ tùng</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Dịch vụ</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Tin tức</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500">Liên hệ</a>
            <button className="w-full px-4 py-2 mt-4 text-sm text-orange-500 border border-orange-500 rounded hover:cursor-pointer hover:bg-orange-50">
              Đăng nhập
            </button>
          </nav>
        </>
      )}
    </header>
  );
}
