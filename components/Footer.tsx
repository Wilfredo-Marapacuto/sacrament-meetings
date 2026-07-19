export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-center text-sm md:flex-row md:items-center md:justify-between md:text-left">
        <p>© {new Date().getFullYear()} Provo 10th Ward</p>

        <p>Sacrament Meeting Planner</p>
      </div>
    </footer>
  );
}