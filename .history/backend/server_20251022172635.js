import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

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
