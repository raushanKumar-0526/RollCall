import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  User,
  Clock3,
  FileEdit,
  UserPlus,
  Camera,
  LogIn,
  AlertTriangle,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const logsData = [
  {
    id: 1,
    user: "Dr. Anjali Sharma",
    role: "Class Admin",
    action: "Attendance Updated",
    description:
      "Attendance changed from Absent to Present",
    target: "Rahul Singh - MCA003",
    time: "08 Sep 2026, 10:42 AM",
    type: "attendance",
  },
  {
    id: 2,
    user: "Dr. Anjali Sharma",
    role: "Class Admin",
    action: "Face Enrollment",
    description:
      "Facial data enrollment completed",
    target: "Aarav Kumar - MCA001",
    time: "08 Sep 2026, 10:25 AM",
    type: "face",
  },
  {
    id: 3,
    user: "Prof. Rajesh Kumar",
    role: "Class Admin",
    action: "Student Added",
    description:
      "New student added to class roster",
    target: "Amit Verma - MCA021",
    time: "08 Sep 2026, 09:58 AM",
    type: "student",
  },
  {
    id: 4,
    user: "Super Admin",
    role: "Super Admin",
    action: "Login",
    description:
      "Successful administrative login",
    target: "Super Admin Portal",
    time: "08 Sep 2026, 09:05 AM",
    type: "login",
  },
  {
    id: 5,
    user: "Prof. Vikash Singh",
    role: "Class Admin",
    action: "Attendance Updated",
    description:
      "Attendance status changed manually",
    target: "Pankaj Kumar - BCA118",
    time: "07 Sep 2026, 11:17 AM",
    type: "attendance",
  },
  {
    id: 6,
    user: "Dr. Neha Singh",
    role: "Class Admin",
    action: "Student Updated",
    description:
      "Student profile information updated",
    target: "Neha Gupta - MCA042",
    time: "07 Sep 2026, 10:11 AM",
    type: "student",
  },
];

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      const value = search.toLowerCase();

      const matchesSearch =
        log.user.toLowerCase().includes(value) ||
        log.action.toLowerCase().includes(value) ||
        log.target.toLowerCase().includes(value) ||
        log.description.toLowerCase().includes(value);

      const matchesAction =
        actionFilter === "All" ||
        log.type === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [search, actionFilter]);

  const getIcon = (type) => {
    if (type === "attendance") {
      return <FileEdit size={17} />;
    }

    if (type === "face") {
      return <Camera size={17} />;
    }

    if (type === "student") {
      return <UserPlus size={17} />;
    }

    if (type === "login") {
      return <LogIn size={17} />;
    }

    return <ShieldCheck size={17} />;
  };

  const getIconStyle = (type) => {
    if (type === "attendance") {
      return "bg-amber-50 text-amber-600";
    }

    if (type === "face") {
      return "bg-indigo-50 text-indigo-600";
    }

    if (type === "student") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (type === "login") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />
      <SuperAdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="mb-8">

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <ShieldCheck size={16} />
              <span>
                Administration / Audit Logs
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Audit Logs
            </h1>

            <p className="text-slate-500 mt-1">
              Track important administrative actions and system activity.
            </p>

          </div>

          {/* Security summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <p className="text-sm text-slate-500">
                Total Activities
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {logsData.length}
              </h2>

              <p className="text-xs text-slate-400 mt-4">
                Recorded activities
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <p className="text-sm text-slate-500">
                Attendance Changes
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {
                  logsData.filter(
                    (log) => log.type === "attendance"
                  ).length
                }
              </h2>

              <p className="text-xs text-amber-600 mt-4">
                Manual attendance actions
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <p className="text-sm text-slate-500">
                Security Status
              </p>

              <h2 className="text-xl font-bold text-emerald-600 mt-3">
                Audit Active
              </h2>

              <p className="text-xs text-slate-400 mt-3">
                Administrative events are tracked
              </p>

            </div>

          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search activity, user or student..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />

              </div>

              <div className="relative">

                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={actionFilter}
                  onChange={(e) =>
                    setActionFilter(e.target.value)
                  }
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
                >
                  <option value="All">
                    All Activities
                  </option>

                  <option value="attendance">
                    Attendance
                  </option>

                  <option value="face">
                    Face Enrollment
                  </option>

                  <option value="student">
                    Student Changes
                  </option>

                  <option value="login">
                    Login
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* Logs */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <h2 className="font-semibold text-slate-900">
                Activity History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {filteredLogs.length} activities displayed
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-slate-50/50"
                >

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconStyle(
                      log.type
                    )}`}
                  >
                    {getIcon(log.type)}
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-medium text-slate-800">
                        {log.action}
                      </h3>

                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px]">
                        {log.role}
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {log.description}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Target: {log.target}
                    </p>

                  </div>

                  <div className="lg:text-right">

                    <div className="flex items-center gap-2 lg:justify-end text-sm font-medium text-slate-700">
                      <User size={15} />
                      {log.user}
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end text-xs text-slate-400 mt-2">
                      <Clock3 size={14} />
                      {log.time}
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Security notice */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">

            <div className="flex items-start gap-3">

              <AlertTriangle
                size={19}
                className="text-amber-600 mt-0.5"
              />

              <div>

                <p className="text-sm font-medium text-amber-800">
                  Audit Integrity
                </p>

                <p className="text-xs text-amber-700 mt-1">
                  Audit records should be immutable in the backend.
                  Super Admin can view logs but should not be able to
                  modify or delete historical audit entries.
                </p>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default AuditLogs;