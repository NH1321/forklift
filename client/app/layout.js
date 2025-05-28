import "./globals.css";

export const metadata = {
  title: "GIA BẢO FORKLIFT",
  description: "GIA BẢO FORKLIFT - Đối tác đáng tin cậy của bạn trong các giải pháp xe nâng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="font-times antialiased">
        {children}
      </body>
    </html>
  );
}
