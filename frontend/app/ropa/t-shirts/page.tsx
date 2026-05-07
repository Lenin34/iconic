import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const tshirtProducts = [
  { id: 11, slug: "tshirt-white", name: "Iconic Tee White", brand: "ICONIC", price: 699, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: 12, slug: "tshirt-black", name: "Iconic Tee Black", brand: "ICONIC", price: 699, badge: "HOT" as const, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
];

export default function TshirtsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={tshirtProducts} title="T-shirts" />
      </main>
      <Footer />
    </>
  );
}
