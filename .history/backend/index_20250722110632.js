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
      const fullPath = `/${req.params.path || ""}${req.params[0] || ""}`;
      console.log("Rewritten path:", fullPath);
      return fullPath;
    },
    onProxyReq: (proxyReq, req) => {
      const target = "https://s4.phim1280.tv";
      proxyReq.setHeader("Origin", target);
      proxyReq.setHeader("Referer", target +zzük

System: It looks like your response was cut off. Based on your question and the context, you want to use the `link_embed` URL (`https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250325/L13mtaK3/index.m3u8`) instead of the `link_m3u8` URL in your React application with `video.js`. The previous error (`404 Not Found` for `http://localhost:5000/3000kb/hls/index.m3u8`) and the backend crash (`TypeError: Missing parameter name`) suggest issues with the proxy server and relative URL handling. I'll provide a complete solution to use `link_embed`, address the previous errors, and ensure the setup works.

---

### Solution

#### 1. Fix Backend Proxy Server
The backend crash was caused by an invalid `pathRewrite` in the `http-proxy-middleware` configuration. The `/:path*` route is valid, but we need to ensure `pathRewrite` handles paths safely to avoid `path-to-regexp` errors. Here's the corrected backend code:

```javascript
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
      pathRewrite: () => path,
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