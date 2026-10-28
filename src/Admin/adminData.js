export const STORAGE_KEYS = {
  bookings: "celebrity-booking-admin-bookings",
  celebrities: "celebrity-booking-admin-celebrities",
};

export const PROFESSION_STARTING_RATES = {
  Actor: 1200,
  Musician: 1500,
  Athlete: 1000,
  Creator: 750,
  Other: 500,
};

const LEGACY_DEMO_RATES = {
  Zendaya: 18500,
  "Michael B. Jordan": 24000,
  "Ariana Grande": 32000,
  "John Legend": 12500,
  "Serena Williams": 21000,
  "Ryan Reynolds": 27500,
};

export function getProfession(nameOrDescription = "") {
  const value = nameOrDescription.toLowerCase();
  if (/\b(actor|actress|actresses|actor-director|film star|comedian)\b/.test(value)) return "Actor";
  if (/\b(singer|songwriter|musician|rapper|vocalist|band|dj|composer)\b/.test(value)) return "Musician";
  if (/\b(athlete|footballer|football player|basketball player|tennis player|boxer|golfer|racing driver|soccer player|wrestler)\b/.test(value)) return "Athlete";
  if (/\b(creator|influencer|streamer|youtuber|tiktok|content creator)\b/.test(value)) return "Creator";
  if (Object.hasOwn(PROFESSION_STARTING_RATES, nameOrDescription)) return nameOrDescription;
  return "Other";
}

export function getProfessionStartingRate(profession) {
  return PROFESSION_STARTING_RATES[getProfession(profession)];
}

export const demoBookings = [
  {
    id: "BK-1048",
    customer: "Olivia Rhye",
    email: "olivia.rhye@example.com",
    celebrity: "Zendaya",
    event: "Brand launch",
    date: "2026-11-18",
    amount: 1200,
    status: "Confirmed",
  },
  {
    id: "BK-1047",
    customer: "Phoenix Baker",
    email: "phoenix.baker@example.com",
    celebrity: "Michael B. Jordan",
    event: "Private appearance",
    date: "2026-11-22",
    amount: 1200,
    status: "Pending",
  },
  {
    id: "BK-1046",
    customer: "Lana Steiner",
    email: "lana.steiner@example.com",
    celebrity: "Ariana Grande",
    event: "Meet and greet",
    date: "2026-12-03",
    amount: 1500,
    status: "Confirmed",
  },
  {
    id: "BK-1045",
    customer: "Demi Wilkinson",
    email: "demi.wilkinson@example.com",
    celebrity: "John Legend",
    event: "Charity gala",
    date: "2026-11-29",
    amount: 1500,
    status: "Pending",
  },
  {
    id: "BK-1044",
    customer: "Candice Wu",
    email: "candice.wu@example.com",
    celebrity: "Serena Williams",
    event: "Keynote speech",
    date: "2026-10-12",
    amount: 1000,
    status: "Completed",
  },
  {
    id: "BK-1043",
    customer: "Natali Craig",
    email: "natali.craig@example.com",
    celebrity: "Ryan Reynolds",
    event: "Q&A session",
    date: "2026-10-08",
    amount: 1200,
    status: "Cancelled",
  },
];

export const demoCelebrities = [
  { name: "Zendaya", category: "Actor", bookings: 18, rate: 1200, available: true, initials: "Z" },
  { name: "Michael B. Jordan", category: "Actor", bookings: 14, rate: 1200, available: true, initials: "MJ" },
  { name: "Ariana Grande", category: "Musician", bookings: 12, rate: 1500, available: false, initials: "AG" },
  { name: "John Legend", category: "Musician", bookings: 9, rate: 1500, available: true, initials: "JL" },
  { name: "Serena Williams", category: "Athlete", bookings: 8, rate: 1000, available: true, initials: "SW" },
  { name: "Ryan Reynolds", category: "Actor", bookings: 7, rate: 1200, available: false, initials: "RR" },
];

function normalizeCelebrityList(list) {
  return list.map((celebrity) => {
    const profession = getProfession(celebrity.category || "");
    const hasLegacySampleRate = LEGACY_DEMO_RATES[celebrity.name] === Number(celebrity.rate);
    const rate = hasLegacySampleRate || !(Number(celebrity.rate) >= 500 && Number(celebrity.rate) <= 1500)
      ? getProfessionStartingRate(profession)
      : Number(celebrity.rate);
    return { ...celebrity, category: profession, rate };
  });
}

export function readStoredList(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error(`Stored value for ${key} is not a list.`);
    return key === STORAGE_KEYS.celebrities ? normalizeCelebrityList(parsed) : parsed;
  } catch (error) {
    console.error(`Could not read dashboard data for ${key}.`, error);
    return fallback;
  }
}

export function saveBooking(booking) {
  const bookings = readStoredList(STORAGE_KEYS.bookings, demoBookings);
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify([booking, ...bookings]));
}

export function getCelebrityRate(name) {
  const celebrity = readStoredList(STORAGE_KEYS.celebrities, demoCelebrities)
    .find((item) => item.name.trim().toLowerCase() === name.trim().toLowerCase());
  return Number.isFinite(Number(celebrity?.rate)) && Number(celebrity.rate) > 0
    ? Number(celebrity.rate)
    : celebrity
      ? getProfessionStartingRate(celebrity.category)
      : null;
}

export function recordFetchedCelebrities(people) {
  const celebrities = readStoredList(STORAGE_KEYS.celebrities, demoCelebrities);
  const knownNames = new Set(celebrities.map((celebrity) => celebrity.name.trim().toLowerCase()));
  const newCelebrities = people
    .filter((person) => !knownNames.has(person.name.trim().toLowerCase()))
    .map((person) => ({
      name: person.name,
      category: getProfession(person.description || person.bio || ""),
      bookings: 0,
      rate: getProfessionStartingRate(person.description || person.bio || ""),
      available: true,
      initials: person.name.split(" ").map((part) => part[0]).slice(0, 2).join(""),
    }));

  if (newCelebrities.length > 0) {
    localStorage.setItem(
      STORAGE_KEYS.celebrities,
      JSON.stringify([...celebrities, ...newCelebrities]),
    );
  }
}
