import {
  deleteLeader,
  getLeaderById,
  updateLeader,
} from "@/lib/leaders-db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;
  const leaderId = Number(id);

  if (Number.isNaN(leaderId)) {
    return Response.json(
      { error: "Invalid leader id." },
      { status: 400 },
    );
  }

  const leader = await getLeaderById(leaderId);

  if (!leader) {
    return Response.json(
      { error: "Leader not found." },
      { status: 404 },
    );
  }

  return Response.json(leader);
}

export async function PUT(
  request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;
  const leaderId = Number(id);

  if (Number.isNaN(leaderId)) {
    return Response.json(
      { error: "Invalid leader id." },
      { status: 400 },
    );
  }

  const body = await request.json();

  const leader = await updateLeader(leaderId, body);

  if (!leader) {
    return Response.json(
      { error: "Leader not found." },
      { status: 404 },
    );
  }

  return Response.json(leader);
}

export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;
  const leaderId = Number(id);

  if (Number.isNaN(leaderId)) {
    return Response.json(
      { error: "Invalid leader id." },
      { status: 400 },
    );
  }

  const deleted = await deleteLeader(leaderId);

  if (!deleted) {
    return Response.json(
      { error: "Leader not found." },
      { status: 404 },
    );
  }

  return Response.json({
    message: "Leader deleted successfully.",
  });
}