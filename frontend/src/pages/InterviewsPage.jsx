import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const statuses = ["Applied", "Online Assessment", "Interview", "Rejected", "Offer", "On Hold"];

function InterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    company: "",
  });

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    nextRoundDate: "",
    source: "",
    notes: "",
  });

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.company) params.company = filter.company;

      const res = await axiosClient.get("/api/interviews", { params });
      setInterviews(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Error fetching interviews";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
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

  const handleAddInterview = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axiosClient.post("/api/interviews", form);
      setForm({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        nextRoundDate: "",
        source: "",
        notes: "",
      });
      fetchInterviews();
    } catch (err) {
      const msg = err.response?.data?.message || "Error adding interview";
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/api/interviews/${id}`);
      setInterviews((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || "Error deleting interview";
      setError(msg);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosClient.put(`/api/interviews/${id}`, {
        status: newStatus,
      });
      setInterviews((prev) =>
        prev.map((i) => (i._id === id ? res.data : i))
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Error updating status";
      setError(msg);
    }
  };

  const handleApplyFilters = () => {
    fetchInterviews();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Interview Tracker</h1>

      {/* Add Interview */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Add Interview</h2>
        <form onSubmit={handleAddInterview}>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Company</label>
            <input
              name="company"
              value={form.company}
              onChange={handleFormChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleFormChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleFormChange}
              style={{ width: "100%" }}
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
            <label>Next Round Date</label>
            <input
              type="date"
              name="nextRoundDate"
              value={form.nextRoundDate}
              onChange={handleFormChange}
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label>Source</label>
            <input
              name="source"
              value={form.source}
              onChange={handleFormChange}
              style={{ width: "100%" }}
              placeholder="LinkedIn, Referral..."
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
          <button type="submit">Add Interview</button>
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

          <input
            name="company"
            value={filter.company}
            onChange={handleFilterChange}
            placeholder="Company name"
          />

          <button onClick={handleApplyFilters}>Apply</button>
        </div>
      </section>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* List */}
      <section>
        <h2>My Applications</h2>
        {interviews.length === 0 && !loading && <p>No interviews yet.</p>}
        {interviews.map((i) => (
          <div
            key={i._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{i.company}</strong> – {i.role} {i.location && `(${i.location})`}
            <br />
            Status:{" "}
            <select
              value={i.status}
              onChange={(e) => handleStatusChange(i._id, e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {i.nextRoundDate && (
              <>
                {" "}
                | Next round: {new Date(i.nextRoundDate).toLocaleDateString()}
              </>
            )}
            {i.source && <> | Source: {i.source}</>}
            <br />
            {i.notes && <span>Notes: {i.notes}</span>}
            <br />
            <button onClick={() => handleDelete(i._id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default InterviewsPage;
