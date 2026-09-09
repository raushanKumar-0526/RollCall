import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

function AdminTopbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      {/* Search */}
      <div className="relative w-80">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search students..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />

      </div>


      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Status */}
        <div className="hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 sm:flex">

          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-xs font-semibold text-green-700">
            System Online
          </span>

        </div>


        {/* Notification */}
        <button className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">

          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />

        </button>


        {/* User */}
        <button className="flex items-center gap-3 border-l border-slate-200 pl-5">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            CA
          </div>

          <div className="hidden text-left sm:block">

            <p className="text-sm font-semibold text-slate-900">
              Class Admin
            </p>

            <p className="text-[11px] text-slate-500">
              Class In-charge
            </p>

          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />

        </button>

      </div>

    </header>
  );
}

export default AdminTopbar;