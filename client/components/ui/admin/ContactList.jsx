import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import moment from "moment";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5000/api/admin/contact");
        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-lg font-semibold text-orange-500 animate-pulse">
          Đang tải...
        </span>
      </div>
    );

  return (
    <div className="md:px-10 px-4 sm:px-10 lg:px-[180px]">
      <div className="p-4 bg-white shadow-lg rounded-xl sm:p-8">
        <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold">
          Danh sách liên hệ
        </h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg">
          <table className="min-w-full text-sm bg-white">
            <thead>
              <tr className="bg-orange-50">
                <th className="px-4 py-3 font-semibold text-left">Họ tên</th>
                <th className="px-4 py-3 font-semibold text-left">SĐT</th>
                <th className="px-4 py-3 font-semibold text-left">Email</th>
                <th className="px-4 py-3 font-semibold text-left">Nội dung</th>
                <th className="px-4 py-3 font-semibold text-left">Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Không có liên hệ nào.
                  </td>
                </tr>
              ) : (
                contacts.map((c, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-white"
                        : "bg-orange-50/60 hover:bg-orange-100/40"
                    }
                  >
                    <td className="px-4 py-3 border-b border-gray-100 max-w-[160px] truncate" title={c.Name}>
                      {c.Name}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">{c.Phone}</td>
                    <td className="px-4 py-3 border-b border-gray-100 max-w-[180px] truncate" title={c.Email}>
                      {c.Email}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100 min-w-[240px] max-w-[260px] break-words whitespace-pre-line" title={c.Message}>
                      {c.Message}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded">
                        {moment(c.CreatedAt)
                          .utcOffset("+07:00")
                          .format("DD/MM/YYYY HH:mm:ss")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
