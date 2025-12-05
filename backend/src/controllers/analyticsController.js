import Problem from "../models/Problem.js";

export const getProblemAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalCount, byDifficulty, byTopic, last7Days] = await Promise.all([
      Problem.countDocuments({ user: userId }),

      Problem.aggregate([
        { $match: { user: Problem.schema.path("user").cast(userId) } },
        { $group: { _id: "$difficulty", count: { $sum: 1 } } },
      ]),

      Problem.aggregate([
        { $match: { user: Problem.schema.path("user").cast(userId) } },
        { $group: { _id: "$topic", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),

      (async () => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return Problem.countDocuments({
          user: userId,
          status: "Done",
          dateSolved: { $gte: sevenDaysAgo },
        });
      })(),
    ]);

    res.json({
      totalProblems: totalCount,
      byDifficulty,
      byTopic,
      last7DaysSolved: last7Days,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
