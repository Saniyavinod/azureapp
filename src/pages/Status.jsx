import { useEffect, useState } from "react";

export default function Status() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => {
        if (!r.ok) throw new Error(`API returned ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section>
      <h1>API Status</h1>
      <p>Calls the managed Azure Functions API at <code>/api/hello</code>.</p>
      {error && <p className="err">Error: {error}</p>}
      {!data && !error && <p>Loading...</p>}
      {data && <pre className="card">{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
