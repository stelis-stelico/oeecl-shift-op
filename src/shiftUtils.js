import { START_DATE } from "./constants";

export function getDutyForShiftOnDate(shift, date) {
  const timeDiff = date - START_DATE;
  const dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  const cycleDay = ((dayDiff % 16) + 16) % 16;

  switch (shift) {
    case "B":
      if (cycleDay < 4) return "off";
      if (cycleDay < 8) return "morning";
      if (cycleDay < 12) return "night";
      return "off";
    case "D":
      if (cycleDay < 4) return "night";
      if (cycleDay < 8) return "off";
      if (cycleDay < 12) return "off";
      return "morning";
    case "A":
      if (cycleDay < 4) return "off";
      if (cycleDay < 8) return "off";
      if (cycleDay < 12) return "morning";
      return "night";
    case "C":
      if (cycleDay < 4) return "morning";
      if (cycleDay < 8) return "night";
      return "off";
    default:
      return null;
  }
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
