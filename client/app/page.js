import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import FloatingContactButtons from "../components/ui/FloatingContactButtons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-3 pb-10">Hello, welcome to our website!</main>
      <FloatingContactButtons />
      <Footer />
    </div>
  );
}
