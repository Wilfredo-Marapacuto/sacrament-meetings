import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 4;

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const { query = "", page = "1" } = await searchParams;

  const currentPage = Math.max(Number(page) || 1, 1);
  const normalizedQuery = query.trim().toLowerCase();

  const allMeetings = await getMeetings();

  const filteredMeetings = normalizedQuery
    ? allMeetings.filter((meeting) => {
        return (
          meeting.date.toLowerCase().includes(normalizedQuery) ||
          meeting.meetingType.toLowerCase().includes(normalizedQuery) ||
          meeting.presiding.toLowerCase().includes(normalizedQuery) ||
          meeting.conducting.toLowerCase().includes(normalizedQuery)
        );
      })
    : allMeetings;

  const totalPages = Math.max(
    Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE),
    1,
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const meetings = filteredMeetings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    params.set("page", pageNumber.toString());

    return `/meetings?${params.toString()}`;
  };

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Sacrament Meetings
      </h1>

      <form className="mb-8 flex gap-3" action="/meetings" method="get">
        <input
          type="search"
          name="query"
          defaultValue={query}
          placeholder="Search by date, type, presiding, or conducting..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {meetings.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              href={createPageUrl(Math.max(safePage - 1, 1))}
              aria-disabled={safePage === 1}
              className={`rounded-lg px-4 py-2 font-medium ${
                safePage === 1
                  ? "pointer-events-none bg-slate-200 text-slate-500"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              Previous
            </Link>

            <p className="text-sm text-slate-600">
              Page {safePage} of {totalPages}
            </p>

            <Link
              href={createPageUrl(Math.min(safePage + 1, totalPages))}
              aria-disabled={safePage === totalPages}
              className={`rounded-lg px-4 py-2 font-medium ${
                safePage === totalPages
                  ? "pointer-events-none bg-slate-200 text-slate-500"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              Next
            </Link>
          </div>
        </>
      ) : (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700">
          No sacrament meetings match your search.
        </p>
      )}
    </main>
  );
}