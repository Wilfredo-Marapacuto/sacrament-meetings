"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function authenticate(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/meetings/new";
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-12">
      <section className="w-full rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-slate-900">
          Administrator Login
        </h1>

        <p className="mt-2 text-slate-700">
          Sign in to manage sacrament meeting programs.
        </p>

        <form action={authenticate} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="username"
              name="username"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-800 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-900"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}