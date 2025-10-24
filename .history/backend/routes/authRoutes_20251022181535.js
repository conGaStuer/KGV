const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET = "MY_SECRET_KEY";

// Đăng ký
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashed],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Email đã tồn tại hoặc lỗi DB" });
      }
      res.json({ message: "Đăng ký thành công" });
    }
  );
});

// Đăng nhập
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err || result.length === 0)
      return res.status(401).json({ error: "Email không tồn tại" });

    const user = result[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: "Sai mật khẩu" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
});

module.exports = router;
