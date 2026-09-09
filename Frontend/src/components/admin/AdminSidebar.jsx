import {
  LayoutDashboard,
  Users,
  ScanFace,
  Camera,
  ClipboardCheck,
  BarChart3,
  UserCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/class-admin",
  },
  {
    label: "Students",
    icon: Users,
    path: "/class-admin/students",
  },
  {
    label: "Face Enrollment",
    icon: ScanFace,
    path: "/class-admin/enrollment",
  },
  {
    label: "Live Attendance",
    icon: Camera,
    path: "/class-admin/attendance",
  },
  {
    label: "Attendance Records",
    icon: ClipboardCheck,
    path: "/class-admin/records",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/class-admin/reports",
  },
];

function AdminSidebar() {

  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <span className="material-symbols-outlined">
            face
          </span>
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            VisionAttend
          </h1>

          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Super Admin
          </p>
        </div>

      </div>


      {/* Class information */}
      <div className="mx-4 mt-5 rounded-xl bg-blue-50 p-4">

        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
          Assigned Class
        </p>

        <p className="mt-1 text-base font-bold text-slate-900">
          MCA Final Year
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          Section A
        </p>

      </div>


      {/* Navigation */}
      <nav className="mt-6 flex-1 px-3">

        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management
        </p>

        <div className="space-y-1">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium  transition ${
                    index === 0
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                <Icon className="h-[18px] w-[18px]" />

                <span className="flex-1 text-left">
                  {item.label}
                </span>

                {index === 0 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            );
          })}

        </div>

      </nav>


      {/* Bottom */}
      <div className="border-t border-slate-200 p-3">

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">

          <UserCircle className="h-[18px] w-[18px]" />

          Profile

        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50">

          <LogOut className="h-[18px] w-[18px]" />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;