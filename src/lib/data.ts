import foodNasiGoreng from "@/assets/food-nasi-goreng.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodLatte from "@/assets/food-latte.jpg";
import foodSalmon from "@/assets/food-salmon.jpg";
import foodSmoothie from "@/assets/food-smoothie.jpg";
import foodFries from "@/assets/food-fries.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: string[];
  popular?: boolean;
  stock: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  table: number;
  items: CartItem[];
  status: "pending" | "preparing" | "ready" | "served" | "paid";
  total: number;
  createdAt: string;
  paymentMethod?: string;
}

export const menuCategories = [
  "Semua",
  "Makanan Utama",
  "Snack",
  "Minuman",
  "Dessert",
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur mata sapi, ayam, dan sayuran segar",
    price: 35000,
    image: foodNasiGoreng,
    category: "Makanan Utama",
    variants: ["Regular", "Pedas", "Extra Pedas"],
    popular: true,
    stock: 45,
  },
  {
    id: "2",
    name: "Beef Burger Deluxe",
    description: "Burger daging sapi premium dengan keju leleh dan saus spesial",
    price: 55000,
    image: foodBurger,
    category: "Makanan Utama",
    variants: ["Single", "Double", "Triple"],
    popular: true,
    stock: 32,
  },
  {
    id: "3",
    name: "Caffè Latte",
    description: "Espresso dengan susu steamed dan latte art yang cantik",
    price: 28000,
    image: foodLatte,
    category: "Minuman",
    variants: ["Hot", "Iced"],
    popular: true,
    stock: 120,
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description: "Salmon panggang dengan lemon butter sauce dan asparagus",
    price: 89000,
    image: foodSalmon,
    category: "Makanan Utama",
    variants: ["Medium", "Well Done"],
    stock: 15,
  },
  {
    id: "5",
    name: "Smoothie Bowl",
    description: "Acai smoothie bowl dengan granola, buah segar, dan kelapa",
    price: 42000,
    image: foodSmoothie,
    category: "Dessert",
    popular: true,
    stock: 28,
  },
  {
    id: "6",
    name: "Crispy Fries",
    description: "Kentang goreng renyah dengan saus pilihan",
    price: 22000,
    image: foodFries,
    category: "Snack",
    variants: ["Original", "Cheese", "BBQ"],
    stock: 60,
  },
];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

export const recentOrders: Order[] = [
  { id: "ORD-001", table: 5, items: [], status: "preparing", total: 125000, createdAt: "14:23" },
  { id: "ORD-002", table: 12, items: [], status: "ready", total: 89000, createdAt: "14:18" },
  { id: "ORD-003", table: 3, items: [], status: "served", total: 210000, createdAt: "14:10" },
  { id: "ORD-004", table: 8, items: [], status: "paid", total: 156000, createdAt: "13:55" },
  { id: "ORD-005", table: 1, items: [], status: "pending", total: 78000, createdAt: "14:25" },
];

export const salesData = [
  { name: "Sen", sales: 4200000 },
  { name: "Sel", sales: 3800000 },
  { name: "Rab", sales: 5100000 },
  { name: "Kam", sales: 4700000 },
  { name: "Jum", sales: 6200000 },
  { name: "Sab", sales: 7800000 },
  { name: "Min", sales: 7100000 },
];

export const hourlySales = [
  { hour: "08", orders: 12 },
  { hour: "09", orders: 18 },
  { hour: "10", orders: 25 },
  { hour: "11", orders: 38 },
  { hour: "12", orders: 52 },
  { hour: "13", orders: 45 },
  { hour: "14", orders: 35 },
  { hour: "15", orders: 22 },
  { hour: "16", orders: 28 },
  { hour: "17", orders: 32 },
  { hour: "18", orders: 48 },
  { hour: "19", orders: 55 },
  { hour: "20", orders: 42 },
  { hour: "21", orders: 25 },
];

export const paymentMethods = [
  { name: "QRIS", value: 42, color: "var(--color-chart-1)" },
  { name: "Cash", value: 28, color: "var(--color-chart-2)" },
  { name: "Debit", value: 18, color: "var(--color-chart-3)" },
  { name: "Credit", value: 12, color: "var(--color-chart-4)" },
];

export const stockItems = [
  { id: "STK-001", name: "Beras Premium", unit: "kg", stock: 25, minStock: 10, status: "safe" as const },
  { id: "STK-002", name: "Daging Sapi", unit: "kg", stock: 8, minStock: 5, status: "safe" as const },
  { id: "STK-003", name: "Biji Kopi Arabica", unit: "kg", stock: 3, minStock: 5, status: "low" as const },
  { id: "STK-004", name: "Susu Full Cream", unit: "liter", stock: 12, minStock: 8, status: "safe" as const },
  { id: "STK-005", name: "Roti Burger", unit: "pcs", stock: 15, minStock: 20, status: "low" as const },
  { id: "STK-006", name: "Salmon Fillet", unit: "kg", stock: 2, minStock: 3, status: "critical" as const },
  { id: "STK-007", name: "Kentang", unit: "kg", stock: 18, minStock: 10, status: "safe" as const },
  { id: "STK-008", name: "Telur Ayam", unit: "butir", stock: 120, minStock: 50, status: "safe" as const },
];
