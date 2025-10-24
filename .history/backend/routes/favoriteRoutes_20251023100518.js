const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, movie_id, slug } = req.body;

  if (!user_id || !movie_id || !slug) {
    return res.status(400).json({ success: false, message: "Thiếu dữ liệu" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?",
      [user_id, movie_id]
    );

    if (rows.length > 0) {
      // Nếu đã có thì xóa (bỏ yêu thích)
      await pool.query(
        "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
        [user_id, movie_id]
      );
      return res.json({
        success: true,
        action: "removed",
        message: "Đã xóa khỏi yêu thích",
      });
    } else {
      // Nếu chưa có thì thêm mới
      await pool.query(
        "INSERT INTO favorites (user_id, movie_id, slug) VALUES (?, ?, ?)",
        [user_id, movie_id, slug]
      );
      return res.json({
        success: true,
        action: "added",
        message: "Đã thêm vào yêu thích",
      });
    }
  } catch (error) {
    console.error("Favorite error:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

module.exports = router;
