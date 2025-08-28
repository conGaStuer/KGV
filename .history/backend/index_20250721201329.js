const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Proxy route
app.get("/proxy", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("Missing URL");

  try {
    const response = await axios.get(videoUrl, {
      responseType: "stream", // stream để hỗ trợ file m3u8 hoặc ts
      headers: {
        "User-Agent": req.headers["user-agent"],
        Referer: "https://phimapi.com",
      },
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).send("Proxy fetch failed");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
