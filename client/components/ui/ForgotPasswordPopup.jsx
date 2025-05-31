'use client';

import { useState } from "react";
import Image from "next/image";
import { callApi } from "../../api/api";

export default function ForgotPasswordPopup({ open, onClose, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await callApi("/api/auth/forgot-password", {
        method: "POST",
        body: { Email: email },
      });
      setSent(true);
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xs p-6 mx-2 bg-white shadow-lg sm:max-w-md rounded-xl sm:p-8">
        <button
          className="absolute text-4xl text-gray-400 hover:cursor-pointer top-3 right-3 hover:text-orange-500"
          onClick={onClose}
          aria-label="Đóng popup"
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} className="mb-2" />
          <span className="text-xl font-bold text-gray-700">Quên mật khẩu</span>
        </div>
        {sent ? (
          <div className="text-center text-green-600">
            Đã gửi email hướng dẫn đặt lại mật khẩu.<br />Vui lòng kiểm tra hộp thư của bạn.
            <button
              className="block w-full py-2 mt-6 font-semibold text-white transition bg-orange-500 rounded hover:cursor-pointer hover:bg-orange-600"
              onClick={onBackToLogin}
            >
              Quay lại đăng nhập
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && (
              <div className="px-2 py-1 text-sm text-red-600 border border-red-200 rounded bg-red-50">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 font-semibold text-white transition bg-orange-500 rounded hover:cursor-pointer hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Gửi email khôi phục"}
            </button>
            <button
              type="button"
              className="w-full py-2 mt-2 text-orange-500 hover:cursor-pointer hover:underline"
              onClick={onBackToLogin}
            >
              Quay lại đăng nhập
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
