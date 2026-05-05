import { createFileRoute } from "@tanstack/react-router";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency, salesData, recentOrders } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — RestoKasir" }] }),
  component: DashboardPage,
});

const stats = [
  { label: "Penjualan Hari Ini", value: "Rp 7.850.000", change: "+12.5%", up: true, icon: DollarSign, color: "bg-primary/10 text-primary" },
  { label: "Total Pesanan", value: "156", change: "+8.2%", up: true, icon: ShoppingBag, color: "bg-info/10 text-info" },
  { label: "Pelanggan", value: "89", change: "+5.1%", up: true, icon: Users, color: "bg-success/10 text-success" },
  { label: "Rata-rata Transaksi", value: "Rp 50.320", change: "-2.3%", up: false, icon: TrendingUp, color: "bg-warning/10 text-warning" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: "Menunggu", class: "badge-warning" },
  preparing: { label: "Diproses", class: "badge-info" },
  ready: { label: "Siap", class: "badge-success" },
  served: { label: "Disajikan", class: "badge-success" },
  paid: { label: "Lunas", class: "badge-success" },
};

function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Ringkasan operasional hari ini</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span>Live • Selasa, 5 Mei 2026</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-[18px] h-[18px]" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-success" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-lg font-display font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 stat-card">
          <h3 className="font-semibold text-sm">Tren Penjualan Minggu Ini</h3>
          <div className="h-[260px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000000}jt`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Bar dataKey="sales" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent orders */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-4">Pesanan Terbaru</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">Meja {order.table} • {order.createdAt}</p>
                </div>
                <div className="text-right">
                  <span className={`badge-status ${statusMap[order.status].class}`}>
                    {statusMap[order.status].label}
                  </span>
                  <p className="text-xs font-semibold mt-1">{formatCurrency(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
