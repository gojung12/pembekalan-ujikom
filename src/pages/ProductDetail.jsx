import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import Breadcrumb from "../components/BreadCrumb";
import { ShoppingBag, CreditCard } from "lucide-react";

function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p className="text-center mt-20">Produk tidak ditemukan</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: product.name }]}
      />

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
      >
        ← Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover shadow aspect-[4/3]"
        />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            {product.name}
            <StarRating
              rating={product.rating || 4.5}
              reviews={product.reviews || 120}
            />
          </h1>

          <p className="text-xl font-semibold text-indigo-600">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {product.desc || "Produk berkualitas tinggi dari SMK Store"}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                onAddToCart(product);
                setTimeout(() => {
                  document.querySelector(".checkout-btn")?.click();
                }, 300);
              }}
              className="flex-1 h-11 rounded-lg mt-4 px-6 py-3 bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={18} />
              Beli Sekarang
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="mt-4 px-6 py-3 flex-1 h-11 flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition cursor-pointer"
            >
              + Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
