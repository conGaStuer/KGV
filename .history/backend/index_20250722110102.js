const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Proxy route for relative URLs (e.g., /3000kb/hls/index.m3u8)
app.use(
  "/:path*",
  createProxyMiddleware({
    target: "https://s4.phim1280.tv",
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // Ensure path is valid and properly formatted
      const fullPath = `/${req.params.path || ""}${req.params[0] || ""}`;
      console.log("Rewritten path:", fullPath);
      return fullPath;
    },
    onProxyReq: (proxyReq, req) => {
      const target = "https://s4.phim1280.tv";
      proxyReq.setHeader("Origin", target);
      proxyReq.setHeader("Referer", target + "/");
      proxyReq.setHeader(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );
      console.log("Proxying request to:", `${target}${req.path}`);
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send(`Proxy error: ${err.message}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log("Proxy response status:", proxyRes.statusCode);
      console.log("Proxy response headers:", proxyRes.headers);
    },
  })
);

// Proxy route for main m3u8 (e.g., /proxy?url=...)
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
      pathRewrite: () => path, // Simplified pathRewrite
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader("Origin", target);
        proxyReq.setHeader("Referer", target + "/");
        proxyReq.setHeader(
          "User-Agent",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );
        console.log("Proxying main m3u8 request to:", targetUrl);
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.status(500).send(`Proxy error: ${err.message}`);
      },
      onProxyRes: (proxyRes, req, res) => {
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
