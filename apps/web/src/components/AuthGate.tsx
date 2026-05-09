"use client";

import { ReactNode, useEffect, useState } from "react";
import { authStore, apiFetch } from "@/lib/auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!authStore.getToken()) {
        window.location.href = "/login";
        return;
      }
      const res = await apiFetch("/auth/me");
      if (res.status === 402) {
        setBlocked("Obuna muddati tugagan");
      }
      setLoading(false);
    };
    run();
  }, []);

  if (loading) return <div className="card p-6">Yuklanmoqda...</div>;
  if (blocked) return <div className="card p-6 text-red-600 text-xl font-semibold">{blocked}</div>;
  return <>{children}</>;
}
