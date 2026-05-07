import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const nbProducts = [
  { id: 4, slug: "new-balance-550-grey", name: "550 Grey", brand: "NEW BALANCE", price: 2199, badge: "DROP" as const, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80" },
];

export default function NewBalancePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={nbProducts} title="New Balance Collection" />
      </main>
      <Footer />
    </>
  );
}
