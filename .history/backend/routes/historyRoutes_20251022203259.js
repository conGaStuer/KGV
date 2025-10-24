const express = require("express");
const db = require("../db");
const router = express.Router();

// 📌 Lưu tiến độ xem
// Lưu hoặc cập nhật lịch sử xem
router.post("/save", (req, res) => {
  const { user_id, movie_id, episode_slug, current_time } = req.body;

  if (!user_id || !movie_id || !episode_slug) {
    return res.status(400).json({ error: "Thiếu dữ liệu gửi lên" });
  }

  const sql = `
    INSERT INTO watch_history (user_id, movie_id, episode_slug, watch_time)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE watch_time = ?
  `;

  db.query(
    sql,
    [user_id, movie_id, episode_slug, current_time, current_time],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi lưu lịch sử:", err);
        return res.status(500).json({ error: "Lỗi server khi lưu lịch sử" });
      }
      res.json({ message: "Đã lưu tiến độ xem" });
    }
  );
});

// 📌 Lấy tiến độ xem gần nhất
router.get("/get", (req, res) => {
  const { user_id, movie_id, episode_slug } = req.query;
  db.query(
    "SELECT current_time FROM watch_history WHERE user_id=? AND movie_id=? AND episode_slug=?",
    [user_id, movie_id, episode_slug],
    (err, result) => {
      if (err) {
        console.error("❌ Lỗi DB:", err);
        return res.status(500).json({ error: "Lỗi DB" });
      }
      res.json(result[0] || {});
    }
  );
});

module.exports = router;
