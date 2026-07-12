"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav aria-label="Main navigation" className="flex gap-2">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>

      <Link href="/meetings" className={linkClass("/meetings")}>
        Meetings
      </Link>
    </nav>
  );
}