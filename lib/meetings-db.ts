import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: [
      "Ward temple night will be held on May 10.",
      "Youth activity will be Wednesday at 7:00 PM.",
    ],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of the new Primary president.",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Brother Davis",
        topic: "Personal testimony",
        type: "speaker",
      },
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },
    closingPrayer: "Brother Miller",
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    announcements: [
      "Relief Society activity will be Thursday at 6:30 PM.",
      "Tithing settlement appointments are available online.",
    ],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Johnson",
    wardBusiness: [
      {
        description: "Release of Brother Clark as Sunday School teacher.",
      },
      {
        description: "Calling of Sister Evans as Sunday School teacher.",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 170,
      title: "God, Our Father, Hear Us Pray",
    },
    speakers: [
      {
        name: "Sister Anderson",
        topic: "Keeping covenants",
        type: "speaker",
      },
      {
        name: "Brother Wilson",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 301,
      title: "I Am a Child of God",
    },
    closingPrayer: "Sister Thompson",
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: [
      "Ward service project will be Saturday at 9:00 AM.",
      "Please submit names for the ward prayer list.",
    ],
    openingHymn: {
      number: 129,
      title: "Where Can I Turn for Peace?",
    },
    openingPrayer: "Brother Harris",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 173,
      title: "While of These Emblems We Partake",
    },
    speakers: [
      {
        name: "Sister Martinez",
        topic: "Ministering with love",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "Come, Follow Me",
        type: "musical-number",
      },
      {
        name: "Brother Lee",
        topic: "Serving others",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 223,
      title: "Have I Done Any Good?",
    },
    closingPrayer: "Sister Garcia",
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "stake",
    presiding: "President Roberts",
    conducting: "President Clark",
    announcements: [
      "Stake conference sessions begin Saturday at 6:00 PM.",
      "No regular sacrament meeting will be held today.",
    ],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Sister Moore",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 196,
      title: "Jesus, Once of Humble Birth",
    },
    speakers: [
      {
        name: "President Roberts",
        topic: "Strengthening families",
        type: "speaker",
      },
      {
        name: "Stake Youth Choir",
        topic: "I Know That My Redeemer Lives",
        type: "musical-number",
      },
      {
        name: "Sister Clark",
        topic: "Discipleship",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },
    closingPrayer: "Brother Peterson",
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Taylor",
    announcements: [
      "The ward building will be closed during general conference.",
      "Members are encouraged to watch all conference sessions.",
    ],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Sister Lewis",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "While of These Emblems We Partake",
    },
    speakers: [
      {
        name: "General Conference Broadcast",
        topic: "Messages from Church leaders",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 220,
      title: "Lord, I Would Follow Thee",
    },
    closingPrayer: "Brother White",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}