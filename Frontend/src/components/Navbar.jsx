function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <span className="material-symbols-outlined">
              face
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              VisionAttend
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Automated Attendance
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#roles"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Roles
          </a>

          <a
            href="#security"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Security
          </a>
        </nav>

        {/* Status */}
        <div className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs font-semibold text-green-700">
            System Operational
          </span>
        </div>

      </div>
    </header>
  )
}

export default Navbar