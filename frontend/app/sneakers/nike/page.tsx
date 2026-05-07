import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const nikeProducts = [
  { id: 1, slug: "nike-air-max-90-black", name: "Air Max 90 Black", brand: "NIKE", price: 2499, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: 5, slug: "nike-dunk-low-panda", name: "Dunk Low Panda", brand: "NIKE", price: 2799, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80" },
  { id: 8, slug: "nike-air-force-1-white", name: "Air Force 1 White", brand: "NIKE", price: 2299, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
];

export default function NikePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={nikeProducts} title="Nike Collection" />
      </main>
      <Footer />
    </>
  );
}
