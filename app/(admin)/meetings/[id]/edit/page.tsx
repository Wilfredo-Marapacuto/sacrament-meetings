"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { MeetingType, SacramentMeeting } from "@/lib/types";

export default function EditMeetingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadMeeting() {
      try {
        const response = await fetch(`/api/meetings/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load meeting.");
        }

        const data: SacramentMeeting = await response.json();
        setMeeting(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load meeting.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMeeting();
  }, [id]);

  function updateField<K extends keyof SacramentMeeting>(
    field: K,
    value: SacramentMeeting[K],
  ) {
    setMeeting((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!meeting) {
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meeting),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Unable to update meeting.",
        );
      }

      router.push(`/meetings/${id}`);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update meeting.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting?",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/meetings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Unable to delete meeting.",
        );
      }

      router.push("/meetings");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete meeting.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-slate-700">Loading meeting...</p>
      </main>
    );
  }

  if (!meeting) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-red-700">
          {error || "Meeting not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          Update or delete this sacrament meeting program.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-4 text-red-800"
          >
            {error}
          </div>
        )}

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
            value={meeting.date}
            onChange={(event) =>
              updateField("date", event.target.value)
            }
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
            value={meeting.meetingType}
            onChange={(event) =>
              updateField(
                "meetingType",
                event.target.value as MeetingType,
              )
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
            value={meeting.presiding}
            onChange={(event) =>
              updateField("presiding", event.target.value)
            }
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
            value={meeting.conducting}
            onChange={(event) =>
              updateField("conducting", event.target.value)
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
            value={meeting.openingPrayer}
            onChange={(event) =>
              updateField("openingPrayer", event.target.value)
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
            value={meeting.closingPrayer}
            onChange={(event) =>
              updateField("closingPrayer", event.target.value)
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.push(`/meetings/${id}`)}
            disabled={isSaving || isDeleting}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
            className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete Meeting"}
          </button>
        </div>
      </form>
    </main>
  );
}