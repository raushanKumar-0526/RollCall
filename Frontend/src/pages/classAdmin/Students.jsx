import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  ScanFace,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const initialStudents = [
  {
    id: 1,
    name: "Rahul Kumar",
    roll: "MCA001",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    faceEnrolled: true,
    attendance: 92,
    present: 46,
    absent: 4,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "MCA002",
    email: "priya@example.com",
    phone: "+91 9876543211",
    faceEnrolled: true,
    attendance: 88,
    present: 44,
    absent: 6,
    status: "Active",
  },
  {
    id: 3,
    name: "Aman Raj",
    roll: "MCA003",
    email: "aman@example.com",
    phone: "+91 9876543212",
    faceEnrolled: false,
    attendance: 76,
    present: 38,
    absent: 12,
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Singh",
    roll: "MCA004",
    email: "sneha@example.com",
    phone: "+91 9876543213",
    faceEnrolled: true,
    attendance: 95,
    present: 48,
    absent: 2,
    status: "Active",
  },
  {
    id: 5,
    name: "Aditya Kumar",
    roll: "MCA005",
    email: "aditya@example.com",
    phone: "+91 9876543214",
    faceEnrolled: true,
    attendance: 84,
    present: 42,
    absent: 8,
    status: "Active",
  },
  {
    id: 6,
    name: "Neha Kumari",
    roll: "MCA006",
    email: "neha@example.com",
    phone: "+91 9876543215",
    faceEnrolled: false,
    attendance: 71,
    present: 35,
    absent: 15,
    status: "Active",
  },
  {
    id: 7,
    name: "Rohit Singh",
    roll: "MCA007",
    email: "rohit@example.com",
    phone: "+91 9876543216",
    faceEnrolled: true,
    attendance: 90,
    present: 45,
    absent: 5,
    status: "Active",
  },
  {
    id: 8,
    name: "Anjali Verma",
    roll: "MCA008",
    email: "anjali@example.com",
    phone: "+91 9876543217",
    faceEnrolled: true,
    attendance: 86,
    present: 43,
    absent: 7,
    status: "Active",
  },
];

function Students() {
  const [students] = useState(initialStudents);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.roll.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue);

      let matchesFilter = true;

      if (filter === "Face Enrolled") {
        matchesFilter = student.faceEnrolled;
      }

      if (filter === "Face Pending") {
        matchesFilter = !student.faceEnrolled;
      }

      if (filter === "Low Attendance") {
        matchesFilter = student.attendance < 75;
      }

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <AdminTopbar />

      <main className="ml-64 pt-16">

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-medium text-blue-600">
                MCA Final Year · Section A
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Students
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage students and facial enrollment for your class.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </button>

          </div>


          {/* Summary cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <p className="mt-2 text-2xl font-extrabold text-slate-900">
                {students.length}
              </p>
            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Face Enrolled
              </p>

              <p className="mt-2 text-2xl font-extrabold text-green-600">
                {students.filter((s) => s.faceEnrolled).length}
              </p>
            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Enrollment Pending
              </p>

              <p className="mt-2 text-2xl font-extrabold text-amber-600">
                {students.filter((s) => !s.faceEnrolled).length}
              </p>
            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">
                Low Attendance
              </p>

              <p className="mt-2 text-2xl font-extrabold text-red-600">
                {students.filter((s) => s.attendance < 75).length}
              </p>
            </div>

          </div>


          {/* Student table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            {/* Toolbar */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, roll number or email..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* Filter */}
              <div className="flex items-center gap-2">

                <SlidersHorizontal className="h-4 w-4 text-slate-400" />

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
                >
                  <option>All</option>
                  <option>Face Enrolled</option>
                  <option>Face Pending</option>
                  <option>Low Attendance</option>
                </select>

              </div>

            </div>


            {/* Results */}
            <div className="border-b border-slate-100 px-5 py-3">
              <p className="text-xs font-medium text-slate-500">
                Showing {filteredStudents.length} of {students.length} students
              </p>
            </div>


            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Roll Number
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Face Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Attendance
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {filteredStudents.map((student) => (

                    <tr
                      key={student.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      {/* Student */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {student.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {student.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {student.email}
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Roll */}
                      <td className="px-5 py-4">

                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                          {student.roll}
                        </span>

                      </td>


                      {/* Face */}
                      <td className="px-5 py-4">

                        {student.faceEnrolled ? (

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">

                            <CheckCircle2 className="h-3.5 w-3.5" />

                            Enrolled

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">

                            <AlertCircle className="h-3.5 w-3.5" />

                            Pending

                          </span>

                        )}

                      </td>


                      {/* Attendance */}
                      <td className="px-5 py-4">

                        <div className="w-32">

                          <div className="mb-1 flex items-center justify-between">

                            <span
                              className={`text-sm font-bold ${
                                student.attendance < 75
                                  ? "text-red-600"
                                  : student.attendance < 80
                                  ? "text-amber-600"
                                  : "text-green-600"
                              }`}
                            >
                              {student.attendance}%
                            </span>

                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className={`h-full rounded-full ${
                                student.attendance < 75
                                  ? "bg-red-500"
                                  : student.attendance < 80
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${student.attendance}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>


                      {/* Status */}
                      <td className="px-5 py-4">

                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                          {student.status}
                        </span>

                      </td>


                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-1">

                          <button
                            title="View Student"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            title="Edit Student"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            title="Face Enrollment"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            <ScanFace className="h-4 w-4" />
                          </button>

                          <button
                            title="More"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* Empty state */}
            {filteredStudents.length === 0 && (
              <div className="px-6 py-16 text-center">

                <Search className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 text-sm font-bold text-slate-900">
                  No students found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filter.
                </p>

              </div>
            )}

          </div>

        </div>

      </main>


      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
        />
      )}

    </div>
  );
}


function AddStudentModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Student
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add a new student to MCA Final Year · Section A
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-5 p-6"
        >

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              required
              type="text"
              placeholder="Enter student's full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>


          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Roll Number
              </label>

              <input
                required
                type="text"
                placeholder="MCA009"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                required
                type="email"
                placeholder="student@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

          </div>


          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>


          {/* Info */}
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">

            <div className="flex gap-3">

              <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Face enrollment
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  After adding the student, you can capture their
                  facial data from the Face Enrollment section.
                </p>
              </div>

            </div>

          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              Add Student
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Students;