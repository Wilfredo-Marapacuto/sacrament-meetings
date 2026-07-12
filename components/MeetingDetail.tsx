import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <section className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          {meeting.date} • {meeting.meetingType}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Leadership</h2>

          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>

          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Opening</h2>

          <p>
            <strong>Opening Hymn:</strong>{" "}
            {meeting.openingHymn.number} - {meeting.openingHymn.title}
          </p>

          <p>
            <strong>Opening Prayer:</strong>{" "}
            {meeting.openingPrayer}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Announcements
        </h2>

        {meeting.announcements?.length ? (
          <ul className="list-disc space-y-1 pl-6">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Ward Business
        </h2>

        {meeting.wardBusiness.length ? (
          <ul className="list-disc space-y-1 pl-6">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>
                {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}

        <p className="mt-3">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Sacrament Hymn
        </h2>

        <p>
          {meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Speakers & Musical Numbers
        </h2>

        <ul className="space-y-3">
          {meeting.speakers.map((speaker, index) => (
            <li
              key={index}
              className="rounded border border-slate-200 p-3"
            >
              <p>
                <strong>Name:</strong> {speaker.name}
              </p>

              <p>
                <strong>Topic:</strong>{" "}
                {speaker.topic || "Musical Number"}
              </p>

              <p>
                <strong>Type:</strong> {speaker.type}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-semibold">
            Closing Hymn
          </h2>

          <p>
            {meeting.closingHymn.number} -{" "}
            {meeting.closingHymn.title}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">
            Closing Prayer
          </h2>

          <p>{meeting.closingPrayer}</p>
        </div>
      </div>
    </section>
  );
}