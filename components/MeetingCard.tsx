import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          {meeting.date}
        </h2>

        <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 capitalize">
          {meeting.meetingType}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-700">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p>
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded bg-blue-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-900"
      >
        View Meeting
      </Link>
    </article>
  );
}