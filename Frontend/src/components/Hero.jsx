function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">

        {/* ================= LEFT ================= */}
        <div className="min-w-0">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              AI-Powered Attendance
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">

            <span className="block">
              Automated Attendance
            </span>

            <span className="block text-blue-600">
              Through Facial Recognition
            </span>

          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            A smart attendance management system powered by
            CNN-based facial recognition. Fast, secure and
            designed for modern educational institutions.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">

            <button
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm
              font-semibold text-white shadow-lg shadow-blue-600/20
              transition hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              className="rounded-lg border border-slate-300 bg-white
              px-6 py-3 text-sm font-semibold text-slate-700
              transition hover:border-blue-400 hover:text-blue-600"
            >
              View Demo
            </button>

          </div>

          {/* Features */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-green-600">
                verified
              </span>
              Secure
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-blue-600">
                bolt
              </span>
              Fast Recognition
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="material-symbols-outlined text-indigo-600">
                groups
              </span>
              Role Based
            </div>

          </div>
        </div>


        {/* ================= RIGHT ================= */}
        <div className="relative min-w-0">

          {/* Camera Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl">

            {/* Camera Header */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

                <span className="text-xs font-semibold text-white">
                  LIVE CAMERA
                </span>
              </div>

              <span className="rounded-md bg-green-500/20 px-2 py-1 text-[10px] font-bold text-green-400">
                ONLINE
              </span>

            </div>


            {/* Camera View */}
            <div className="relative h-[330px] overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 sm:h-[380px]">

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Face */}
              <div className="absolute left-1/2 top-1/2 flex h-48 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[45%] border-2 border-blue-400/70 bg-slate-700/40">

                <span className="material-symbols-outlined text-7xl text-slate-400/70">
                  face
                </span>

                {/* Recognition Box */}
                <div className="absolute -inset-4 rounded-xl border-2 border-green-400">

                  {/* Corners */}
                  <span className="absolute -left-1 -top-1 h-5 w-5 border-l-2 border-t-2 border-green-300" />

                  <span className="absolute -right-1 -top-1 h-5 w-5 border-r-2 border-t-2 border-green-300" />

                  <span className="absolute -bottom-1 -left-1 h-5 w-5 border-b-2 border-l-2 border-green-300" />

                  <span className="absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-green-300" />

                  {/* Detection Label */}
                  <div className="absolute -top-9 left-0 whitespace-nowrap rounded bg-green-500 px-2.5 py-1 text-xs font-bold text-white">
                    Face Detected
                  </div>

                </div>

              </div>


              {/* Scan Line */}
              <div className="absolute left-8 right-8 top-1/2 h-px bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />


              {/* Recognition Status */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-slate-600 bg-slate-900/90 px-4 py-3 backdrop-blur">

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Recognition Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-green-400">
                    Identity Verified
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Confidence
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    98.7%
                  </p>
                </div>

              </div>

            </div>
          </div>


          {/* Floating Attendance Card */}
          <div className="absolute -bottom-5 -left-4 rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:-left-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <span className="material-symbols-outlined text-green-600">
                  check_circle
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Attendance Marked
                </p>

                <p className="text-xs text-slate-500">
                  Student verified successfully
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero