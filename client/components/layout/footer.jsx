import { FaFacebook , FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { AiFillTikTok } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="text-gray-800 bg-white shadow-inner">
      <div className="grid items-center grid-cols-1 gap-6 px-4 py-4 mx-auto border-t border-purple-500 max-w-7xl sm:grid-cols-2 md:grid-cols-4">
        {/* Logo và tên thương hiệu */}
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-widest">
            <a
              href="/"
              className="transition-colors hover:text-orange-500"
            >
              GIA BẢO FORKLIFT
            </a>
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Số+12%2F16A%2C+Thống+Nhất%2C+Dĩ+An%2C+BD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-orange-500"
          >
            Số 12/16A, Thống Nhất, Dĩ An, BD
          </a>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex flex-col space-y-1">
          <span>
            <span className="text-gray-500">Hotline: </span>
            <a
              href="tel:0987013286"
              className="text-lg font-bold transition-colors hover:text-orange-500"
            >
              0987 013 286
            </a>
          </span>
          <span>
            <span className="text-gray-500">Email: </span>
            <a
            href="mailto:Giabaoforklift@gmail.com"
            className="text-sm text-gray-500 transition-colors hover:text-orange-500"
          >
            Giabaoforklift@gmail.com
          </a>
          </span>
        </div>

        {/* Giới thiệu ngắn */}
        <div className="flex flex-col space-y-3 text-sm text-gray-500">
          <a
            href="/chinh-sach-ban-hang"
            className="transition-colors hover:text-orange-500"
          >
            Chính sách bán hàng
          </a>
          <a
            href="/chinh-sach-bao-hanh"
            className="transition-colors hover:text-orange-500"
          >
            Chính sách bảo hành
          </a>
        </div>

        {/* Mạng xã hội */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Kết nối với chúng tôi</p>
          <div className="flex items-center space-x-4 text-xl">
            <a
              href="https://www.facebook.com/hai.bui.7771"
              target="_blank"
              className="text-gray-500 transition-colors hover:text-blue-600"
            >
              <FaFacebook  />
            </a>
            <a
              href="https://zalo.me/0987013286"
              target="_blank"
              className="text-gray-500 transition-colors hover:text-blue-600"
            >
              <SiZalo />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-gray-500 transition-colors hover:text-purple-500"
            >
              <AiFillTikTok />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-gray-500 transition-colors hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full px-4 py-3 bg-gray-100 border-t border-gray-200">
        <div className="flex flex-col items-center justify-center text-xs font-semibold text-gray-500 sm:flex-row sm:justify-center">
          <span>
            © {new Date().getFullYear()} GIA BẢO FORKLIFT. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
