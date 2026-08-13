"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { MeetingType } from "@/lib/types";

export default function NewMeetingPage() {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [meetingType, setMeetingType] =
    useState<MeetingType>("regular");
  const [presiding, setPresiding] = useState("");
  const [conducting, setConducting] = useState("");
  const [openingHymnNumber, setOpeningHymnNumber] = useState("");
  const [openingHymnTitle, setOpeningHymnTitle] = useState("");
  const [openingPrayer, setOpeningPrayer] = useState("");
  const [sacramentHymnNumber, setSacramentHymnNumber] = useState("");
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerTopic, setSpeakerTopic] = useState("");
  const [closingHymnNumber, setClosingHymnNumber] = useState("");
  const [closingHymnTitle, setClosingHymnTitle] = useState("");
  const [closingPrayer, setClosingPrayer] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const speakers =
        speakerName.trim() || speakerTopic.trim()
          ? [
              {
                name: speakerName.trim(),
                topic: speakerTopic.trim(),
                type: "speaker" as const,
              },
            ]
          : [];

      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          meetingType,
          presiding,
          conducting,
          announcements: [],
          openingHymn: {
            number: Number(openingHymnNumber),
            title: openingHymnTitle,
          },
          openingPrayer,
          wardBusiness: [],
          stakeBusiness: false,
          sacramentHymn: {
            number: Number(sacramentHymnNumber),
            title: sacramentHymnTitle,
          },
          speakers,
          closingHymn: {
            number: Number(closingHymnNumber),
            title: closingHymnTitle,
          },
          closingPrayer,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Unable to create meeting.",
        );
      }

      const meeting = await response.json();

      router.push(`/meetings/${meeting.id}`);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create meeting.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          Create a new sacrament meeting program.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800"
          >
            {error}
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Meeting Information
          </h2>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block font-semibold text-slate-800"
            >
              Date
            </label>

            <input
              id="date"
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="meetingType"
              className="mb-2 block font-semibold text-slate-800"
            >
              Meeting Type
            </label>

            <select
              id="meetingType"
              value={meetingType}
              onChange={(event) =>
                setMeetingType(event.target.value as MeetingType)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
              <option value="special">Special</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="presiding"
              className="mb-2 block font-semibold text-slate-800"
            >
              Presiding
            </label>

            <input
              id="presiding"
              type="text"
              required
              value={presiding}
              onChange={(event) => setPresiding(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="conducting"
              className="mb-2 block font-semibold text-slate-800"
            >
              Conducting
            </label>

            <input
              id="conducting"
              type="text"
              required
              value={conducting}
              onChange={(event) => setConducting(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Opening
          </h2>

          <div>
            <label
              htmlFor="openingHymnNumber"
              className="mb-2 block font-semibold text-slate-800"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              type="number"
              min="1"
              required
              value={openingHymnNumber}
              onChange={(event) =>
                setOpeningHymnNumber(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="mb-2 block font-semibold text-slate-800"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              type="text"
              required
              value={openingHymnTitle}
              onChange={(event) =>
                setOpeningHymnTitle(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="openingPrayer"
              className="mb-2 block font-semibold text-slate-800"
            >
              Opening Prayer
            </label>

            <input
              id="openingPrayer"
              type="text"
              required
              value={openingPrayer}
              onChange={(event) =>
                setOpeningPrayer(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Sacrament
          </h2>

          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="mb-2 block font-semibold text-slate-800"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              type="number"
              min="1"
              required
              value={sacramentHymnNumber}
              onChange={(event) =>
                setSacramentHymnNumber(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="mb-2 block font-semibold text-slate-800"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              type="text"
              required
              value={sacramentHymnTitle}
              onChange={(event) =>
                setSacramentHymnTitle(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Speaker
          </h2>

          <div>
            <label
              htmlFor="speakerName"
              className="mb-2 block font-semibold text-slate-800"
            >
              Speaker Name
            </label>

            <input
              id="speakerName"
              type="text"
              value={speakerName}
              onChange={(event) => setSpeakerName(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="speakerTopic"
              className="mb-2 block font-semibold text-slate-800"
            >
              Speaker Topic
            </label>

            <input
              id="speakerTopic"
              type="text"
              value={speakerTopic}
              onChange={(event) => setSpeakerTopic(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Closing
          </h2>

          <div>
            <label
              htmlFor="closingHymnNumber"
              className="mb-2 block font-semibold text-slate-800"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              type="number"
              min="1"
              required
              value={closingHymnNumber}
              onChange={(event) =>
                setClosingHymnNumber(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="mb-2 block font-semibold text-slate-800"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              type="text"
              required
              value={closingHymnTitle}
              onChange={(event) =>
                setClosingHymnTitle(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="closingPrayer"
              className="mb-2 block font-semibold text-slate-800"
            >
              Closing Prayer
            </label>

            <input
              id="closingPrayer"
              type="text"
              required
              value={closingPrayer}
              onChange={(event) =>
                setClosingPrayer(event.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Meeting"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/meetings")}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}