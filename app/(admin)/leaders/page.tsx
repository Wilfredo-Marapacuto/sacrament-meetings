import Link from "next/link";
import { getLeaders } from "@/lib/leaders-db";

export const dynamic = "force-dynamic";

export default async function LeadersPage() {
  const leaders = await getLeaders();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Leaders
          </h1>

          <p className="mt-2 text-slate-600">
            Manage bishopric and branch leadership information.
          </p>
        </div>

        <Link
          href="/leaders/new"
          className="inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Add Leader
        </Link>
      </div>

      {leaders.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No leaders found
          </h2>

          <p className="mt-2 text-slate-600">
            Add a leader to begin managing leadership information.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    Calling
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {leaders.map((leader) => (
                  <tr key={leader.id}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                      {leader.name}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-slate-700">
                      {leader.calling}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {leader.email}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        href={`/leaders/${leader.id}/edit`}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}