import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError("");
        const res = await axiosClient.get("/api/analytics/problems");
        setAnalytics(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Error loading analytics";
        setError(msg);
      }
    };
    fetchAnalytics();
  }, []);

  const difficultyData =
    analytics?.byDifficulty.map((d) => ({
      difficulty: d._id,
      count: d.count,
    })) || [];

  const topicData =
    analytics?.byTopic.map((t) => ({
      topic: t._id,
      count: t.count,
    })) || [];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>
      {user && (
        <p>
          Welcome, {user.name} ({user.email})
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!analytics && !error && <p>Loading analytics...</p>}

      {analytics && (
        <>
          <section style={{ marginBottom: "2rem" }}>
            <h2>Summary</h2>
            <p>Total problems tracked: {analytics.totalProblems}</p>
            <p>Problems solved in last 7 days: {analytics.last7DaysSolved}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2>By Difficulty</h2>
            {difficultyData.length === 0 ? (
              <p>No data yet.</p>
            ) : (
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={difficultyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="difficulty" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2>Top Topics</h2>
            {topicData.length === 0 ? (
              <p>No data yet.</p>
            ) : (
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={topicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
