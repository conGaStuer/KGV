const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// proxy route: http://localhost:5000/proxy?url=https://s6.kkphimplayer6.com/...
app.use("/proxy", (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing `url` query param.");
  }

  // Tách domain gốc và path
  const urlObj = new URL(targetUrl);
  const target = urlObj.origin;
  const pathRewrite = urlObj.pathname;

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy`]: pathRewrite, // thay thế /proxy thành path gốc của link
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("origin", target); // giả header origin để tránh bị chặn
    },
  })(req, res, next);
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
