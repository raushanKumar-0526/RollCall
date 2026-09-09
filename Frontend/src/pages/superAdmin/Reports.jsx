import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Search,
  Filter,
  CalendarDays,
  Users,
  UserCheck,
  UserX,
  Clock3,
  FileSpreadsheet,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const reportData = [
  {
    id: 1,
    date: "08 Sep 2026",
    className: "MCA Final Year",
    section: "A",
    students: 64,
    present: 56,
    absent: 6,
    late: 2,
  },
  {
    id: 2,
    date: "08 Sep 2026",
    className: "MCA Final Year",
    section: "B",
    students: 58,
    present: 50,
    absent: 6,
    late: 2,
  },
  {
    id: 3,
    date: "08 Sep 2026",
    className: "MCA 2nd Year",
    section: "A",
    students: 61,
    present: 53,
    absent: 6,
    late: 2,
  },
  {
    id: 4,
    date: "08 Sep 2026",
    className: "MCA 2nd Year",
    section: "B",
    students: 59,
    present: 48,
    absent: 8,
    late: 3,
  },
  {
    id: 5,
    date: "08 Sep 2026",
    className: "BCA Final Year",
    section: "A",
    students: 72,
    present: 64,
    absent: 6,
    late: 2,
  },
  {
    id: 6,
    date: "08 Sep 2026",
    className: "BCA Final Year",
    section: "B",
    students: 68,
    present: 55,
    absent: 10,
    late: 3,
  },
];

function Reports() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("08 Sep 2026");

  const filteredReports = useMemo(() => {
    return reportData.filter((report) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        report.className.toLowerCase().includes(searchValue) ||
        report.section.toLowerCase().includes(searchValue);

      const matchesClass =
        classFilter === "All" ||
        report.className === classFilter;

      const matchesDate =
        dateFilter === "All" ||
        report.date === dateFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesDate
      );
    });
  }, [search, classFilter, dateFilter]);

  const totals = filteredReports.reduce(
    (acc, item) => {
      acc.students += item.students;
      acc.present += item.present;
      acc.absent += item.absent;
      acc.late += item.late;
      return acc;
    },
    {
      students: 0,
      present: 0,
      absent: 0,
      late: 0,
    }
  );

  const attendanceRate =
    totals.students > 0
      ? ((totals.present / totals.students) * 100).toFixed(1)
      : "0.0";

  const exportReport = (type) => {
    alert(
      `${type} report export will be connected to the backend.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />
      <SuperAdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <FileText size={16} />
                <span>
                  Administration / Reports
                </span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Attendance Reports
              </h1>

              <p className="text-slate-500 mt-1">
                Generate and review institution-wide attendance reports.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => exportReport("CSV")}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50"
              >
                <FileSpreadsheet size={17} />
                CSV
              </button>

              <button
                onClick={() => exportReport("PDF")}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
              >
                <Download size={17} />
                Export PDF
              </button>

            </div>

          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Attendance Rate
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {attendanceRate}%
              </h2>

              <p className="text-xs text-indigo-600 mt-4">
                Selected report period
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Students
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {totals.students}
              </h2>

              <p className="text-xs text-slate-400 mt-4">
                Total strength
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Present
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {totals.present}
              </h2>

              <p className="text-xs text-emerald-600 mt-4">
                Present records
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Absent + Late
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {totals.absent + totals.late}
              </h2>

              <p className="text-xs text-slate-400 mt-4">
                Attendance exceptions
              </p>
            </div>

          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search class or section..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div className="relative">
                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={classFilter}
                  onChange={(e) =>
                    setClassFilter(e.target.value)
                  }
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
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
              </div>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(e.target.value)
                  }
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
                >
                  <option value="All">
                    All Dates
                  </option>
                  <option value="08 Sep 2026">
                    08 Sep 2026
                  </option>
                </select>
              </div>

            </div>

          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <h2 className="font-semibold text-slate-900">
                Attendance Report
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {filteredReports.length} records displayed
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Class
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Students
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Present
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Absent
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Late
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                      Attendance
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredReports.map((report) => {
                    const percentage = (
                      (report.present / report.students) *
                      100
                    ).toFixed(1);

                    return (
                      <tr
                        key={report.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                      >

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {report.date}
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-800">
                            {report.className}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            Section {report.section}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {report.students}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-emerald-600">
                          {report.present}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-red-500">
                          {report.absent}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-amber-500">
                          {report.late}
                        </td>

                        <td className="px-6 py-4 min-w-44">

                          <div className="flex items-center gap-3">

                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  percentage >= 85
                                    ? "bg-emerald-500"
                                    : percentage >= 75
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-semibold">
                              {percentage}%
                            </span>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>

          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700">
            Report generation and PDF/CSV downloads will use real
            attendance records after backend integration.
          </div>

        </div>
      </main>
    </div>
  );
}

export default Reports;