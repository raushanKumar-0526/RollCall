import {
  Search,
  Bell,
  ShieldCheck,
} from "lucide-react";

function SuperAdminTopbar() {
  return (
    <header className="fixed top-0 right-0 left-64 z-30 h-20 bg-white/95 backdrop-blur border-b border-slate-200">

      <div className="h-full px-6 flex items-center justify-between">

        {/* Search */}
        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search students, classes..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* System Status */}
          <div className="hidden md:flex items-center gap-2 text-sm">

            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <span className="text-slate-600">
              System Online
            </span>

          </div>

          {/* Security */}
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">

            <ShieldCheck
              size={16}
              className="text-emerald-600"
            />

            <span className="text-xs font-medium text-emerald-700">
              Secure Session
            </span>

          </div>

          {/* Notification */}
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg">

            <Bell size={20} />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />

          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">

            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
              SA
            </div>

            <div className="hidden lg:block">

              <p className="text-sm font-semibold text-slate-800">
                Super Admin
              </p>

              <p className="text-xs text-slate-400">
                Institutional Admin
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default SuperAdminTopbar;