import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const jordanProducts = [
  { id: 3, slug: "jordan-1-mid-chicago", name: "Jordan 1 Mid Chicago", brand: "JORDAN", price: 3299, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" },
  { id: 7, slug: "jordan-4-military-black", name: "Jordan 4 Military Black", brand: "JORDAN", price: 4599, badge: "NEW" as const, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80" },
];

export default function JordanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={jordanProducts} title="Jordan Collection" />
      </main>
      <Footer />
    </>
  );
}
