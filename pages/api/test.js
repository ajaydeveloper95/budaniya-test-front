const axios = require("axios");
const crypto = require("crypto");

export default async function payment(req, res) {
  res.status(200).json({ success: true, message: "success" });
}
