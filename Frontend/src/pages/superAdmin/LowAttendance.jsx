import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Search,
  Filter,
  Users,
  UserX,
  Clock3,
  Eye,
  TrendingDown,
  CalendarDays,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const studentsData = [
  {
    id: 1,
    name: "Rohit Kumar",
    roll: "MCA005",
    className: "MCA Final Year",
    section: "A",
    present: 17,
    absent: 8,
    late: 2,
    percentage: 63,
    lastAttendance: "08 Sep 2026",
  },
  {
    id: 2,
    name: "Rahul Singh",
    roll: "MCA003",
    className: "MCA Final Year",
    section: "A",
    present: 19,
    absent: 6,
    late: 2,
    percentage: 70,
    lastAttendance: "08 Sep 2026",
  },
  {
    id: 3,
    name: "Amit Verma",
    roll: "MCA021",
    className: "MCA Final Year",
    section: "B",
    present: 18,
    absent: 7,
    late: 2,
    percentage: 68,
    lastAttendance: "07 Sep 2026",
  },
  {
    id: 4,
    name: "Neha Gupta",
    roll: "MCA042",
    className: "MCA 2nd Year",
    section: "B",
    present: 19,
    absent: 6,
    late: 2,
    percentage: 71,
    lastAttendance: "08 Sep 2026",
  },
  {
    id: 5,
    name: "Karan Singh",
    roll: "MCA048",
    className: "MCA 2nd Year",
    section: "B",
    present: 16,
    absent: 9,
    late: 3,
    percentage: 61,
    lastAttendance: "06 Sep 2026",
  },
  {
    id: 6,
    name: "Pankaj Kumar",
    roll: "BCA118",
    className: "BCA Final Year",
    section: "B",
    present: 20,
    absent: 6,
    late: 1,
    percentage: 74,
    lastAttendance: "08 Sep 2026",
  },
  {
    id: 7,
    name: "Ankit Raj",
    roll: "BCA124",
    className: "BCA Final Year",
    section: "B",
    present: 15,
    absent: 10,
    late: 2,
    percentage: 59,
    lastAttendance: "05 Sep 2026",
  },
];

