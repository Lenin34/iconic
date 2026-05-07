import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const superstarProducts = [
  { id: 2, slug: "adidas-samba-og-white", name: "Superstar White", brand: "ADIDAS", price: 2199, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" },
];

export default function SuperstarPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={superstarProducts} title="Superstar Collection" />
      </main>
      <Footer />
    </>
  );
}
