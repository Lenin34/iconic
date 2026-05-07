import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const sambaProducts = [
  { id: 2, slug: "adidas-samba-og-white", name: "Samba OG White", brand: "ADIDAS", price: 1899, badge: "HOT" as const, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" },
];

export default function SambaPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={sambaProducts} title="Samba Collection" />
      </main>
      <Footer />
    </>
  );
}
