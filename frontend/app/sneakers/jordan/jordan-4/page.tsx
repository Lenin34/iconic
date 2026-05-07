import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const jordan4Products = [
  { id: 7, slug: "jordan-4-military-black", name: "Jordan 4 Military Black", brand: "JORDAN", price: 4599, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80" },
];

export default function Jordan4Page() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={jordan4Products} title="Jordan 4" />
      </main>
      <Footer />
    </>
  );
}
