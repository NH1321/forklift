'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      router.push('/');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Đang đăng nhập...</div>;
}
