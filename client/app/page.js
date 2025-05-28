import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        Hello, world!
      </main>
      <Footer />
    </div>
  );
}
