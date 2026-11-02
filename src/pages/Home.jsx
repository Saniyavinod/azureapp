export default function Home() {
  // Build-time variable: injected by Vite when `npm run build` runs.
  // On SWA it must be set in the GitHub workflow `env:` block, not only in the portal.
  const env = import.meta.env.VITE_APP_ENV || "not set";

  return (
    <section>
      <h1>Azure Static Web Apps - Practice</h1>
      <p>If you can read this on your Azure URL, your CI/CD pipeline works.</p>
      <div className="card">
        <p><b>VITE_APP_ENV:</b> {env}</p>
        <p><b>Build mode:</b> {import.meta.env.MODE}</p>
        <p><b>Build time:</b> {__BUILD_TIME__}</p>
      </div>
      <p>
        Tip: open <code>/about</code> and press refresh. It only works on SWA because of
        <code> navigationFallback</code> in <code>staticwebapp.config.json</code>.
      </p>
    </section>
  );
}
