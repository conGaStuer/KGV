const express = require("express");
const db = require("../db");

const router = express.Router();

// 🩷 Thêm vào danh sách yêu thích
router.post("/add", async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    await db.query(
      "INSERT IGNORE INTO favorites (user_id, movie_id) VALUES (?, ?)",
      [user_id, movie_id]
    );
    res.json({ success: true, message: "Đã thêm vào danh sách yêu thích" });
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 💔 Xóa khỏi danh sách yêu thích
router.post("/remove", async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    await db.query("DELETE FROM favorites WHERE user_id = ? AND movie_id = ?", [
      user_id,
      movie_id,
    ]);
    res.json({ success: true, message: "Đã xóa khỏi danh sách yêu thích" });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🧠 Kiểm tra xem phim có nằm trong danh sách yêu thích không
router.get("/check", async (req, res) => {
  const { user_id, movie_id } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?",
      [user_id, movie_id]
    );
    res.json({ isFavorite: rows.length > 0 });
  } catch (error) {
    console.error("Check favorite error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
