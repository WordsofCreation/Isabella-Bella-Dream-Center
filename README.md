# Isabella Bella Dream Center

Isabella Bella Dream Center is a premium bakery founder dashboard for reviewing cookie ideas, recipe testing, recipe cards, ingredient costing, production planning, launch planning, orders, marketing tasks, templates, and settings in one warm operational workspace.

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

After the dev server starts, open:

```text
http://localhost:3000
```


## Preview a production build locally

If you want to check the same optimized build that a deployment platform will run, use:

```bash
npm run build
npm run start
```

Then open:

```text
http://localhost:3000
```

## Deploy with GitHub Pages

This project is configured for deployment through the **Pages** section of GitHub using GitHub Actions. The workflow builds a static Next.js export into the `out` folder and publishes that folder to GitHub Pages.

### One-time GitHub Pages setup

1. Push this repository to GitHub.
2. In GitHub, open the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Save the Pages setting if GitHub prompts you to save.
6. Go to the **Actions** tab.
7. Run **Deploy to GitHub Pages** manually, or push to the `main` branch to trigger it automatically.
8. When the workflow finishes, open the URL shown in the deployment summary.

For a project repository, the website URL will usually look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/Isabella-Bella-Dream-Center/
```

If the repository is renamed, the GitHub Pages base path is calculated automatically during the GitHub Actions build.

### What the GitHub Pages workflow does

The workflow at `.github/workflows/deploy-github-pages.yml`:

1. Checks out the repo.
2. Installs Node.js 20.
3. Runs `npm ci`.
4. Runs `npm run build`.
5. Uploads the generated `out` folder as a GitHub Pages artifact.
6. Deploys the artifact to GitHub Pages.

### GitHub Pages notes

- GitHub Pages is static hosting, so this MVP is exported as static HTML/CSS/JS.
- The app does not require Supabase, auth, payments, calendars, AI, or any live APIs to deploy.
- The `.nojekyll` file is included so GitHub Pages serves Next.js static assets correctly.
- If you use a custom domain later, revisit `next.config.mjs` before deploying because custom domains may not need a repository-name base path.

## Current MVP status

This MVP is preview-ready for local review. It includes a polished Next.js app shell, dark elegant sidebar navigation, warm neutral workspace styling, refined cards, badges, tables, and mock operational pages for Isabella Bella's early bakery workflows.

Current working navigation includes:

- Dashboard
- Cookie Ideas
- Recipe Testing
- Recipes
- Ingredient Costing
- Production Calendar
- Launch Planner
- Orders
- Marketing Calendar
- Templates
- Settings

## What is mocked

The current app uses local mock data only. There are no live APIs, databases, authentication flows, payment processors, ordering systems, calendars, accounting connections, AI features, vendor imports, or notification services connected yet.

Mocked areas include:

- Cookie ideas and quick local idea capture
- Recipe and costing snapshots
- Production calendar blocks
- Launch planning checklists
- Customer orders and fulfillment states
- Marketing calendar tasks and campaign statuses
- Template cards and settings placeholders
- Future integration lists

## Future roadmap

Planned future integrations and deeper workflows include:

- Supabase database
- Supabase Auth
- Real recipe costing calculator
- Google Calendar integration
- Shopify or order form integration
- Stripe/Square payments
- QuickBooks accounting
- OpenAI recipe and planning assistant
- Vendor price imports
- Email/SMS notifications
