# SWA Practice - React app for Azure Static Web Apps

React (Vite) + React Router + a managed Azure Functions API, built to practise deploying to Azure Static Web Apps.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to dist/
```
The `/status` page needs the API. Locally it shows an error unless you run the Functions host
(`cd api && npm install && func start`, needs Azure Functions Core Tools). On Azure it works automatically.

## Deploy to Azure Static Web Apps
1. Push this folder to a new GitHub repo (`main` branch).
2. Azure Portal -> Create a resource -> **Static Web App**.
   - Plan: Free
   - Deployment source: GitHub, select your repo and branch
   - Build preset: **Custom** (or React)
   - App location: `/`
   - Api location: `api`
   - Output location: `dist`   (Vite uses `dist`, not `build`)
3. Azure commits `.github/workflows/azure-static-web-apps-<name>.yml` to your repo and adds the
   secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. **Read this workflow file line by line.**
4. Wait for the GitHub Action to finish, then open the URL shown in the portal.

## Exercises (do all of them, they are interview material)
1. **SPA fallback:** open `/about` and refresh. Then temporarily delete `public/staticwebapp.config.json`, redeploy, and see the 404. Restore it.
2. **Build-time env var:** in the generated workflow, under the Azure/static-web-apps-deploy step add
   ```yaml
   env:
     VITE_APP_ENV: production
   ```
   Push and check that the Home page shows `production`. Learn why setting it only in the portal does not work (Vite bakes it in at build time).
3. **Server-side env var:** Portal -> your SWA -> Settings -> Environment variables -> add `GREETING`. Open `/status` and see it in the API response.
4. **Preview environments:** create a branch, change some text, open a Pull Request. Find the staging URL that SWA comments on the PR. Close the PR and see the environment removed.
5. **Break the pipeline on purpose:** introduce a build error (e.g. a bad import), push, read the failed Action log, fix it.
6. **Redirect + headers:** visit `/old-about` (301 to `/about`). Check response headers in DevTools Network tab.
7. **Custom domain + SSL** (if you own a domain): Settings -> Custom domains. Subdomain = CNAME; apex = TXT validation / ALIAS. Free managed certificate.
8. **Rollback thinking:** revert a commit on `main` and watch redeploy. Be ready to explain it.

## Docker practice
```bash
docker build -t swa-practice .
docker run -p 8080:80 swa-practice      # http://localhost:8080
```
(The Docker image serves only the frontend; the Functions API is SWA-specific.)

## Folder guide
| Path | Purpose |
|------|---------|
| `src/` | React app |
| `public/staticwebapp.config.json` | SWA routing, fallback, headers (copied into `dist/`) |
| `api/` | Managed Azure Functions (v4 Node model), served at `/api/*` |
| `Dockerfile`, `nginx.conf` | Multi-stage container build |

## Interview talking points
- Pipeline: push -> GitHub Actions -> `npm install` + `npm run build` -> upload `dist` with deployment token -> global CDN.
- Why `navigationFallback`: client-side routes do not exist as files on the server.
- Preview environments per PR; production deploys on merge to `main`.
- Free managed SSL; auth, roles and API are built in.
- Limits: for long-running or heavy backends use App Service, Container Apps or AKS instead.
