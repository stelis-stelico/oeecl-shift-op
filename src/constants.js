export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DUTY_CONFIG = {
  morning: {
    label: "M",
    bgColor: "#1e3a5f",
    textColor: "#ffffff",
    ringColor: "#3a6ea8",
    badgeBg: "#d0e4f7",
    badgeText: "#1e3a5f",
    full: "Morning",
  },
  night: {
    label: "N",
    bgColor: "#1e3a5f",
    textColor: "#ffffff",
    ringColor: "#3a6ea8",
    badgeBg: "#d0e4f7",
    badgeText: "#1e3a5f",
    full: "Night",
  },
  off: {
    label: "O",
    bgColor: "#e8f5e9",
    textColor: "#2d6a2f",
    ringColor: "#a5d6a7",
    badgeBg: "#f1faf1",
    badgeText: "#2d6a2f",
    full: "Off",
  },
};

export const START_DATE = new Date(2024, 0, 8);

export const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 2 + i);
