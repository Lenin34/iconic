import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

const gazelleProducts = [
  { id: 2, slug: "adidas-samba-og-white", name: "Gazelle White", brand: "ADIDAS", price: 1999, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80" },
];

export default function GazellePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={gazelleProducts} title="Gazelle Collection" />
      </main>
      <Footer />
    </>
  );
}
