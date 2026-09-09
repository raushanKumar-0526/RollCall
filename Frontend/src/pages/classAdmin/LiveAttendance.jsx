import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  CheckCircle2,
  Clock3,
  Users,
  UserCheck,
  UserX,
  ScanFace,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Play,
  Square,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const demoStudents = [
  {
    id: 1,
    name: "Rahul Kumar",
    roll: "MCA001",
    confidence: 98.4,
  },
  {
    id: 2,
    name: "Priya Sharma",
    roll: "MCA002",
    confidence: 97.8,
  },
  {
    id: 3,
    name: "Aman Raj",
    roll: "MCA003",
    confidence: 96.9,
  },
];

function LiveAttendance() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [scanning, setScanning] = useState(false);

  const [recognizedStudent, setRecognizedStudent] = useState(null);

  const [attendance, setAttendance] = useState([]);

  const [duplicateMessage, setDuplicateMessage] = useState("");

  const [lastPunch, setLastPunch] = useState(null);

  const [sessionActive, setSessionActive] = useState(false);

  /* ================= CAMERA ================= */

  const startCamera = async () => {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStarted(true);
    } catch (error) {
      console.error(error);

      setCameraError(
        "Camera access was denied or is not available. Please allow camera permission and try again."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraStarted(false);
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  /* ================= RECOGNITION ================= */

  const simulateRecognition = () => {
    if (!cameraStarted) {
      alert("Please start the camera first.");
      return;
    }

    setScanning(true);
    setRecognizedStudent(null);
    setDuplicateMessage("");

    setTimeout(() => {
      const randomStudent =
        demoStudents[
          Math.floor(Math.random() * demoStudents.length)
        ];

      setRecognizedStudent(randomStudent);
      setScanning(false);
    }, 1500);
  };

  /* ================= ATTENDANCE ================= */

  const markAttendance = () => {
    if (!recognizedStudent) return;

    const alreadyMarked = attendance.some(
      (item) => item.studentId === recognizedStudent.id
    );

    if (alreadyMarked) {
      setDuplicateMessage(
        `${recognizedStudent.name} is already marked present today.`
      );

      return;
    }

    const now = new Date();

    const currentTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newPunch = {
      id: Date.now(),
      studentId: recognizedStudent.id,
      name: recognizedStudent.name,
      roll: recognizedStudent.roll,
      time: currentTime,
      confidence: recognizedStudent.confidence,
      status: "Present",
    };

    setAttendance((previous) => [newPunch, ...previous]);

    setLastPunch(newPunch);

    setDuplicateMessage("");

    setRecognizedStudent(null);
  };

  const resetSession = () => {
    setAttendance([]);
    setRecognizedStudent(null);
    setLastPunch(null);
    setDuplicateMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <AdminTopbar />

      <main className="ml-64 pt-16">

        <div className="p-6 lg:p-8">

          {/* Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div>
              <p className="text-sm font-medium text-blue-600">
                MCA Final Year · Section A
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Live Attendance
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Use facial recognition to mark today's attendance.
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={resetSession}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>

              <button
                onClick={() => {
                  if (sessionActive) {
                    setSessionActive(false);
                    stopCamera();
                  } else {
                    setSessionActive(true);
                    startCamera();
                  }
                }}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white ${
                  sessionActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sessionActive ? (
                  <>
                    <Square className="h-4 w-4" />
                    End Session
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start Session
                  </>
                )}
              </button>

            </div>

          </div>


          {/* Session information */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Class Strength
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    64
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Marked Today
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    {attendance.length}
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Remaining
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    {64 - attendance.length}
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <ScanFace className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Recognition
                  </p>

                  <p className="text-xl font-extrabold text-green-600">
                    Active
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Scanner */}
          <div className="grid gap-6 xl:grid-cols-3">

            {/* Camera */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white xl:col-span-2">

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Recognition Camera
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Position the student's face inside the frame.
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    cameraStarted
                      ? "bg-green-50 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cameraStarted ? "CAMERA LIVE" : "CAMERA OFF"}
                </div>

              </div>


              {/* Camera */}
              <div className="relative h-[500px] bg-slate-950">

                {!cameraStarted && (

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                      <Camera className="h-9 w-9 text-slate-400" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      Camera is off
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                      Start the camera to begin facial recognition.
                    </p>

                    <button
                      onClick={startCamera}
                      className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                    >
                      <Camera className="h-4 w-4" />
                      Start Camera
                    </button>

                    {cameraError && (
                      <div className="mt-5 max-w-md rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs leading-5 text-red-300">
                        {cameraError}
                      </div>
                    )}

                  </div>

                )}


                {cameraStarted && (

                  <>
                    {/* Actual camera */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover"
                    />


                    {/* Dark overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/10" />


                    {/* Top status */}
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">

                      <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                        <span className="text-xs font-bold text-white">
                          LIVE
                        </span>

                      </div>


                      {scanning && (
                        <div className="flex items-center gap-2 rounded-full bg-blue-600/90 px-3 py-1.5 text-xs font-bold text-white">

                          <ScanFace className="h-3.5 w-3.5 animate-pulse" />

                          ANALYZING FACE...

                        </div>
                      )}

                    </div>


                    {/* Face frame */}
                    <div className="absolute left-1/2 top-1/2 h-64 w-52 -translate-x-1/2 -translate-y-1/2">

                      <div className="absolute inset-0 rounded-3xl border-2 border-green-400" />

                      <span className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-green-300" />

                      <span className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-green-300" />

                      <span className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-green-300" />

                      <span className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-green-300" />

                    </div>


                    {/* Scan line */}
                    {scanning && (
                      <div className="absolute left-[20%] right-[20%] top-1/2 h-0.5 animate-pulse bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]" />
                    )}


                    {/* Bottom controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">

                      <button
                        onClick={simulateRecognition}
                        disabled={scanning}
                        className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-xl transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <ScanFace className="h-4 w-4" />

                        {scanning
                          ? "Recognizing..."
                          : "Scan Face"}
                      </button>

                      <button
                        onClick={stopCamera}
                        className="flex items-center gap-2 rounded-lg bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-slate-800"
                      >
                        <CameraOff className="h-4 w-4" />
                        Stop
                      </button>

                    </div>

                  </>

                )}

              </div>

            </div>


            {/* Recognition Result */}
            <div className="rounded-xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 px-5 py-4">

                <h2 className="text-base font-bold text-slate-900">
                  Recognition Result
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest detected identity
                </p>

              </div>


              <div className="p-5">

                {!recognizedStudent && !lastPunch && (

                  <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <ScanFace className="h-7 w-7 text-slate-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                      No face recognized
                    </h3>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                      Start the camera and scan a student's face to
                      see the recognition result.
                    </p>

                  </div>

                )}


                {recognizedStudent && (

                  <div>

                    <div className="flex items-center gap-4">

                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-extrabold text-blue-700">
                        {recognizedStudent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {recognizedStudent.name}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {recognizedStudent.roll}
                        </p>
                      </div>

                    </div>


                    {/* Confidence */}
                    <div className="mt-6 rounded-xl bg-green-50 p-4">

                      <div className="flex items-center justify-between">

                        <span className="text-xs font-semibold text-green-700">
                          Recognition Confidence
                        </span>

                        <span className="text-sm font-extrabold text-green-700">
                          {recognizedStudent.confidence}%
                        </span>

                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-green-100">

                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${recognizedStudent.confidence}%`,
                          }}
                        />

                      </div>

                    </div>


                    {/* Mark */}
                    <button
                      onClick={markAttendance}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700"
                    >
                      <UserCheck className="h-4 w-4" />
                      Mark Present
                    </button>


                    {duplicateMessage && (
                      <div className="mt-4 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">

                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />

                        <p className="text-xs leading-5 text-amber-700">
                          {duplicateMessage}
                        </p>

                      </div>
                    )}

                  </div>

                )}


                {lastPunch && !recognizedStudent && (

                  <div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-7 w-7 text-green-600" />
                      </div>

                      <h3 className="mt-4 text-lg font-bold text-green-800">
                        Attendance Marked
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-green-700">
                        {lastPunch.name}
                      </p>

                      <p className="mt-1 text-xs text-green-600">
                        {lastPunch.roll} · {lastPunch.time}
                      </p>

                    </div>

                    <button
                      onClick={() => setLastPunch(null)}
                      className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Scan Next Student
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>


          {/* Attendance Stream */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Today's Attendance Stream
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Students marked present during this session.
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                {attendance.length} Present
              </span>

            </div>


            {attendance.length === 0 ? (

              <div className="px-6 py-12 text-center">

                <UserCheck className="mx-auto h-10 w-10 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No attendance marked yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Recognized students will appear here.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px]">

                  <thead>

                    <tr className="border-b border-slate-100 bg-slate-50">

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Student
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Roll Number
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Time
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Confidence
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {attendance.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                              {item.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>

                            <span className="text-sm font-bold text-slate-900">
                              {item.name}
                            </span>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.roll}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.time}
                        </td>

                        <td className="px-5 py-4">

                          <span className="text-sm font-semibold text-green-600">
                            {item.confidence}%
                          </span>

                        </td>

                        <td className="px-5 py-4">

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">

                            <CheckCircle2 className="h-3.5 w-3.5" />

                            Present

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>


          {/* Security note */}
          <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

            <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />

            <div>

              <p className="text-sm font-bold text-blue-900">
                Duplicate attendance protection
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                A student can only receive one attendance punch for
                the same working day. Additional recognition attempts
                are rejected.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default LiveAttendance;