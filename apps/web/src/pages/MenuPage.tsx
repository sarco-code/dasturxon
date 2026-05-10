"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/lib/config";

type Product = { id: string; name: string; description: string; imageUrl: string; priceUzs: number; isAvailable: boolean };
type Category = { id: string; name: string; menuItems: Product[] };

export default function MenuPage() {
  const [data, setData] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`${API_URL}/public/menu/osh-markazi`).then((r) => r.json()).then((x) => setData(x.categories || []));
  }, []);

  const filtered = useMemo(() => data.map((c) => ({ ...c, menuItems: c.menuItems.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) })), [data, query]);

  const total = Object.entries(cart).reduce((s, [id, q]) => {
    const p = data.flatMap((c) => c.menuItems).find((x) => x.id === id);
    return s + (p?.priceUzs || 0) * q;
  }, 0);

  return (
    <main className="grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 card p-5">
        <input className="w-full rounded-xl border p-3 text-black" placeholder="Qidiruv..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="mt-4 space-y-6">
          {filtered.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-xl font-bold mb-3">{cat.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.menuItems.map((p) => (
                  <article key={p.id} className="card p-4">
                    <img src={p.imageUrl} alt={p.name} className="h-36 w-full object-cover rounded-xl" />
                    <h4 className="font-semibold mt-2">{p.name}</h4>
                    <p className="text-sm opacity-80">{p.description}</p>
                    <p className="font-bold mt-2">{p.priceUzs.toLocaleString("uz-UZ")} UZS</p>
                    <button className="mt-2 px-3 py-2 rounded-lg bg-amber-500" onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))}>Savatchaga</button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="card p-5 h-fit sticky top-4">
        <h3 className="text-lg font-bold">Savatcha</h3>
        <p className="mt-3">Jami: {total.toLocaleString("uz-UZ")} UZS</p>
        <button className="mt-3 w-full py-2 rounded-xl bg-emerald-600 text-white">Buyurtma berish</button>
      </aside>
    </main>
  );
}
