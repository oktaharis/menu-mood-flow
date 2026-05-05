import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, Minus, CreditCard, Banknote, QrCode, Percent, X, User } from "lucide-react";
import { menuItems, menuCategories, formatCurrency, type CartItem, type MenuItem } from "@/lib/data";

export const Route = createFileRoute("/admin/pos")({
  head: () => ({ meta: [{ title: "POS Kasir — RestoKasir" }] }),
  component: POSPage,
});

function POSPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [table, setTable] = useState("5");
  const [discount, setDiscount] = useState(0);

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "Semua" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addItem = (item: MenuItem) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === item.id);
      if (ex) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter((c) => c.quantity > 0));
  };

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const discountAmt = Math.round(subtotal * discount / 100);
  const tax = Math.round((subtotal - discountAmt) * 0.1);
  const total = subtotal - discountAmt + tax;

  return (
    <div className="flex h-screen">
      {/* Left: menu grid */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari menu..." className="input-field pl-9" />
          </div>
        </div>
        <div className="px-4 py-3 flex gap-2 overflow-x-auto border-b border-border">
          {menuCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`category-chip whitespace-nowrap text-xs ${activeCategory === cat ? "category-chip-active" : ""}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => addItem(item)} className="menu-card text-left">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-2.5">
                  <h3 className="text-xs font-semibold line-clamp-1">{item.name}</h3>
                  <p className="text-xs font-bold text-primary mt-1">{formatCurrency(item.price)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: order panel */}
      <div className="w-[380px] flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-sm">Pesanan Baru</h2>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Meja</span>
              <input value={table} onChange={(e) => setTable(e.target.value)} className="w-12 input-field text-center !py-1 text-xs font-bold" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCartEmpty />
              <p className="text-sm mt-2">Keranjang kosong</p>
              <p className="text-xs">Pilih menu untuk memulai</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{item.name}</p>
                  <p className="text-xs text-primary font-bold">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => updateQty(item.id, -1)} className="qty-btn !w-6 !h-6"><Minus className="w-3 h-3" /></button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="qty-btn !w-6 !h-6"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom summary */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setDiscount(discount ? 0 : 10)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${discount ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              <Percent className="w-3 h-3" /> Diskon {discount ? `${discount}%` : ""}
            </button>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-destructive"><span>Diskon ({discount}%)</span><span className="font-semibold">-{formatCurrency(discountAmt)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">PPN (10%)</span><span className="font-semibold">{formatCurrency(tax)}</span></div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="font-semibold text-sm">Total</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-primary bg-accent">
              <QrCode className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-semibold text-primary">QRIS</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors">
              <Banknote className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground">Tunai</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] font-semibold text-muted-foreground">Kartu</span>
            </button>
          </div>
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
            Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartEmpty() {
  return (
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}
