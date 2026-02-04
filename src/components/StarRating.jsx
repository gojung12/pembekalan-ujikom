import { Star } from "lucide-react";

function StarRating({ rating = 0, reviews = 0 }) {
  const safeRating = Math.max(0, Math.min(5, Math.floor(Number(rating) || 0)));

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < safeRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }
          />
        ))}
      </div>

      <span className="ml-1">
        {Number(rating || 0).toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

export default StarRating;
