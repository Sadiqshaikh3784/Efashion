import express from "express";

const router = express.Router();

// temporary storage (baad me DB laga dena)
let subscribers = [];

// 👉 ADD EMAIL
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  subscribers.push(email);
  console.log("📩 New Subscriber:", email);

  res.json({ message: "Subscribed successfully" });
});

// 👉 GET ALL EMAILS (admin ke liye)
router.get("/", (req, res) => {
  res.json(subscribers);
});

export default router;