export default function About() {
  return (
    <section>
      <h1>About</h1>
      <p>This client-side route proves SPA fallback routing is configured correctly.</p>
      <ul>
        <li>React + Vite frontend</li>
        <li>Managed Azure Functions API in <code>/api</code></li>
        <li>Deployed by GitHub Actions to Azure Static Web Apps</li>
      </ul>
    </section>
  );
}
