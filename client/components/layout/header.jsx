'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginPopup from '../ui/LoginPopup';
import ChangePasswordPopup from '../ui/ChangePasswordPopup';
import { callApi } from "../../api/api";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false); // State cho popup đổi mật khẩu
  const userMenuRef = useRef();

  // Lấy user info từ accessToken (ưu tiên accessToken, fallback localStorage)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/user/me`);
        const data = await res.json();
        if (!data || !data.FullName) {
          setUser(null);
          localStorage.removeItem("accessToken");
        } else {
          setUser(data);
        }
      } catch (err) {
        setUser(null);
        localStorage.removeItem("accessToken");
      }
    };
    fetchUser();
  }, []);

  // Đóng user menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await callApi('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error("Đăng xuất thất bại: ", error);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <header className="relative z-50 w-full bg-white shadow-md px-4 sm:px-10 lg:px-[180px]">
      {/* Top Bar */}
      <div className="items-center justify-between hidden py-2 text-sm text-gray-600 sm:flex bg-gray-50">
        <span className="flex items-center space-x-1 animate-blink">
          <span className="font-semibold text-black">Hotline:</span>
          <a className="ml-1 font-semibold text-orange-500"
            href="tel:0987013286"
            aria-label="Gọi Hotline"
            title="Điện thoại: 0987013286"
          >
            0987 013 286
          </a>
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
        <a className="text-xs font-semibold text-orange-500 animate-blink"
          href="tel:0987013286"
          aria-label="Gọi Hotline"
          title="Điện thoại: 0987013286"
        >
          <span className="text-black">Hotline:</span> 0987 013 286
        </a>
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
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <div
                className="flex items-center px-4 py-2 text-sm font-medium hover:cursor-pointer"
                onClick={() => setShowUserMenu((v) => !v)}
              >
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  width={28}
                  height={28}
                  className="mr-2 rounded-full"
                />
                <span>{user.FullName}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showUserMenu && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded shadow">
                  <button
                    className="block w-full px-4 py-2 text-sm text-left hover:cursor-pointer hover:text-orange-500 hover:bg-gray-100"
                    onClick={() => setShowChangePassword(true)} // Mở popup đổi mật khẩu
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-left hover:cursor-pointer hover:text-orange-500 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-4 py-2 text-sm text-orange-500 border border-orange-500 rounded hover:cursor-pointer hover:bg-orange-50"
              onClick={() => setShowLogin(true)}
            >
              Đăng nhập
            </button>
          )}
        </div>
        <LoginPopup
          open={showLogin}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
          }}
        />
        <ChangePasswordPopup
          open={showChangePassword}
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setUser(null);
            setShowUserMenu(false);
            setShowChangePassword(false);
            // Đã điều hướng về trang đăng nhập ở trong popup
          }}
        />
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
            <div className="absolute right-0 z-50 flex items-center w-64 mt-2 top-full">
              <form className="relative flex flex-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="flex-1 px-3 py-2 pr-10 text-sm border border-gray-300 rounded shadow"
                />
                {/* Nút submit tìm kiếm */}
                <button
                  type="submit"
                  className="absolute text-lg text-gray-500 -translate-y-1/2 hover:cursor-pointer right-2 top-1/2 hover:text-orange-500"
                  aria-label="Tìm kiếm"
                >
                  <FaSearch />
                </button>
              </form>
              {/* Nút đóng nằm ngoài cùng bên phải */}
              <button
                type="button"
                className="ml-2 text-2xl text-gray-500 hover:cursor-pointer hover:text-red-500"
                aria-label="Đóng tìm kiếm"
                onClick={() => setShowMobileSearch(false)}
              >
                ×
              </button>
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
            <a href="/" className="block py-2 mt-4 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Trang chủ</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Giới thiệu</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Sản phẩm</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Phụ tùng</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Dịch vụ</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Tin tức</a>
            <a href="#" className="block py-2 text-base hover:text-orange-500" onClick={() => setMenuOpen(false)}>Liên hệ</a>
            {/* Đặt LoginPopup ở đây để không bị che */}
            <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={(user) => { setUser(user); setShowLogin(false); }} />

            {/* User info dưới cùng */}
            <div className="">
              {user ? (
                <div className='absolute bottom-0 left-0 w-full'>
                  <div className="relative w-full">
                    <button
                      className="flex items-center w-full px-4 py-2 space-x-2 rounded-t hover:cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => setShowMobileUserMenu((v) => !v)}
                    >
                      <Image
                        src="/avatar.jpg"
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span>{user.FullName}</span>
                      <svg className="w-5 h-5 ml-auto text-gray-300 hover:text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
                      </svg>
                    </button>
                    {showMobileUserMenu && (
                      <div className="absolute left-1/2 bottom-12 z-50 w-[90%] -translate-x-1/2 bg-white border border-gray-200 rounded shadow">
                        <button
                          className="block w-full px-4 py-2 text-sm text-left hover:text-orange-500 hover:cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setShowMobileUserMenu(false);
                            setMenuOpen(false);           // Ẩn menu mobile
                            setShowChangePassword(true);  // Mở popup đổi mật khẩu
                          }}
                        >
                          Đổi mật khẩu
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-sm text-left hover:text-orange-500 hover:cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setShowMobileUserMenu(false);
                            setMenuOpen(false);
                            handleLogout();
                          }}
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </div>   
              ) : (
                <button className="w-full px-4 py-2 mt-4 text-sm text-orange-500 border border-orange-500 rounded hover:cursor-pointer hover:bg-orange-50"
                  onClick={() => {
                      setMenuOpen(false);
                      setShowLogin(true);
                    }}
                  >
                    Đăng nhập
                </button>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
