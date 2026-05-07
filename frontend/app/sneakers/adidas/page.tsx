import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const adidasProducts = [
  { id: 2, slug: "adidas-samba-og-white", name: "Samba OG White", brand: "ADIDAS", price: 1899, badge: "HOT" as const, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" },
  { id: 6, slug: "adidas-campus-burgundy", name: "Campus Burgundy", brand: "ADIDAS", price: 1699, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80" },
];

export default function AdidasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={adidasProducts} title="Adidas Collection" />
      </main>
      <Footer />
    </>
  );
}
