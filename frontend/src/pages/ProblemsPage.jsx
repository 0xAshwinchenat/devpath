import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Todo", "In Progress", "Done"];

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    topic: "",
    difficulty: "",
  });

  const [form, setForm] = useState({
    title: "",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "",
    status: "Todo",
    link: "",
    notes: "",
    dateSolved: "",
  });

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.topic) params.topic = filter.topic;
      if (filter.difficulty) params.difficulty = filter.difficulty;

      const res = await axiosClient.get("/api/problems", { params });
      setProblems(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Error fetching problems";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProblem = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axiosClient.post("/api/problems", form);
      // reset some fields
      setForm((prev) => ({
        ...prev,
        title: "",
        topic: "",
        link: "",
        notes: "",
        dateSolved: "",
        status: "Todo",
        difficulty: "Easy",
      }));
      fetchProblems();
    } catch (err) {
      const msg = err.response?.data?.message || "Error adding problem";
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/api/problems/${id}`);
      setProblems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || "Error deleting problem";
      setError(msg);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosClient.put(`/api/problems/${id}`, {
        status: newStatus,
      });
      setProblems((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Error updating status";
      setError(msg);
    }
  };

  const handleApplyFilters = () => {
    fetchProblems();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Problems Tracker</h1>

      {/* Add Problem Form */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Add Problem</h2>
        <form onSubmit={handleAddProblem}>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Platform</label>
            <select
              name="platform"
              value={form.platform}
              onChange={handleFormChange}
            >
              <option>LeetCode</option>
              <option>Codeforces</option>
              <option>CodeChef</option>
              <option>AtCoder</option>
              <option>HackerRank</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleFormChange}
            >
              {difficulties.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Topic</label>
            <input
              name="topic"
              value={form.topic}
              onChange={handleFormChange}
              style={{ width: "100%" }}
              placeholder="Array, DP, Graph..."
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Link</label>
            <input
              name="link"
              value={form.link}
              onChange={handleFormChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Date Solved</label>
            <input
              type="date"
              name="dateSolved"
              value={form.dateSolved}
              onChange={handleFormChange}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Add Problem</button>
        </form>
      </section>

      {/* Filters */}
      <section style={{ marginBottom: "1rem" }}>
        <h2>Filter</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
          >
            <option value="">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="difficulty"
            value={filter.difficulty}
            onChange={handleFilterChange}
          >
            <option value="">All Difficulty</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <input
            name="topic"
            value={filter.topic}
            onChange={handleFilterChange}
            placeholder="Topic filter"
          />

          <button onClick={handleApplyFilters}>Apply</button>
        </div>
      </section>

      {/* Error / Loading */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* List */}
      <section>
        <h2>My Problems</h2>
        {problems.length === 0 && !loading && <p>No problems yet.</p>}
        {problems.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{p.title}</strong> ({p.platform}) – {p.difficulty} –{" "}
            {p.topic}
            <br />
            Status:{" "}
            <select
              value={p.status}
              onChange={(e) => handleStatusChange(p._id, e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {p.link && (
              <>
                {" "}
                | <a href={p.link} target="_blank" rel="noreferrer">Problem Link</a>
              </>
            )}
            <br />
            {p.notes && <span>Notes: {p.notes}</span>}
            <br />
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProblemsPage;
