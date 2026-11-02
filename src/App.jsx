import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Status from "./pages/Status.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <strong>SWA Practice</strong>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/status">Status</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/status" element={<Status />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </main>
    </div>
  );
}
