import {
  GraduationCap,
  ShieldCheck,
  UserRound,
  UsersRound,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Class Admin",
    subtitle: "Teacher / Class In-charge",
    route:"/login/class-admin",
    description:
      "Manage your assigned class, enroll students, capture facial data and mark attendance.",
    icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Attendance Access",
    badgeBg: "bg-blue-50",
    badgeColor: "text-blue-700",
  },
  {
    title: "Super Admin",
    subtitle: "Principal / Leadership",
    route: "/login/super-admin",
    description:
      "View institution-wide students, attendance analytics, reports and class performance.",
    icon: ShieldCheck,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badge: "View Only",
    badgeBg: "bg-indigo-50",
    badgeColor: "text-indigo-700",
  },
  {
    title: "Student",
    subtitle: "Student Portal",
    route: "/login/student",
    description:
      "View your attendance percentage, daily records, working days and attendance history.",
    icon: UserRound,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: "Personal Records",
    badgeBg: "bg-emerald-50",
    badgeColor: "text-emerald-700",
  },
  {
    title: "Parent",
    subtitle: "Parent Portal",
    route: "/login/parent",
    description:
      "Monitor your child's attendance, history and receive important attendance alerts.",
    icon: UsersRound,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badge: "Linked Student",
    badgeBg: "bg-amber-50",
    badgeColor: "text-amber-700",
  },
];

function RoleCards() {

  const navigate = useNavigate();

  return (
    <section id="roles" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Choose your portal
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            One system. Different experiences.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Access the tools and information designed specifically
            for your role in the institution.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="group relative rounded-2xl border border-slate-200
                bg-white p-6 shadow-sm transition duration-300
                hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center
                  rounded-xl ${role.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${role.iconColor}`} />
                </div>

                {/* Badge */}
                <div
                  className={`mt-5 inline-flex rounded-full px-2.5 py-1
                  text-[10px] font-bold uppercase tracking-wide
                  ${role.badgeBg} ${role.badgeColor}`}
                >
                  {role.badge}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {role.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {role.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {role.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => navigate(role.route)}
                  className="mt-6 flex w-full items-center justify-between
                  rounded-lg border border-slate-200 px-4 py-2.5
                  text-sm font-semibold text-slate-700 transition
                  group-hover:border-blue-200 group-hover:bg-blue-50
                  group-hover:text-blue-700"
                >
                  Access Portal

                  <ArrowRight
                    className="h-4 w-4 transition-transform
                    group-hover:translate-x-1"
                  />
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default RoleCards;