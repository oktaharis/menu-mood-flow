import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingCart, Star, Plus, Minus, StickyNote, ChefHat } from "lucide-react";
import { menuItems, menuCategories, formatCurrency, type CartItem, type MenuItem } from "@/lib/data";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title: "Menu — RestoKasir Self-Order" }] }),
  component: MenuPage,
});

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered = menuItems.filter((item) => {
    const matchCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (item: MenuItem, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id && c.selectedVariant === variant);
      if (existing) return prev.map((c) => c.id === item.id && c.selectedVariant === variant ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1, selectedVariant: variant }];
    });
    setSelectedItem(null);
  };

  const updateQty = (id: string, variant: string | undefined, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id && c.selectedVariant === variant ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter((c) => c.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm">RestoKasir</span>
          </div>
          <div className="flex-1 relative ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 !py-2"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-accent px-3 py-1.5 rounded-full text-xs font-semibold text-accent-foreground">
              Meja 5
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-5">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-chip whitespace-nowrap ${activeCategory === cat ? "category-chip-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => item.variants ? setSelectedItem(item) : addToCart(item)}
              className="menu-card text-left"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                {item.popular && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" /> Popular
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-primary">{formatCurrency(item.price)}</span>
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Plus className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Variant modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-end sm:items-center justify-center" onClick={() => setSelectedItem(null)}>
          <div className="bg-card rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-4">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h3 className="font-semibold">{selectedItem.name}</h3>
                <p className="text-sm text-primary font-bold mt-1">{formatCurrency(selectedItem.price)}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pilih Varian</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.variants?.map((v) => (
                  <button
                    key={v}
                    onClick={() => addToCart(selectedItem, v)}
                    className="category-chip"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/cart"
              className="flex items-center justify-between w-full py-3 px-5 bg-primary text-primary-foreground rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm">{cartCount} item</span>
              </div>
              <span className="font-bold">{formatCurrency(cartTotal)}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
