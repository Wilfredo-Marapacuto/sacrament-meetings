"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700">
          Previous
        </span>
      )}

      <span className="text-sm text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700">
          Next
        </span>
      )}
    </nav>
  );
}