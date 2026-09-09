import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/classAdmin/Dashboard";
import Students from "../pages/classAdmin/Students";
import FaceEnrollment from "../pages/classAdmin/FaceEnrollment";
import LiveAttendance from "../pages/classAdmin/LiveAttendance";
import AttendanceRecords from "../pages/classAdmin/AttendanceRecords";
import Reports from "../pages/classAdmin/Reports";
import SuperAdminDashboard from "../pages/superAdmin/Dashboard";
import SuperAdminClasses from "../pages/superAdmin/Classes";
import SuperAdminStudents from "../pages/superAdmin/Students";
import SuperAdminAnalytics from "../pages/superAdmin/Analytics";
import LowAttendance from "../pages/superAdmin/LowAttendance";
import SuperAdminReports from "../pages/superAdmin/Reports";
import AuditLogs from "../pages/superAdmin/AuditLogs";
import SuperAdminSettings from "../pages/superAdmin/Settings";

import App from "../App";
import Login from "../pages/auth/Login";

function AppRoutes() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<App />} />

      {/* Login Pages */}
      <Route path="/login/class-admin" element={<Login />} />

      <Route path="/login/super-admin" element={<Login />} />

      <Route path="/login/student" element={<Login />} />

      <Route path="/login/parent" element={<Login />} />

      {/* Class Admin */}
      <Route
        path="/class-admin"
        element={<Dashboard />}
      />

      <Route
        path="/class-admin/students"
        element={<Students />}
      />

      <Route
        path="/class-admin/enrollment"
        element={<FaceEnrollment />}
      />

      <Route
        path="/class-admin/attendance"
        element={<LiveAttendance />}
      />

      <Route
        path="/class-admin/records"
        element={<AttendanceRecords />}
      />

      <Route 
        path="/class-admin/reports"
        element={<Reports />} 
      />

      {/* Super Admin */}

      <Route
        path="/super-admin"
        element={<SuperAdminDashboard />}
      />

      <Route
        path="/super-admin/classes"
        element={<SuperAdminClasses />}
      />

      <Route
        path="/super-admin/students"
        element={<SuperAdminStudents />}
      />

      <Route
        path="/super-admin/analytics"
        element={<SuperAdminAnalytics />}
      />

      <Route
        path="/super-admin/low-attendance"
        element={<LowAttendance />}
      />

      <Route
        path="/super-admin/reports"
        element={<SuperAdminReports />}
      />

      <Route
        path="/super-admin/audit-logs"
        element={<AuditLogs />}
      />

      <Route
        path="/super-admin/settings"
        element={<SuperAdminSettings />}
      />

    </Routes>
  );
}

export default AppRoutes;