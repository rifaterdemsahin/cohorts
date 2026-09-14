# cohorts
Delivery pilot cohorts

## 📔 Cohort Log

Weekly recap site for the AI-learning cohort — a static, framework-free
journal built with plain HTML/CSS/JS (no build step). Every week is
rendered dynamically by one template, `week.html`, driven by a `?week=`
query parameter and a JSON data file per week — no more copy-pasting a new
HTML file for each call. Deployed via GitHub Pages using the GitHub
Actions workflow in
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

**🌐 Live site:** https://rifaterdemsahin.github.io/cohorts/

- [`index.html`](index.html) — the landing page: a calendar of every call
  date (from `weeks.js`), click a marked day to open that week
- [`week.html`](week.html) — the single dynamic recap template

**📚 Weeks:**
- [Week 01 — Finding Your Footing in the Agent Era](https://rifaterdemsahin.github.io/cohorts/week.html?week=week-01)

### How it works

- **`weeks.js`** — the manifest: `{ id, date, label }` for every published
  week. `index.html` reads it to plot the calendar; `week.html` reads it
  to resolve `?week=<id>` and to render the archive list.
- **`data/<id>.json`** — the canonical, versioned content for a week
  (kicker, headline, intro, the seven agenda entries, closing principles).
  This is what ships in the repo and is always available, Azure or not.
- **Azure Blob Storage (optional)** — if `assets/config.js` has a SAS URL
  configured, `week.html` first tries to load
  `content/<id>.json` from the container; if that blob doesn't exist yet
  (nothing's been edited live) it falls back to the bundled
  `data/<id>.json`. An "✏️ Edit this week" toggle on the page makes the
  headline, intro, entries, and principles directly editable in place;
  "💾 Save content to Azure" PUTs the edited JSON back to
  `content/<id>.json`, so the next visitor sees the edit. Reader notes
  (per-entry, personal) are unaffected — they still autosave to
  `localStorage` and optionally to `notes/<id>-<reader>-<timestamp>.txt`
  in the same container.

### First-time setup

GitHub Pages needs to be pointed at "GitHub Actions" as its source once,
after which every push to `main` redeploys automatically:

1. Repo **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**

To enable live editing and Azure-saved notes, edit
[`assets/config.js`](assets/config.js) and paste in a **container-level**
SAS URL scoped to **Read + Write + Create only** (never List, never
Delete), with a short, rotating expiry — see the comments in that file for
why, and for the CORS rules (`GET` + `PUT`) the storage account needs to
allow from the GitHub Pages origin.

### Adding a new week

1. Create `data/week-NN.json` — copy `data/week-01.json` and rewrite its
   `weekNumber`, `date`, `kicker`, `headline`, `intro`, `entries` (seven
   agenda items), and `principles`.
2. Add one line to the `WEEKS` array in [`weeks.js`](weeks.js) with that
   week's `id`, `date`, and `label`.
3. Commit and push to `main`; the Actions workflow redeploys the site —
   the new date lights up on the calendar and `week.html?week=week-NN`
   renders it automatically. No new HTML file needed.
