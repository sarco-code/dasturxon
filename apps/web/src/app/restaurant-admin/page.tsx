"use client";

import { useEffect, useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { apiFetch } from "@/lib/auth";

export default function RestaurantAdminPage() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    apiFetch("/restaurant-admin/dashboard").then((r) => r.json()).then(setData).catch(() => undefined);
  }, []);

  return (
    <AuthGate>
      <main className="grid md:grid-cols-2 gap-4">
        <article className="card p-5"><h3>Kunlik foyda</h3><p className="text-2xl font-bold">{(data?.dailyProfitUzs || 0).toLocaleString("uz-UZ")} UZS</p></article>
        <article className="card p-5"><h3>Oylik foyda</h3><p className="text-2xl font-bold">{(data?.monthlyProfitUzs || 0).toLocaleString("uz-UZ")} UZS</p></article>
        <article className="card p-5 md:col-span-2"><h3>Payment History</h3><p>{data?.paymentHistory?.length || 0} ta yozuv</p></article>
      </main>
    </AuthGate>
  );
}
