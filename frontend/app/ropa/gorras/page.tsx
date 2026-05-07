import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const gorraProducts = [
  { id: 13, slug: "gorra-black", name: "Iconic Cap Black", brand: "ICONIC", price: 499, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" },
  { id: 14, slug: "gorra-white", name: "Iconic Cap White", brand: "ICONIC", price: 499, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80" },
];

export default function GorrasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={gorraProducts} title="Gorras" />
      </main>
      <Footer />
    </>
  );
}
