import { useMemo, useState } from "react";
import {
  BarChart3,
  Download,
  CalendarDays,
  Users,
  UserCheck,
  UserX,
  Clock3,
  TrendingUp,
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const attendanceData = [
  { day: "Mon", present: 56, absent: 6, late: 2 },
  { day: "Tue", present: 58, absent: 4, late: 2 },
  { day: "Wed", present: 54, absent: 7, late: 3 },
  { day: "Thu", present: 60, absent: 3, late: 1 },
  { day: "Fri", present: 57, absent: 5, late: 2 },
  { day: "Sat", present: 52, absent: 9, late: 3 },
];

const students = [
  {
    name: "Aarav Kumar",
    roll: "MCA001",
    present: 22,
    absent: 2,
    late: 1,
    percentage: 88,
  },
  {
    name: "Priya Sharma",
    roll: "MCA002",
    present: 25,
    absent: 1,
    late: 0,
    percentage: 96,
  },
  {
    name: "Rahul Singh",
    roll: "MCA003",
    present: 19,
    absent: 6,
    late: 2,
    percentage: 70,
  },
  {
    name: "Ananya Verma",
    roll: "MCA004",
    present: 24,
    absent: 2,
    late: 1,
    percentage: 89,
  },
  {
    name: "Rohit Kumar",
    roll: "MCA005",
    present: 17,
    absent: 8,
    late: 2,
    percentage: 63,
  },
  {
    name: "Sneha Gupta",
    roll: "MCA006",
    present: 23,
    absent: 3,
    late: 1,
    percentage: 85,
  },
];

function Reports() {
  const [range, setRange] = useState("7");

  const totals = useMemo(() => {
    return attendanceData.reduce(
      (acc, item) => {
        acc.present += item.present;
        acc.absent += item.absent;
        acc.late += item.late;
        return acc;
      },
      { present: 0, absent: 0, late: 0 }
    );
  }, []);

  const totalMarked = totals.present + totals.absent + totals.late;

  const attendanceRate = ((totals.present / totalMarked) * 100).toFixed(1);

  const lowAttendance = students.filter(
    (student) => student.percentage < 75
  );

  const maxValue = Math.max(
    ...attendanceData.map(
      (item) => item.present + item.absent + item.late
    )
  );

  const handleExport = () => {
    alert("Report export will be connected to the backend.");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <AdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <BarChart3 size={16} />
                <span>Reports & Analytics</span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Attendance Analytics
              </h1>

              <p className="text-slate-500 mt-1">
                Analyze attendance performance for MCA Final Year - Section A.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 3 Months</option>
              </select>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
              >
                <Download size={17} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Attendance Rate
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {attendanceRate}%
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                  <TrendingUp size={22} />
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Based on selected period
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Present
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totals.present}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <UserCheck size={22} />
                </div>
              </div>

              <p className="text-xs text-emerald-600 mt-4">
                Present records
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Absent
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totals.absent}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <UserX size={22} />
                </div>
              </div>

              <p className="text-xs text-red-600 mt-4">
                Absent records
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Late
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totals.late}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 size={22} />
                </div>
              </div>

              <p className="text-xs text-amber-600 mt-4">
                Late arrivals
              </p>
            </div>

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

            {/* Attendance Trend */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Daily Attendance Trend
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Present, absent and late records
                  </p>
                </div>

                <CalendarDays
                  size={20}
                  className="text-slate-400"
                />
              </div>

              <div className="flex items-end justify-between h-64 gap-4 px-2">

                {attendanceData.map((item) => {
                  const total =
                    item.present + item.absent + item.late;

                  const height = (total / maxValue) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex-1 h-full flex flex-col items-center justify-end"
                    >
                      <div className="text-xs text-slate-500 mb-2">
                        {total}
                      </div>

                      <div
                        className="w-full max-w-12 bg-indigo-100 rounded-t-lg relative"
                        style={{ height: `${height}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg"
                          style={{
                            height: `${
                              (item.present / total) * 100
                            }%`,
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

              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  Present
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-100" />
                  Total Records
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="font-semibold text-slate-900">
                Attendance Breakdown
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Selected period
              </p>

              <div className="mt-8 flex justify-center">
                <div
                  className="w-44 h-44 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(
                      #4f46e5 0deg  ${
                        (totals.present / totalMarked) * 360
                      }deg,
                      #ef4444 ${
                        (totals.present / totalMarked) * 360
                      }deg ${
                        ((totals.present + totals.absent) /
                          totalMarked) *
                        360
                      }deg,
                      #f59e0b ${
                        ((totals.present + totals.absent) /
                          totalMarked) *
                        360
                      }deg 360deg
                    )`,
                  }}
                >
                  <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">
                      {attendanceRate}%
                    </span>
                    <span className="text-xs text-slate-400">
                      Present
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-8">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-sm text-slate-600">
                      Present
                    </span>
                  </div>
                  <span className="font-semibold">
                    {totals.present}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm text-slate-600">
                      Absent
                    </span>
                  </div>
                  <span className="font-semibold">
                    {totals.absent}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-sm text-slate-600">
                      Late
                    </span>
                  </div>
                  <span className="font-semibold">
                    {totals.late}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Student Attendance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Student-wise Attendance
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Attendance performance of students
                </p>
              </div>

              <Users size={20} className="text-slate-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Student
                    </th>
                    <th className="pb-3 text-xs font-medium text-slate-500">
                      Roll No.
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
                  {students.map((student) => (
                    <tr
                      key={student.roll}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4">
                        <span className="font-medium text-slate-800">
                          {student.name}
                        </span>
                      </td>

                      <td className="py-4 text-sm text-slate-500">
                        {student.roll}
                      </td>

                      <td className="py-4 text-sm text-emerald-600 font-medium">
                        {student.present}
                      </td>

                      <td className="py-4 text-sm text-red-500 font-medium">
                        {student.absent}
                      </td>

                      <td className="py-4 text-sm text-amber-500 font-medium">
                        {student.late}
                      </td>

                      <td className="py-4 min-w-40">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                student.percentage < 75
                                  ? "bg-red-500"
                                  : student.percentage < 85
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{
                                width: `${student.percentage}%`,
                              }}
                            />
                          </div>

                          <span
                            className={`text-sm font-semibold ${
                              student.percentage < 75
                                ? "text-red-600"
                                : student.percentage < 85
                                ? "text-amber-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {student.percentage}%
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
                  Students below 75% attendance
                </p>
              </div>

              <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                {lowAttendance.length} Students
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {lowAttendance.map((student) => (
                <div
                  key={student.roll}
                  className="flex items-center justify-between p-4 border border-red-100 bg-red-50/40 rounded-xl"
                >
                  <div>
                    <h3 className="font-medium text-slate-800">
                      {student.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {student.roll}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">
                      {student.percentage}%
                    </p>

                    <p className="text-xs text-red-500">
                      Below threshold
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

export default Reports;