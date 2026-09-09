import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Clock3,
  CalendarDays,
  Award,
  AlertTriangle,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const weeklyData = [
  { day: "Mon", present: 637, absent: 76, late: 29 },
  { day: "Tue", present: 654, absent: 61, late: 27 },
  { day: "Wed", present: 621, absent: 92, late: 29 },
  { day: "Thu", present: 671, absent: 47, late: 24 },
  { day: "Fri", present: 645, absent: 70, late: 27 },
  { day: "Sat", present: 603, absent: 104, late: 35 },
];

const classPerformance = [
  {
    name: "BCA Final Year",
    section: "Section A",
    students: 72,
    attendance: 88.9,
  },
  {
    name: "MCA Final Year",
    section: "Section A",
    students: 64,
    attendance: 87.5,
  },
  {
    name: "MCA 2nd Year",
    section: "Section A",
    students: 61,
    attendance: 86.9,
  },
  {
    name: "MCA Final Year",
    section: "Section B",
    students: 58,
    attendance: 86.2,
  },
  {
    name: "BCA Final Year",
    section: "Section B",
    students: 68,
    attendance: 80.8,
  },
  {
    name: "MCA 2nd Year",
    section: "Section B",
    students: 59,
    attendance: 81.4,
  },
];

const monthlyData = [
  { month: "Apr", attendance: 82 },
  { month: "May", attendance: 84 },
  { month: "Jun", attendance: 81 },
  { month: "Jul", attendance: 86 },
  { month: "Aug", attendance: 88 },
  { month: "Sep", attendance: 86 },
];

