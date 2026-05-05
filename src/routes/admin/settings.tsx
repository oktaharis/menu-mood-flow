import { createFileRoute } from "@tanstack/react-router";
import { Store, Printer, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — RestoKasir" }] }),
  component: SettingsPage,
});

const settingsGroups = [
  {
    title: "Umum",
    items: [
      { icon: Store, label: "Profil Restoran", desc: "Nama, alamat, logo, jam operasional" },
      { icon: Printer, label: "Pengaturan Struk", desc: "Format struk, header, footer, logo" },
      { icon: Globe, label: "Bahasa & Regional", desc: "Bahasa, mata uang, format tanggal" },
    ],
  },
  {
    title: "Operasional",
    items: [
      { icon: Bell, label: "Notifikasi", desc: "Atur notifikasi pesanan dan stok" },
      { icon: Palette, label: "Tampilan Menu", desc: "Kategori, gambar, harga, promo" },
    ],
  },
  {
    title: "Keamanan",
    items: [
      { icon: Shield, label: "Akun & Keamanan", desc: "Password, sesi login, 2FA" },
    ],
  },
];

function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-display font-bold">Pengaturan</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Konfigurasi sistem kasir</p>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.title}</h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {group.items.map((item) => (
              <button key={item.label} className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors text-left">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">RestoKasir v1.0.0 • © 2026 All rights reserved</p>
      </div>
    </div>
  );
}
