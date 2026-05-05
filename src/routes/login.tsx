import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — RestoKasir" },
      { name: "description", content: "Masuk ke sistem kasir restoran" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, oklch(0.65 0.17 45 / 40%), transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.6 0.15 165 / 30%), transparent 50%)"
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-sidebar-foreground tracking-tight">RestoKasir</h1>
              <p className="text-xs text-sidebar-foreground/50">Premium POS System</p>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-sidebar-foreground leading-tight">
            Kelola restoran Anda<br />dengan lebih mudah.
          </h2>
          <p className="mt-4 text-sm text-sidebar-foreground/60 max-w-md leading-relaxed">
            Sistem kasir terintegrasi dengan self-order, manajemen stok, dan analitik penjualan real-time.
          </p>
        </div>
        <p className="relative z-10 text-xs text-sidebar-foreground/30">© 2026 RestoKasir. All rights reserved.</p>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-lg">RestoKasir</h1>
          </div>

          <h2 className="text-2xl font-display font-bold">Selamat datang!</h2>
          <p className="text-sm text-muted-foreground mt-1.5">Masuk ke akun Anda untuk melanjutkan</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="admin@restokasir.com"
                className="input-field mt-1.5"
                defaultValue="admin@restokasir.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  defaultValue="password123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded border-border" defaultChecked />
                <span className="text-muted-foreground text-xs">Ingat saya</span>
              </label>
              <button type="button" className="text-xs text-primary font-semibold hover:underline">
                Lupa password?
              </button>
            </div>

            <Link
              to="/admin"
              className="block w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center hover:opacity-90 transition-opacity mt-6"
            >
              Masuk
            </Link>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <Link
              to="/menu"
              className="block w-full py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-lg text-center hover:bg-secondary/80 transition-colors"
            >
              Mode Pelanggan (Self-Order)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
