import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Calendar, Download, TrendingUp } from "lucide-react";
import { formatCurrency, salesData, hourlySales, paymentMethods } from "@/lib/data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Laporan Penjualan — RestoKasir" }] }),
  component: ReportsPage,
});

const topItems = [
  { name: "Nasi Goreng Spesial", qty: 156, revenue: 5460000 },
  { name: "Beef Burger Deluxe", qty: 98, revenue: 5390000 },
  { name: "Caffè Latte", qty: 210, revenue: 5880000 },
  { name: "Smoothie Bowl", qty: 87, revenue: 3654000 },
  { name: "Crispy Fries", qty: 145, revenue: 3190000 },
];

function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Laporan Penjualan</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Analisa performa penjualan</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-secondary text-secondary-foreground text-xs font-semibold rounded-lg flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Minggu Ini
          </button>
          <button className="px-3 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-xs text-muted-foreground">Total Penjualan Minggu Ini</p>
          <p className="text-2xl font-display font-bold mt-1">Rp 38.9 jt</p>
          <p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />+15.2% dari minggu lalu</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-muted-foreground">Total Transaksi</p>
          <p className="text-2xl font-display font-bold mt-1">847</p>
          <p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />+8.7% dari minggu lalu</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-muted-foreground">Rata-rata per Transaksi</p>
          <p className="text-2xl font-display font-bold mt-1">Rp 45.920</p>
          <p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />+5.8%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly sales */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm">Penjualan Harian</h3>
          <div className="h-[240px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000000}jt`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Bar dataKey="sales" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly traffic */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm">Jam Ramai</h3>
          <div className="h-[240px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="hour" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Line type="monotone" dataKey="orders" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ fill: "var(--color-chart-2)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top items */}
        <div className="lg:col-span-2 stat-card">
          <h3 className="font-semibold text-sm mb-3">Item Terlaris</h3>
          <div className="space-y-2">
            {topItems.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.qty} terjual</p>
                </div>
                <span className="text-sm font-bold">{formatCurrency(item.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="stat-card">
          <h3 className="font-semibold text-sm mb-3">Metode Pembayaran</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {paymentMethods.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {paymentMethods.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                  <span>{m.name}</span>
                </div>
                <span className="font-semibold">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
