'use client';
import { useState } from "react";
import Image from "next/image";
import { callApi } from "../../api/api";

export default function RegisterPopup({ open, onClose, onBackToLogin, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await callApi("/api/auth/register", {
        method: "POST",
        body: { Email: email, Password: password, FullName: fullName, RoleId: 3 },
      });
      setLoading(false);
      if (onRegisterSuccess) onRegisterSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xs p-6 mx-2 bg-white shadow-lg sm:max-w-md rounded-xl sm:p-8">
        {/* Back to login */}
        <button
          className="absolute text-2xl text-gray-400 hover:cursor-pointer hover:text-orange-500 top-3 left-3"
          onClick={onBackToLogin}
          aria-label="Quay lại đăng nhập"
        >
          ←
        </button>
        {/* Close button */}
        <button
          className="absolute text-4xl text-gray-400 hover:cursor-pointer top-3 right-3 hover:text-orange-500"
          onClick={onClose}
          aria-label="Đóng popup"
        >
          ×
        </button>
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} className="mb-2" />
          <span className="text-xl font-bold text-gray-700">Đăng ký</span>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ và tên"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
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
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
}
