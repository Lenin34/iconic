import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import NewCollection from "@/components/collection/NewCollection";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

// Datos de ejemplo para el catálogo con imágenes de Unsplash
const featuredProducts = [
  { id: 1, slug: "nike-air-max-90-black", name: "Air Max 90 Black", brand: "NIKE", price: 2499, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: 2, slug: "adidas-samba-og-white", name: "Samba OG White", brand: "ADIDAS", price: 1899, badge: "HOT" as const, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" },
  { id: 3, slug: "jordan-1-mid-chicago", name: "Jordan 1 Mid Chicago", brand: "JORDAN", price: 3299, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" },
  { id: 4, slug: "new-balance-550-grey", name: "550 Grey", brand: "NEW BALANCE", price: 2199, badge: "DROP" as const, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80" },
  { id: 5, slug: "nike-dunk-low-panda", name: "Dunk Low Panda", brand: "NIKE", price: 2799, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80" },
  { id: 6, slug: "adidas-campus-burgundy", name: "Campus Burgundy", brand: "ADIDAS", price: 1699, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80" },
  { id: 7, slug: "jordan-4-military-black", name: "Jordan 4 Military Black", brand: "JORDAN", price: 4599, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80" },
  { id: 8, slug: "nike-air-force-1-white", name: "Air Force 1 White", brand: "NIKE", price: 2299, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <NewCollection />
        <ProductGrid products={featuredProducts} title="Fresh arrivals" />
      </main>
      <Footer />
    </>
  );
}
