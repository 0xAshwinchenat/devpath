import { Routes, Route, Link, Navigate } from "react-router-dom";

// Pages
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import InterviewsPage from "./pages/InterviewsPage.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* Navigation */}
      <nav
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          marginBottom: "1rem",
          fontFamily: "sans-serif",
        }}
      >
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>

        {!token && (
          <>
            <Link to="/register" style={{ marginRight: "1rem" }}>
              Register
            </Link>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" style={{ marginRight: "1rem" }}>
              Dashboard
            </Link>
            <Link to="/problems" style={{ marginRight: "1rem" }}>
              Problems
            </Link>
            <Link to="/interviews" style={{ marginRight: "1rem" }}>
              Interviews
            </Link>
          </>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
              <h1>DevPath – DSA & Interview Tracker</h1>
              <p>Track your progress. Stay consistent. Improve every day.</p>
            </div>
          }
        />

        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/problems"
          element={token ? <ProblemsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/interviews"
          element={token ? <InterviewsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
