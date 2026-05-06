import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

// Datos de ejemplo para el catálogo
const featuredProducts = [
  { id: 1, slug: "nike-air-max-90-black", name: "Air Max 90 Black", brand: "NIKE", price: 2499, badge: "NEW" as const },
  { id: 2, slug: "adidas-samba-og-white", name: "Samba OG White", brand: "ADIDAS", price: 1899, badge: "HOT" as const },
  { id: 3, slug: "jordan-1-mid-chicago", name: "Jordan 1 Mid Chicago", brand: "JORDAN", price: 3299 },
  { id: 4, slug: "new-balance-550-grey", name: "550 Grey", brand: "NEW BALANCE", price: 2199, badge: "DROP" as const },
  { id: 5, slug: "nike-dunk-low-panda", name: "Dunk Low Panda", brand: "NIKE", price: 2799 },
  { id: 6, slug: "adidas-campus-burgundy", name: "Campus Burgundy", brand: "ADIDAS", price: 1699 },
  { id: 7, slug: "jordan-4-military-black", name: "Jordan 4 Military Black", brand: "JORDAN", price: 4599, badge: "NEW" as const },
  { id: 8, slug: "nike-air-force-1-white", name: "Air Force 1 White", brand: "NIKE", price: 2299 },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductGrid products={featuredProducts} title="Nuevos drops" />
      </main>
      <Footer />
    </>
  );
}
