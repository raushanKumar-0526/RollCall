import {
  LayoutDashboard,
  School,
  Users,
  BarChart3,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/super-admin",
  },
  {
    label: "Classes",
    icon: School,
    path: "/super-admin/classes",
  },
  {
    label: "Students",
    icon: Users,
    path: "/super-admin/students",
  },
  {
    label: "Attendance Analytics",
    icon: BarChart3,
    path: "/super-admin/analytics",
  },
  {
    label: "Low Attendance",
    icon: AlertTriangle,
    path: "/super-admin/low-attendance",
  },
  {
    label: "Reports",
    icon: FileText,
    path: "/super-admin/reports",
  },
  {
    label: "Audit Logs",
    icon: ShieldCheck,
    path: "/super-admin/audit-logs",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/super-admin/settings",
  },
];

function SuperAdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/super-admin") {
      return location.pathname === "/super-admin";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      navigate("/");
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 w-64 h-screen bg-white border-r border-slate-200 flex flex-col">

      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">
              face
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              VisionAttend
            </h1>

            <p className="text-[11px] text-slate-400 font-medium">
              INSTITUTIONAL ADMIN
            </p>
          </div>

        </div>

      </div>

      {/* Admin Profile */}
      <div className="px-4 pt-5">

        <div className="p-3 bg-indigo-50 rounded-xl">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              SA
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold text-slate-800 truncate">
                Super Admin
              </p>

              <p className="text-xs text-slate-500">
                Level 4 Clearance
              </p>

            </div>

            <ChevronDown
              size={16}
              className="text-slate-400"
            />

          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto">

        <p className="px-3 mb-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Administration
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >

                <Icon size={18} />

                <span>{item.label}</span>

              </button>
            );
          })}

        </div>

        {/* Permission Notice */}
        <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-100">

          <div className="flex items-start gap-2">

            <ShieldCheck
              size={17}
              className="text-emerald-500 mt-0.5"
            />

            <div>
              <p className="text-xs font-semibold text-slate-700">
                View Only Access
              </p>

              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Attendance marking and face enrollment are restricted to Class Admins.
              </p>
            </div>

          </div>

        </div>

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-100">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default SuperAdminSidebar;