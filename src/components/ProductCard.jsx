import React, { useState } from "react";
import { Plus, Loader2, Heart, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ item = {}, onAddToCart = () => {}, isLoading = false }) {
  const [liked, setLiked] = useState(false);

  const formatRupiah = (price) => {
    return "Rp " + Number(price || 0).toLocaleString("id-ID");
  };

  const price = Number(item.price) || 0;

  return (
    <Link to={`/product/${item.id}`}>
      <div className="group relative flex flex-col w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image Section */}
        <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-white p-4">
          <img
            src={
              item.image || "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={item.name || "Product"}
            loading="lazy"
            className="z-10 h-full w-full object-cover rounded-lg drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full px-4 pb-4 transition-transform duration-300 group-hover:translate-y-0">
            <button
              type="button"
              onClick={() => onAddToCart(item)}
              disabled={isLoading}
              className={`w-full flex cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                isLoading
                  ? "cursor-not-allowed bg-gray-700 text-gray-400"
                  : "bg-black text-white hover:bg-black shadow-lg"
              }`}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Plus size={18} strokeWidth={2.5} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          <div className="absolute bottom-4 h-4 w-1/2 scale-0 rounded-full bg-black/5 blur-md transition-transform duration-700 group-hover:scale-100" />
        </div>

        {/* Content Section */}
        <div className="relative z-20 flex flex-col bg-white p-5 text-black sm:p-6">
          <div className="flex-grow">
            <span className="mb-1.5 inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-400">
              {item.category || "ITEM"}
            </span>

            <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight sm:text-xl">
              {item.name || "Product Name"}
            </h3>

            <p className="mt-1 line-clamp-1 text-xs font-medium text-gray-400 opacity-80">
              {item.desc || "Premium quality product."}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span className="font-medium text-amber-500">
                  {item.rating || 4.8}
                </span>
              </div>
              <span>•</span>
              <span>{item.sold || 100}+ terjual</span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              <span>{item.location || "Indonesia"}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between pt-3">
            <div className="flex flex-col pb-1">
              <span className="mb-0.5 text-xs font-medium tracking-wide text-gray-500">
                Price
              </span>
              <span className="tabular-nums text-xl font-bold leading-none tracking-tight text-black sm:text-2xl">
                {formatRupiah(price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
