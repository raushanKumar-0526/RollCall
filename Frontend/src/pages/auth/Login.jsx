import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";

const roleData = {
  "class-admin": {
    title: "Class Admin Login",
    subtitle: "Sign in to manage your assigned class",
    badge: "Class Admin",
    color: "blue",
    demoEmail: "teacher@visionattend.com",
  },

  "super-admin": {
    title: "Super Admin Login",
    subtitle: "Sign in to access institutional analytics",
    badge: "Super Admin",
    color: "indigo",
    demoEmail: "admin@visionattend.com",
  },

  student: {
    title: "Student Login",
    subtitle: "Sign in to view your attendance",
    badge: "Student",
    color: "emerald",
    demoEmail: "student@visionattend.com",
  },

  parent: {
    title: "Parent Login",
    subtitle: "Sign in to monitor your child's attendance",
    badge: "Parent",
    color: "amber",
    demoEmail: "parent@visionattend.com",
  },
};

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.pathname.split("/")[2] || "student";
  const data = roleData[role] || roleData.student;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      role,
      email,
      password,
    });

    alert(`Login submitted for ${data.badge}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <span className="material-symbols-outlined">
                face
              </span>
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold text-slate-900">
                VisionAttend
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Automated Attendance
              </p>
            </div>
          </button>

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

        </div>
      </header>


      {/* Login area */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

          {/* LEFT */}
          <div className="hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white lg:block">

            <div className="flex h-full flex-col justify-between">

              <div>

                <div className="mb-8 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                  {data.badge}
                </div>

                <h2 className="text-4xl font-extrabold leading-tight">
                  Smart attendance.
                  <br />
                  Simple access.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-blue-100">
                  Access your VisionAttend portal securely and
                  manage attendance according to your role.
                </p>

              </div>


              {/* Feature */}
              <div className="mt-12 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                    <LockKeyhole className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure Authentication
                    </p>

                    <p className="text-xs text-blue-100">
                      Role-based access control
                    </p>
                  </div>
                </div>


                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                    <span className="material-symbols-outlined text-sm">
                      verified
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Protected Data
                    </p>

                    <p className="text-xs text-blue-100">
                      Your attendance data stays protected
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>


          {/* RIGHT LOGIN FORM */}
          <div className="p-8 sm:p-10">

            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <span className="material-symbols-outlined">
                  face
                </span>
              </div>
            </div>


            {/* Heading */}
            <div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {data.badge}
              </span>

              <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
                {data.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {data.subtitle}
              </p>
            </div>


            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.demoEmail}
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>


              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>


              {/* Remember */}
              <div className="flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>

              </div>


              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Sign In
              </button>

            </form>


            {/* Security */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">

              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

              <p className="text-xs leading-5 text-slate-500">
                Your login is protected with secure authentication.
                Access is limited according to your assigned role.
              </p>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Login;