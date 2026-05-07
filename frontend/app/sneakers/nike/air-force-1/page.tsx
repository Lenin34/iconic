import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const af1Products = [
  { id: 8, slug: "nike-air-force-1-white", name: "Air Force 1 White", brand: "NIKE", price: 2299, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" },
];

export default function AirForce1Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={af1Products} title="Air Force 1 Collection" />
      </main>
      <Footer />
    </>
  );
}
