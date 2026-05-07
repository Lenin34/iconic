import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const jordan11Products = [
  { id: 3, slug: "jordan-1-mid-chicago", name: "Jordan 11 Space Jam", brand: "JORDAN", price: 5299, badge: "HOT" as const, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" },
];

export default function Jordan11Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={jordan11Products} title="Jordan 11" />
      </main>
      <Footer />
    </>
  );
}
