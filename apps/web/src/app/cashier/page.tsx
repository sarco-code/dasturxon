"use client";

import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { apiFetch } from "@/lib/auth";

export default function CashierPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<any>();

  const pay = async (method: string) => {
    const res = await apiFetch("/cashier/pay", {
      method: "POST",
      body: JSON.stringify({ orderId, method })
    });
    setResult(await res.json());
  };

  return (
    <AuthGate>
      <main className="card p-6 max-w-2xl">
        <h2 className="text-2xl font-bold">Kassir paneli</h2>
        <input className="mt-4 w-full rounded-xl border p-3 text-black" placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white" onClick={() => pay("NAQD")}>Naqd</button>
          <button className="px-3 py-2 rounded-lg bg-sky-700 text-white" onClick={() => pay("KARTA")}>Karta</button>
          <button className="px-3 py-2 rounded-lg bg-indigo-700 text-white" onClick={() => pay("CLICK")}>Click</button>
          <button className="px-3 py-2 rounded-lg bg-cyan-700 text-white" onClick={() => pay("PAYME")}>Payme</button>
        </div>
        {result?.receipt && <pre className="mt-4 text-xs overflow-auto">{JSON.stringify(result.receipt, null, 2)}</pre>}
      </main>
    </AuthGate>
  );
}
