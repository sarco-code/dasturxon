"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";
import { authStore } from "@/lib/auth";

export default function LoginPage() {
  const [phone, setPhone] = useState("+998");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message || "Login xato");

    authStore.setToken(data.token);
    authStore.setUser(data.user);
    if (data.user.role === "SUPER_ADMIN") window.location.href = "/super-admin";
    else window.location.href = "/restaurant-admin";
  };

  return (
    <main className="max-w-md mx-auto card p-6">
      <h2 className="text-2xl font-bold">Tizimga kirish</h2>
      <p className="text-sm opacity-80 mt-1">Demo: +998900000001 / superadmin123 yoki +998901234567 / admin12345</p>
      <input className="w-full mt-4 rounded-xl border p-3 text-black" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" />
      <input className="w-full mt-3 rounded-xl border p-3 text-black" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol" type="password" />
      {error && <p className="mt-3 text-red-600">{error}</p>}
      <button onClick={submit} className="mt-4 w-full rounded-xl bg-slate-900 text-white py-3">Kirish</button>
    </main>
  );
}
