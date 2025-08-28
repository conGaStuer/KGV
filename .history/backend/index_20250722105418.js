const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Proxy route: http://localhost:5000/proxy?url=https://s4.phim1280.tv/...
app.use("/proxy", (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing url query param.");
  }

  try {
    const urlObj = new URL(targetUrl);
    const target = urlObj.origin;
    const path = urlObj.pathname + (urlObj.search || "");

    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        return urlObj.pathname + (urlObj.search || ""); // Giữ nguyên pathname và query
      },
      onProxyReq: (proxyReq, req) => {
        // Thêm các header để tránh bị chặn
        proxyReq.setHeader("Origin", target);
        proxyReq.setHeader("Referer", target + "/");
        proxyReq.setHeader(
          "User-Agent",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.status(500).send(`Proxy error: ${err.message}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        // Log response từ server đích để debug
        console.log("Proxy response status:", proxyRes.statusCode);
        console.log("Proxy response headers:", proxyRes.headers);
      },
    })(req, res, next);
  } catch (err) {
    console.error("Invalid URL:", err);
    res.status(400).send("Invalid URL provided.");
  }
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
