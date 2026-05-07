import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const jordan1Products = [
  { id: 3, slug: "jordan-1-mid-chicago", name: "Jordan 1 Mid Chicago", brand: "JORDAN", price: 3299, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" },
];

export default function Jordan1Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={jordan1Products} title="Jordan 1" />
      </main>
      <Footer />
    </>
  );
}
