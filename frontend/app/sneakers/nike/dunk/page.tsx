import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const dunkProducts = [
  { id: 5, slug: "nike-dunk-low-panda", name: "Dunk Low Panda", brand: "NIKE", price: 2799, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80" },
];

export default function DunkPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={dunkProducts} title="Dunk Collection" />
      </main>
      <Footer />
    </>
  );
}
