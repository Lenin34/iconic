import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const airMaxProducts = [
  { id: 1, slug: "nike-air-max-90-black", name: "Air Max 90 Black", brand: "NIKE", price: 2499, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
];

export default function AirMaxPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={airMaxProducts} title="Air Max Collection" />
      </main>
      <Footer />
    </>
  );
}
