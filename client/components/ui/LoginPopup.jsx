'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { callApi } from "../../api/api";
import RegisterPopup from "./RegisterPopup";
import ForgotPasswordPopup from "./ForgotPasswordPopup";

export default function LoginPopup({ open, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  if (!open && !showRegister && !showForgot) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await callApi("/api/auth/login", {
        method: "POST",
        body: { Email: email, Password: password },
      });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      onClose();
      if (onLoginSuccess) onLoginSuccess(data.user);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  // Hiển thị RegisterPopup nếu showRegister = true
  if (showRegister) {
    return (
      <RegisterPopup
        open={showRegister}
        onClose={() => { setShowRegister(false); onClose && onClose(); }}
        onBackToLogin={() => setShowRegister(false)}
        onRegisterSuccess={() => {
          setShowRegister(false); // Đóng popup đăng ký
          setShowLogin(true);     // Mở lại popup đăng nhập (nếu bạn có state showLogin)
        }}
      />
    );
  }

  // Hiển thị ForgotPasswordPopup nếu showForgot = true
  if (showForgot) {
    return (
      <ForgotPasswordPopup
        open={showForgot}
        onClose={() => { setShowForgot(false); onClose && onClose(); }}
        onBackToLogin={() => setShowForgot(false)}
      />
    );
  }

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
          <span className="text-xl font-bold text-gray-700">Đăng nhập</span>
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
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-4">
          <button className="text-sm text-orange-400 hover:text-orange-500 hover:cursor-pointer" onClick={() => setShowForgot(true)}>Quên mật khẩu?</button>
          <div className="flex items-center w-full my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-2 text-xs text-gray-400">hoặc</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded hover:cursor-pointer hover:bg-gray-50"
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/google`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.71-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l3.66-2.83z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.87 7.6 9.3 5.38 12 5.38z"/>
              <path fill="none" d="M1 1h22v22H1z"/>
            </svg>
            Đăng nhập với Google
          </button>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span>Bạn chưa có tài khoản?</span>
            <button
              className="text-orange-500 hover:underline hover:cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
