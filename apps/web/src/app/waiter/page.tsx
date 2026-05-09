"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "@/lib/config";
import { AuthGate } from "@/components/AuthGate";
import { apiFetch } from "@/lib/auth";

export default function WaiterPage() {
  const [orderId, setOrderId] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const s = io(SOCKET_URL);
    s.on("waiter:notification", (x: any) => setNotes((p) => [`${x.orderId}: ${x.message}`, ...p]));
    s.on("order:status", (x: any) => setNotes((p) => [`Status: ${x.id} -> ${x.status}`, ...p]));
    return () => { s.disconnect(); };
  }, []);

  const delivered = async () => {
    await apiFetch(`/workflow/waiter/orders/${orderId}/deliver`, { method: "PATCH" });
  };

  return (
    <AuthGate>
      <main className="card p-6">
        <h2 className="text-2xl font-bold">Ofitsiant Paneli</h2>
        <input className="mt-3 rounded-xl border p-3 text-black w-full" placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <button className="mt-3 px-4 py-2 rounded-lg bg-sky-700 text-white" onClick={delivered}>Topshirildi</button>
        <ul className="mt-4 space-y-2 text-sm">{notes.map((n, i) => <li key={i} className="card p-2">{n}</li>)}</ul>
      </main>
    </AuthGate>
  );
}

