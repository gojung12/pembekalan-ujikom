import React from "react";

function Header({ cartCount, onOpenCart }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">⚡ SMK Store</div>

        {/* Saat diklik, panggil fungsi onOpenCart */}
        <button
          className="cart-btn cursor-pointer rounded-sm p-2 hover:bg-gray-200 hover:rounded-sm transition"
          onClick={onOpenCart}
        >
          🛒 <span className="badge">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
