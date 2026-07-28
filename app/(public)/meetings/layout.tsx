import type { ReactNode } from "react";
import Link from "next/link";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        <Link
          href="/meetings"
          className="rounded bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
        >
          All Meetings
        </Link>

        <Link
          href="/meetings/current"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Current Meeting
        </Link>
      </div>

      {children}
    </section>
  );
}