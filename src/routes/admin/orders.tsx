import { createFileRoute } from "@tanstack/react-router";
import { Clock, CheckCircle2, ChefHat, AlertCircle } from "lucide-react";
import { recentOrders, formatCurrency } from "@/lib/data";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Pesanan — RestoKasir" }] }),
  component: OrdersPage,
});

const statusConfig: Record<string, { label: string; class: string; icon: typeof Clock }> = {
  pending: { label: "Menunggu", class: "badge-warning", icon: AlertCircle },
  preparing: { label: "Diproses", class: "badge-info", icon: ChefHat },
  ready: { label: "Siap", class: "badge-success", icon: CheckCircle2 },
  served: { label: "Disajikan", class: "badge-success", icon: CheckCircle2 },
  paid: { label: "Lunas", class: "badge-success", icon: CheckCircle2 },
};

const orders = [
  ...recentOrders,
  { id: "ORD-006", table: 7, items: [], status: "preparing" as const, total: 245000, createdAt: "13:42" },
  { id: "ORD-007", table: 2, items: [], status: "pending" as const, total: 67000, createdAt: "14:28" },
  { id: "ORD-008", table: 10, items: [], status: "ready" as const, total: 189000, createdAt: "14:05" },
];

function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold">Pesanan</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Kelola semua pesanan aktif</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          return (
            <div key={order.id} className="stat-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{order.id}</span>
                <span className={`badge-status ${config.class}`}>{config.label}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Meja {order.table}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{order.createdAt}</span>
              </div>
              <div className="border-t border-border pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-primary">{formatCurrency(order.total)}</span>
                <button className="text-xs font-semibold text-primary hover:underline">Detail</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
