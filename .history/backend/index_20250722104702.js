const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Proxy route: http://localhost:5000/proxy?url=https://s6.kkphimplayer6.com/...
app.use(
  "/proxy",
  createProxyMiddleware({
    target: (req) => new URL(req.query.url).origin, // Lấy origin từ query param
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const urlObj = new URL(req.query.url);
      return urlObj.pathname; // Chỉ lấy pathname của URL gốc
    },
    onProxyReq: (proxyReq, req) => {
      // Thêm các header cần thiết để tránh bị chặn
      proxyReq.setHeader("Origin", new URL(req.query.url).origin);
      proxyReq.setHeader("Referer", new URL(req.query.url).origin);
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error occurred");
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
