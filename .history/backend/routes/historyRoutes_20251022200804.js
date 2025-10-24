const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/save", (req, res) => {
  const { user_id, movie_id, episode_slug, current_time } = req.body;
  db.query(
    "SELECT * FROM history WHERE user_id = ? AND movie_id = ? AND episode_slug = ?",
    [user_id, movie_id, episode_slug],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length > 0) {
        db.query(
          "UPDATE history SET current_time = ? WHERE id = ?",
          [current_time, result[0].id],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ message: "Cập nhật lịch sử thành công" });
          }
        );
      } else {
        db.query(
          "INSERT INTO history (user_id, movie_id, episode_slug, current_time) VALUES (?,?,?,?)",
          [user_id, movie_id, episode_slug, current_time],
          (err3) => {
            if (err3) return res.status(500).json({ error: err3.message });
            res.json({ message: "Đã lưu lịch sử xem" });
          }
        );
      }
    }
  );
});
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query(
    "SELECT * FROM history WHERE user_id = ? ORDER BY updated_at DESC",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

module.exports = router;
