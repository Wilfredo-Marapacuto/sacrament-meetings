import {
  deleteMeeting,
  getMeetingById,
  updateMeeting,
} from "@/lib/meetings-db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (Number.isNaN(meetingId)) {
      return Response.json(
        { error: "Invalid meeting id." },
        { status: 400 },
      );
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return Response.json(
        { error: "Meeting not found." },
        { status: 404 },
      );
    }

    return Response.json(meeting);
  } catch (error) {
    console.error("Error getting meeting:", error);

    return Response.json(
      { error: "Unable to retrieve meeting." },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (Number.isNaN(meetingId)) {
      return Response.json(
        { error: "Invalid meeting id." },
        { status: 400 },
      );
    }

    const body = await request.json();

    const meeting = await updateMeeting(meetingId, body);

    if (!meeting) {
      return Response.json(
        { error: "Meeting not found." },
        { status: 404 },
      );
    }

    return Response.json(meeting);
  } catch (error) {
    console.error("Error updating meeting:", error);

    return Response.json(
      { error: "Unable to update meeting." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (Number.isNaN(meetingId)) {
      return Response.json(
        { error: "Invalid meeting id." },
        { status: 400 },
      );
    }

    const deleted = await deleteMeeting(meetingId);

    if (!deleted) {
      return Response.json(
        { error: "Meeting not found." },
        { status: 404 },
      );
    }

    return Response.json({
      message: "Meeting deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting meeting:", error);

    return Response.json(
      { error: "Unable to delete meeting." },
      { status: 500 },
    );
  }
}