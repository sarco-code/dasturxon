"use client";

import { useEffect, useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { apiFetch } from "@/lib/auth";

export default function SuperAdminPage() {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    apiFetch("/super-admin/stats").then((r) => r.json()).then(setStats).catch(() => undefined);
  }, []);

  return (
    <AuthGate>
      <main className="grid md:grid-cols-3 gap-4">
        <article className="card p-5"><h3>Jami restoranlar</h3><p className="text-2xl font-bold">{stats?.totalRestaurants || 0}</p></article>
        <article className="card p-5"><h3>Aktiv obunalar</h3><p className="text-2xl font-bold">{stats?.activeSubs || 0}</p></article>
        <article className="card p-5"><h3>Tugagan obunalar</h3><p className="text-2xl font-bold">{stats?.expiredSubs || 0}</p></article>
        <article className="card p-5"><h3>Kunlik platforma foydasi</h3><p className="text-2xl font-bold">{(stats?.dailyProfitUzs || 0).toLocaleString("uz-UZ")} UZS</p></article>
        <article className="card p-5"><h3>Oylik platforma foydasi</h3><p className="text-2xl font-bold">{(stats?.monthlyProfitUzs || 0).toLocaleString("uz-UZ")} UZS</p></article>
      </main>
    </AuthGate>
  );
}
