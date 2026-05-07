import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const sudaderaProducts = [
  { id: 15, slug: "sudadera-black", name: "Iconic Sweatshirt Black", brand: "ICONIC", price: 1499, badge: "DROP" as const, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
  { id: 16, slug: "sudadera-grey", name: "Iconic Sweatshirt Grey", brand: "ICONIC", price: 1499, image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80" },
];

export default function SudaderasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={sudaderaProducts} title="Sudaderas" />
      </main>
      <Footer />
    </>
  );
}
