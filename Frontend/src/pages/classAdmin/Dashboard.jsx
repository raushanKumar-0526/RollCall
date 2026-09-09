import {
  Users,
  UserCheck,
  UserX,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  Camera,
  ScanFace,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const stats = [
  {
    title: "Total Students",
    value: "64",
    change: "+3",
    label: "this month",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    positive: true,
  },
  {
    title: "Present Today",
    value: "56",
    change: "87.5%",
    label: "attendance",
    icon: UserCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    positive: true,
  },
  {
    title: "Absent Today",
    value: "6",
    change: "9.4%",
    label: "of class",
    icon: UserX,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    positive: false,
  },
  {
    title: "Late Today",
    value: "2",
    change: "3.1%",
    label: "of class",
    icon: Clock3,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    positive: false,
  },
];

const recentAttendance = [
  {
    name: "Rahul Kumar",
    roll: "MCA001",
    time: "09:02 AM",
    status: "Present",
    confidence: "98.4%",
  },
  {
    name: "Priya Sharma",
    roll: "MCA002",
    time: "09:04 AM",
    status: "Present",
    confidence: "97.8%",
  },
  {
    name: "Aman Raj",
    roll: "MCA003",
    time: "09:07 AM",
    status: "Late",
    confidence: "96.9%",
  },
  {
    name: "Sneha Singh",
    roll: "MCA004",
    time: "09:08 AM",
    status: "Present",
    confidence: "99.1%",
  },
  {
    name: "Aditya Kumar",
    roll: "MCA005",
    time: "09:11 AM",
    status: "Present",
    confidence: "98.2%",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <AdminTopbar />

      {/* Main */}
      <main className="ml-64 pt-16">

        <div className="p-6 lg:p-8">

          {/* Page heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-medium text-blue-600">
                Tuesday, 8 September 2026
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Class Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                MCA Final Year · Section A
              </p>
            </div>


            {/* Quick action */}
            <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">

              <Camera className="h-4 w-4" />

              Start Attendance

            </button>

          </div>


          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${stat.iconColor}`}
                      />
                    </div>

                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>

                  </div>

                  <p className="mt-5 text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex items-end gap-3">

                    <h2 className="text-3xl font-extrabold text-slate-900">
                      {stat.value}
                    </h2>

                    <span
                      className={`mb-1 flex items-center text-xs font-bold ${
                        stat.positive
                          ? "text-green-600"
                          : "text-slate-500"
                      }`}
                    >
                      {stat.positive ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}

                      {stat.change}
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.label}
                  </p>

                </div>
              );
            })}

          </div>


          {/* Middle section */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* Attendance overview */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Today's Attendance
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    8 September 2026 · Class attendance overview
                  </p>
                </div>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View records
                </button>

              </div>


              {/* Progress */}
              <div className="mt-8">

                <div className="mb-2 flex justify-between">

                  <span className="text-sm font-semibold text-slate-700">
                    Attendance Rate
                  </span>

                  <span className="text-sm font-bold text-green-600">
                    87.5%
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: "87.5%" }}
                  />

                </div>

              </div>


              {/* Breakdown */}
              <div className="mt-8 grid grid-cols-3 gap-4">

                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-xs font-medium text-green-700">
                    Present
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-green-700">
                    56
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 p-4">
                  <p className="text-xs font-medium text-red-700">
                    Absent
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-red-700">
                    6
                  </p>
                </div>

                <div className="rounded-lg bg-amber-50 p-4">
                  <p className="text-xs font-medium text-amber-700">
                    Late
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-amber-700">
                    2
                  </p>
                </div>

              </div>

            </div>


            {/* Quick actions */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Frequently used class tools
              </p>


              <div className="mt-6 space-y-3">

                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Camera className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Start Attendance
                    </p>

                    <p className="text-xs text-slate-500">
                      Open live face scanner
                    </p>
                  </div>

                </button>


                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <ScanFace className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Enroll Face
                    </p>

                    <p className="text-xs text-slate-500">
                      Register a student's face
                    </p>
                  </div>

                </button>


                <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-200 hover:bg-emerald-50">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <CalendarDays className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Attendance Records
                    </p>

                    <p className="text-xs text-slate-500">
                      View previous attendance
                    </p>
                  </div>

                </button>

              </div>

            </div>

          </div>


          {/* Recent attendance */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Attendance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest attendance punches from your class
                </p>
              </div>

              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all
              </button>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Roll Number
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Time
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Confidence
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {recentAttendance.map((student) => (

                    <tr
                      key={student.roll}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>

                          <span className="text-sm font-semibold text-slate-900">
                            {student.name}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {student.roll}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {student.time}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            student.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span className="text-sm font-semibold text-slate-700">
                          {student.confidence}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;