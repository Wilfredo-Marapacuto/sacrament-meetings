import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-5xl font-bold">
            Sacrament Meeting Planner
          </h1>

          <p className="mb-8 text-lg text-slate-700">
            A planning application for bishoprics and branch leaders to
            organize sacrament meeting agendas and allow members to view
            current and previous meeting programs.
          </p>

          <div className="flex gap-4">
            <Link
              href="/meetings"
              className="rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              View Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/next.svg"
            alt="Sacrament Meeting Planner"
            width={420}
            height={120}
            priority
          />
        </div>
      </section>
    </main>
  );
}