import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const hoodieProducts = [
  { id: 9, slug: "hoodie-black", name: "Iconic Hoodie Black", brand: "ICONIC", price: 1299, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
  { id: 10, slug: "hoodie-grey", name: "Iconic Hoodie Grey", brand: "ICONIC", price: 1299, image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80" },
];

export default function HoodiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={hoodieProducts} title="Hoodies" />
      </main>
      <Footer />
    </>
  );
}
