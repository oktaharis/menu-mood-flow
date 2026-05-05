import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "@/lib/data";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analitik — RestoKasir" }] }),
  component: AnalyticsPage,
});

const monthlyTrend = [
  { month: "Jan", sales: 28000000 },
  { month: "Feb", sales: 31000000 },
  { month: "Mar", sales: 35000000 },
  { month: "Apr", sales: 33000000 },
  { month: "Mei", sales: 39000000 },
];

const insights = [
  { type: "up" as const, title: "Caffè Latte naik 23%", desc: "Penjualan meningkat signifikan dibanding bulan lalu. Pertimbangkan untuk menambah varian baru.", icon: TrendingUp, color: "text-success" },
  { type: "down" as const, title: "Smoothie Bowl turun 15%", desc: "Penjualan menurun. Mungkin perlu promo khusus atau bundling dengan item lain.", icon: TrendingDown, color: "text-destructive" },
  { type: "warning" as const, title: "Stok Salmon hampir habis", desc: "Salmon fillet tinggal 2 kg. Restock sebelum weekend rush.", icon: AlertCircle, color: "text-warning" },
  { type: "tip" as const, title: "Rekomendasi: Bundle Lunch Set", desc: "Nasi Goreng + Latte punya purchase rate bersamaan 68%. Buat paket combo untuk meningkatkan AOV.", icon: Lightbulb, color: "text-primary" },
];

const performanceItems = [
  { name: "Nasi Goreng Spesial", trend: "+18%", up: true, sold: 156, revenue: 5460000 },
  { name: "Caffè Latte", trend: "+23%", up: true, sold: 210, revenue: 5880000 },
  { name: "Beef Burger Deluxe", trend: "+5%", up: true, sold: 98, revenue: 5390000 },
  { name: "Smoothie Bowl", trend: "-15%", up: false, sold: 87, revenue: 3654000 },
  { name: "Grilled Salmon", trend: "-8%", up: false, sold: 42, revenue: 3738000 },
  { name: "Crispy Fries", trend: "+12%", up: true, sold: 145, revenue: 3190000 },
];

function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold">Analisis Penjualan</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Insight dan rekomendasi otomatis</p>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight) => (
          <div key={insight.title} className="stat-card flex gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${insight.color} bg-current/10`} style={{ backgroundColor: `color-mix(in oklch, currentColor 10%, transparent)` }}>
              <insight.icon className={`w-[18px] h-[18px] ${insight.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{insight.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{insight.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly trend */}
      <div className="stat-card">
        <h3 className="font-semibold text-sm">Tren Penjualan Bulanan</h3>
        <div className="h-[260px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrend} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12 }} />
              <Bar dataKey="sales" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance table */}
      <div className="stat-card">
        <h3 className="font-semibold text-sm mb-3">Performa Per Item</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Terjual</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tren</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {performanceItems.map((item) => (
                <tr key={item.name} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-3 py-3 font-semibold">{item.name}</td>
                  <td className="px-3 py-3 text-center text-muted-foreground">{item.sold}</td>
                  <td className="px-3 py-3 text-right font-semibold">{formatCurrency(item.revenue)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${item.up ? "text-success" : "text-destructive"}`}>
                      {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
