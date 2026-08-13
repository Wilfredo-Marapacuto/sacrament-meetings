import { neon } from "@neondatabase/serverless";

export interface Leader {
  id: number;
  name: string;
  calling: string;
  email: string;
}

interface LeaderRow {
  id: number;
  name: string;
  calling: string;
  email: string;
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined.");
  }

  return neon(databaseUrl);
}

function mapLeader(row: LeaderRow): Leader {
  return {
    id: row.id,
    name: row.name,
    calling: row.calling,
    email: row.email,
  };
}

export async function getLeaders(): Promise<Leader[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      name,
      calling,
      email
    FROM leaders
    ORDER BY name ASC
  `;

  return (rows as LeaderRow[]).map(mapLeader);
}

export async function getLeaderById(
  id: number,
): Promise<Leader | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      name,
      calling,
      email
    FROM leaders
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapLeader(rows[0] as LeaderRow);
}

export async function addLeader(
  data: Omit<Leader, "id">,
): Promise<Leader> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO leaders (
      name,
      calling,
      email
    )
    VALUES (
      ${data.name},
      ${data.calling},
      ${data.email}
    )
    RETURNING
      id,
      name,
      calling,
      email
  `;

  return mapLeader(rows[0] as LeaderRow);
}

export async function updateLeader(
  id: number,
  updates: Partial<Omit<Leader, "id">>,
): Promise<Leader | null> {
  const existingLeader = await getLeaderById(id);

  if (!existingLeader) {
    return null;
  }

  const sql = getSql();

  const updatedLeader: Leader = {
    ...existingLeader,
    ...updates,
    id,
  };

  const rows = await sql`
    UPDATE leaders
    SET
      name = ${updatedLeader.name},
      calling = ${updatedLeader.calling},
      email = ${updatedLeader.email}
    WHERE id = ${id}
    RETURNING
      id,
      name,
      calling,
      email
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapLeader(rows[0] as LeaderRow);
}

export async function deleteLeader(
  id: number,
): Promise<boolean> {
  const sql = getSql();

  const rows = await sql`
    DELETE FROM leaders
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}