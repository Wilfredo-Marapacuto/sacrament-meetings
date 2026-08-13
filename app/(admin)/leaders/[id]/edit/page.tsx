"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Leader {
  id: number;
  name: string;
  calling: string;
  email: string;
}

export default function EditLeaderPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [name, setName] = useState("");
  const [calling, setCalling] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadLeader() {
      try {
        const response = await fetch(`/api/leaders/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load leader.");
        }

        const leader: Leader = await response.json();

        setName(leader.name);
        setCalling(leader.calling);
        setEmail(leader.email);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load leader.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadLeader();
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/leaders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          calling,
          email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Unable to update leader.",
        );
      }

      router.push("/leaders");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update leader.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this leader?",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/leaders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Unable to delete leader.",
        );
      }

      router.push("/leaders");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete leader.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <p className="text-slate-700">Loading leader...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Leader
        </h1>

        <p className="mt-2 text-slate-600">
          Update or delete leadership information.
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
            htmlFor="name"
            className="mb-2 block font-semibold text-slate-800"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="calling"
            className="mb-2 block font-semibold text-slate-800"
          >
            Calling
          </label>

          <input
            id="calling"
            type="text"
            required
            value={calling}
            onChange={(event) => setCalling(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-slate-800"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting || isDeleting}
            className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/leaders")}
            disabled={isSubmitting || isDeleting}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting || isDeleting}
            className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete Leader"}
          </button>
        </div>
      </form>
    </main>
  );
}