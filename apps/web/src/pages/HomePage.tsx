import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="grid gap-6">
      <section className="card p-6 md:p-10">
        <h2 className="text-3xl md:text-5xl font-extrabold">Dasturxon: restoranlar uchun premium SaaS</h2>
        <p className="mt-4 text-base md:text-lg opacity-90">Super Admin + Restoran Admin, obuna boshqaruvi, real-time buyurtma workflow, avtomatik chek va analytics.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <Link to="/super-admin" className="px-4 py-3 rounded-xl bg-slate-900 text-white">Super Admin Panel</Link>
          <Link to="/restaurant-admin" className="px-4 py-3 rounded-xl bg-emerald-700 text-white">Restoran Admin Panel</Link>
          <Link to="/menu" className="px-4 py-3 rounded-xl bg-amber-600 text-white">Mijoz Menusi</Link>
        </div>
      </section>
    </main>
  );
}
