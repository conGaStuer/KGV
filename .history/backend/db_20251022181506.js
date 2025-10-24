const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // đổi theo phpMyAdmin
  database: "kgv", // tên DB của bạn
});

db.connect((err) => {
  if (err) console.error("❌ Lỗi kết nối DB:", err);
  else console.log("✅ Kết nối MySQL thành công");
});

module.exports = db;
