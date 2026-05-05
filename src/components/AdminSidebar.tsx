import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  TrendingUp,
  Settings,
  LogOut,
  ChefHat,
  ClipboardList,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "POS Kasir", url: "/admin/pos", icon: ShoppingCart },
  { title: "Pesanan", url: "/admin/orders", icon: ClipboardList },
  { title: "Stok Opname", url: "/admin/stock", icon: Package },
  { title: "Laporan", url: "/admin/reports", icon: BarChart3 },
  { title: "Analitik", url: "/admin/analytics", icon: TrendingUp },
  { title: "Pengaturan", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="w-[240px] shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0">
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <ChefHat className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-sm tracking-tight">RestoKasir</h1>
          <p className="text-[11px] opacity-50">Point of Sale</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = currentPath === item.url || (item.url !== "/admin" && currentPath.startsWith(item.url));
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`sidebar-nav-item ${isActive ? "!opacity-100 !bg-sidebar-accent" : ""}`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.title}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Admin Kasir</p>
            <p className="text-[11px] opacity-50">Manager</p>
          </div>
          <Link to="/login" className="opacity-50 hover:opacity-100 transition-opacity">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
