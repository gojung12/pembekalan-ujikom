import React, { useState } from "react";
// Pastikan kamu sudah menjalankan: npm install qrcode.react
import { QRCodeCanvas } from "qrcode.react";

function CartSidebar({
  isOpen,
  closeCart,
  cartItems = [],
  updateQty,
  removeFromCart,
}) {
  // State untuk alur: cart -> qr -> struk
  const [view, setView] = useState("cart");

  // Hitung Total Harga dengan pengaman (?? 0)
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 0),
    0,
  );

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Fungsi tutup yang mereset tampilan kembali ke keranjang
  const handleCloseSidebar = () => {
    setView("cart");
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={handleCloseSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>
            {view === "cart" && "Keranjang"}
            {view === "qr" && "Pembayaran"}
            {view === "struk" && "Struk Digital"}
          </h2>
          <button className="close-btn" onClick={handleCloseSidebar}>
            &times;
          </button>
        </div>

        <div
          className="cart-content"
          style={{
            padding: "15px",
            overflowY: "auto",
            height: "calc(100% - 150px)",
          }}
        >
          {/* CART VIEW */}
          {view === "cart" &&
            (cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="text-4xl mb-3">🛒</span>
                <p className="font-medium">Keranjang masih kosong</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4 last:border-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {formatRupiah(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        −
                      </button>

                      <span className="w-6 text-center text-sm font-medium">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {/* QR VIEW */}
          {view === "qr" && (
            <div className="flex flex-col items-center py-6 space-y-4 text-center">
              <h3 className="font-semibold text-gray-800">
                Scan QRIS untuk Pembayaran
              </h3>

              <div className="bg-white p-4 rounded-xl shadow border">
                <QRCodeCanvas
                  value={`PAYMENT-SMK-STORE-${totalPrice}`}
                  size={180}
                  includeMargin
                />
              </div>

              <p className="text-xl font-bold text-emerald-600">
                {formatRupiah(totalPrice)}
              </p>

              <button
                onClick={() => setView("struk")}
                className="w-full h-10 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          )}

          {/* RECEIPT VIEW */}
          {view === "struk" && (
            <div className="bg-white rounded-xl border shadow-sm p-5 font-mono text-sm space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-base">SMK STORE</h3>
                <p className="text-xs text-gray-500">Bukti Pembayaran</p>
                <div className="my-2 border-t border-dashed" />
              </div>

              <div className="space-y-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span className="truncate max-w-[160px]">
                      {item.name} × {item.qty}
                    </span>

                    <span>{formatRupiah(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed pt-2" />

              <div className="flex justify-between font-bold text-gray-900">
                <span>TOTAL</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>

              <div className="pt-4 text-center space-y-2">
                <p className="text-xs text-gray-500">
                  Terima kasih sudah berbelanja 💙
                </p>

                <button
                  onClick={handleCloseSidebar}
                  className="w-full h-9 rounded-lg bg-gray-900 text-white hover:bg-black transition"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER: Hanya muncul jika di tampilan keranjang & ada isi */}
        {view === "cart" && cartItems.length > 0 && (
          <div
            className="cart-footer"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "15px",
              background: "#fff",
              borderTop: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              <span>Total:</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <button
              className="checkout-btn bg-blue-500 text-white p-1 w-full rounded-md h-8 mt-1"
              onClick={() => setView("qr")}
            >
              Bayar Sekarang
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
