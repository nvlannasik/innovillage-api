const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv");

//verify token admin
router.get("/verify-token-admin", (req, res) => {
  const token = req.header("x-auth-token-admin");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_ADMIN_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).send({
      status: "success",
      message: "Token verified successfully",
      data: {
        verified,
      },
    });
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
});

//verify token petani

router.get("/verify-token-petani", (req, res) => {
  const token = req.header("x-auth-token-petani");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_PETANI_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).send({
      status: "success",
      message: "Token verified successfully",
      data: {
        verified,
      },
    });
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
});

//refresh token user
router.get("/verify-token-user", (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).send({
      status: "success",
      message: "Token verified successfully",
      data: {
        verified,
      },
    });
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
});
module.exports = router;
