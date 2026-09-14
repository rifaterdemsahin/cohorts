# cohorts
Delivery pilot cohorts

## 📔 Cohort Log

Weekly recap site for the AI-learning cohort — a static, single-page-per-week
journal built with plain HTML/CSS/JS (no build step, no framework). Deployed
via GitHub Pages using the GitHub Actions workflow in
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

**🌐 Live site:** https://rifaterdemsahin.github.io/cohorts/

[`index.html`](index.html) is the landing/archive page — it lists every
published week (rendered from `weeks.js`) with a link straight to that
week's recap.

**📚 Weeks:**
- [Week 01 — Finding Your Footing in the Agent Era](https://rifaterdemsahin.github.io/cohorts/week-01.html)

### First-time setup

GitHub Pages needs to be pointed at "GitHub Actions" as its source once,
after which every push to `main` redeploys automatically:

1. Repo **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**

### Adding a new week

1. Copy `week-01.html` to `week-NN.html` and update its content — masthead
   date, hero headline/intro, the seven agenda entries, and the closing
   principles.
2. Add one line to the `WEEKS` array in [`weeks.js`](weeks.js) pointing at
   the new file.
3. If saving notes to Azure Blob Storage is wanted for that page, paste a
   container-scoped SAS URL (write/create only, short expiry) into the
   `CONFIG` block near the bottom of the new page's `<script>` — see the
   comment there for the exact permissions and CORS requirements.
4. Commit and push to `main`; the Actions workflow redeploys the site.
