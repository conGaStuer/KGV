const db = require("../db");

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = "MY_SECRET_KEY"; // m có thể đổi

module.exports = router;
