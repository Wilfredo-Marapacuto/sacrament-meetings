import {
  addMeeting,
  getMeetings,
  getMeetingsByDate,
} from "@/lib/meetings-db";

import type {
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "@/lib/types";

interface CreateMeetingBody {
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (date) {
      const meetings = await getMeetingsByDate(date);
      return Response.json(meetings);
    }

    const meetings = await getMeetings();

    return Response.json(meetings);
  } catch (error) {
    console.error("Error getting meetings:", error);

    return Response.json(
      { error: "Unable to retrieve meetings." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateMeetingBody;

    const {
      date,
      meetingType,
      presiding,
      conducting,
      announcements = [],
      openingHymn,
      openingPrayer,
      wardBusiness = [],
      stakeBusiness = false,
      sacramentHymn,
      speakers = [],
      closingHymn,
      closingPrayer,
    } = body;

    if (
      !date ||
      !meetingType ||
      !presiding ||
      !conducting ||
      !openingHymn ||
      !openingPrayer ||
      !sacramentHymn ||
      !closingHymn ||
      !closingPrayer
    ) {
      return Response.json(
        {
          error: "Required meeting information is missing.",
        },
        { status: 400 },
      );
    }

    if (
      !openingHymn.number ||
      !openingHymn.title ||
      !sacramentHymn.number ||
      !sacramentHymn.title ||
      !closingHymn.number ||
      !closingHymn.title
    ) {
      return Response.json(
        {
          error: "Each hymn requires a number and title.",
        },
        { status: 400 },
      );
    }

    const meeting = await addMeeting({
      date,
      meetingType,
      presiding,
      conducting,
      announcements,
      openingHymn,
      openingPrayer,
      wardBusiness,
      stakeBusiness,
      sacramentHymn,
      speakers,
      closingHymn,
      closingPrayer,
    });

    return Response.json(meeting, { status: 201 });
  } catch (error) {
    console.error("Error creating meeting:", error);

    return Response.json(
      { error: "Unable to create meeting." },
      { status: 500 },
    );
  }
}