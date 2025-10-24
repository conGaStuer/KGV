const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/favorite", favoriteRoutes);
app.get("/", (req, res) => {
  res.send("Server hoạt động OK 🔥");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server chạy tại http://localhost:${PORT}`)
);
