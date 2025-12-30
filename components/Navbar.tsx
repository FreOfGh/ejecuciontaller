"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-neutral-800">
        🍽️ Restaurante Gourmet
      </Link>
      <div className="flex gap-3">
        <Link href="/admin">
          <Button variant="outline">Administrar menu</Button>
        </Link>
        <Link href="/admin/mesas">
          <Button variant="outline">Administrar mesas</Button>
        </Link>

      </div>
    </nav>
  );
}
