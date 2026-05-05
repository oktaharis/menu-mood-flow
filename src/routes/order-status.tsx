import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, ChefHat, UtensilsCrossed, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/order-status")({
  head: () => ({ meta: [{ title: "Status Pesanan — RestoKasir" }] }),
  component: OrderStatusPage,
});

const steps = [
  { id: 1, label: "Pesanan Diterima", desc: "Pesanan berhasil dikirim ke dapur", icon: CheckCircle2, done: true },
  { id: 2, label: "Sedang Dimasak", desc: "Chef sedang menyiapkan pesanan Anda", icon: ChefHat, done: true, active: true },
  { id: 3, label: "Siap Disajikan", desc: "Pesanan akan segera diantar ke meja", icon: UtensilsCrossed, done: false },
];

function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link to="/menu" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display font-semibold">Status Pesanan</h1>
          <div className="ml-auto bg-accent px-3 py-1.5 rounded-full text-xs font-semibold text-accent-foreground">
            Meja 5
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Order info */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-display font-bold mt-4">Pesanan #ORD-156</h2>
          <p className="text-sm text-muted-foreground mt-1">Estimasi selesai: 12 menit lagi</p>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.done
                      ? step.active
                        ? "bg-primary text-primary-foreground"
                        : "bg-success/10 text-success"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-12 my-1 ${step.done ? "bg-success/30" : "bg-border"}`} />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className={`text-sm font-semibold ${step.active ? "text-primary" : ""}`}>{step.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  {step.active && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-primary font-semibold">Sedang berlangsung</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <h3 className="text-sm font-semibold">Ringkasan Pesanan</h3>
          <div className="divide-y divide-border">
            <div className="flex justify-between py-2 text-sm">
              <span>2x Nasi Goreng Spesial <span className="text-muted-foreground">(Pedas)</span></span>
              <span className="font-semibold">Rp 70.000</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span>1x Caffè Latte <span className="text-muted-foreground">(Iced)</span></span>
              <span className="font-semibold">Rp 28.000</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span>1x Crispy Fries <span className="text-muted-foreground">(Cheese)</span></span>
              <span className="font-semibold">Rp 22.000</span>
            </div>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold">Total (incl. pajak)</span>
            <span className="text-lg font-bold text-primary">Rp 132.000</span>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
          >
            Pesan Lagi
          </Link>
        </div>
      </div>
    </div>
  );
}
