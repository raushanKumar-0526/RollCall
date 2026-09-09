import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  AlertTriangle,
  GraduationCap,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

const studentData = [
  {
    id: 1,
    name: "Aarav Kumar",
    roll: "MCA001",
    email: "aarav@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 88,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "MCA002",
    email: "priya@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 96,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 3,
    name: "Rahul Singh",
    roll: "MCA003",
    email: "rahul@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 70,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 4,
    name: "Ananya Verma",
    roll: "MCA004",
    email: "ananya@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 89,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 5,
    name: "Rohit Kumar",
    roll: "MCA005",
    email: "rohit@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 63,
    status: "Active",
    faceEnrolled: false,
  },
  {
    id: 6,
    name: "Sneha Gupta",
    roll: "MCA006",
    email: "sneha@example.com",
    className: "MCA Final Year",
    section: "A",
    attendance: 85,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 7,
    name: "Amit Verma",
    roll: "MCA021",
    email: "amit@example.com",
    className: "MCA Final Year",
    section: "B",
    attendance: 68,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 8,
    name: "Neha Gupta",
    roll: "MCA042",
    email: "neha@example.com",
    className: "MCA 2nd Year",
    section: "B",
    attendance: 71,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 9,
    name: "Vikash Singh",
    roll: "BCA101",
    email: "vikash@example.com",
    className: "BCA Final Year",
    section: "A",
    attendance: 91,
    status: "Active",
    faceEnrolled: true,
  },
  {
    id: 10,
    name: "Pooja Kumari",
    roll: "BCA102",
    email: "pooja@example.com",
    className: "BCA Final Year",
    section: "A",
    attendance: 78,
    status: "Active",
    faceEnrolled: false,
  },
];

function Students() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [attendanceFilter, setAttendanceFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return studentData.filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.roll.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue);

      const matchesClass =
        classFilter === "All" ||
        `${student.className} - ${student.section}` === classFilter;

      let matchesAttendance = true;

      if (attendanceFilter === "Low") {
        matchesAttendance = student.attendance < 75;
      }

      if (attendanceFilter === "Good") {
        matchesAttendance = student.attendance >= 75;
      }

      if (attendanceFilter === "Excellent") {
        matchesAttendance = student.attendance >= 85;
      }

      return (
        matchesSearch &&
        matchesClass &&
        matchesAttendance
      );
    });
  }, [search, classFilter, attendanceFilter]);

  const totalStudents = studentData.length;

  const enrolledStudents = studentData.filter(
    (student) => student.faceEnrolled
  ).length;

  const lowAttendance = studentData.filter(
    (student) => student.attendance < 75
  ).length;

  const activeStudents = studentData.filter(
    (student) => student.status === "Active"
  ).length;

  const handleView = (student) => {
    alert(
      `Student Details\n\nName: ${student.name}\nRoll No: ${student.roll}\nClass: ${student.className} - ${student.section}\nAttendance: ${student.attendance}%`
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
              <Users size={16} />
              <span>Administration / Students</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  All Students
                </h1>

                <p className="text-slate-500 mt-1">
                  View students across all classes and sections.
                </p>
              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Students
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {totalStudents}
                  </h2>
                </div>

                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Users size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Across all classes
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Active Students
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {activeStudents}
                  </h2>
                </div>

                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <UserCheck size={22} />
                </div>

              </div>

              <p className="text-xs text-emerald-600 mt-4">
                Currently enrolled
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Face Enrolled
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {enrolledStudents}
                  </h2>
                </div>

                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <GraduationCap size={22} />
                </div>

              </div>

              <p className="text-xs text-slate-400 mt-4">
                Facial data enrolled
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Low Attendance
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {lowAttendance}
                  </h2>
                </div>

                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <AlertTriangle size={22} />
                </div>

              </div>

              <p className="text-xs text-red-500 mt-4">
                Below 75%
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
                  placeholder="Search name, roll number or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* Class Filter */}
              <div className="relative">

                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
                >
                  <option value="All">All Classes</option>
                  <option value="MCA Final Year - A">
                    MCA Final Year - A
                  </option>
                  <option value="MCA Final Year - B">
                    MCA Final Year - B
                  </option>
                  <option value="MCA 2nd Year - B">
                    MCA 2nd Year - B
                  </option>
                  <option value="BCA Final Year - A">
                    BCA Final Year - A
                  </option>
                </select>

              </div>

              {/* Attendance Filter */}
              <select
                value={attendanceFilter}
                onChange={(e) => setAttendanceFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
              >
                <option value="All">All Attendance</option>
                <option value="Excellent">
                  Excellent (85%+)
                </option>
                <option value="Good">
                  Good (75%+)
                </option>
                <option value="Low">
                  Low (Below 75%)
                </option>
              </select>

            </div>

          </div>

          {/* Student Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-100">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Student Directory
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {filteredStudents.length} students displayed
                  </p>
                </div>

                <Users
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
                      Student
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Roll No.
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Class
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Face Status
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Attendance
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 text-right">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition"
                      >

                        {/* Student */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
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
                                {student.email}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Roll */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">
                            {student.roll}
                          </span>
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

                        {/* Face */}
                        <td className="px-6 py-4">

                          {student.faceEnrolled ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                              <UserCheck size={14} />
                              Enrolled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
                              <UserX size={14} />
                              Pending
                            </span>
                          )}

                        </td>

                        {/* Attendance */}
                        <td className="px-6 py-4 min-w-44">

                          <div className="flex items-center gap-3">

                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">

                              <div
                                className={`h-full rounded-full ${
                                  student.attendance >= 85
                                    ? "bg-emerald-500"
                                    : student.attendance >= 75
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${student.attendance}%`,
                                }}
                              />

                            </div>

                            <span
                              className={`text-sm font-semibold ${
                                student.attendance >= 85
                                  ? "text-emerald-600"
                                  : student.attendance >= 75
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }`}
                            >
                              {student.attendance}%
                            </span>

                          </div>

                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">

                          <span className="inline-flex items-center px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                            {student.status}
                          </span>

                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-right">

                          <button
                            onClick={() => handleView(student)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
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
                        colSpan="7"
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

          {/* Access Notice */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">

            <div className="flex items-start gap-3">

              <GraduationCap
                size={19}
                className="text-indigo-600 mt-0.5"
              />

              <div>
                <p className="text-sm font-medium text-indigo-800">
                  Super Admin Access
                </p>

                <p className="text-xs text-indigo-600 mt-1">
                  Student information is view-only from this portal.
                  Attendance marking and facial enrollment are handled
                  by the assigned Class Admin.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Students;