import { createFileRoute } from "@tanstack/react-router";
import { Search, AlertTriangle, ArrowUpDown, Package, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { stockItems } from "@/lib/data";

export const Route = createFileRoute("/admin/stock")({
  head: () => ({ meta: [{ title: "Stok Opname — RestoKasir" }] }),
  component: StockPage,
});

const statusStyle: Record<string, { label: string; class: string }> = {
  safe: { label: "Aman", class: "badge-success" },
  low: { label: "Menipis", class: "badge-warning" },
  critical: { label: "Kritis", class: "badge-danger" },
};

function StockPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(stockItems);
  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const lowStockCount = items.filter((i) => i.status !== "safe").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold">Stok Opname</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Kelola stok bahan dan produk</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Stok
        </button>
      </div>

      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <div>
            <p className="text-sm font-semibold text-warning-foreground">{lowStockCount} item stok menipis!</p>
            <p className="text-xs text-muted-foreground">Segera lakukan restock untuk menghindari kehabisan bahan</p>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari stok..." className="input-field pl-9" />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama Bahan</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stok</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Min. Stok</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{item.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-bold">{item.stock} <span className="text-muted-foreground font-normal text-xs">{item.unit}</span></td>
                <td className="px-4 py-3 text-center text-muted-foreground">{item.minStock} {item.unit}</td>
                <td className="px-4 py-3 text-center"><span className={`badge-status ${statusStyle[item.status].class}`}>{statusStyle[item.status].label}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="qty-btn !w-7 !h-7"><Minus className="w-3 h-3" /></button>
                    <button className="qty-btn !w-7 !h-7"><Plus className="w-3 h-3" /></button>
                    <button className="ml-1 text-xs text-primary font-semibold hover:underline">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
