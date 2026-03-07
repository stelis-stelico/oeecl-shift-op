import { MONTH_NAMES, DUTY_CONFIG } from "./constants";
import { getDutyForShiftOnDate, getDaysInMonth, getFirstDayOfMonth } from "./shiftUtils";

export default function CalendarModal({ shift, year, month, onClose }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const counts = { morning: 0, night: 0, off: 0 };
  days.forEach((d) => {
    const duty = getDutyForShiftOnDate(shift, new Date(year, month, d));
    counts[duty]++;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(90deg, #009d02 0%, #00c404 100%)" }}
        >
          <div>
            <p className="text-green-100 text-xs font-semibold tracking-widest uppercase mb-0.5">
              O.E.E.C.L — Shift Roster
            </p>
            <h2 className="text-white text-xl font-bold tracking-tight">
              Shift {shift} &mdash; {MONTH_NAMES[month]} {year}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-3 px-6 pt-4 pb-2 flex-wrap">
          {Object.entries(DUTY_CONFIG).map(([key, cfg]) => (
            <span
              key={key}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.badge}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${cfg.bg}`}>
                {cfg.label}
              </span>
              {cfg.full} Duty ({counts[key]})
            </span>
          ))}
        </div>

        {/* Calendar */}
        <div className="px-4 pb-5 pt-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2 tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {days.map((day) => {
              const date = new Date(year, month, day);
              const duty = getDutyForShiftOnDate(shift, date);
              const cfg = DUTY_CONFIG[duty];
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={day}
                  className={`
                    relative flex flex-col items-center justify-center
                    rounded-xl py-2 px-1 transition-all
                    ${cfg.bg} ${cfg.text}
                    ${isToday ? `ring-2 ${cfg.ring} ring-offset-1 ring-offset-slate-900 scale-105` : ""}
                  `}
                  style={{ minHeight: "52px" }}
                >
                  <span className="text-xs font-bold leading-none opacity-80 mb-1">{day}</span>
                  <span className="text-base font-black leading-none">{cfg.label}</span>
                  {isToday && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-slate-900" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs pb-4">
          ● Today is highlighted with a yellow dot
        </p>
      </div>
    </div>
  );
}
