import {
  addLeader,
  getLeaders,
} from "@/lib/leaders-db";

export async function GET() {
  try {
    const leaders = await getLeaders();

    return Response.json(leaders);
  } catch (error) {
    console.error("Error getting leaders:", error);

    return Response.json(
      { error: "Unable to retrieve leaders." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, calling, email } = body;

    if (!name || !calling || !email) {
      return Response.json(
        {
          error: "Name, calling, and email are required.",
        },
        { status: 400 },
      );
    }

    const leader = await addLeader({
      name,
      calling,
      email,
    });

    return Response.json(leader, { status: 201 });
  } catch (error) {
    console.error("Error creating leader:", error);

    return Response.json(
      { error: "Unable to create leader." },
      { status: 500 },
    );
  }
}