import Interview from "../models/Interview.js";

// POST /api/interviews
export const createInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      company,
      role,
      location,
      status,
      nextRoundDate,
      source,
      notes,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const interview = await Interview.create({
      user: userId,
      company,
      role,
      location,
      status,
      nextRoundDate: nextRoundDate ? new Date(nextRoundDate) : undefined,
      source,
      notes,
    });

    res.status(201).json(interview);
  } catch (err) {
    console.error("Create interview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/interviews
// optional query: status, company
export const getInterviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, company } = req.query;

    const filter = { user: userId };
    if (status) filter.status = status;
    if (company) filter.company = new RegExp(company, "i");

    const interviews = await Interview.find(filter).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    console.error("Get interviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/interviews/:id
export const updateInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const interview = await Interview.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: req.body },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (err) {
    console.error("Update interview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/interviews/:id
export const deleteInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const interview = await Interview.findOneAndDelete({ _id: id, user: userId });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json({ message: "Interview deleted" });
  } catch (err) {
    console.error("Delete interview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
