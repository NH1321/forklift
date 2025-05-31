'use client';
import { useState } from "react";
import Image from "next/image";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { callApi } from "../../api/api";
import { useRouter } from "next/navigation";

export default function ChangePasswordPopup({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Đổi mật khẩu cần xác thực => dùng fetchWithAuth
      const res = await fetchWithAuth("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ Email: email, OldPassword: oldPassword, NewPassword: newPassword }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      // Logout chỉ cần callApi (không cần token)
      try {
        await callApi("/api/auth/logout", { method: "POST" });
      } catch (e) {}
      if (onSuccess) onSuccess();
      onClose();
      router.push("/");
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
      setLoading(false);
    }
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
          <span className="text-xl font-bold text-gray-700">Đổi mật khẩu</span>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            placeholder="Mật khẩu cũ"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
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
            {loading ? "Đang đổi..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}