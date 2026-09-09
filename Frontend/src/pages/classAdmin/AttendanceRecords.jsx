import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Clock3,
  Pencil,
  Download,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const attendanceData = [
  {
    id: 1,
    name: "Rahul Kumar",
    roll: "MCA001",
    date: "2026-09-08",
    time: "09:02 AM",
    status: "Present",
    confidence: "98.4%",
    source: "Face Recognition",
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "MCA002",
    date: "2026-09-08",
    time: "09:04 AM",
    status: "Present",
    confidence: "97.8%",
    source: "Face Recognition",
  },
  {
    id: 3,
    name: "Aman Raj",
    roll: "MCA003",
    date: "2026-09-08",
    time: "09:07 AM",
    status: "Late",
    confidence: "96.9%",
    source: "Face Recognition",
  },
  {
    id: 4,
    name: "Sneha Singh",
    roll: "MCA004",
    date: "2026-09-08",
    time: "09:08 AM",
    status: "Present",
    confidence: "99.1%",
    source: "Face Recognition",
  },
  {
    id: 5,
    name: "Aditya Kumar",
    roll: "MCA005",
    date: "2026-09-08",
    time: "09:11 AM",
    status: "Present",
    confidence: "98.2%",
    source: "Face Recognition",
  },
  {
    id: 6,
    name: "Neha Kumari",
    roll: "MCA006",
    date: "2026-09-08",
    time: "-",
    status: "Absent",
    confidence: "-",
    source: "Manual",
  },
  {
    id: 7,
    name: "Rohit Singh",
    roll: "MCA007",
    date: "2026-09-08",
    time: "09:14 AM",
    status: "Present",
    confidence: "97.5%",
    source: "Face Recognition",
  },
  {
    id: 8,
    name: "Anjali Verma",
    roll: "MCA008",
    date: "2026-09-08",
    time: "09:16 AM",
    status: "Present",
    confidence: "98.8%",
    source: "Face Recognition",
  },

  // Previous day
  {
    id: 9,
    name: "Rahul Kumar",
    roll: "MCA001",
    date: "2026-09-07",
    time: "09:03 AM",
    status: "Present",
    confidence: "98.1%",
    source: "Face Recognition",
  },
  {
    id: 10,
    name: "Priya Sharma",
    roll: "MCA002",
    date: "2026-09-07",
    time: "09:12 AM",
    status: "Late",
    confidence: "97.2%",
    source: "Face Recognition",
  },
  {
    id: 11,
    name: "Aman Raj",
    roll: "MCA003",
    date: "2026-09-07",
    time: "-",
    status: "Absent",
    confidence: "-",
    source: "Manual",
  },
];

