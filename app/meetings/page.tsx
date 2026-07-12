import { headers } from "next/headers";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine the application host.");
  }

  const response = await fetch(`${protocol}://${host}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load sacrament meetings.");
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Sacrament Meetings
      </h1>

      {meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700">
          No sacrament meetings are available.
        </p>
      )}
    </main>
  );
}