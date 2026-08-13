import { neon } from "@neondatabase/serverless";
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined.");
  }

  return neon(databaseUrl);
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      date::text,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return (rows as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const sql = getSql();
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingsByDate(
  date: string,
): Promise<SacramentMeeting[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      date::text,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE date = ${date}
    ORDER BY date ASC
  `;

  return (rows as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      date::text,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0] as MeetingRow);
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${JSON.stringify(data.announcements)},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING
      id,
      date::text,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  return mapMeeting(rows[0] as MeetingRow);
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  const existingMeeting = await getMeetingById(id);

  if (!existingMeeting) {
    return null;
  }

  const sql = getSql();

  const updatedMeeting: SacramentMeeting = {
    ...existingMeeting,
    ...updates,
    id,
  };

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${updatedMeeting.date},
      meeting_type = ${updatedMeeting.meetingType},
      presiding = ${updatedMeeting.presiding},
      conducting = ${updatedMeeting.conducting},
      announcements = ${JSON.stringify(updatedMeeting.announcements)},
      opening_hymn = ${JSON.stringify(updatedMeeting.openingHymn)},
      opening_prayer = ${updatedMeeting.openingPrayer},
      ward_business = ${JSON.stringify(updatedMeeting.wardBusiness)},
      stake_business = ${updatedMeeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(updatedMeeting.sacramentHymn)},
      speakers = ${JSON.stringify(updatedMeeting.speakers)},
      closing_hymn = ${JSON.stringify(updatedMeeting.closingHymn)},
      closing_prayer = ${updatedMeeting.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      date::text,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0] as MeetingRow);
}

export async function deleteMeeting(
  id: number,
): Promise<boolean> {
  const sql = getSql();

  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}