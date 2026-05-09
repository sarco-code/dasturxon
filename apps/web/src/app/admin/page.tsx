"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

export default function AdminPage() {
  const [stats, setStats] = useState<{ orderCount: number; dailyRevenueUzs: number; topFoods: { productId: string; _sum: { quantity: number | null } }[] }>();

  useEffect(() => {
    fetch(`${API_URL}/dashboard`, { headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` } })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => undefined);
  }, []);

  return (
    <main className="grid md:grid-cols-3 gap-4">
      <article className="card p-5"><h3>Kunlik tushum</h3><p className="text-2xl font-bold">{stats?.dailyRevenueUzs?.toLocaleString("uz-UZ") || 0} UZS</p></article>
      <article className="card p-5"><h3>Buyurtmalar</h3><p className="text-2xl font-bold">{stats?.orderCount || 0}</p></article>
      <article className="card p-5"><h3>Top ovqatlar</h3><p>{stats?.topFoods?.map((x) => `${x.productId}:${x._sum.quantity || 0}`).join(", ") || "-"}</p></article>
    </main>
  );
}
