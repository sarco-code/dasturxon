"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "@/lib/config";
import { AuthGate } from "@/components/AuthGate";
import { apiFetch } from "@/lib/auth";

export default function KitchenPage() {
  const [events, setEvents] = useState<string[]>([]);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const s = io(SOCKET_URL);
    s.on("order:new", (o: any) => setEvents((p) => [`Yangi order: ${o.id}`, ...p]));
    s.on("kitchen:update", (o: any) => setEvents((p) => [`Jarayon: ${o.id} - ${o.status}`, ...p]));
    return () => { s.disconnect(); };
  }, []);

  const action = async (type: "take" | "ready") => {
    await apiFetch(`/workflow/kitchen/orders/${orderId}/${type}`, { method: "PATCH" });
  };

  return (
    <AuthGate>
      <main className="card p-6">
        <h2 className="text-2xl font-bold">Oshxona Paneli</h2>
        <input className="mt-3 rounded-xl border p-3 text-black w-full" placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-2 rounded-lg bg-orange-600 text-white" onClick={() => action("take")}>Tayyorlanmoqda</button>
          <button className="px-3 py-2 rounded-lg bg-emerald-700 text-white" onClick={() => action("ready")}>Tayyor</button>
        </div>
        <ul className="mt-4 space-y-2 text-sm">{events.map((e, i) => <li key={i} className="card p-2">{e}</li>)}</ul>
      </main>
    </AuthGate>
  );
}

