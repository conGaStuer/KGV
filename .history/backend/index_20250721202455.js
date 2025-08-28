const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

app.use(cors());

app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  req.pipe(request(url)).pipe(res);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
