import { headers } from "next/headers";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine the application host.");
  }

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${id}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load the sacrament meeting.");
  }

  return response.json() as Promise<SacramentMeeting>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <main>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}