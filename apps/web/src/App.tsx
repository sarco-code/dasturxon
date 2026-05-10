import { Link, Route, Routes } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";
import LoginPage from "@/pages/LoginPage";
import SuperAdminPage from "@/pages/SuperAdminPage";
import RestaurantAdminPage from "@/pages/RestaurantAdminPage";
import KitchenPage from "@/pages/KitchenPage";
import WaiterPage from "@/pages/WaiterPage";
import CashierPage from "@/pages/CashierPage";
import ReservationPage from "@/pages/ReservationPage";

export default function App() {
  return (
    <div className="px-4 md:px-10 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dasturxon</h1>
          <p className="text-sm opacity-80">Restaurant SaaS Platform</p>
        </div>
        <nav className="flex gap-2 text-sm flex-wrap">
          <Link to="/" className="card px-3 py-2">Bosh sahifa</Link>
          <Link to="/super-admin" className="card px-3 py-2">Super Admin</Link>
          <Link to="/restaurant-admin" className="card px-3 py-2">Restoran Admin</Link>
          <Link to="/kitchen" className="card px-3 py-2">Oshxona</Link>
          <Link to="/waiter" className="card px-3 py-2">Ofitsiant</Link>
          <Link to="/cashier" className="card px-3 py-2">Kassir</Link>
        </nav>
        <ThemeToggle />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/super-admin" element={<SuperAdminPage />} />
        <Route path="/restaurant-admin" element={<RestaurantAdminPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/waiter" element={<WaiterPage />} />
        <Route path="/cashier" element={<CashierPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </div>
  );
}
