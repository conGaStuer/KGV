import express from "express";
import db from "../db.js";

const router = express.Router();

// Lấy danh sách yêu thích
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM favorites WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      res.json(rows);
    }
  );
});

// Thêm vào yêu thích
router.post("/", (req, res) => {
  const { user_id, movie_id, title, thumbnail } = req.body;
  db.query(
    "INSERT INTO favorites (user_id, movie_id, title, thumbnail) VALUES (?, ?, ?, ?)",
    [user_id, movie_id, title, thumbnail],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Đã thêm vào yêu thích" });
    }
  );
});

// Xóa khỏi yêu thích
router.delete("/", (req, res) => {
  const { user_id, movie_id } = req.body;
  db.query(
    "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
    [user_id, movie_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Đã xóa khỏi yêu thích" });
    }
  );
});

export default router;
