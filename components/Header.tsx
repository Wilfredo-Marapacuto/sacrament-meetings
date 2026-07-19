import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Sacrament Meeting Planner
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            Provo 10th Ward
          </h1>

          <p className="mt-1 text-sm text-slate-600">{currentDate}</p>
        </div>

        <NavLinks />
      </div>
    </header>
  );
}