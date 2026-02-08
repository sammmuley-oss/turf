import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
console.log("2FA KEY:", process.env.TWOFACTOR_API_KEY);


const app = express();
app.use(cors());
app.use(express.json());

// In-memory OTP store (OK for demo / MVP)
const otpStore = new Map();

// 🔢 Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 📤 Send OTP
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone required" });

  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const otp = generateOTP();

  otpStore.set(cleanPhone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  });

  try {
    const url = `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${cleanPhone}/${otp}/AUTOGEN?template=OTP`;
    const response = await axios.get(url);

    console.log("2Factor response:", response.data);

    if (response.data.Status !== "Success") {
      return res.status(500).json({ error: response.data.Details });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("SMS ERROR:", err.message);
    res.status(500).json({ error: "SMS failed" });
  }
});



// ✅ Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record) return res.status(400).json({ error: "OTP not found" });
  if (Date.now() > record.expiresAt)
    return res.status(400).json({ error: "OTP expired" });

  if (record.otp !== otp)
    return res.status(400).json({ error: "Invalid OTP" });

  otpStore.delete(phone);
  res.json({ success: true });
});

app.listen(5000, () => console.log("OTP server running on 5000"));