function AttendanceRecords() {
  const [records, setRecords] = useState(attendanceData);

  const [search, setSearch] = useState("");

  const [date, setDate] = useState("2026-09-08");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        record.name.toLowerCase().includes(searchText) ||
        record.roll.toLowerCase().includes(searchText);

      const matchesDate = record.date === date;

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [records, search, date, statusFilter]);

  const presentCount = filteredRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = filteredRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = filteredRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const attendanceRate =
    filteredRecords.length > 0
      ? Math.round(
          ((presentCount + lateCount) /
            filteredRecords.length) *
            100
        )
      : 0;

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const updateStatus = (newStatus) => {
    if (!selectedRecord) return;

    setRecords((previous) =>
      previous.map((record) =>
        record.id === selectedRecord.id
          ? {
              ...record,
              status: newStatus,
              source: "Manual",
              time:
                newStatus === "Absent"
                  ? "-"
                  : record.time === "-"
                  ? new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : record.time,
            }
          : record
      )
    );

    setShowEditModal(false);
    setSelectedRecord(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <AdminTopbar />

      <main className="ml-64 pt-16">

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div>

              <p className="text-sm font-medium text-blue-600">
                MCA Final Year · Section A
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Attendance Records
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage attendance records for your class.
              </p>

            </div>

            <button
              onClick={() => alert("Export will be connected to the backend later.")}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>

          </div>


          {/* Summary */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Attendance rate */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">

              <p className="text-sm text-slate-500">
                Attendance Rate
              </p>

              <p className="mt-2 text-2xl font-extrabold text-blue-600">
                {attendanceRate}%
              </p>

            </div>


            {/* Present */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">

              <div className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 text-green-600" />

                <p className="text-sm text-slate-500">
                  Present
                </p>

              </div>

              <p className="mt-2 text-2xl font-extrabold text-green-600">
                {presentCount}
              </p>

            </div>


            {/* Late */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">

              <div className="flex items-center gap-2">

                <Clock3 className="h-4 w-4 text-amber-600" />

                <p className="text-sm text-slate-500">
                  Late
                </p>

              </div>

              <p className="mt-2 text-2xl font-extrabold text-amber-600">
                {lateCount}
              </p>

            </div>


            {/* Absent */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">

              <div className="flex items-center gap-2">

                <XCircle className="h-4 w-4 text-red-600" />

                <p className="text-sm text-slate-500">
                  Absent
                </p>

              </div>

              <p className="mt-2 text-2xl font-extrabold text-red-600">
                {absentCount}
              </p>

            </div>

          </div>


          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            {/* Filters */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">

              {/* Search */}
              <div className="relative flex-1">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student or roll number..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* Date */}
              <div className="relative">

                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
                />

              </div>


              {/* Status */}
              <div className="flex items-center gap-2">

                <SlidersHorizontal className="h-4 w-4 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
                >
                  <option>All</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>

              </div>

            </div>


            {/* Result count */}
            <div className="border-b border-slate-100 px-5 py-3">

              <p className="text-xs font-medium text-slate-500">
                Showing {filteredRecords.length} attendance records
              </p>

            </div>


            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Time
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Recognition
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Source
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredRecords.map((record) => (

                    <tr
                      key={record.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      {/* Student */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                            {record.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>

                          <div>

                            <p className="text-sm font-bold text-slate-900">
                              {record.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {record.roll}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Date */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {new Date(
                          record.date + "T00:00:00"
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>


                      {/* Time */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {record.time}
                      </td>


                      {/* Status */}
                      <td className="px-5 py-4">

                        {record.status === "Present" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Present
                          </span>
                        )}

                        {record.status === "Absent" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                            <XCircle className="h-3.5 w-3.5" />
                            Absent
                          </span>
                        )}

                        {record.status === "Late" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                            <Clock3 className="h-3.5 w-3.5" />
                            Late
                          </span>
                        )}

                      </td>


                      {/* Recognition */}
                      <td className="px-5 py-4">

                        {record.confidence !== "-" ? (
                          <span className="text-sm font-semibold text-slate-700">
                            {record.confidence}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">
                            —
                          </span>
                        )}

                      </td>


                      {/* Source */}
                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            record.source === "Face Recognition"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {record.source}
                        </span>

                      </td>


                      {/* Action */}
                      <td className="px-5 py-4 text-right">

                        <button
                          onClick={() => openEditModal(record)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* Empty */}
            {filteredRecords.length === 0 && (
              <div className="px-6 py-16 text-center">

                <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 text-sm font-bold text-slate-900">
                  No attendance records
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another date, student or status filter.
                </p>

              </div>
            )}

          </div>


          {/* Note */}
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex gap-3">

              <ShieldIcon />

              <div>

                <p className="text-sm font-bold text-blue-900">
                  Manual corrections are restricted
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Changes made by a Class Admin should be recorded
                  in the audit log with the original value, updated
                  value and reason.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* Edit Modal */}
      {showEditModal && selectedRecord && (
        <EditAttendanceModal
          record={selectedRecord}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRecord(null);
          }}
          onUpdate={updateStatus}
        />
      )}

    </div>
  );
}


function ShieldIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
      <ShieldCheckIcon />
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <CheckCircle2 className="h-5 w-5 text-blue-600" />
  );
}


function EditAttendanceModal({
  record,
  onClose,
  onUpdate,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Edit Attendance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {record.name} · {record.roll}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>

        </div>


        {/* Body */}
        <div className="p-6">

          <div className="rounded-lg bg-slate-50 p-4">

            <p className="text-xs text-slate-500">
              Current status
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {record.status}
            </p>

          </div>


          <p className="mt-6 text-sm font-semibold text-slate-700">
            Change status to
          </p>


          <div className="mt-3 grid grid-cols-3 gap-3">

            <button
              onClick={() => onUpdate("Present")}
              className="rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-sm font-bold text-green-700 hover:bg-green-100"
            >
              Present
            </button>

            <button
              onClick={() => onUpdate("Late")}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-bold text-amber-700 hover:bg-amber-100"
            >
              Late
            </button>

            <button
              onClick={() => onUpdate("Absent")}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-700 hover:bg-red-100"
            >
              Absent
            </button>

          </div>


          <div className="mt-5 rounded-lg border border-amber-100 bg-amber-50 p-3">

            <p className="text-xs leading-5 text-amber-700">
              This is a manual correction. The final backend will
              record this change in the audit log.
            </p>

          </div>

        </div>


        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default AttendanceRecords;