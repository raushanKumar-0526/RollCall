import { useState } from "react";
import {
  ScanFace,
  Camera,
  CameraOff,
  CheckCircle2,
  RotateCcw,
  User,
  ShieldCheck,
  Info,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const students = [
  {
    id: 1,
    name: "Rahul Kumar",
    roll: "MCA001",
    email: "rahul@example.com",
    enrolled: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "MCA002",
    email: "priya@example.com",
    enrolled: true,
  },
  {
    id: 3,
    name: "Aman Raj",
    roll: "MCA003",
    email: "aman@example.com",
    enrolled: false,
  },
  {
    id: 4,
    name: "Sneha Singh",
    roll: "MCA004",
    email: "sneha@example.com",
    enrolled: true,
  },
  {
    id: 5,
    name: "Aditya Kumar",
    roll: "MCA005",
    email: "aditya@example.com",
    enrolled: true,
  },
];

function FaceEnrollment() {
  const [selectedStudent, setSelectedStudent] = useState(students[2]);

  const [cameraStarted, setCameraStarted] = useState(false);

  const [samples, setSamples] = useState([]);

  const [completed, setCompleted] = useState(false);

  const handleStartCamera = () => {
    setCameraStarted(true);
    setCompleted(false);
  };

  const handleCapture = () => {
    if (samples.length >= 5) return;

    const newSample = {
      id: samples.length + 1,
      label: `Sample ${samples.length + 1}`,
    };

    setSamples([...samples, newSample]);
  };

  const handleReset = () => {
    setSamples([]);
    setCompleted(false);
    setCameraStarted(false);
  };

  const handleComplete = () => {
    if (samples.length < 3) {
      alert("Please capture at least 3 face samples.");
      return;
    }

    setCompleted(true);
    setCameraStarted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <AdminTopbar />

      <main className="ml-64 pt-16">

        <div className="p-6 lg:p-8">

          {/* Page Header */}
          <div className="mb-7">

            <p className="text-sm font-medium text-blue-600">
              MCA Final Year · Section A
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              Face Enrollment
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Register facial data for secure attendance recognition.
            </p>

          </div>


          {/* Main Grid */}
          <div className="grid gap-6 xl:grid-cols-3">

            {/* LEFT — Student Selection */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Select Student
                  </h2>

                  <p className="text-xs text-slate-500">
                    Choose a student to enroll
                  </p>
                </div>

              </div>


              {/* Student List */}
              <div className="mt-6 space-y-2">

                {students.map((student) => (

                  <button
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setSamples([]);
                      setCompleted(false);
                      setCameraStarted(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      selectedStudent.id === student.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {student.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {student.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {student.roll}
                      </p>

                    </div>

                    {student.enrolled && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                    )}

                  </button>

                ))}

              </div>


              {/* Selected Student */}
              <div className="mt-6 rounded-xl bg-slate-50 p-4">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Selected Student
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {selectedStudent.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedStudent.roll} · {selectedStudent.email}
                </p>

              </div>

            </div>


            {/* CENTER — Camera */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <ScanFace className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Facial Capture
                    </h2>

                    <p className="text-xs text-slate-500">
                      Capture multiple samples for recognition
                    </p>
                  </div>

                </div>


                <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {samples.length} / 5 Samples
                </div>

              </div>


              {/* Camera Area */}
              <div className="relative mt-6 h-[400px] overflow-hidden rounded-2xl bg-slate-950">

                {!cameraStarted && !completed && (

                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                      <Camera className="h-9 w-9 text-slate-400" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      Camera is not started
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      Position the student's face inside the camera
                      frame and capture multiple samples.
                    </p>

                    <button
                      onClick={handleStartCamera}
                      className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <Camera className="h-4 w-4" />
                      Start Camera
                    </button>

                  </div>

                )}


                {cameraStarted && (

                  <>
                    {/* Fake camera background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />

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
                    <div className="absolute left-1/2 top-1/2 flex h-56 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[45%] border-2 border-blue-400/70 bg-slate-700/40">

                      <span className="material-symbols-outlined text-8xl text-slate-400/70">
                        face
                      </span>

                      {/* Face Box */}
                      <div className="absolute -inset-5 rounded-2xl border-2 border-green-400">

                        <span className="absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-green-300" />

                        <span className="absolute -right-1 -top-1 h-6 w-6 border-r-2 border-t-2 border-green-300" />

                        <span className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-green-300" />

                        <span className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-green-300" />

                      </div>

                    </div>


                    {/* Camera Status */}
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                      <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                        <span className="text-xs font-semibold text-white">
                          CAMERA LIVE
                        </span>

                      </div>

                      <div className="rounded-full bg-green-500/20 px-3 py-1.5 text-xs font-bold text-green-400">
                        FACE DETECTED
                      </div>

                    </div>


                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">

                      <button
                        onClick={handleCapture}
                        disabled={samples.length >= 5}
                        className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-xl transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Camera className="h-4 w-4" />
                        Capture Sample
                      </button>

                      <button
                        onClick={() => setCameraStarted(false)}
                        className="flex items-center gap-2 rounded-lg bg-slate-800/90 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-slate-700"
                      >
                        <CameraOff className="h-4 w-4" />
                        Stop
                      </button>

                    </div>

                  </>

                )}


                {completed && (

                  <div className="flex h-full flex-col items-center justify-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15">
                      <CheckCircle2 className="h-10 w-10 text-green-400" />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-white">
                      Enrollment Complete
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Facial samples captured successfully.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-6 flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Enroll Again
                    </button>

                  </div>

                )}

              </div>


              {/* Samples */}
              <div className="mt-5">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-sm font-bold text-slate-900">
                    Captured Samples
                  </p>

                  <p className="text-xs text-slate-500">
                    Minimum 3 required
                  </p>

                </div>


                <div className="grid grid-cols-5 gap-3">

                  {[1, 2, 3, 4, 5].map((number) => {

                    const captured = samples.some(
                      (sample) => sample.id === number
                    );

                    return (
                      <div
                        key={number}
                        className={`flex h-20 items-center justify-center rounded-lg border ${
                          captured
                            ? "border-green-200 bg-green-50"
                            : "border-dashed border-slate-300 bg-slate-50"
                        }`}
                      >

                        {captured ? (
                          <div className="text-center">
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />
                            <p className="mt-1 text-[10px] font-bold text-green-700">
                              Sample {number}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs font-medium text-slate-400">
                            Sample {number}
                          </p>
                        )}

                      </div>
                    );

                  })}

                </div>

              </div>


              {/* Complete Button */}
              <div className="mt-6 flex justify-end">

                <button
                  onClick={handleComplete}
                  disabled={samples.length < 3}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Complete Enrollment
                </button>

              </div>

            </div>

          </div>


          {/* Security Information */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5">

              <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" />

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Secure Enrollment
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Facial data should only be captured with
                  appropriate authorization.
                </p>
              </div>

            </div>


            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5">

              <ScanFace className="h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Multiple Samples
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Multiple angles can improve recognition
                  robustness.
                </p>
              </div>

            </div>


            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5">

              <Info className="h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Good Lighting
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Make sure the student's face is clearly visible
                  during capture.
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default FaceEnrollment;