import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const campusProducts = [
  { id: 6, slug: "adidas-campus-burgundy", name: "Campus Burgundy", brand: "ADIDAS", price: 1699, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80" },
];

export default function CampusPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={campusProducts} title="Campus Collection" />
      </main>
      <Footer />
    </>
  );
}
