"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLeaderPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [calling, setCalling] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leaders", {
        method: "POST",
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
          data.error || "Unable to create leader.",
        );
      }

      router.push("/leaders");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create leader.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Add Leader
        </h1>

        <p className="mt-2 text-slate-600">
          Add a bishopric or branch leader.
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Add Leader"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/leaders")}
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}