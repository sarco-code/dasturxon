"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";

export default function ReservationPage() {
  const [form, setForm] = useState({ customerName: "", phone: "+998", peopleCount: 2, tableId: "", reservedAt: "" });
  const [ok, setOk] = useState(false);

  const submit = async () => {
    await fetch(`${API_URL}/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setOk(true);
  };

  return (
    <main className="card p-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Stol band qilish</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <input className="rounded-xl border p-3 text-black" placeholder="Ism" onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
        <input className="rounded-xl border p-3 text-black" placeholder="Telefon +998901234567" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="rounded-xl border p-3 text-black" type="number" placeholder="Odam soni" onChange={(e) => setForm({ ...form, peopleCount: Number(e.target.value) })} />
        <input className="rounded-xl border p-3 text-black" placeholder="Stol ID" onChange={(e) => setForm({ ...form, tableId: e.target.value })} />
        <input className="rounded-xl border p-3 text-black md:col-span-2" type="datetime-local" onChange={(e) => setForm({ ...form, reservedAt: e.target.value })} />
      </div>
      <button className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white" onClick={submit}>Band qilish</button>
      {ok && <p className="mt-3 text-emerald-600">Rezervatsiya muvaffaqiyatli yuborildi.</p>}
    </main>
  );
}
