"use client";
import { useState, useEffect } from "react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";
import { callApi } from "../../api/api";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ContactList from "../../components/ui/admin/ContactList";

export default function ContactPage() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setRole(payload?.role || "guess");
      } catch {
        setRole("guess");
      }
    } else {
      setRole("guess");
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await callApi("/api/guess/contact", {
        method: "POST",
        body: form,
      });
      setSuccess(true);
      setForm({ Name: "", Phone: "", Email: "", Message: "" });
    } catch (err) {
      console.error("Error sending contact form:", err);
    }
    setLoading(false);
  };
 
  if (!role) return <div>Đang tải...</div>;

  if ([1, 2].includes(role)) {
    return (
      <div className="w-full">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Liên hệ", active: true }
          ]}
        />
        <ContactList role={role} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ", active: true }
        ]}
      />
      <div className="px-4 sm:px-10 lg:px-[180px]">
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl">
          <div className="flex flex-col items-start md:flex-row">
            {/* Left: Contact Form */}
            <div className="flex items-center justify-center w-full p-4 border-b border-gray-200 sm:p-8 md:border-b-0 md:border-r md:w-1/2">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5"
                autoComplete="off"
              >
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  LIÊN HỆ VỚI CHÚNG TÔI
                </h2>
                <input
                  name="Name"
                  value={form.Name}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full px-4 py-2 transition bg-white border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  required
                />
                <input
                  name="Phone"
                  value={form.Phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-2 transition bg-white border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  required
                />
                <input
                  name="Email"
                  type="email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 transition bg-white border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  required
                />
                <textarea
                  name="Message"
                  value={form.Message}
                  onChange={handleChange}
                  placeholder="Nội dung liên hệ"
                  rows={4}
                  className="w-full px-4 py-2 transition bg-white border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-white transition bg-orange-500 rounded hover:cursor-pointer hover:bg-orange-600"
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : "Gửi liên hệ"}
                </button>
                {success && (
                  <div className="font-medium text-center text-green-600">
                    Gửi liên hệ thành công!
                  </div>
                )}
              </form>
            </div>
            {/* Right: Company Info */}
            <div className="flex items-center justify-center w-full p-4 bg-white border-gray-200 sm:border-t-0 sm:p-8 md:w-1/2 rounded-b-xl md:rounded-bl-none md:rounded-r-xl md:border-t-0">
              <div className="w-full max-w-md">
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  THÔNG TIN CÔNG TY
                </h2>
                <div className="space-y-2 text-base text-gray-700">
                  <div>
                    <span className="flex items-center gap-2 font-semibold">
                      <PiBuildingOfficeBold size={28} className="text-orange-500" />
                      CÔNG TY TNHH GIA BẢO FORKLIFT
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Mã số thuế:</span> 3702958007
                  </div>
                  <div>
                    <span className="font-semibold">Trụ sở chính:</span> Số 12/16A, khu phố Thống Nhất, phường Dĩ An, thành phố Dĩ An, tỉnh Bình Dương, Việt Nam
                  </div>
                  <div>
                    <span className="font-semibold">Tư vấn:</span> 0987 013 286
                  </div>
                  <div>
                    <span className="font-semibold">Đặt hàng:</span> 0987 013 286
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> Giabaoforklift@gmail.com
                  </div>
                  <div>
                    <span className="font-semibold">Website:</span> ...
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom: Google Map */}
          <div className="w-full h-64 overflow-hidden sm:h-80 md:h-96 rounded-b-xl">
            <iframe
              title="Bản đồ công ty"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.134083834192!2d106.74720867485841!3d10.877404889277567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d874f45175e5%3A0xf93a5b449d458588!2zMTIgS2h1IFBo4buRIE5o4buLIMSQ4buTbmcsIETEqSBBbiwgVGjhu6cgxJDhu6ljLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1748753012097!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
