import { useState, useEffect } from "react";
import { CURRENT_YEAR, YEARS, MONTH_NAMES, DUTY_CONFIG } from "./constants";
import CalendarModal from "./CalendarModal";

export default function App() {
  const [shift, setShift] = useState("A");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(new Date().getMonth());
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Capture the install prompt event before it fires automatically
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Hide button if app is already installed
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setInstallPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setInstallPrompt(null);
    }
  };

  const handleCheck = () => {
    setSubmitted({ shift, year: Number(year), month: Number(month) });
    setShowModal(true);
  };

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{
        minHeight: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "linear-gradient(135deg, #003d01 0%, #009d02 50%, #00c404 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-2 w-full"
          style={{ background: "linear-gradient(90deg, #009d02, #00c404, #009d02)" }}
        />

        <div className="px-8 py-8">
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
              style={{ background: "linear-gradient(135deg, #009d02, #00c404)" }}
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-widest" style={{ color: "#009d02" }}>
              O.E.E.C.L
            </h1>
            <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mt-1">
              Operations Dept Shift Roster
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Shift */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                Select Shift
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["A", "B", "C", "D"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setShift(s)}
                    className={`py-3 rounded-xl font-black text-sm transition-all duration-200 ${
                      shift === s ? "text-white shadow-lg scale-105" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    }`}
                    style={shift === s ? { background: "linear-gradient(135deg, #009d02, #00c404)" } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                Select Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:border-green-500 transition-colors appearance-none cursor-pointer"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                Select Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:border-green-500 transition-colors appearance-none cursor-pointer"
              >
                {MONTH_NAMES.map((name, i) => (
                  <option key={i} value={i}>{name}</option>
                ))}
              </select>
            </div>

            {/* Check Button */}
            <button
              onClick={handleCheck}
              className="w-full py-4 rounded-xl text-white font-black text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #009d02 0%, #00c404 100%)",
                boxShadow: "0 8px 24px rgba(0,157,2,0.35)",
              }}
            >
              Check Roster
            </button>

            {/* Install Button — only shows on Android when prompt is available */}
            {installPrompt && !installed && (
              <button
                onClick={handleInstall}
                className="w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: "#fff",
                  color: "#1e3a5f",
                  border: "2px solid #1e3a5f",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Install App
              </button>
            )}

            {/* Installed confirmation */}
            {installed && (
              <p className="text-center text-xs font-semibold" style={{ color: "#009d02" }}>
                ✓ App installed successfully!
              </p>
            )}

            {/* iPhone instruction */}
            <p className="text-center text-xs text-slate-400 leading-relaxed">
              iPhone users: tap the Share button in Safari then <span className="font-semibold">"Add to Home Screen"</span>
            </p>
          </div>

          {/* Legend mini */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {Object.entries(DUTY_CONFIG).map(([key, cfg]) => (
              <span key={key} className="flex items-center gap-1 text-xs text-slate-400">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  style={{ background: cfg.bgColor, color: cfg.textColor, fontSize: "9px" }}
                >
                  {cfg.label}
                </span>
                {cfg.full}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && submitted && (
        <CalendarModal
          shift={submitted.shift}
          year={submitted.year}
          month={submitted.month}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
