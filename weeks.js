// weeks.js — manifest of every published week.
//
// week.html reads this to resolve a week id from the ?week= query
// parameter (e.g. week.html?week=week-01), and index.html reads it to
// plot the calendar and the "next call" info.
//
// Add ONE entry here per new week. You do NOT need to create a new HTML
// file for it — week.html renders any week from its data file
// (data/<id>.json), optionally overlaid by an edited copy saved to Azure
// at content/<id>.json.
const WEEKS = [
  { id: "week-01", date: "2026-09-10", label: "Week 01 — Finding Your Footing in the Agent Era" }
];
