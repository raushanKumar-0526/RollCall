import { useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  ShieldCheck,
  Bell,
  Clock3,
  Save,
  Lock,
  Database,
  UserCog,
} from "lucide-react";

import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/admin/SuperAdminTopbar";

function Settings() {
  const [institution, setInstitution] = useState({
    name: "VisionAttend Institution",
    code: "VA-001",
    email: "admin@institution.edu",
    phone: "+91 98765 43210",
  });

  const [attendance, setAttendance] = useState({
    threshold: 75,
    gracePeriod: 15,
    duplicateLock: true,
    lateEnabled: true,
  });

  const [notifications, setNotifications] = useState({
    lowAttendance: true,
    parentAlerts: true,
    systemAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />
      <SuperAdminTopbar />

      <main className="ml-64 pt-20">
        <div className="p-6 lg:p-8 max-w-7xl">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

            <div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <SettingsIcon size={16} />
                <span>
                  Administration / Settings
                </span>
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                System Settings
              </h1>

              <p className="text-slate-500 mt-1">
                Manage institution, attendance and notification configuration.
              </p>

            </div>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>

          {saved && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700">
              Settings saved successfully.
            </div>
          )}

          {/* Institution */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">

            <div className="flex items-start gap-3 mb-6">

              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Building2 size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Institution Settings
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Basic institutional information.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Institution Name
                </label>

                <input
                  value={institution.name}
                  onChange={(e) =>
                    setInstitution({
                      ...institution,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Institution Code
                </label>

                <input
                  value={institution.code}
                  onChange={(e) =>
                    setInstitution({
                      ...institution,
                      code: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Email
                </label>

                <input
                  value={institution.email}
                  onChange={(e) =>
                    setInstitution({
                      ...institution,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Number
                </label>

                <input
                  value={institution.phone}
                  onChange={(e) =>
                    setInstitution({
                      ...institution,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                />
              </div>

            </div>

          </section>

          {/* Attendance */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">

            <div className="flex items-start gap-3 mb-6">

              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Clock3 size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Attendance Rules
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Configure institution-wide attendance rules.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Attendance Threshold
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={attendance.threshold}
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        threshold: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 pr-12 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Late Grace Period
                </label>

                <div className="relative">

                  <input
                    type="number"
                    min="0"
                    value={attendance.gracePeriod}
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        gracePeriod: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 pr-16 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    min
                  </span>

                </div>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Duplicate Punch Protection
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Prevent multiple attendance records for the same day.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={attendance.duplicateLock}
                  onChange={(e) =>
                    setAttendance({
                      ...attendance,
                      duplicateLock: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Enable Late Status
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Allow Class Admins to record late arrivals.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={attendance.lateEnabled}
                  onChange={(e) =>
                    setAttendance({
                      ...attendance,
                      lateEnabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-indigo-600"
                />

              </label>

            </div>

          </section>

          {/* Notifications */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">

            <div className="flex items-start gap-3 mb-6">

              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Bell size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Notifications
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Configure important system notifications.
                </p>
              </div>

            </div>

            <div className="space-y-3">

              <label className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Low Attendance Alerts
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Notify when student attendance falls below threshold.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications.lowAttendance}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      lowAttendance: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Parent Alerts
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Enable attendance alerts for parents.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications.parentAlerts}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      parentAlerts: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between p-4 border border-slate-100 rounded-xl cursor-pointer">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    System Alerts
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Receive important system and security notifications.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications.systemAlerts}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      systemAlerts: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-indigo-600"
                />

              </label>

            </div>

          </section>

          {/* Security */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">

            <div className="flex items-start gap-3 mb-6">

              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Security & Access
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Current security configuration.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-slate-50 rounded-xl">
                <Lock
                  size={19}
                  className="text-indigo-600"
                />

                <p className="text-sm font-medium text-slate-700 mt-3">
                  JWT Authentication
                </p>

                <p className="text-xs text-emerald-600 mt-1">
                  Enabled
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <Database
                  size={19}
                  className="text-indigo-600"
                />

                <p className="text-sm font-medium text-slate-700 mt-3">
                  Database
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Backend managed
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <UserCog
                  size={19}
                  className="text-indigo-600"
                />

                <p className="text-sm font-medium text-slate-700 mt-3">
                  Role Based Access
                </p>

                <p className="text-xs text-emerald-600 mt-1">
                  Enabled
                </p>
              </div>

            </div>

          </section>

          {/* Final save */}
          <div className="flex justify-end">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
            >
              <Save size={17} />
              Save Settings
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Settings;