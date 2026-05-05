import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Banknote, QrCode, ChefHat } from "lucide-react";
import { useState } from "react";
import { menuItems, formatCurrency, type CartItem } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Keranjang — RestoKasir" }] }),
  component: CartPage,
});

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { ...menuItems[0], quantity: 2, selectedVariant: "Pedas" },
    { ...menuItems[2], quantity: 1, selectedVariant: "Iced" },
    { ...menuItems[5], quantity: 1, selectedVariant: "Cheese" },
  ]);
  const [payMethod, setPayMethod] = useState("qris");
  const [notes, setNotes] = useState("");

  const updateQty = (index: number, delta: number) => {
    setCart((prev) => prev.map((c, i) => i === index ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter((c) => c.quantity > 0));
  };

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const paymentOptions = [
    { id: "qris", label: "QRIS", icon: QrCode },
    { id: "cash", label: "Tunai", icon: Banknote },
    { id: "card", label: "Kartu", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link to="/menu" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display font-semibold">Keranjang</h1>
          <div className="ml-auto bg-accent px-3 py-1.5 rounded-full text-xs font-semibold text-accent-foreground">
            Meja 5
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-48">
        {/* Items */}
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {cart.map((item, i) => (
            <div key={`${item.id}-${item.selectedVariant}`} className="p-4 flex gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                {item.selectedVariant && (
                  <span className="text-xs text-muted-foreground">{item.selectedVariant}</span>
                )}
                <p className="text-sm font-bold text-primary mt-1">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => setCart((prev) => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(i, -1)} className="qty-btn"><Minus className="w-3 h-3" /></button>
                  <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(i, 1)} className="qty-btn"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="bg-card rounded-xl border border-border p-4">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Catatan Pesanan</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: tidak pakai bawang, extra sambal..."
            className="input-field mt-2 resize-none h-20"
          />
        </div>

        {/* Payment method */}
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Metode Pembayaran</p>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPayMethod(opt.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  payMethod === opt.id
                    ? "border-primary bg-accent"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <opt.icon className={`w-5 h-5 ${payMethod === opt.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-semibold ${payMethod === opt.id ? "text-primary" : "text-muted-foreground"}`}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pajak (10%)</span>
            <span className="font-semibold">{formatCurrency(tax)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-card border-t border-border">
        <div className="max-w-lg mx-auto">
          <Link
            to="/order-status"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
          >
            <CreditCard className="w-4 h-4" />
            Bayar {formatCurrency(total)}
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-2">Estimasi penyajian: 15-20 menit</p>
        </div>
      </div>
    </div>
  );
}
