import {
  Users,
  School,
  UserCheck,
  UserX,
  Clock3,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const classes = [
  {
    name: "MCA Final Year",
    section: "Section A",
    students: 64,
    present: 56,
    absent: 6,
    late: 2,
    percentage: 87.5,
  },
  {
    name: "MCA Final Year",
    section: "Section B",
    students: 58,
    present: 50,
    absent: 6,
    late: 2,
    percentage: 86.2,
  },
  {
    name: "MCA 2nd Year",
    section: "Section A",
    students: 61,
    present: 53,
    absent: 6,
    late: 2,
    percentage: 86.9,
  },
  {
    name: "MCA 2nd Year",
    section: "Section B",
    students: 59,
    present: 48,
    absent: 8,
    late: 3,
    percentage: 81.4,
  },
];

const lowAttendanceStudents = [
  {
    name: "Rohit Kumar",
    roll: "MCA005",
    className: "MCA Final Year - A",
    percentage: 63,
  },
  {
    name: "Rahul Singh",
    roll: "MCA003",
    className: "MCA Final Year - A",
    percentage: 70,
  },
  {
    name: "Amit Verma",
    roll: "MCA021",
    className: "MCA Final Year - B",
    percentage: 68,
  },
  {
    name: "Neha Gupta",
    roll: "MCA042",
    className: "MCA 2nd Year - B",
    percentage: 71,
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />

      <SuperAdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

            <div>
              <p className="text-sm text-slate-500 mb-1">
                Institutional Overview
              </p>

              <h1 className="text-2xl font-bold text-slate-900">
                Super Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                View attendance performance across all classes.
              </p>
            </div>

            <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-400">
                Today's Attendance
              </p>

              <p className="text-lg font-bold text-indigo-600">
                85.8%
              </p>
            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Classes
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    12
                  </h2>
                </div>

                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <School size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Active classes
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Students
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    742
                  </h2>
                </div>

                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Users size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Across all classes
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Present Today
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    637
                  </h2>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <UserCheck size={22} />
                </div>

              </div>

              <p className="text-xs text-emerald-600 mt-4">
                Students present
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Low Attendance
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    48
                  </h2>
                </div>

                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <AlertTriangle size={22} />
                </div>

              </div>

              <p className="text-xs text-red-500 mt-4">
                Below 75% threshold
              </p>
            </div>

          </div>

          {/* Attendance Overview */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

            {/* Overall Attendance */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Institutional Attendance
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Today's attendance overview
                  </p>
                </div>

                <TrendingUp
                  size={20}
                  className="text-indigo-500"
                />

              </div>

              <div className="flex items-center gap-8">

                <div className="relative w-40 h-40 flex-shrink-0">

                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background:
                        "conic-gradient(#4f46e5 0deg 309deg, #e2e8f0 309deg 360deg)",
                    }}
                  />

                  <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center">

                    <span className="text-3xl font-bold text-slate-900">
                      85.8%
                    </span>

                    <span className="text-xs text-slate-400">
                      Attendance
                    </span>

                  </div>

                </div>

                <div className="flex-1 space-y-5">

                  <div>
                    <div className="flex justify-between mb-2">

                      <span className="text-sm text-slate-500">
                        Present
                      </span>

                      <span className="text-sm font-semibold text-emerald-600">
                        637
                      </span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: "85.8%" }}
                      />
                    </div>

                  </div>

                  <div>
                    <div className="flex justify-between mb-2">

                      <span className="text-sm text-slate-500">
                        Absent
                      </span>

                      <span className="text-sm font-semibold text-red-500">
                        76
                      </span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: "10.2%" }}
                      />
                    </div>

                  </div>

                  <div>
                    <div className="flex justify-between mb-2">

                      <span className="text-sm text-slate-500">
                        Late
                      </span>

                      <span className="text-sm font-semibold text-amber-500">
                        29
                      </span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: "4%" }}
                      />
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="font-semibold text-slate-900">
                Today's Summary
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Institutional statistics
              </p>

              <div className="space-y-4 mt-6">

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users
                      size={19}
                      className="text-indigo-500"
                    />

                    <span className="text-sm text-slate-600">
                      Students
                    </span>
                  </div>

                  <span className="font-semibold">
                    742
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <UserCheck
                      size={19}
                      className="text-emerald-500"
                    />

                    <span className="text-sm text-slate-600">
                      Present
                    </span>
                  </div>

                  <span className="font-semibold">
                    637
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <UserX
                      size={19}
                      className="text-red-500"
                    />

                    <span className="text-sm text-slate-600">
                      Absent
                    </span>
                  </div>

                  <span className="font-semibold">
                    76
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock3
                      size={19}
                      className="text-amber-500"
                    />

                    <span className="text-sm text-slate-600">
                      Late
                    </span>
                  </div>

                  <span className="font-semibold">
                    29
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Class Performance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Class-wise Performance
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Attendance by class and section
                </p>
              </div>

              <button className="text-sm text-indigo-600 font-medium flex items-center gap-1">
                View All
                <ChevronRight size={16} />
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-100 text-left">

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Class
                    </th>

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Students
                    </th>

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Present
                    </th>

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Absent
                    </th>

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Late
                    </th>

                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Attendance
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {classes.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-50 last:border-0"
                    >

                      <td className="py-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {item.section}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 text-sm text-slate-600">
                        {item.students}
                      </td>

                      <td className="py-4 text-sm font-medium text-emerald-600">
                        {item.present}
                      </td>

                      <td className="py-4 text-sm font-medium text-red-500">
                        {item.absent}
                      </td>

                      <td className="py-4 text-sm font-medium text-amber-500">
                        {item.late}
                      </td>

                      <td className="py-4 min-w-40">

                        <div className="flex items-center gap-3">

                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">

                            <div
                              className={`h-full rounded-full ${
                                item.percentage >= 85
                                  ? "bg-emerald-500"
                                  : item.percentage >= 75
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${item.percentage}%`,
                              }}
                            />

                          </div>

                          <span className="text-sm font-semibold text-slate-700">
                            {item.percentage}%
                          </span>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>

          {/* Low Attendance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Low Attendance Students
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Students below the institutional attendance threshold
                </p>
              </div>

              <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                75% Threshold
              </span>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {lowAttendanceStudents.map((student) => (
                <div
                  key={student.roll}
                  className="flex items-center justify-between p-4 border border-red-100 bg-red-50/30 rounded-xl"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-white border border-red-100 flex items-center justify-center">
                      <AlertTriangle
                        size={18}
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-800">
                        {student.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {student.roll} • {student.className}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-lg font-bold text-red-600">
                      {student.percentage}%
                    </p>

                    <p className="text-xs text-red-500">
                      Low attendance
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;