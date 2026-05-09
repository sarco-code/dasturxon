"use client";

import { API_URL } from "@/lib/config";

export type SessionUser = { id: string; fullName: string; role: string; restaurantId?: string | null };

export const authStore = {
  setToken(token: string) { localStorage.setItem("token", token); },
  getToken() { return localStorage.getItem("token") || ""; },
  clear() { localStorage.removeItem("token"); localStorage.removeItem("user"); },
  setUser(user: SessionUser) { localStorage.setItem("user", JSON.stringify(user)); },
  getUser(): SessionUser | null {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }
};

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = authStore.getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (res.status === 401) {
    authStore.clear();
    if (typeof window !== "undefined") window.location.href = "/login";
  }
  return res;
}
