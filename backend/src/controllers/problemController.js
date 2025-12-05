import Problem from "../models/Problem.js";

// POST /api/problems
export const createProblem = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const {
      title,
      platform,
      difficulty,
      topic,
      status,
      link,
      notes,
      dateSolved,
    } = req.body;

    if (!title || !topic) {
      return res.status(400).json({ message: "Title and topic are required" });
    }

    const problem = await Problem.create({
      user: userId,
      title,
      platform,
      difficulty,
      topic,
      status,
      link,
      notes,
      dateSolved: dateSolved ? new Date(dateSolved) : undefined,
    });

    res.status(201).json(problem);
  } catch (err) {
    console.error("Create problem error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/problems
// optional query params: status, topic, difficulty
export const getProblems = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, topic, difficulty } = req.query;

    const filter = { user: userId };

    if (status) filter.status = status;
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const problems = await Problem.find(filter).sort({ createdAt: -1 });

    res.json(problems);
  } catch (err) {
    console.error("Get problems error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/problems/:id
export const updateProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // only update if this problem belongs to this user
    const problem = await Problem.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: req.body },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (err) {
    console.error("Update problem error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const problem = await Problem.findOneAndDelete({ _id: id, user: userId });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json({ message: "Problem deleted" });
  } catch (err) {
    console.error("Delete problem error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
