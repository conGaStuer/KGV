const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const db = require("./db");
const authRoutes = require("./routes/authRoutes");
// const favoriteRoutes = require("./routes/favoriteRoutes");
// const historyRoutes = require("./routes/historyRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server hoạt động OK 🔥");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server chạy tại http://localhost:${PORT}`)
);
