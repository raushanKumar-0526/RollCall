import { useMemo, useState } from "react";
import {
  School,
  Search,
  Users,
  UserCheck,
  UserX,
  Clock3,
  Eye,
  Filter,
  Plus,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const classData = [
  {
    id: 1,
    name: "MCA Final Year",
    section: "Section A",
    teacher: "Dr. Anjali Sharma",
    students: 64,
    present: 56,
    absent: 6,
    late: 2,
    percentage: 87.5,
    status: "Active",
  },
  {
    id: 2,
    name: "MCA Final Year",
    section: "Section B",
    teacher: "Prof. Rajesh Kumar",
    students: 58,
    present: 50,
    absent: 6,
    late: 2,
    percentage: 86.2,
    status: "Active",
  },
  {
    id: 3,
    name: "MCA 2nd Year",
    section: "Section A",
    teacher: "Dr. Neha Singh",
    students: 61,
    present: 53,
    absent: 6,
    late: 2,
    percentage: 86.9,
    status: "Active",
  },
  {
    id: 4,
    name: "MCA 2nd Year",
    section: "Section B",
    teacher: "Prof. Amit Verma",
    students: 59,
    present: 48,
    absent: 8,
    late: 3,
    percentage: 81.4,
    status: "Active",
  },
  {
    id: 5,
    name: "BCA Final Year",
    section: "Section A",
    teacher: "Dr. Pooja Gupta",
    students: 72,
    present: 64,
    absent: 6,
    late: 2,
    percentage: 88.9,
    status: "Active",
  },
  {
    id: 6,
    name: "BCA Final Year",
    section: "Section B",
    teacher: "Prof. Vikash Singh",
    students: 68,
    present: 55,
    absent: 10,
    late: 3,
    percentage: 80.8,
    status: "Active",
  },
];

function Classes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredClasses = useMemo(() => {
    return classData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.section.toLowerCase().includes(search.toLowerCase()) ||
        item.teacher.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalStudents = classData.reduce(
    (sum, item) => sum + item.students,
    0
  );

  const totalPresent = classData.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = classData.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const totalLate = classData.reduce(
    (sum, item) => sum + item.late,
    0
  );

  const handleView = (item) => {
    alert(
      `${item.name} - ${item.section}\nClass Teacher: ${item.teacher}`
    );
  };

  const handleAddClass = () => {
    alert("Add Class functionality will be connected to the backend.");
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
                <School size={16} />
                <span>Administration / Classes</span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                All Classes
              </h1>

              <p className="text-slate-500 mt-1">
                View classes, sections, teachers and attendance performance.
              </p>
            </div>

            <button
              onClick={handleAddClass}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              Add Class
            </button>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Classes
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {classData.length}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                  <School size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Active academic sections
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Students
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalStudents}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Users size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Across listed classes
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Present Today
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
                Present records
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Absent / Late
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalAbsent + totalLate}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <UserX size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                {totalAbsent} absent • {totalLate} late
              </p>
            </div>

          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

            <div className="flex flex-col md:flex-row gap-3">

              {/* Search */}
              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search class, section or teacher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* Status */}
              <div className="relative">

                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

            </div>

          </div>

          {/* Classes Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Class Directory
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {filteredClasses.length} classes displayed
                  </p>
                </div>

                <School
                  size={20}
                  className="text-slate-400"
                />

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-left">

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Class / Section
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Class Teacher
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Students
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

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 text-right">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition"
                      >

                        {/* Class */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                              <School
                                size={19}
                                className="text-indigo-600"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-slate-800">
                                {item.name}
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                {item.section}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Teacher */}
                        <td className="px-6 py-4">

                          <p className="text-sm text-slate-700">
                            {item.teacher}
                          </p>

                        </td>

                        {/* Students */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users size={16} />
                            {item.students}
                          </div>

                        </td>

                        {/* Present */}
                        <td className="px-6 py-4">

                          <span className="text-sm font-medium text-emerald-600">
                            {item.present}
                          </span>

                        </td>

                        {/* Absent */}
                        <td className="px-6 py-4">

                          <span className="text-sm font-medium text-red-500">
                            {item.absent}
                          </span>

                        </td>

                        {/* Late */}
                        <td className="px-6 py-4">

                          <span className="text-sm font-medium text-amber-500">
                            {item.late}
                          </span>

                        </td>

                        {/* Attendance */}
                        <td className="px-6 py-4 min-w-48">

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

                        {/* Action */}
                        <td className="px-6 py-4 text-right">

                          <button
                            onClick={() => handleView(item)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            <Eye size={16} />
                            View
                          </button>

                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center"
                      >

                        <School
                          size={35}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-medium text-slate-600">
                          No classes found
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          Try changing your search or filter.
                        </p>

                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <Clock3 size={14} />
            Attendance figures shown here are demo data and will be connected
            to the backend later.
          </div>

        </div>
      </main>
    </div>
  );
}

export default Classes;