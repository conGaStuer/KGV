import express from "express";
import db from "../db.js";

const router = express.Router();

// Lấy lịch sử xem
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.query("SELECT * FROM history WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// Lưu tiến độ xem
router.post("/", (req, res) => {
  const { user_id, movie_id, current_time } = req.body;

  db.query(
    "SELECT * FROM history WHERE user_id = ? AND movie_id = ?",
    [user_id, movie_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });

      if (rows.length > 0) {
        // Update nếu đã có
        db.query(
          "UPDATE history SET current_time = ? WHERE user_id = ? AND movie_id = ?",
          [current_time, user_id, movie_id]
        );
      } else {
        // Insert nếu chưa có
        db.query(
          "INSERT INTO history (user_id, movie_id, current_time) VALUES (?, ?, ?)",
          [user_id, movie_id, current_time]
        );
      }
      res.json({ message: "Đã lưu tiến độ xem" });
    }
  );
});

export default router;
