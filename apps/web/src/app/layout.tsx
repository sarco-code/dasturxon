import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Dasturxon SaaS",
  description: "O'zbekiston restoranlari uchun professional SaaS restaurant management"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body className="px-4 md:px-10 py-6">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dasturxon</h1>
            <p className="text-sm opacity-80">Restaurant SaaS Platform</p>
          </div>
          <nav className="flex gap-2 text-sm">
            <Link href="/" className="card px-3 py-2">Bosh sahifa</Link>
            <Link href="/super-admin" className="card px-3 py-2">Super Admin</Link>
            <Link href="/restaurant-admin" className="card px-3 py-2">Restoran Admin</Link>
            <Link href="/kitchen" className="card px-3 py-2">Oshxona</Link>
            <Link href="/waiter" className="card px-3 py-2">Ofitsiant</Link>
            <Link href="/cashier" className="card px-3 py-2">Kassir</Link>
          </nav>
          <ThemeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