function Analytics() {
  const [period, setPeriod] = useState("weekly");
  const [classFilter, setClassFilter] = useState("All");

  const filteredClasses = useMemo(() => {
    if (classFilter === "All") {
      return classPerformance;
    }

    return classPerformance.filter(
      (item) => item.name === classFilter
    );
  }, [classFilter]);

  const totalPresent = weeklyData.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = weeklyData.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const totalLate = weeklyData.reduce(
    (sum, item) => sum + item.late,
    0
  );

  const totalRecords =
    totalPresent + totalAbsent + totalLate;

  const overallAttendance = (
    (totalPresent / totalRecords) *
    100
  ).toFixed(1);

  const bestClass = [...classPerformance].sort(
    (a, b) => b.attendance - a.attendance
  )[0];

  const worstClass = [...classPerformance].sort(
    (a, b) => a.attendance - b.attendance
  )[0];

  const maxDaily = Math.max(
    ...weeklyData.map(
      (item) =>
        item.present + item.absent + item.late
    )
  );

  const handleExport = () => {
    alert(
      "Analytics report export will be connected to the backend."
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />
      <SuperAdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <BarChart3 size={16} />
                <span>
                  Administration / Attendance Analytics
                </span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Attendance Analytics
              </h1>

              <p className="text-slate-500 mt-1">
                Monitor attendance performance across the institution.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <select
                value={classFilter}
                onChange={(e) =>
                  setClassFilter(e.target.value)
                }
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
              >
                <option value="All">
                  All Classes
                </option>

                <option value="MCA Final Year">
                  MCA Final Year
                </option>

                <option value="MCA 2nd Year">
                  MCA 2nd Year
                </option>

                <option value="BCA Final Year">
                  BCA Final Year
                </option>
              </select>

              <button
                onClick={handleExport}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
              >
                Export Analytics
              </button>

            </div>

          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Overall Attendance
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {overallAttendance}%
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                  <TrendingUp size={22} />
                </div>

              </div>

              <p className="text-xs text-indigo-600 mt-4">
                Institutional average
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Present Records
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalPresent}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <UserCheck size={22} />
                </div>

              </div>

              <p className="text-xs text-emerald-600 mt-4">
                Last 6 days
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Absent Records
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalAbsent}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <UserX size={22} />
                </div>

              </div>

              <p className="text-xs text-red-500 mt-4">
                Last 6 days
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Late Records
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalLate}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 size={22} />
                </div>

              </div>

              <p className="text-xs text-amber-500 mt-4">
                Last 6 days
              </p>

            </div>

          </div>

          {/* Daily Trend + Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

            {/* Trend */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Attendance Trend
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Daily attendance activity
                  </p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-lg">

                  <button
                    onClick={() => setPeriod("weekly")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                      period === "weekly"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Weekly
                  </button>

                  <button
                    onClick={() => setPeriod("monthly")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                      period === "monthly"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Monthly
                  </button>

                </div>

              </div>

              {period === "weekly" ? (
                <>
                  <div className="h-64 flex items-end gap-5">

                    {weeklyData.map((item) => {
                      const total =
                        item.present +
                        item.absent +
                        item.late;

                      const height =
                        (total / maxDaily) * 100;

                      const presentHeight =
                        (item.present / total) * 100;

                      return (
                        <div
                          key={item.day}
                          className="flex-1 h-full flex flex-col items-center justify-end"
                        >

                          <span className="text-xs text-slate-400 mb-2">
                            {item.present}
                          </span>

                          <div
                            className="w-full max-w-12 bg-slate-100 rounded-t-lg relative"
                            style={{
                              height: `${height}%`,
                            }}
                          >

                            <div
                              className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg"
                              style={{
                                height: `${presentHeight}%`,
                              }}
                            />

                          </div>

                          <span className="text-xs text-slate-500 mt-3">
                            {item.day}
                          </span>

                        </div>
                      );
                    })}

                  </div>

                  <div className="flex justify-center gap-6 mt-6 text-xs text-slate-500">

                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-600" />
                      Present
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-slate-200" />
                      Total
                    </div>

                  </div>
                </>
              ) : (
                <div className="h-64 flex items-end gap-6">

                  {monthlyData.map((item) => (
                    <div
                      key={item.month}
                      className="flex-1 h-full flex flex-col items-center justify-end"
                    >

                      <span className="text-xs text-slate-500 mb-2">
                        {item.attendance}%
                      </span>

                      <div className="w-full max-w-12 bg-indigo-100 rounded-t-lg relative h-[80%]">

                        <div
                          className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg"
                          style={{
                            height: `${item.attendance}%`,
                          }}
                        />

                      </div>

                      <span className="text-xs text-slate-500 mt-3">
                        {item.month}
                      </span>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* Attendance Status */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Attendance Status
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Current distribution
                  </p>
                </div>

                <CalendarDays
                  size={20}
                  className="text-slate-400"
                />

              </div>

              <div className="mt-7">

                <div className="relative w-44 h-44 mx-auto">

                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `conic-gradient(
                        #4f46e5 0deg ${
                          (totalPresent / totalRecords) *
                          360
                        }deg,
                        #ef4444 ${
                          (totalPresent / totalRecords) *
                          360
                        }deg ${
                          ((totalPresent + totalAbsent) /
                            totalRecords) *
                          360
                        }deg,
                        #f59e0b ${
                          ((totalPresent + totalAbsent) /
                            totalRecords) *
                          360
                        }deg 360deg
                      )`,
                    }}
                  />

                  <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center">

                    <span className="text-2xl font-bold text-slate-900">
                      {overallAttendance}%
                    </span>

                    <span className="text-xs text-slate-400">
                      Present
                    </span>

                  </div>

                </div>

                <div className="space-y-4 mt-8">

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-600" />
                      <span className="text-sm text-slate-600">
                        Present
                      </span>
                    </div>

                    <span className="font-semibold">
                      {totalPresent}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm text-slate-600">
                        Absent
                      </span>
                    </div>

                    <span className="font-semibold">
                      {totalAbsent}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm text-slate-600">
                        Late
                      </span>
                    </div>

                    <span className="font-semibold">
                      {totalLate}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Class Performance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="font-semibold text-slate-900">
                  Class Performance
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Compare attendance across classes
                </p>
              </div>

              <Users
                size={20}
                className="text-slate-400"
              />

            </div>

            <div className="space-y-5">

              {filteredClasses.map((item) => (
                <div key={`${item.name}-${item.section}`}>

                  <div className="flex items-center justify-between mb-2">

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {item.name} - {item.section}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.students} students
                      </p>
                    </div>

                    <span
                      className={`text-sm font-bold ${
                        item.attendance >= 85
                          ? "text-emerald-600"
                          : item.attendance >= 75
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.attendance}%
                    </span>

                  </div>

                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full rounded-full ${
                        item.attendance >= 85
                          ? "bg-emerald-500"
                          : item.attendance >= 75
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${item.attendance}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Best / Worst */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Best */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-6">

              <div className="flex items-start gap-4">

                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Award
                    size={22}
                    className="text-emerald-600"
                  />
                </div>

                <div className="flex-1">

                  <p className="text-sm text-slate-500">
                    Best Performing Class
                  </p>

                  <h3 className="font-semibold text-slate-900 mt-1">
                    {bestClass.name} - {bestClass.section}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="text-2xl font-bold text-emerald-600">
                      {bestClass.attendance}%
                    </span>

                    <span className="text-xs text-slate-400">
                      attendance
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Worst */}
            <div className="bg-white border border-red-100 rounded-2xl p-6">

              <div className="flex items-start gap-4">

                <div className="p-3 bg-red-50 rounded-xl">
                  <AlertTriangle
                    size={22}
                    className="text-red-600"
                  />
                </div>

                <div className="flex-1">

                  <p className="text-sm text-slate-500">
                    Needs Attention
                  </p>

                  <h3 className="font-semibold text-slate-900 mt-1">
                    {worstClass.name} - {worstClass.section}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="text-2xl font-bold text-red-600">
                      {worstClass.attendance}%
                    </span>

                    <span className="text-xs text-slate-400">
                      attendance
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Notice */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">

            <div className="flex items-start gap-3">

              <BarChart3
                size={19}
                className="text-indigo-600 mt-0.5"
              />

              <div>
                <p className="text-sm font-medium text-indigo-800">
                  Analytics Access
                </p>

                <p className="text-xs text-indigo-600 mt-1">
                  Super Admin can view institution-wide attendance
                  analytics. Attendance marking remains restricted
                  to assigned Class Admins.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Analytics;