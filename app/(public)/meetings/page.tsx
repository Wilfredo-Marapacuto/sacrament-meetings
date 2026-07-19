import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query ?? "";
  const currentPage =
    Number(resolvedSearchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Sacrament Meetings
      </h1>

      <div className="mb-8">
        <MeetingSearch />
      </div>

      {meetings.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </div>

          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700">
          No sacrament meetings match your search.
        </p>
      )}
    </main>
  );
}