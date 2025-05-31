'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { callApi } from "../../api/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    setLoading(true);
    try {
      await callApi("/api/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 mx-2 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Đặt lại mật khẩu</h2>
        {success ? (
          <div className="text-center text-green-600">
            Đặt lại mật khẩu thành công.<br />
            <button
              className="block w-full py-2 mt-6 font-semibold text-white transition bg-orange-500 rounded hover:bg-orange-600"
              onClick={() => router.push("/")}
            >
              Đăng nhập ngay
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
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
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
