export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DUTY_CONFIG = {
  morning: {
    label: "M",
    bg: "bg-emerald-500",
    text: "text-white",
    ring: "ring-emerald-300",
    badge: "bg-emerald-100 text-emerald-700",
    full: "Morning",
  },
  night: {
    label: "N",
    bg: "bg-rose-500",
    text: "text-white",
    ring: "ring-rose-300",
    badge: "bg-rose-100 text-rose-700",
    full: "Night",
  },
  off: {
    label: "O",
    bg: "bg-sky-500",
    text: "text-white",
    ring: "ring-sky-300",
    badge: "bg-sky-100 text-sky-700",
    full: "Off",
  },
};

export const START_DATE = new Date(2024, 0, 8);

export const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 2 + i);
