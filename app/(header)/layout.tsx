import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default async function Layout_Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow pb-6">{children}</div>
      <Footer />
    </div>
  );
}