function LowAttendance() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.roll.toLowerCase().includes(searchValue);

      const matchesClass =
        classFilter === "All" ||
        student.className === classFilter;

      let matchesRisk = true;

      if (riskFilter === "Critical") {
        matchesRisk = student.percentage < 65;
      }

      if (riskFilter === "High Risk") {
        matchesRisk =
          student.percentage >= 65 &&
          student.percentage < 70;
      }

      if (riskFilter === "Warning") {
        matchesRisk =
          student.percentage >= 70 &&
          student.percentage < 75;
      }

      return (
        matchesSearch &&
        matchesClass &&
        matchesRisk
      );
    });
  }, [search, classFilter, riskFilter]);

  const criticalCount = studentsData.filter(
    (student) => student.percentage < 65
  ).length;

  const highRiskCount = studentsData.filter(
    (student) =>
      student.percentage >= 65 &&
      student.percentage < 70
  ).length;

  const warningCount = studentsData.filter(
    (student) =>
      student.percentage >= 70 &&
      student.percentage < 75
  ).length;

  const totalAbsent = studentsData.reduce(
    (sum, student) => sum + student.absent,
    0
  );

  const getRisk = (percentage) => {
    if (percentage < 65) {
      return {
        label: "Critical",
        className:
          "bg-red-50 text-red-600 border-red-100",
      };
    }

    if (percentage < 70) {
      return {
        label: "High Risk",
        className:
          "bg-orange-50 text-orange-600 border-orange-100",
      };
    }

    return {
      label: "Warning",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    };
  };

  const handleView = (student) => {
    alert(
      `Student Attendance\n\nName: ${student.name}\nRoll No: ${student.roll}\nClass: ${student.className} - ${student.section}\nAttendance: ${student.percentage}%\nPresent: ${student.present}\nAbsent: ${student.absent}\nLate: ${student.late}`
    );
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
              <TrendingDown size={16} />
              <span>
                Administration / Low Attendance
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Low Attendance Students
                </h1>

                <p className="text-slate-500 mt-1">
                  Monitor students below the 75% attendance threshold.
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl">

                <AlertTriangle
                  size={18}
                  className="text-red-500"
                />

                <span className="text-sm font-medium text-red-600">
                  {studentsData.length} students require attention
                </span>

              </div>

            </div>

          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Below 75%
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {studentsData.length}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <Users size={22} />
                </div>

              </div>

              <p className="text-xs text-red-500 mt-4">
                Students requiring attention
              </p>

            </div>

            {/* Critical */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Critical
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {criticalCount}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={22} />
                </div>

              </div>

              <p className="text-xs text-red-500 mt-4">
                Below 65%
              </p>

            </div>

            {/* High Risk */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    High Risk
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {highRiskCount}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                  <TrendingDown size={22} />
                </div>

              </div>

              <p className="text-xs text-orange-500 mt-4">
                65% – 69%
              </p>

            </div>

            {/* Absent */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Absences
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalAbsent}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
                  <UserX size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Among listed students
              </p>

            </div>

          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Search */}
              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search student or roll number..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* Class */}
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

              {/* Risk */}
              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(e.target.value)
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
              >
                <option value="All">
                  All Risk Levels
                </option>

                <option value="Critical">
                  Critical — Below 65%
                </option>

                <option value="High Risk">
                  High Risk — 65–69%
                </option>

                <option value="Warning">
                  Warning — 70–74%
                </option>
              </select>

            </div>

          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Attendance Risk List
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {filteredStudents.length} students displayed
                  </p>
                </div>

                <AlertTriangle
                  size={20}
                  className="text-red-400"
                />

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b border-slate-100 text-left">

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Student
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Class
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Present
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Absent
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Late
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Attendance
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Risk
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 text-right">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
                      const risk = getRisk(
                        student.percentage
                      );

                      return (
                        <tr
                          key={student.id}
                          className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition"
                        >

                          {/* Student */}
                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-semibold">
                                {student.name
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")
                                  .slice(0, 2)}
                              </div>

                              <div>

                                <p className="font-medium text-slate-800">
                                  {student.name}
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                  {student.roll}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Class */}
                          <td className="px-6 py-4">

                            <p className="text-sm text-slate-700">
                              {student.className}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Section {student.section}
                            </p>

                          </td>

                          {/* Present */}
                          <td className="px-6 py-4">

                            <span className="text-sm font-medium text-emerald-600">
                              {student.present}
                            </span>

                          </td>

                          {/* Absent */}
                          <td className="px-6 py-4">

                            <span className="text-sm font-medium text-red-500">
                              {student.absent}
                            </span>

                          </td>

                          {/* Late */}
                          <td className="px-6 py-4">

                            <span className="text-sm font-medium text-amber-500">
                              {student.late}
                            </span>

                          </td>

                          {/* Attendance */}
                          <td className="px-6 py-4 min-w-44">

                            <div className="flex items-center gap-3">

                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">

                                <div
                                  className="h-full bg-red-500 rounded-full"
                                  style={{
                                    width: `${student.percentage}%`,
                                  }}
                                />

                              </div>

                              <span className="text-sm font-bold text-red-600">
                                {student.percentage}%
                              </span>

                            </div>

                          </td>

                          {/* Risk */}
                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex items-center px-2.5 py-1.5 border rounded-lg text-xs font-medium ${risk.className}`}
                            >
                              {risk.label}
                            </span>

                          </td>

                          {/* Action */}
                          <td className="px-6 py-4 text-right">

                            <button
                              onClick={() =>
                                handleView(student)
                              }
                              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            >
                              <Eye size={16} />
                              View
                            </button>

                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center"
                      >

                        <Users
                          size={36}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-medium text-slate-600">
                          No students found
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          Try changing your search or filters.
                        </p>

                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Footer information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="p-4 bg-white border border-slate-200 rounded-xl">

              <div className="flex items-start gap-3">

                <CalendarDays
                  size={19}
                  className="text-indigo-500 mt-0.5"
                />

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Attendance Threshold
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Students below 75% are automatically listed here.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">

              <div className="flex items-start gap-3">

                <Clock3
                  size={19}
                  className="text-indigo-600 mt-0.5"
                />

                <div>
                  <p className="text-sm font-medium text-indigo-800">
                    View-Only Access
                  </p>

                  <p className="text-xs text-indigo-600 mt-1">
                    Super Admin can monitor attendance but cannot mark
                    attendance from this portal.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default LowAttendance;