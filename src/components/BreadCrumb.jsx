import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumb({ items = [] }) {
  return (
    <nav className="mb-4 flex items-center text-sm text-gray-500">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <ChevronRight size={16} className="mx-1 text-gray-400" />
          )}

          {item.link ? (
            <Link
              to={item.link}
              className="hover:text-indigo-600 transition font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumb;
